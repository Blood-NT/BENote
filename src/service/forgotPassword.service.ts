import bcrypt from "bcryptjs";
import { forgotPasswordModel } from "../models/forgotPassword.model";
import { forgotPassword } from "../interfaces/forgotPassword.interface";

const createVerifyPasswordService = async (newVerify: forgotPassword) => {
  newVerify.createAt = new Date();
  newVerify.effectiveSeconds = 600;
  newVerify.password = bcrypt.hashSync(newVerify.password,bcrypt.genSaltSync(8));
  await forgotPasswordModel.create(newVerify);
  return { statusCode: "200", message: "tạo xác minh thành công" };
};

const getVerifyPasswordService = async (email: string, uniqueString: string) => {
  const foundVerify: forgotPassword | null = await forgotPasswordModel.findOne({
    where: {
      email: email,
      uniqueString: uniqueString,
    },
  });
  return {
    statusCode: "200",
    message: "lấy xác minh thành công",
    data: foundVerify,
  };
};

const deleteVerifyPasswordService = async (email: string) => {
  await forgotPasswordModel.destroy({
    where: {
      email: email,
    },
  });
  return { statusCode: "200", message: "xóa xác minh thành công" };
};

export {
  createVerifyPasswordService,
  deleteVerifyPasswordService,
  getVerifyPasswordService,
};