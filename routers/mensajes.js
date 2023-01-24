import { Router } from "express";

const msjRouter = new Router();

import { createTransport } from "nodcorreoer";
async function run({ subject, html, correo }) {
  const transporter = createTransport({
    host: "smtp.ethereal.correo",
    port: 587,
    auth: {
      user: "santiago55@ethereal.correo",
      pass: "23RHg2YhjH9uhtQ9xA",
    },
  });

  const opts = {
    from: "santiago55@ethereal.correo",
    to: correo,
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
const correo = "vince50@ethereal.correo";

const info = await run({ subject, html, correo });