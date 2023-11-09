import { User } from "../interfaces/user.interface";
import { userModel } from "../models/user.model";
import { Op } from "sequelize";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyModel } from "../models/token.model";
const ACCESS_TIME = 1800; // 30m
const REFRESH_TIME = 864000; // 10 day


const loginService = async (data: any) => {
    const { id, password } = data;
    console.log();
    const user: User | null = await userModel.findOne({ where: { uid: id } });
    if (!user) {
        return {statusCode:201}; // user không tồn tại
    }
    const checkPass = bcrypt.compareSync(password, user.password);
    if (!checkPass) {
        return {statusCode:202}; // sai mật khẩu
    }

    if (user.status === false) {
        return {statusCode:203}; // chưa xác nhận tài khoản
    }
    const accessToken = await getToken(user.uid,  "accessToken");
    const refreshToken = await getToken(user.uid, "refreshToken");

    await userModel.update({ token: refreshToken }, { where: { uid: id } });
    console.log("accessToken", accessToken);
    console.log("user", user);
    console.log("pass", password);
    return {statusCode:200,accessToken:accessToken,refreshToken:refreshToken};
}

const registerService = async (newUser: User) => {
    const checkUser = await userModel.findOne(
        { where: { [Op.or]: [{ email: newUser.email }, { uid: newUser.uid }] } }
    );

    if (checkUser && checkUser.status === false) {
        // xoas user da ton tai nhuwng chuwa xacs nhaanj quas laau
        // if (checkUser && checkUser.status === false) {
        //     await userModel.destroy({ where: { [Op.or]: [{ email: newUser.email }, { id: newUser.email }] } });
        // }
        return 202;// user đã tồn tại nhưng chưa xác nhận
    }
    if (checkUser && checkUser.status === true) {
        return 201;// user đã tồn tại
    }
    newUser.password = bcrypt.hashSync(newUser.password, bcrypt.genSaltSync(8));
    newUser.status = false;
    newUser.token = "";
    newUser.uid = newUser.uid;
    const check = await userModel.create(newUser);
    console.log("check add data", check);




    return 200;
}

const changePasswordService = async (email: string, oldPass: string, newPass:string) => {
    const user: User | null = await userModel.findOne({ where: { email: email } });
    if (!user) {
        return 201; // user không tồn tại
    }
    const checkPass = bcrypt.compareSync(oldPass, user.password);
    if (!checkPass) {
        return 202; // sai mật khẩu
    }
    const newPassHash = bcrypt.hashSync(newPass, bcrypt.genSaltSync(8));
    await userModel.update({ password: newPassHash }, { where: { email: email } });
    
    return 200;
}
const forgotPasswordService = async (email: string) => {
    const user: User | null = await userModel.findOne({ where: { email: email } });
    if (!user) {
        return 201; // user không tồn tại
    }
    return 200;
}

const verifyAccountService = async (email: string, uniqueString: string) => {
    const user: User | null = await userModel.findOne({ where: { email: email } });

    if (!user) {
        return 201; // user không tồn tại
    }
    else {
        const check =  await verifyModel.findOne({ where: { email: email, uniqueString: uniqueString } });
        if (!check) {
            return 202; // sai uniqueString
        }
        else {
        await userModel.update({ status: true }, { where: { email: email } });
        return 200;
        }
    }
}


const getToken = (
    id: string,
    type: string
): string => {
    let key = process.env.JWT_SECRET || "nolan";
    const payload = {
        id: id,
    };
    if (type === "accessToken") {
        const accessToken = jwt.sign(payload, key, {
            expiresIn: ACCESS_TIME,
        });
        return accessToken;
    }
    const refreshToken = jwt.sign(payload, key, {
        expiresIn: REFRESH_TIME,
    });
    return refreshToken;
};

export {
    loginService,
    registerService,
    changePasswordService,
    forgotPasswordService,
    verifyAccountService,
    getToken


};