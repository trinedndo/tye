import { NextFunction, Response, Request } from "express";
import { v4 as uuidv4 } from "uuid";
import { Brand } from "../model";

class brandsController {
  async create(req: Request, res: Response, next: NextFunction) {
    if (req.cookies.httpToken !== "EkVG34V42zv0hElV") return res.sendStatus(401);
    try {
      let array = [];
      for (let i = 0; i < req.body.length; i++) {
        const tag = req.body[i];
        const id = uuidv4();
        await Brand.create({ tag, id });
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
      await Brand.update({ ...req.body }, { where: { id: req.body.id } });
      return res.json({ success: true });
    } catch (e) {
      next(e);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    if (req.cookies.httpToken !== "EkVG34V42zv0hElV") return res.sendStatus(401);
    try {
      await Brand.destroy({ where: { id: req.body.id } });
      return res.json({ success: true });
    } catch (e) {
      next(e);
    }
  }

  async CheckByTag(itag: string) {
    const len = await Brand.findOne({ where: { tag: itag } });
    if (len) {
      return len.dataValues.id;
    } else {
      const id = uuidv4();
      await Brand.create({ tag: itag, id });
      return id;
    }
  }

  async CheckById(nid: string) {
    const find = await Brand.findOne({ where: { id: nid } });
    if (find) return find.dataValues.id;
    else {
      const id = uuidv4();
      await Brand.create({ tag: nid, id });
      return id;
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      return res.json(await Brand.findAll());
    } catch (e) {
      next(e);
    }
  }
}

export default new brandsController();
