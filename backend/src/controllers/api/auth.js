import User from "../../models/user.js";
import { NotAuthorizeError,BadRequestError, NotFoundError } from "../../utils/errors.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../../utils/token.js";
import { log } from "../../utils/logger.js";
class AuthController {
  async register(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new BadRequestError("نام کاربری و رمز عبور اجباری میباشد");
    }
    let user;
    try {
      const hashedPassword = bcrypt.hashSync(password, 12);
      user = await User.create({ username, password: hashedPassword });
      return res.json({
        success: true,
        message: "کاربر با موفقیت ثبت نام کرد",
        status:201
      });
    } catch (error) {
      if (error?.original?.code === "ER_DUP_ENTRY") {
        return res.json({
          success: false,
          status:400,
          message: "کاربر قبلا ثبت نام کرده است",
        });
        // throw new BadRequestError("کاربر قبلا ثبت نام کرده است");
      } else {
        throw error;
      }
    }
  }
  async login(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new BadRequestError("نام کاربری و رمز عبور اجباری میباشد");
    }
    const user = await User.scope("withPassword").findOne({
      where: { username },
    });
    if (!user) {
      throw new BadRequestError("نام کاربری یا کلمه عبور صحیح نمیباشد");
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestError("نام کاربری یا کلمه عبور صحیح نمیباشد");
    }
    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    user.setDataValue("password", undefined);

    log({message:"user:login",metadata:{id:user.id,role:user.role}})

    res.status(200).json({
      user:{...user.dataValues},
      accessToken,
      refreshToken,
      message:"کاربر با موفقیت وارد شد"
    });
  }
  async user(req, res) {
    return res.json({
      success: true,
      user: req.user,
    });
  }
  async getAccessToken(req, res,next) {
    const { refreshToken } = req.body;
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async(error, payload) => {
      if (error) {
         next(new NotAuthorizeError(error));
      }else{
        const user = await User.findByPk(payload.id);
        console.log(user);
        const accessToken = generateAccessToken(user)
        return res.status(200).json({success:true,accessToken})
      }
      
    });
  }
  async list(req, res) {
    const { page = 1, limit = 4 } = req.query;
    const { rows: users, count: totals } = await User.findAndCountAll({
      limit,
      order: [["id", "DESC"]],
      offset: (page - 1) * limit,
    });
    const pages = Math.ceil(totals / limit);

    return res.status(200).json({
      users,
      totals,
      page: Number(page),
      pages,
      limit,
      offset: (page - 1) * limit,
      success: true,
    });
  }
  async singleUser(req, res) {
    const {id} = req.params

    const user = await User.findByPk(id);
    if(!user){
      throw new NotFoundError('کاربر مورد نظر یافت نشد')
    }

    return res.status(200).json({
      user,
      success: true,
    });
  }
  async update(req, res, next) {
    const { id } = req.params;
    const { username } = req.body;
    const user = await User.findByPk(id);
    if (!user) {
      throw new NotFoundError("کاربر مورد نظر یافت نشد");
    }
    user.username = username;

    await user.save();

    return res.status(200).json({
      success: true,
      user,
      message: "کاربر با موفقیت ویرایش شد",
    });
  }
  async delete(req, res, next) {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      throw new NotFoundError("کاربر مورد نظر یافت نشد");
    }
    await User.destroy({
      where: {
        id,
      },
    });
    return res.status(200).json({
      success: true,
      message: "کاربر با موفقیت حذف شد",
    });
  }
}
export default new AuthController();
