import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PublicLayout, Section, SectionTitle } from "@/components/kisansetu/public-layout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact KISANSETU — Farmer Helpline & Support" },
      {
        name: "description",
        content: "Reach the KISANSETU support team for help with tokens, slots, weighing records or payments.",
      },
      { property: "og:title", content: "Contact KISANSETU" },
      { property: "og:description", content: "Helpline, email and office details for procurement support." },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  mobile: z.string().trim().regex(/^[0-9X+\s-]{8,15}$/, "Enter a valid mobile number"),
  message: z.string().trim().min(10, "Please describe your query").max(1000),
});

function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  return (
    <PublicLayout>
      <Section className="grid gap-10 lg:grid-cols-2">
        <div>
          <SectionTitle
            center={false}
            eyebrow="Contact"
            title="We are here to help"
            description="Farmer helpline available on all procurement days, 8:00 AM to 8:00 PM."
          />
          <ul className="mt-8 space-y-4 text-sm">
            <li className="card-soft flex items-center gap-4 p-5">
              <Phone className="size-5 text-accent" />
              <span>
                <span className="block font-semibold">Farmer helpline</span>
                1800-XXX-1024 (toll free)
              </span>
            </li>
            <li className="card-soft flex items-center gap-4 p-5">
              <Mail className="size-5 text-accent" />
              <span>
                <span className="block font-semibold">Email</span>
                support@kisansetu.in
              </span>
            </li>
            <li className="card-soft flex items-center gap-4 p-5">
              <MapPin className="size-5 text-accent" />
              <span>
                <span className="block font-semibold">Office</span>
                Krishi Bhavan, Sector 12, New Delhi
              </span>
            </li>
          </ul>
        </div>

        <form
          className="card-soft space-y-4 p-6 sm:p-8"
          onSubmit={(e) => {
            e.preventDefault();
            const form = new FormData(e.currentTarget);
            const result = schema.safeParse({
              name: String(form.get("name") ?? ""),
              mobile: String(form.get("mobile") ?? ""),
              message: String(form.get("message") ?? ""),
            });
            if (!result.success) {
              const next: Record<string, string> = {};
              for (const issue of result.error.issues) next[String(issue.path[0])] = issue.message;
              setErrors(next);
              return;
            }
            setErrors({});
            (e.target as HTMLFormElement).reset();
            toast.success("Message sent. Our team will call you back.");
          }}
        >
          <h3 className="font-display text-xl font-bold text-primary">Send us a message</h3>
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" name="name" maxLength={100} placeholder="Rajesh Kumar" />
            {errors.name ? <p className="text-xs text-destructive">{errors.name}</p> : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile number</Label>
            <Input id="mobile" name="mobile" maxLength={15} placeholder="9876543210" />
            {errors.mobile ? <p className="text-xs text-destructive">{errors.mobile}</p> : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Your query</Label>
            <Textarea id="message" name="message" rows={5} maxLength={1000} placeholder="Tell us how we can help" />
            {errors.message ? <p className="text-xs text-destructive">{errors.message}</p> : null}
          </div>
          <Button type="submit" size="lg" className="w-full">
            Submit
          </Button>
        </form>
      </Section>
    </PublicLayout>
  );
}
