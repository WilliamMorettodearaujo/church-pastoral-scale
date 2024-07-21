import jwt from "jsonwebtoken";
export class VerifyTokenLoginProvider {
  private loginSecret = process.env.SECRETLOGIN;

  public async handle(token: string) {
    try {
      return await jwt.verify(token, this.loginSecret);
    } catch (err) {
      return false;
    }
  }
}
