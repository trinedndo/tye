import { DataTypes, Model } from "sequelize";
import db from "../config/db.config";

interface IProductAttributes {
  id: string;
  title: string;
  img: string;
  type: string;
  brand: string;
  price: number;
  oldprice: number;
  instock: number;
}

interface IFilterAttributes {
  id: string;
  tag: string;
}

interface IBasket {
  id: string;
  value: string;
}

export class Product extends Model<IProductAttributes> {}
export class Type extends Model<IFilterAttributes> {}
export class Brand extends Model<IFilterAttributes> {}
export class Basket extends Model<IBasket> {}

Basket.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    tableName: "bags",
  },
);

Product.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    oldprice: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    instock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "products",
  },
);

Type.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "types",
  },
);

Brand.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "brands",
  },
);
