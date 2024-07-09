import { readFileSync } from "fs";
import * as handlebars from "handlebars";
import { SendMailOptions } from "nodemailer";
import path from "path";

import { GenerateTokenResetPasswordProvider } from "../../providers/auth/generateTokenResetPasswordProvider";
import { IAuthenticationRepository } from "../../repositories/authentication/IauthenticationRepository";

import { ExceptionHandler } from "../../exceptions/ExceptionHandler";
import { transport } from "../../modules/mailer";
import { IUserRepository } from "../../repositories/users/IuserRepository";
import { ForgotPasswordOutputDTO } from "./dtos/forgotPasswordOutputDTO";
export class ForgotPasswordService {
  constructor(
    readonly forgotPasswordRepository: IAuthenticationRepository,
    readonly userRepository: IUserRepository
  ) {}

  public async execute(email: string): Promise<ForgotPasswordOutputDTO> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (!userAlreadyExists) {
      throw new ExceptionHandler("Error", "Email not found", 404);
    }

    if (userAlreadyExists) {
      const provider = new GenerateTokenResetPasswordProvider();
      const token = provider.execute(email);

      if (await this.forgotPasswordRepository.forgotPassword(email, token)) {
        const htmlTemplate = readFileSync(
          path.join(
            __dirname,
            "../../resources/mail/auth/forgot_password.html"
          ),
          "utf-8"
        );

        const compiledTemplate = handlebars.compile(htmlTemplate);

        const htmlContent = compiledTemplate({ token });

        const mailOptions: SendMailOptions = {
          to: email,
          subject: "Escala de Igreja - Verificar Email",
          html: htmlContent,
        };

        transport.sendMail(mailOptions, (err) => {
          if (err) {
            return {
              message: "Não foi possível enviar o e-mail",
            };
          }
        });

        return {
          message: "Enviado E-mail com sucesso",
        };
      } else {
        return {
          message: "Não foi possivel realizar a recuperação de senha: ",
        };
      }
    }
  }
}
