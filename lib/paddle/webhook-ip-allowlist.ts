import "server-only";

const PADDLE_IPS_URL = "https://api.paddle.com/ips";
const CACHE_TTL_MS = 60 * 60 * 1000;

interface PaddleIpsResponse {
  data?: {
    ipv4_cidrs?: unknown;
  };
}

interface CachedAllowlist {
  addresses: Set<string>;
  expiresAt: number;
}

let cachedAllowlist: CachedAllowlist | undefined;
let pendingAllowlist: Promise<Set<string>> | undefined;

function normalizeIpv4(value: string): string | undefined {
  const candidate = value.trim().replace(/^::ffff:/, "");
  const octets = candidate.split(".");

  if (octets.length !== 4) return undefined;
  if (
    octets.some(
      (octet) =>
        !/^\d{1,3}$/.test(octet) ||
        Number(octet) < 0 ||
        Number(octet) > 255,
    )
  ) {
    return undefined;
  }

  return octets.map((octet) => String(Number(octet))).join(".");
}

function parsePaddleCidrs(value: unknown): Set<string> {
  if (!Array.isArray(value)) {
    throw new Error("Paddle IP response did not contain ipv4_cidrs.");
  }

  const addresses = new Set<string>();
  for (const cidr of value) {
    if (typeof cidr !== "string" || !cidr.endsWith("/32")) {
      throw new Error("Paddle returned an unsupported IP range.");
    }

    const address = normalizeIpv4(cidr.slice(0, -3));
    if (!address) throw new Error("Paddle returned an invalid IPv4 CIDR.");
    addresses.add(address);
  }

  if (addresses.size === 0) {
    throw new Error("Paddle returned an empty IP allowlist.");
  }

  return addresses;
}

async function fetchPaddleAllowlist(): Promise<Set<string>> {
  const response = await fetch(PADDLE_IPS_URL, {
    cache: "no-store",
    headers: { accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Paddle IP endpoint returned ${response.status}.`);
  }

  const payload = (await response.json()) as PaddleIpsResponse;
  return parsePaddleCidrs(payload.data?.ipv4_cidrs);
}

async function getPaddleAllowlist(): Promise<Set<string>> {
  const now = Date.now();
  if (cachedAllowlist && cachedAllowlist.expiresAt > now) {
    return cachedAllowlist.addresses;
  }

  pendingAllowlist ??= fetchPaddleAllowlist()
    .then((addresses) => {
      cachedAllowlist = { addresses, expiresAt: Date.now() + CACHE_TTL_MS };
      return addresses;
    })
    .finally(() => {
      pendingAllowlist = undefined;
    });

  return pendingAllowlist;
}

function getTrustedClientIp(request: Request): string | undefined {
  const configuredHeader = process.env.PADDLE_WEBHOOK_CLIENT_IP_HEADER
    ?.trim()
    .toLowerCase();
  const headerName =
    process.env.VERCEL === "1"
      ? "x-vercel-forwarded-for"
      : configuredHeader;

  if (!headerName) return undefined;

  const forwardedValue = request.headers.get(headerName);
  if (!forwardedValue) return undefined;

  return normalizeIpv4(forwardedValue.split(",", 1)[0] ?? "");
}

export async function isPaddleWebhookSourceAllowed(
  request: Request,
): Promise<boolean> {
  const clientIp = getTrustedClientIp(request);
  if (!clientIp) return false;

  const allowlist = await getPaddleAllowlist();
  return allowlist.has(clientIp);
}
