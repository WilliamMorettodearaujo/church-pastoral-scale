import jwt from "jsonwebtoken";
export class GenerateTokenResetPasswordProvider {
  private resetSecret = process.env.SECRETRESET;

  public execute(email: string): string {
    const token = jwt.sign({ email }, this.resetSecret, {
      expiresIn: "1h",
    });
    return token;
  }
}
