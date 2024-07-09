import bcrypt from "bcrypt";
export class DecriptPasswordProvider {
  public async execute(passwordBody: string, passwordUser: string) {
    if (await bcrypt.compare(passwordBody, passwordUser)) {
      return true;
    }
  }
}
