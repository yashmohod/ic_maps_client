
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendDevEmail(opts: {
  to: string;
  subject: string;
  html: string;
}) {
  return resend.emails.send({
    // Resend sandbox sender (no domain needed)
    from: "IC Maps <onboarding@resend.dev>",
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
  });
}

