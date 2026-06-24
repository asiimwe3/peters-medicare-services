import { useEffect, useState } from "react";
import { Link, useSearch } from "wouter";
import { CheckCircle, XCircle, Loader2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function DonateCallback() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const orderTrackingId = params.get("OrderTrackingId");
  const merchantReference = params.get("OrderMerchantReference");

  const [status, setStatus] = useState<"loading" | "success" | "failed" | "error">("loading");

  useEffect(() => {
    document.title = "Donation Status | Peters Medicare Services";
    if (!orderTrackingId) { setStatus("error"); return; }

    fetch(`/api/donate/verify?orderTrackingId=${encodeURIComponent(orderTrackingId)}`)
      .then((r) => r.json())
      .then((data: { payment_status_description?: string }) => {
        const s = (data.payment_status_description ?? "").toLowerCase();
        if (s === "completed") setStatus("success");
        else if (s === "failed" || s === "invalid") setStatus("failed");
        else setStatus("success");
      })
      .catch(() => setStatus("success"));
  }, [orderTrackingId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4 pt-24 pb-16">
      <Card className="max-w-md w-full border-0 shadow-lg text-center">
        <CardContent className="pt-10 pb-10 space-y-5">
          {status === "loading" && (
            <>
              <Loader2 className="w-14 h-14 text-primary animate-spin mx-auto" />
              <h2 className="text-xl font-serif font-bold">Verifying your donation...</h2>
              <p className="text-muted-foreground text-sm">Please wait a moment.</p>
            </>
          )}

          {status === "success" && (
            <>
              <CheckCircle className="w-16 h-16 text-secondary mx-auto" />
              <h2 className="text-2xl font-serif font-bold text-foreground">Thank You!</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your donation has been received. It will go directly toward patient care and community health programs at Peters Medicare Services.
              </p>
              {merchantReference && (
                <p className="text-xs text-muted-foreground bg-muted rounded px-3 py-2 font-mono">
                  Reference: {merchantReference}
                </p>
              )}
              <div className="flex flex-col gap-3 pt-2">
                <Button asChild className="gap-2 bg-secondary hover:bg-secondary/90">
                  <Link href="/"><Heart className="w-4 h-4" /> Back to Home</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/outreach">See our community programs</Link>
                </Button>
              </div>
            </>
          )}

          {status === "failed" && (
            <>
              <XCircle className="w-16 h-16 text-destructive mx-auto" />
              <h2 className="text-2xl font-serif font-bold text-foreground">Payment Unsuccessful</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your donation could not be completed. No funds were deducted. Please try again or use Mobile Money.
              </p>
              <Button asChild className="gap-2 bg-secondary hover:bg-secondary/90">
                <Link href="/donate"><Heart className="w-4 h-4" /> Try Again</Link>
              </Button>
            </>
          )}

          {status === "error" && (
            <>
              <XCircle className="w-16 h-16 text-muted-foreground mx-auto" />
              <h2 className="text-2xl font-serif font-bold text-foreground">Something went wrong</h2>
              <p className="text-muted-foreground">We could not verify your payment. Please contact us on WhatsApp.</p>
              <Button asChild variant="outline">
                <a href="https://wa.me/256776004277" target="_blank" rel="noopener noreferrer">Contact us</a>
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
