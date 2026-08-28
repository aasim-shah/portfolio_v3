import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts } from "@/data";

type ArticleSection = {
  /** Slug-safe id used for the in-page table of contents. */
  id: string;
  /** Original statement-style label, kept as an eyebrow above the question. */
  heading: string;
  /**
   * Question-phrased H2 for featured-snippet eligibility.
   * TODO(content): owner to review wording against brand voice.
   */
  question: string;
  /**
   * Answer-first lead paragraph (40–60 words) for featured snippets.
   * Additive paraphrase of the section's first paragraph — TODO(content): owner review.
   */
  summary: string;
  paragraphs: string[];
};

const articleContent: Record<string, ArticleSection[]> = {
  "scalable-mern-stack-applications": [
    {
      id: "operating-model",
      heading: "Start with the operating model",
      question: "How do you start designing a scalable MERN application?",
      summary:
        "Begin with the operating model — users, permissions, tenant boundaries, operational workflows, and the data that must stay isolated — and lock those constraints before choosing schemas or writing a single endpoint.",
      paragraphs: [
        "A scalable application starts with a clear understanding of users, permissions, tenant boundaries, operational workflows, and the data that must remain isolated. I define those constraints before selecting schemas or creating endpoints.",
        "For multi-tenant products, the tenancy model affects authentication, database access, reporting, billing, background jobs, and observability. Treating it as a first-class architectural decision avoids expensive migrations later.",
      ],
    },
    {
      id: "explicit-backend",
      heading: "Keep the backend explicit",
      question: "How should a scalable MERN backend be structured?",
      summary:
        "Separate transport, validation, business logic, and persistence so each layer can evolve on its own. Keep REST resources predictable, return structured errors, and enforce authorization next to the business rule rather than in the route handler.",
      paragraphs: [
        "I separate transport, validation, business logic, and persistence so that individual parts can evolve without turning route handlers into the entire application. REST resources stay predictable, errors are structured, and authorization is enforced close to the business rule.",
        "MongoDB is useful for flexible product data, while MySQL and PostgreSQL are strong choices for transactional and relational workloads. The correct database is the one that matches the consistency, query, and operational requirements of the product.",
      ],
    },
    {
      id: "production-day-one",
      heading: "Design for production from day one",
      question: "What makes a MERN application production-ready?",
      summary:
        "Treat deployments, configuration, logs, metrics, backups, and incident visibility as part of product engineering. CI/CD and repeatable infrastructure cut manual risk, while Grafana and Prometheus make system behaviour visible before users report a problem.",
      paragraphs: [
        "Deployments, environment configuration, logs, metrics, backups, and incident visibility are part of product engineering. CI/CD and repeatable infrastructure reduce manual risk, while Grafana and Prometheus make system behaviour visible before users report a problem.",
      ],
    },
  ],
  "production-apis-cloud-infrastructure": [
    {
      id: "reliability-is-a-feature",
      heading: "Reliability is an application feature",
      question: "What does it take to run reliable production APIs?",
      summary:
        "Reliable APIs need more than correct responses: controlled timeouts, useful errors, authentication boundaries, rate controls, idempotent operations where appropriate, and metrics that reveal latency, throughput, saturation, and failure rates.",
      paragraphs: [
        "Production APIs need more than correct responses. They need controlled timeouts, useful errors, authentication boundaries, rate controls, idempotent operations where appropriate, and metrics that reveal latency, throughput, saturation, and failure rates.",
      ],
    },
    {
      id: "automate-operations",
      heading: "Automate repeatable operations",
      question: "How do you automate cloud infrastructure operations?",
      summary:
        "Replace manual server configuration with scripted, auditable provisioning — Node.js and Bash workflows for VPN infrastructure, GitHub Actions for build, validate, and deploy — so any process run more than once becomes predictable.",
      paragraphs: [
        "For VPN infrastructure, scripted Node.js and Bash workflows replaced manual server configuration with repeatable provisioning. The same principle applies to application deployment: if a process is performed more than once, it should be made predictable and auditable.",
        "CI/CD through GitHub Actions can build, validate, and deploy consistently. Container and process metrics then provide feedback about whether the release is healthy in its real environment.",
      ],
    },
    {
      id: "observe-the-whole-path",
      heading: "Observe the whole path",
      question: "What should a production observability stack cover?",
      summary:
        "Connect host health, containers, application processes, Redis, Kafka, and user-facing API behaviour in one stack. Dashboards are only the start; actionable alerting rules and clear incident ownership turn metrics into operational reliability.",
      paragraphs: [
        "A useful observability stack connects host health, containers, application processes, Redis, Kafka, and user-facing API behaviour. Dashboards are only the beginning; actionable alerting rules and clear incident ownership turn metrics into operational reliability.",
      ],
    },
  ],
  "designing-flexible-saas-backends": [
    {
      id: "explicit-tenancy",
      heading: "Make tenancy and permissions explicit",
      question: "How do you keep a multi-tenant SaaS backend secure?",
      summary:
        "Carry a verified tenant context on every request, enforce it on every data-access path, and model roles and permissions around real business responsibilities instead of scattering one-off checks through the code.",
      paragraphs: [
        "SaaS flexibility should not weaken isolation. Each request must carry a verified tenant context, and every data access path must respect it. Roles and permissions should represent real business responsibilities instead of being scattered as one-off checks.",
      ],
    },
    {
      id: "model-workflows",
      heading: "Model workflows, not screens",
      question: "How should SaaS backends be modelled for flexibility?",
      summary:
        "Model the backend patterns that different products share — state transitions, audit history, notifications, inventory or capacity constraints, payments, and real-time updates — rather than the screens, so the system stays maintainable when the UI changes.",
      paragraphs: [
        "Restaurant, pharmacy, hotel, and marketplace products have different interfaces, but their backends share important patterns: state transitions, audit history, notifications, inventory or capacity constraints, payments, and real-time updates. Modelling these workflows directly keeps the system maintainable when the UI changes.",
      ],
    },
    {
      id: "integration-boundaries",
      heading: "Integrations need boundaries",
      question: "How should third-party integrations be handled in a SaaS backend?",
      summary:
        "Put payment gateways, messaging providers, and AI services behind application-owned interfaces. That boundary centralises error handling and webhook verification, protects the core domain from provider-specific details, and keeps future migrations possible.",
      paragraphs: [
        "Payment gateways, messaging providers, and AI services should sit behind application-owned interfaces. That boundary centralizes error handling and webhook verification, protects the core domain from provider-specific details, and makes future migrations possible.",
      ],
    },
  ],

  // TODO(content): the four articles below are owner-review drafts. Facts are drawn
  // from documented experience (eEagle VPN, Bite.md/Ajar payments, the Socket.io
  // messaging platform, the eEagle VPN Chrome Extension). Edit voice/details freely.
  "wireguard-vpn-fleet-operations": [
    {
      id: "provisioning",
      heading: "Automate provisioning end to end",
      question: "How do you provision a large WireGuard VPN fleet?",
      summary:
        "Treat every server as disposable and script the whole path: order the machine, harden the base image, install and key WireGuard, register the node with the control API, and add it to monitoring — with no manual SSH steps in between.",
      paragraphs: [
        "For eEagle VPN the fleet runs 45+ WireGuard servers across 20+ regions, and it only stays manageable because provisioning is fully scripted. A Node.js and Bash pipeline drives a remote script-based deployment: it prepares the base image, installs WireGuard, generates and distributes keys, opens the right firewall rules, and registers the node with the backend so it can start receiving client allocations.",
        "The rule I hold to is that no server is special. If a machine misbehaves, the fastest fix is to drain it, destroy it, and let the pipeline build a replacement. That is only safe when provisioning is deterministic and the control plane — not the individual host — owns the source of truth for which servers exist and what they are allowed to serve.",
      ],
    },
    {
      id: "config-rollout",
      heading: "Roll configuration out safely",
      question: "How do you roll out configuration changes across many VPN servers?",
      summary:
        "Version the desired peer and interface configuration centrally, push it in waves, verify handshake and throughput on each wave before continuing, and keep the previous config one command away for rollback.",
      paragraphs: [
        "Configuration changes — new peers, MTU tuning, kernel or firewall updates — are applied in batches rather than all at once. Each wave is checked for successful WireGuard handshakes and expected throughput before the next wave starts, so a bad change is caught on a handful of servers instead of the whole fleet.",
        "Server allocation and lifecycle management live in the backend API and the Super Admin Dashboard, which means an operator can cordon a region, retire a server, or shift load without touching a config file by hand. Every action is auditable, which matters when you are debugging why a subset of users in one region saw degraded connectivity.",
      ],
    },
    {
      id: "observability",
      heading: "Watch the fleet, not just the hosts",
      question: "What should you monitor on a production VPN fleet?",
      summary:
        "Combine host metrics with WireGuard-specific and user-facing signals: handshake success, per-peer transfer, active sessions, regional capacity, and error rates — then alert on the symptoms users feel, not just CPU.",
      paragraphs: [
        "Observability is built on Grafana and Prometheus, with Kafka, Docker, Node, and Redis exporters feeding dashboards for fleet health, uptime, and performance. Host-level CPU and network are necessary but not sufficient; the signals that predict user pain are handshake failures, sudden drops in active sessions, and regional capacity approaching its limit.",
        "Alerting rules target those symptoms and route to clear incident ownership. The goal is to see a region saturating or a server silently dropping peers before support tickets arrive, and to have the provisioning pipeline ready to add capacity as the response.",
      ],
    },
  ],
  "payment-gateway-abstraction-stripe-maib": [
    {
      id: "own-the-interface",
      heading: "Own the payment interface",
      question: "How do you integrate multiple payment providers without coupling your domain?",
      summary:
        "Define a small internal payments interface — create charge, capture, refund, handle webhook — and implement it once per provider. The rest of the application talks only to that interface, never to Stripe or MAIB directly.",
      paragraphs: [
        "Across projects like Ajar (Stripe) and Bite.md (MAIB), the pattern that held up was an application-owned payments module. It exposes a handful of operations the domain actually needs and hides every provider-specific detail — API shapes, error codes, signature schemes — behind an adapter.",
        "This keeps provider SDKs out of business logic, makes it possible to add or swap a gateway without touching order or subscription code, and gives you one place to enforce logging, retries, and reconciliation.",
      ],
    },
    {
      id: "webhooks-and-idempotency",
      heading: "Treat webhooks as the source of truth",
      question: "How should payment webhooks and idempotency be handled?",
      summary:
        "Verify every webhook signature, make handlers idempotent by keying on the provider event ID, and treat the webhook — not the client redirect — as the authoritative signal that a payment succeeded.",
      paragraphs: [
        "Clients drop connections, close tabs, and double-submit. The redirect back from a checkout page is a hint, not a fact. The payment is only real when the verified webhook says so, so order fulfilment and subscription state are driven from webhook handlers.",
        "Every handler records the provider event ID before doing work and ignores IDs it has already processed. That makes redelivery safe, which both Stripe and MAIB will do, and it prevents a retried webhook from charging twice or granting access twice.",
      ],
    },
    {
      id: "reconciliation",
      heading: "Reconcile instead of trusting",
      question: "Why do you need payment reconciliation?",
      summary:
        "Periodically compare your records against the provider's list of charges and refunds. Reconciliation catches missed webhooks, partial failures, and disputes that would otherwise silently desync your billing state.",
      paragraphs: [
        "Even with verified webhooks, events get missed — an outage, a deploy at the wrong moment, a handler bug. A scheduled job that pulls the provider's recent transactions and diffs them against local records surfaces those gaps quickly.",
        "The same job is where refunds, chargebacks, and currency or fee adjustments get folded back into reporting, so finance numbers match the gateway dashboard rather than drifting from it over time.",
      ],
    },
  ],
  "realtime-messaging-socketio-scale": [
    {
      id: "rooms-and-identity",
      heading: "Model rooms around real entities",
      question: "How should you structure rooms in a Socket.io messaging system?",
      summary:
        "Map rooms to durable domain entities — a conversation, an order, a support thread — not to transient UI state. Authenticate the socket on connection and authorise every join against the same rules as your HTTP API.",
      paragraphs: [
        "In the messaging platform I built at ItecExperts, each conversation was a room whose membership came from the database, not from whatever the client asked to join. The socket handshake carried the same auth token as the REST API, and room joins were checked against conversation membership server-side.",
        "Keeping room identity tied to persistent entities means reconnects, multiple devices, and server restarts all resolve to the same place, and it keeps authorisation logic in one shared layer instead of being reimplemented for the socket path.",
      ],
    },
    {
      id: "delivery-guarantees",
      heading: "Persist first, then broadcast",
      question: "How do you make real-time message delivery reliable?",
      summary:
        "Write the message to the database before emitting it, assign it a server-side ID and timestamp, and let clients fetch anything they missed by ID range on reconnect. The socket is a fast path, not the system of record.",
      paragraphs: [
        "Every message — including file transfers, forwards, and reactions — was persisted with a server-assigned ID before it was broadcast to the room. Clients treat the socket stream as an optimisation and fall back to a REST history call keyed on the last ID they saw whenever they reconnect.",
        "That ordering makes delivery robust against dropped sockets and brief server outages: nothing that was accepted is lost, and duplicates are easy to collapse on the client because IDs are monotonic per conversation.",
      ],
    },
    {
      id: "backpressure",
      heading: "Plan for backpressure and fan-out",
      question: "How do you handle backpressure in a Socket.io application?",
      summary:
        "Cap per-connection send queues, batch high-frequency events like typing and reactions, and use a Redis adapter so broadcasts fan out across instances instead of pinning everyone to one process.",
      paragraphs: [
        "Large rooms and chatty events — typing indicators, read receipts, reactions — can overwhelm a single Node process. Batching those events, dropping stale ones, and bounding each client's outbound buffer keeps one slow consumer from degrading the room.",
        "Horizontal scaling uses the Redis adapter so any instance can accept a connection and still deliver to the whole room. MySQL and MongoDB models were tuned for the two dominant access patterns: appending to a conversation and loading a bounded window of recent history.",
      ],
    },
  ],
  "browser-extension-backend-eeagle": [
    {
      id: "why-an-extension",
      heading: "Decide what the extension actually owns",
      question: "What does a browser extension add on top of an existing backend?",
      summary:
        "The eEagle VPN Chrome Extension extends the platform's existing backend connectivity to browser-level access. The extension owns UI, connection state, and the proxy configuration; the backend still owns auth, server allocation, and lifecycle.",
      paragraphs: [
        "The extension is a thin client over the same APIs the mobile apps use. It authenticates the user, asks the backend which server to use, and applies browser proxy settings — it does not reimplement account logic or server management.",
        "Being explicit about that boundary kept the extension small and made it safe to ship alongside the existing platform rather than as a fork of it.",
      ],
    },
    {
      id: "manifest-v3",
      heading: "Work with Manifest V3 constraints",
      question: "How do you handle authentication and state in a Manifest V3 extension?",
      summary:
        "Service workers are ephemeral, so persist tokens and connection state in extension storage, restore them on wake, and treat every backend call as something that may run after the worker restarted.",
      paragraphs: [
        "Manifest V3 replaced long-lived background pages with service workers that the browser can stop at any time. Auth tokens and the current connection state live in chrome.storage, and the worker rehydrates from there whenever it spins back up.",
        "Network calls to the backend are written to tolerate a cold start: refresh the token if needed, re-read the selected server, and reconcile the proxy configuration with what the backend currently expects.",
      ],
    },
    {
      id: "connection-state",
      heading: "Make connection state observable to the user",
      question: "How should a VPN extension communicate connection state?",
      summary:
        "Surface a single, honest status — connected, connecting, disconnected, error — driven by real checks against the proxy and backend, and update the toolbar icon so the state is visible without opening the popup.",
      paragraphs: [
        "Users need to trust that the extension is actually routing traffic. The popup shows one clear status derived from the applied proxy settings and a lightweight backend check, and the toolbar icon reflects the same state.",
        "Errors are specific rather than generic: an expired session, an unreachable server, or a proxy permission problem each lead to a different message and a different recovery action, which cuts down on support load.",
      ],
    },
  ],
};

/** Authoritative external sources referenced by each article (GEO trust signal). */
const articleReferences: Record<string, { label: string; url: string }[]> = {
  "scalable-mern-stack-applications": [
    { label: "Node.js — Guides", url: "https://nodejs.org/en/learn" },
    { label: "Express — Routing", url: "https://expressjs.com/en/guide/routing.html" },
    { label: "MongoDB — Data modeling", url: "https://www.mongodb.com/docs/manual/data-modeling/" },
    { label: "PostgreSQL — Documentation", url: "https://www.postgresql.org/docs/" },
    { label: "The Twelve-Factor App", url: "https://12factor.net/" },
    { label: "Prometheus — Overview", url: "https://prometheus.io/docs/introduction/overview/" },
  ],
  "production-apis-cloud-infrastructure": [
    { label: "Google SRE Book — Handling Overload", url: "https://sre.google/sre-book/handling-overload/" },
    { label: "Stripe — Idempotent requests", url: "https://docs.stripe.com/api/idempotent_requests" },
    { label: "GitHub Actions — Documentation", url: "https://docs.github.com/en/actions" },
    { label: "WireGuard — Quick Start", url: "https://www.wireguard.com/quickstart/" },
    { label: "Grafana — Documentation", url: "https://grafana.com/docs/grafana/latest/" },
    { label: "Prometheus — Alerting rules", url: "https://prometheus.io/docs/prometheus/latest/configuration/alerting_rules/" },
  ],
  "designing-flexible-saas-backends": [
    { label: "OWASP — Authorization Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html" },
    { label: "Azure Architecture — Multitenancy", url: "https://learn.microsoft.com/en-us/azure/architecture/guide/multitenant/overview" },
    { label: "Stripe — Best practices for webhooks", url: "https://docs.stripe.com/webhooks" },
    { label: "OpenAI — API reference", url: "https://platform.openai.com/docs/api-reference" },
    { label: "microservices.io — Saga pattern", url: "https://microservices.io/patterns/data/saga.html" },
  ],
  "wireguard-vpn-fleet-operations": [
    { label: "WireGuard — Quick Start", url: "https://www.wireguard.com/quickstart/" },
    { label: "WireGuard — Cryptokey Routing", url: "https://www.wireguard.com/#cryptokey-routing" },
    { label: "Prometheus — Alerting rules", url: "https://prometheus.io/docs/prometheus/latest/configuration/alerting_rules/" },
    { label: "Grafana — Documentation", url: "https://grafana.com/docs/grafana/latest/" },
    { label: "Google SRE Book — Handling Overload", url: "https://sre.google/sre-book/handling-overload/" },
  ],
  "payment-gateway-abstraction-stripe-maib": [
    { label: "Stripe — Webhooks", url: "https://docs.stripe.com/webhooks" },
    { label: "Stripe — Idempotent requests", url: "https://docs.stripe.com/api/idempotent_requests" },
    { label: "Stripe — Reconciliation", url: "https://docs.stripe.com/reports/reconciliation" },
    { label: "PCI Security Standards Council", url: "https://www.pcisecuritystandards.org/" },
  ],
  "realtime-messaging-socketio-scale": [
    { label: "Socket.IO — Rooms", url: "https://socket.io/docs/v4/rooms/" },
    { label: "Socket.IO — Redis adapter", url: "https://socket.io/docs/v4/redis-adapter/" },
    { label: "Socket.IO — Delivery guarantees", url: "https://socket.io/docs/v4/delivery-guarantees/" },
    { label: "MDN — WebSocket API", url: "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API" },
  ],
  "browser-extension-backend-eeagle": [
    { label: "Chrome — Migrate to Manifest V3", url: "https://developer.chrome.com/docs/extensions/develop/migrate/what-is-mv3" },
    { label: "Chrome — Extension service worker lifecycle", url: "https://developer.chrome.com/docs/extensions/develop/concepts/service-workers/lifecycle" },
    { label: "Chrome — chrome.storage", url: "https://developer.chrome.com/docs/extensions/reference/api/storage" },
    { label: "Chrome — chrome.proxy", url: "https://developer.chrome.com/docs/extensions/reference/api/proxy" },
  ],
};

const SITE_URL = "https://aasimshah.com";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) return {};
  const url = `${SITE_URL}/blogs/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: ["Syed Aasim Shah"],
      section: post.category,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  const sections = articleContent[slug];
  if (!post || !sections) notFound();

  const url = `${SITE_URL}/blogs/${post.slug}`;
  const relatedPosts = blogPosts.filter((item) => item.slug !== post.slug);
  const references = articleReferences[slug] ?? [];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#person` },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    image: `${SITE_URL}/opengraph-image`,
    articleSection: post.category,
    keywords: [post.category, "MERN stack", "backend engineering", "SaaS", "cloud infrastructure"],
    inLanguage: "en",
    citation: references.map((ref) => ({
      "@type": "CreativeWork",
      name: ref.label,
      url: ref.url,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blogs` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <div className="flex flex-col flex-1 gap-0 h-min overflow-hidden p-0 relative w-full items-center justify-start">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="flex flex-col gap-8 w-full max-w-full px-5 lg:px-0 lg:max-w-[750px] lg:w-[80%] p-[80px_0px]">
        <nav aria-label="Breadcrumb" className="text-[13px] text-light-gray-2">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-light-gray-4">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/blogs" className="hover:text-light-gray-4">Blog</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-light-gray-4">{post.category}</li>
          </ol>
        </nav>

        <header className="rounded-xl border border-dark-gray-3 bg-very-dark-gray p-6">
          <div className="flex flex-wrap gap-3 text-[14px] text-light-gray-2">
            <span>{post.category}</span><span>·</span>
            <time dateTime={post.date}>{post.publishedAt}</time><span>·</span>
            <span>{post.readTime}</span>
          </div>
          <h1 className="mt-5 text-[32px] font-bold leading-[1.15] text-white sm:text-[40px]">{post.title}</h1>
          <p className="mt-5 text-[17px] leading-[1.7] text-light-gray-2">{post.excerpt}</p>
          <p className="mt-4 text-[14px] text-light-gray-2">
            By{" "}
            <Link href="/about" className="font-semibold text-light-gray-4 hover:underline">
              Syed Aasim Shah
            </Link>
          </p>
        </header>

        <nav aria-label="On this page" className="rounded-xl border border-dark-gray-3 bg-very-dark-gray p-6">
          <p className="font-IBM_Plex_Mono text-[9px] uppercase tracking-[0.18em] text-light-gray-1">
            On this page
          </p>
          <ul className="mt-4 flex flex-col gap-2 text-[15px] text-light-gray-2">
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="hover:text-light-gray-4">{section.question}</a>
              </li>
            ))}
          </ul>
        </nav>

        {sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-24 rounded-xl border border-dark-gray-3 bg-very-dark-gray p-6">
            <p className="font-IBM_Plex_Mono text-[9px] uppercase tracking-[0.16em] text-light-gray-1">
              {section.heading}
            </p>
            <h2 className="mt-3 text-[24px] font-bold text-white">{section.question}</h2>
            <p className="mt-4 text-[16px] font-medium leading-[1.8] text-light-gray-4">{section.summary}</p>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-4 text-[16px] leading-[1.8] text-light-gray-2">{paragraph}</p>
            ))}
          </section>
        ))}

        {references.length ? (
          <section className="rounded-xl border border-dark-gray-3 bg-very-dark-gray p-6">
            <h2 className="text-[20px] font-bold text-white">References</h2>
            <ul className="mt-4 flex flex-col gap-2 text-[15px] text-light-gray-2">
              {references.map((ref) => (
                <li key={ref.url}>
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-light-gray-4 hover:underline"
                  >
                    {ref.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="rounded-xl border border-dark-gray-3 bg-very-dark-gray p-6">
          <h2 className="text-[20px] font-bold text-white">Related reading</h2>
          <ul className="mt-4 flex flex-col gap-3 text-[15px] text-light-gray-2">
            {relatedPosts.map((item) => (
              <li key={item.slug}>
                <Link href={`/blogs/${item.slug}`} className="font-semibold text-light-gray-4 hover:underline">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[15px] leading-[1.7] text-light-gray-2">
            Need this built?{" "}
            <Link href="/services" className="font-semibold text-light-gray-4 hover:underline">See services</Link>{" "}
            or{" "}
            <Link href="/contact" className="font-semibold text-light-gray-4 hover:underline">start a project</Link>.
          </p>
        </section>

        <Link href="/blogs" className="text-[14px] font-semibold text-light-gray-2 hover:text-light-gray-4">← Back to all posts</Link>
      </article>
    </div>
  );
}
