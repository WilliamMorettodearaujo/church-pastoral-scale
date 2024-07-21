import jwt from "jsonwebtoken";

export class GenerateTokenLoginProvider {
  private loginSecret = process.env.SECRETLOGIN;

  public execute(id: number, roleId: number, churchId: number) {
    const token = jwt.sign(
      { id, roleId: roleId, churchId: churchId },
      this.loginSecret,
      {
        expiresIn: "24h",
      }
    );
    return token;
  }
}
