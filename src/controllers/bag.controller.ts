import { NextFunction, Response, Request } from "express";
import { v4 as uuidv4 } from "uuid";
import { Basket } from "../model";

class BagController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      // console.log(req.body);
      const id = uuidv4();
      await Basket.create({ id, value: req.body.value });
      return res.json({ success: true, id });
    } catch (e) {
      next(e);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const bag = await Basket.findOne({ where: { id: req.params.id } });
      return res.json({ success: true, bag });
    } catch (e) {
      next(e);
    }
  }
}
export default new BagController();
