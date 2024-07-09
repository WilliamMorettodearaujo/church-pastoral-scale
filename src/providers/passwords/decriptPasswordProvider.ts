import bcrypt from "bcrypt";
export class DecriptPasswordProvider {
  public async handle(passwordBody: string, passwordUser: string) {
    if (await bcrypt.compare(passwordBody, passwordUser)) {
      return true;
    }
  }
}
