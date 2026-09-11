import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { KeyRound, UserCog } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/kisansetu/brand";

export const Route = createFileRoute("/login/officer")({
  head: () => ({
    meta: [
      { title: "Procurement Officer Login — KISANSETU" },
      { name: "description", content: "Officer sign-in to manage farmer requests, weighing and verification." },
      { property: "og:title", content: "Officer Login — KISANSETU" },
      { property: "og:description", content: "Secure officer access to the procurement console." },
    ],
  }),
  component: OfficerLogin,
});

function OfficerLogin() {
  const navigate = useNavigate();
  const [officerId, setOfficerId] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-10 field-pattern">
      <div className="w-full max-w-md">
        <div className="mb-6 flex justify-center">
          <Logo size={48} />
        </div>
        <div className="card-soft p-6 sm:p-8">
          <h1 className="font-display text-2xl font-bold text-primary">Procurement Officer Login</h1>
          <p className="mt-1 text-sm text-muted-foreground">Use your official Officer ID to sign in.</p>

          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="officerId">Officer ID</Label>
              <div className="relative">
                <UserCog className="pointer-events-none absolute left-3 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="officerId"
                  className="h-12 pl-10 text-base"
                  placeholder="OFF-2041"
                  value={officerId}
                  onChange={(e) => setOfficerId(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <KeyRound className="pointer-events-none absolute left-3 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  className="h-12 pl-10 text-base"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <Button
              size="lg"
              className="h-12 w-full text-base"
              onClick={() => {
                if (!officerId || password.length < 4) {
                  toast.error("Enter your Officer ID and password.");
                  return;
                }
                toast.success("Signed in to procurement console.");
                navigate({ to: "/officer" });
              }}
            >
              Sign In
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="h-12 w-full text-base"
              onClick={() => {
                toast.success("Demo officer session started.");
                navigate({ to: "/officer" });
              }}
            >
              Continue as Demo Officer
            </Button>

            <Button asChild variant="ghost" size="lg" className="h-11 w-full">
              <Link to="/admin">Open Admin Dashboard</Link>
            </Button>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Farmer?{" "}
          <Link to="/login/farmer" className="font-semibold text-primary underline">
            Farmer login
          </Link>
        </p>
      </div>
    </div>
  );
}
