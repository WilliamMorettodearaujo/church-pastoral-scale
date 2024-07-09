import jwt from "jsonwebtoken";
export class VerifyTokenResetPasswordProvider {
  private resetSecret = process.env.SECRETRESET;

  public execute(token: string): boolean {
    return jwt.verify(token, this.resetSecret) ? true : false;
  }
}
