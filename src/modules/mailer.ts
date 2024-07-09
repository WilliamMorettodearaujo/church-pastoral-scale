import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";
import {
  from,
  host,
  pass,
  port,
  secure,
  service,
  user,
} from "../config/mail.json";

export const transport = nodemailer.createTransport({
  service,
  host,
  port,
  secure,
  auth: {
    user,
    pass,
  },
  from,
});

const handlebarsOptions: hbs.NodemailerExpressHandlebarsOptions = {
  viewEngine: {
    extname: ".hbs",
    layoutsDir: path.resolve("./src/resources/mail/"),
    defaultLayout: "",
  },
  viewPath: path.resolve("./src/resources/mail/"),
  extName: ".html",
};

transport.use("compile", hbs(handlebarsOptions));
