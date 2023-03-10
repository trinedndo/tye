import { NextFunction, Response, Request } from "express";
import { v4 as uuidv4 } from "uuid";
import { Basket, IBasket } from "../model";

class BagController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const id = uuidv4();
      const anw = await Basket.findOne({ where: { value: req.body.value } });
      if (anw) {
        return res.json({ success: true, id: anw.dataValues.id });
      }
      await Basket.create({ id, value: req.body.value });
      return res.json({ success: true, id });
    } catch (e) {
      next(e);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const bag = await Basket.findOne({ where: { id: req.params.id } });
      if (!bag) return res.sendStatus(404);
      return res.json({ success: true, bag });
    } catch (e) {
      next(e);
    }
  }
}
export default new BagController();
