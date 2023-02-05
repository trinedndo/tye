import { NextFunction, Response, Request } from "express";
import authService from "../services/auth.service";

class AuthController {
  async sign(req: Request, res: Response, next: NextFunction) {
    try {
      const { login, password } = req.body;
      const j = await authService.verifyLoginPassword(login, password);
      if (j === 1) {
        res.cookie("httpToken", "EkVG34V42zv0hElV", {
          maxAge: 6 * 60 * 60 * 1000,
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });
        return res.json({ success: true, token: "rXlbhbyQREH6fJ2Y" });
      }
      return res.json({ success: false, err: j });
    } catch (e) {
      next(e);
    }
  }

  async verif(req: Request, res: Response, next: NextFunction) {
    if (req.cookies.httpToken !== "EkVG34V42zv0hElV") return res.sendStatus(401).json({ success: false });
    try {
      if (req.cookies.httpToken === "EkVG34V42zv0hElV") {
        res.cookie("httpToken", "EkVG34V42zv0hElV", {
          maxAge: 6 * 60 * 60 * 1000,
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });
        return res.json({ success: true });
      }
      return res.json({ success: false });
    } catch (e) {
      next(e);
    }
  }
}

export default new AuthController();
