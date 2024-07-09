import bcrypt from "bcrypt";
export class EncriptPasswordProvider {
  public execute(password: string) {
    const pass = password;
    const saltRounds = 10;
    const hash = bcrypt.hashSync(pass, saltRounds);
    return hash;
  }
}
