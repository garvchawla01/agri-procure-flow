import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Smartphone, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/kisansetu/brand";

export const Route = createFileRoute("/login/farmer")({
  head: () => ({
    meta: [
      { title: "Farmer Login — KISANSETU" },
      { name: "description", content: "Log in with your mobile number and OTP to manage procurement requests." },
      { property: "og:title", content: "Farmer Login — KISANSETU" },
      { property: "og:description", content: "Mobile + OTP login for farmers." },
    ],
  }),
  component: FarmerLogin,
});

function FarmerLogin() {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-10 field-pattern">
      <div className="w-full max-w-md">
        <div className="mb-6 flex justify-center">
          <Logo size={48} />
        </div>
        <div className="card-soft p-6 sm:p-8">
          <h1 className="font-display text-2xl font-bold text-primary">Kisan Login</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Enter your registered mobile number to receive an OTP.
          </p>

          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile number</Label>
              <div className="relative">
                <Smartphone className="pointer-events-none absolute left-3 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="mobile"
                  inputMode="numeric"
                  maxLength={10}
                  className="h-12 pl-10 text-base"
                  placeholder="98XXXXXX21"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/[^0-9X]/gi, ""))}
                />
              </div>
            </div>

            {sent ? (
              <div className="space-y-2">
                <Label htmlFor="otp">OTP</Label>
                <Input
                  id="otp"
                  inputMode="numeric"
                  maxLength={6}
                  className="h-12 text-base tracking-[0.4em]"
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                />
                <p className="text-xs text-muted-foreground">Demo OTP: any 4–6 digits.</p>
              </div>
            ) : null}

            {sent ? (
              <Button
                size="lg"
                className="h-12 w-full text-base"
                onClick={() => {
                  if (otp.length < 4) {
                    toast.error("Please enter the OTP sent to your mobile.");
                    return;
                  }
                  toast.success("Logged in as Rajesh Kumar (KSN1024)");
                  navigate({ to: "/farmer" });
                }}
              >
                Verify &amp; Continue
              </Button>
            ) : (
              <Button
                size="lg"
                className="h-12 w-full text-base"
                onClick={() => {
                  if (mobile.length < 10) {
                    toast.error("Enter a 10 digit mobile number.");
                    return;
                  }
                  setSent(true);
                  toast.success("OTP sent to your mobile number.");
                }}
              >
                Send OTP
              </Button>
            )}

            <div className="relative py-2 text-center">
              <span className="relative z-10 bg-card px-3 text-xs uppercase tracking-widest text-muted-foreground">
                or
              </span>
              <span className="absolute left-0 top-1/2 h-px w-full bg-border" />
            </div>

            <Button
              variant="outline"
              size="lg"
              className="h-12 w-full text-base"
              onClick={() => {
                toast.success("Demo farmer session started.");
                navigate({ to: "/farmer" });
              }}
            >
              Continue as Demo Farmer
            </Button>
          </div>

          <p className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="size-4 text-accent" /> Your mobile number is used only for procurement
            updates.
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Procurement officer?{" "}
          <Link to="/login/officer" className="font-semibold text-primary underline">
            Officer login
          </Link>
        </p>
      </div>
    </div>
  );
}
