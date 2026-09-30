import { NextResponse } from "next/server";

interface ContactRequestBody {
  name: string;
  email: string;
  phone: string;
  business: string;
  message: string;
  botcheck?: string; // Honeypot field
}

export async function POST(req: Request) {
  try {
    const body: ContactRequestBody = await req.json();

    const { name, email, phone, business, message, botcheck } = body;

    // 1. Anti-spam honeypot check: If the hidden botcheck field is filled, silently discard or reject
    if (botcheck) {
      return NextResponse.json(
        { success: true, message: "Submission processed" },
        { status: 200 }
      );
    }

    // 2. Strict Server-Side Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please provide a valid name (at least 2 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string" || phone.trim().length < 6) {
      return NextResponse.json(
        { error: "Please provide a valid phone or WhatsApp number." },
        { status: 400 }
      );
    }

    if (!business || typeof business !== "string" || business.trim().length < 2) {
      return NextResponse.json(
        { error: "Please provide your business or brand name." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { error: "Please provide a message explaining your project goals (at least 5 characters)." },
        { status: 400 }
      );
    }

    // 3. Email Delivery Integration
    // Recipient: odishasocials@gmail.com
    const recipient = "odishasocials@gmail.com";
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      try {
        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "Odisha Socials Inquiries <onboarding@resend.dev>",
            to: [recipient],
            reply_to: email.trim(),
            subject: `New Lead: ${business.trim()} (${name.trim()})`,
            html: `
              <h2>New Inquiry from Odisha Socials Website</h2>
              <p><strong>Name:</strong> ${name.trim()}</p>
              <p><strong>Email:</strong> ${email.trim()}</p>
              <p><strong>Phone / WhatsApp:</strong> ${phone.trim()}</p>
              <p><strong>Business / Brand:</strong> ${business.trim()}</p>
              <hr />
              <p><strong>Project Message:</strong></p>
              <p style="white-space: pre-wrap;">${message.trim()}</p>
            `,
          }),
        });

        if (!resendRes.ok) {
          console.error("Resend API response status:", resendRes.status);
        }
      } catch (emailErr) {
        console.error("Error communicating with email service provider:", emailErr);
      }
    } else {
      // Development mode / fallback logging
      console.log("=== NEW INQUIRY FOR ODISHA SOCIALS ===");
      console.log(`To: ${recipient}`);
      console.log(`Name: ${name.trim()}`);
      console.log(`Email: ${email.trim()}`);
      console.log(`Phone: ${phone.trim()}`);
      console.log(`Business: ${business.trim()}`);
      console.log(`Message: ${message.trim()}`);
      console.log("======================================");
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your inquiry has been received. Our team will contact you shortly.",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Contact API Server Error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again or chat with us on WhatsApp." },
      { status: 500 }
    );
  }
}
