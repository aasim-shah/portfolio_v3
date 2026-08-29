import { getPaddleInstance } from "@/lib/paddle/server";
import { processPaddleWebhook } from "@/lib/paddle/process-webhook";
import { isPaddleWebhookSourceAllowed } from "@/lib/paddle/webhook-ip-allowlist";

export const runtime = "nodejs";

export async function POST(request: Request): Promise<Response> {
  try {
    if (!(await isPaddleWebhookSourceAllowed(request))) {
      return Response.json({ error: "Forbidden webhook source." }, { status: 403 });
    }
  } catch (error) {
    console.error("Unable to refresh the Paddle webhook IP allowlist.", error);
    return Response.json({ error: "Webhook unavailable." }, { status: 503 });
  }

  const signature = request.headers.get("paddle-signature");
  const rawBody = await request.text();
  const secret = process.env.PADDLE_NOTIFICATION_WEBHOOK_SECRET;

  if (!signature || !rawBody) {
    return Response.json(
      { error: "Missing Paddle signature or request body." },
      { status: 400 },
    );
  }

  if (!secret) {
    console.error("PADDLE_NOTIFICATION_WEBHOOK_SECRET is not configured.");
    return Response.json({ error: "Webhook unavailable." }, { status: 500 });
  }

  try {
    const event = await getPaddleInstance().webhooks.unmarshal(
      rawBody,
      secret,
      signature,
    );

    await processPaddleWebhook(event);
    return Response.json({ received: true });
  } catch (error) {
    console.error("Paddle webhook verification or processing failed.", error);
    return Response.json({ error: "Webhook processing failed." }, { status: 500 });
  }
}
