import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Article = sequelize.define(
  "article",
  {
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { timestamps: true }
);
export default Article;
