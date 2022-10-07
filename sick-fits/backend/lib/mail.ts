import { createTransport, getTestMessageUrl } from 'nodemailer';

const transport = createTransport({
  host: process.env.MAIL_HOST,
  post: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function makeANiceEmail(text: string): string {
  return `
    <div style="
        border: 1px solid black;
        padding: 20px;
        font-familt: sans-serif;
        line-height:2;
        font-size: 20px;
    ">
        <h2>Hello There!</h2>
        <p>${text}</p>
        <p>- Erin Foster</p>
    </div>
    `;
}

export async function sendPasswordResetEmail(
  resetToken: string,
  to: string
): Promise<void> {
  // email the user a token
  const info = await transport.sendMail({
    to,
    from: 'test@example.com',
    subject: 'Your Password Reset Token',
    html: makeANiceEmail(`Your Password Reset Token is here!
      
      <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">click here to reset</a>
      `),
  });
  if (process.env.MAIL_USER.includes('ethereal.email')) {
    console.log(`Mail Meaasge send preview it at ${getTestMessageUrl(info)}`);
  }
}
