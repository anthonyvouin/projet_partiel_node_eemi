import { Resend } from "resend";

const resend = new Resend("re_PoBk2Fje_5k1XKpktEKqSE68MeBdJYJyk");

export async function sendEmail(req, res) {
  const { firstName, lastName, email, subject, message } = req.body;

  const htmlBody = `
    <p>Nouveau message de contact:</p>
    <ul>
      <li><strong>Prénom:</strong> ${firstName}</li>
      <li><strong>Nom:</strong> ${lastName}</li>
      <li><strong>Email:</strong> ${email}</li>
      <li><strong>Objet du mail:</strong> ${subject}</li>
    </ul>
    <p><strong>Message:</strong><br>${message}</p>
  `;

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "anthony.vouin@eemi.com",
      subject: "Nouveau message de contact",
      html: htmlBody,
    });

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

