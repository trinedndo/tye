import { NextFunction, Response, Request } from "express";
import { UploadedFile } from "express-fileupload";
import { v4 as uuidv4 } from "uuid";
import { Product } from "../model";
import path from "path";
import typeController from "./type.controller";
import brandController from "./brand.controller";

interface IProductUpdate {
  id: string;
  title?: string;
  img?: string;
  type?: string;
  brand?: string;
  price?: number;
  oldprice?: number;
  instock?: number;
}

class productsController {
  async create(req: Request, res: Response, next: NextFunction) {
    if (req.body.token !== "rXlbhbyQREH6fJ2Y")
      // if (req.cookies.httpToken !== "EkVG34V42zv0hElV")
      return res.sendStatus(401);
    try {
      const id = uuidv4();

      let image = null;
      if (req.files) {
        image = req.files.img as UploadedFile;
      }
      const fileName = uuidv4() + ".jpg";
      if (!image) return res.send("upload image");
      if (image) image.mv(path.resolve(__dirname, "..", "..", "static", fileName));
      console.log(req.body.brand);

      const brand = await brandController.CheckByTag(req.body.brand);
      const type = await typeController.check(req.body.type);

      await Product.create({ ...req.body, id, img: fileName, brand, type });
      return res.json({ ...req.body, id, img: fileName, brand, type });
    } catch (e) {
      next(e);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    if (req.body.token !== "rXlbhbyQREH6fJ2Y")
      // if (req.cookies.httpToken !== "EkVG34V42zv0hElV")
      return res.sendStatus(401);
    try {
      let info: IProductUpdate = req.body;
      let isSN = false;

      const fileImg = req.files?.img as UploadedFile;
      let img = "";

      for (let [key, value] of Object.entries(info)) {
        if (key !== "id") {
          isSN = true;
          break;
        }
      }

      if (fileImg) {
        img = uuidv4() + ".jpg";
        fileImg.mv(path.resolve(__dirname, "..", "..", "static", img));
        info.img = img;
        isSN = true;
      }

      if (isSN) {
        await Product.update({ ...info }, { where: { id: info.id } });
        return res.json({ success: true, extra: "updated" });
      } else {
        return res.json({ success: true, extra: "nothing" });
      }
    } catch (e) {
      next(e);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    if (req.body.token !== "rXlbhbyQREH6fJ2Y")
      // if (req.cookies.httpToken !== "EkVG34V42zv0hElV")
      return res.sendStatus(401);
    try {
      await Product.destroy({ where: { id: req.body.id } });
      return res.json({ success: true });
    } catch (e) {
      next(e);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      return res.json(await Product.findAll());
    } catch (e) {
      next(e);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      return res.json(await Product.findOne({ where: { id: req.params.id } }));
    } catch (e) {
      next(e);
    }
  }
  // async bath(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const json = req.body;

  //     for (let i = 0; i < json.length; i++) {
  //       const { title, img, type, brand, price, instock } = json[i] as IProduct;
  //       const id = uuidv4();
  //       const brand2 = await brandController.CheckByTag(brand);
  //       const type2 = await typeController.check(type);
  //       await Product.create({ id, title, img, type: type2, brand: brand2, oldprice: 1, price, instock });
  //     }
  //     console.log(json);
  //     res.sendStatus(200);
  //   } catch (e) {
  //     next(e);
  //   }
  // }
}

export default new productsController();

interface IProduct {
  title: string;
  img: string;
  type: string;
  brand: string;
  price: number;
  instock: number;
}
