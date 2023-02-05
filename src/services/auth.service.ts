import crypto from "crypto";

class AuthService {
  async verifyLoginPassword(login: string, password: string) {
    const fc9 = "fc98a4f4d5d212418c2938ce11286e85";
    const a14 = "a14dbe401885797b43ce9d66e98968c3";
    const hash = crypto.createHash("md5").update(login).digest("hex");
    const hash2 = crypto.createHash("md5").update(password).digest("hex");

    if (hash === a14) {
      if (hash2 === fc9) return 1;
      else return 3;
    } else return 2;
  }
}

export default new AuthService();
