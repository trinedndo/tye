import { NextFunction, Response, Request } from "express";
import { Type } from "../model";
import { v4 as uuidv4 } from "uuid";

class typesController {
  async create(req: Request, res: Response, next: NextFunction) {
    if (req.cookies.httpToken !== "EkVG34V42zv0hElV") return res.sendStatus(401);
    try {
      let array = [];
      for (let i = 0; i < req.body.length; i++) {
        const tag = req.body[i];
        const id = uuidv4();
        await Type.create({ tag, id });
        array.push({ tag, id });
      }
      return res.json(array);
    } catch (e) {
      next(e);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    if (req.cookies.httpToken !== "EkVG34V42zv0hElV") return res.sendStatus(401);
    try {
      await Type.update({ ...req.body }, { where: { id: req.body.id } });
      return res.json({ success: true });
    } catch (e) {
      next(e);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    if (req.cookies.httpToken !== "EkVG34V42zv0hElV") return res.sendStatus(401);
    try {
      await Type.destroy({ where: { id: req.body.id } });
      return res.json({ success: true });
    } catch (e) {
      next(e);
    }
  }

  async check(itag: string) {
    const len = await Type.findOne({ where: { tag: itag } });
    if (len) {
      return len.dataValues.id;
    } else {
      const id = uuidv4();
      await Type.create({ tag: itag, id });
      return id;
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      return res.json(await Type.findAll());
    } catch (e) {
      next(e);
    }
  }
}

export default new typesController();
