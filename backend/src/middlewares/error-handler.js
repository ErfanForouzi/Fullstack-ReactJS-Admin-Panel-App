import { JsonSchemaValidation } from "express-jsonschema";
import multer from "multer";
import { log } from "../utils/logger.js";

export default (error, req, res, next) => {
  console.log(error);
  const status = error.status || 500;
  let content,
    stack = "";

  log({
    level: "error",
    message: error?.message,
    metadata: { user: req.user, url: req.url, method: req.method },
  });

  if (error instanceof multer.MulterError && error.code === "LIMIT_FILE_SIZE") {
    return res
      .status(409)
      .json({ message: "سایز عکس شما باید کمتر از 3 مگابایت باشد" });
  }

  if (error instanceof JsonSchemaValidation) {
    const errors = [];

    for (const location in error.validations) {
      error.validations[location].forEach((e) => {
        errors.push({
          field: e.property.replace("instance.", ""), // نام فیلد
          message: e.messages.join(", "), // متن خطا
        });
      });
    }

    return res.status(400).json({
      title: `Error 400`,
      content: "Validation Error",
      errors,
    });
  }

  if (process.env.NODE_ENV === "development") {
    stack = error.stack;
    content = error.message;
  } else {
    content = status < 500 ? error.message : "Server Error";
  }

  if (req.url.startsWith("/api")) {
     return res.status(status).json({
      title: `Error ${status}`,
      content,
      stack,
      status:error.status,
      success: false,
    });
  } else {
    return res.status(status).render("error", {
      title: `Error ${status}`,
      content,
      stack,
    });
  }
};
