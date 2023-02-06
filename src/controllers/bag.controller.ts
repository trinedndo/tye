import { NextFunction, Response, Request } from "express";
import { v4 as uuidv4 } from "uuid";
import { Basket, IBasket } from "../model";

class BagController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      // console.log(req.body);
      const id = uuidv4();
      const anw = await Basket.findOne({ where: { value: req.body.value } });
      // console.log(anw);
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
      // const bag = await Basket.findAll();
      // console.log(req.params);
      // console.log(req.params.id);
      const bag = await Basket.findOne({ where: { id: req.params.id } });
      // console.log(bag);
      if (!bag) return res.sendStatus(190);
      return res.json({ success: true, bag });
    } catch (e) {
      next(e);
    }
  }
}
export default new BagController();
