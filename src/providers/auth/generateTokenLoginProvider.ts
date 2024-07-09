import jwt from "jsonwebtoken";
export class GenerateTokenLoginProvider {
  private loginSecret = process.env.SECRETLOGIN;

  public execute(id: number) {
    const token = jwt.sign({ id }, this.loginSecret, {
      expiresIn: "24h",
    });
    return token;
  }
}
