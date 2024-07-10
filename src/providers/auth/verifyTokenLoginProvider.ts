import jwt from "jsonwebtoken";
export class VerifyTokenLoginProvider {
  private loginSecret = process.env.SECRETLOGIN;

  public async handle(token: string) {
    try {
      if (await jwt.verify(token, this.loginSecret)) return true;
    } catch (err) {
      return false;
    }
  }
}
