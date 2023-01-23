import { Router } from "express";

const msjRouter = new Router();

import { createTransport } from "nodemailer";
async function run({ subject, html, email }) {
  const transporter = createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "santiago55@ethereal.email",
      pass: "23RHg2YhjH9uhtQ9xA",
    },
  });

  const opts = {
    from: "santiago55@ethereal.email",
    to: email,
    subject,
    html,
  };
  try {
    return transporter.sendMail(opts);
  } catch (e) {
    throw Error(e);
  }
}
const params = process.argv;
const subject = params[2] || "Titulo";
const html = params[3] || "html";
const email = "vince50@ethereal.email";

const info = await run({ subject, html, email });