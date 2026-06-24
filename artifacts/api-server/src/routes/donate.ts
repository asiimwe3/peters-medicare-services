import { Router, type IRouter } from "express";

const router: IRouter = Router();

const PESAPAL_BASE =
  process.env["PESAPAL_ENV"] === "production"
    ? "https://pay.pesapal.com/v3"
    : "https://cybqa.pesapal.com/pesapalv3";

async function getPesapalToken(): Promise<string> {
  const res = await fetch(`${PESAPAL_BASE}/api/Auth/RequestToken`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      consumer_key: process.env["PESAPAL_CONSUMER_KEY"],
      consumer_secret: process.env["PESAPAL_CONSUMER_SECRET"],
    }),
  });
  if (!res.ok) throw new Error(`Pesapal auth failed: ${res.status}`);
  const data = (await res.json()) as { token: string };
  return data.token;
}

async function ensureIpnRegistered(token: string, ipnUrl: string): Promise<string> {
  const res = await fetch(`${PESAPAL_BASE}/api/URLSetup/RegisterIPN`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ url: ipnUrl, ipn_notification_type: "GET" }),
  });
  if (!res.ok) throw new Error(`IPN registration failed: ${res.status}`);
  const data = (await res.json()) as { ipn_id: string };
  return data.ipn_id;
}

router.post("/donate/initiate", async (req, res) => {
  const configured =
    process.env["PESAPAL_CONSUMER_KEY"] && process.env["PESAPAL_CONSUMER_SECRET"];

  if (!configured) {
    res.status(503).json({
      error: "payment_not_configured",
      message: "Pesapal credentials are not yet configured.",
    });
    return;
  }

  const { amount, currency = "UGX", name, email, phone, description, reference } =
    req.body as {
      amount: number;
      currency?: string;
      name: string;
      email: string;
      phone: string;
      description: string;
      reference: string;
    };

  if (!amount || !name || !phone || !reference) {
    res.status(400).json({ error: "missing_fields", message: "amount, name, phone and reference are required." });
    return;
  }

  try {
    const token = await getPesapalToken();

    const domains = process.env["REPLIT_DOMAINS"]?.split(",")[0] ?? "localhost";
    const baseUrl = `https://${domains}`;
    const ipnUrl = `${baseUrl}/api/donate/ipn`;
    const callbackUrl = `${baseUrl}/donate/callback`;

    const ipnId = await ensureIpnRegistered(token, ipnUrl);

    const orderRes = await fetch(`${PESAPAL_BASE}/api/Transactions/SubmitOrderRequest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: reference,
        currency,
        amount,
        description,
        callback_url: callbackUrl,
        notification_id: ipnId,
        billing_address: {
          email_address: email || undefined,
          phone_number: phone,
          first_name: name.split(" ")[0],
          last_name: name.split(" ").slice(1).join(" ") || undefined,
        },
      }),
    });

    if (!orderRes.ok) {
      const text = await orderRes.text();
      req.log.error({ status: orderRes.status, body: text }, "Pesapal order failed");
      res.status(502).json({ error: "pesapal_error", message: "Could not create payment order." });
      return;
    }

    const order = (await orderRes.json()) as { redirect_url: string; order_tracking_id: string };
    res.json({ redirect_url: order.redirect_url, order_tracking_id: order.order_tracking_id });
  } catch (err) {
    req.log.error({ err }, "Donate initiate error");
    res.status(500).json({ error: "server_error", message: "Unexpected error." });
  }
});

router.get("/donate/verify", async (req, res) => {
  const { orderTrackingId } = req.query as { orderTrackingId?: string };
  if (!orderTrackingId) {
    res.status(400).json({ error: "missing_id" });
    return;
  }

  const configured =
    process.env["PESAPAL_CONSUMER_KEY"] && process.env["PESAPAL_CONSUMER_SECRET"];
  if (!configured) {
    res.status(503).json({ error: "payment_not_configured" });
    return;
  }

  try {
    const token = await getPesapalToken();
    const statusRes = await fetch(
      `${PESAPAL_BASE}/api/Transactions/GetTransactionStatus?orderTrackingId=${orderTrackingId}`,
      {
        headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
      }
    );
    const data = await statusRes.json();
    res.json(data);
  } catch (err) {
    req.log.error({ err }, "Donate verify error");
    res.status(500).json({ error: "server_error" });
  }
});

router.get("/donate/ipn", async (req, res) => {
  req.log.info({ query: req.query }, "Pesapal IPN received");
  res.json({ status: "200", message: "IPN received" });
});

export default router;
