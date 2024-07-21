import jwt from "jsonwebtoken";

export class GenerateTokenLoginProvider {
  private loginSecret = process.env.SECRETLOGIN;

  public execute(id: number, roleId: number) {
    const token = jwt.sign({ id, role_id: roleId }, this.loginSecret, {
      expiresIn: "24h",
    });
    return token;
  }
}
