  import jwt from "jsonwebtoken";
  export class VerifyTokenLoginProvider {
    private loginSecret = process.env.SECRETLOGIN || "463d7a219bffa9b716beba5d7434e50607738b30"

    public async handle(token: string) {
      try {
        if (await jwt.verify(token, this.loginSecret)) 
          return true;
      } catch (err) {
        return false;
      }
    }
  }
