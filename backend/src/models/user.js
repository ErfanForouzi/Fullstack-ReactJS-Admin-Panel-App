import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import Article from "./article.js";

const User = sequelize.define(
  "user",
  {
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "column",
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue:"USER"
    },
  },
  {
    timestamps: true,
    scopes: {
      withPassword: {
      },
    },
    defaultScope:{
      attributes:{
        exclude: ["password"],

      }
    }
  }
);

User.hasMany(Article);
Article.belongsTo(User);

export default User;
