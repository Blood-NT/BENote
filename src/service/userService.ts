import { User } from "../interfaces/user.interface";
import { userModel } from "../models/user.model";
import { Op } from "sequelize";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyModel } from "../models/token.model";
const ACCESS_TIME = 1800; // 30m
const REFRESH_TIME = 864000; // 10 day


const loginService = async (data: any) => {
    console.log("kkk");
    const { id, password } = data;
    console.log();
    const user: User | null = await userModel.findOne({ where: { uid: id } });
    if (!user) {
        return { statusCode: 201 }; // user không tồn tại
    }
    const checkPass = bcrypt.compareSync(password, user.password);
    if (!checkPass) {
        return { statusCode: 202 }; // sai mật khẩu
    }
    if (user.status === false) {
        return { statusCode: 203 }; // chưa xác nhận tài khoản
    }
    const accessToken = await getToken(user.uid, "accessToken");
    const refreshToken = await getToken(user.uid, "refreshToken");

    await userModel.update({ token: refreshToken }, { where: { uid: id } });

    return { statusCode: 200, accessToken: accessToken, refreshToken: refreshToken };
}




const getUserById = async (uid: string) => {
    const foundUser: User | null = await userModel.findOne({
      where: { uid: uid, status: true },
    });
    return foundUser;
  };

const loginByTokenService = async (token: string): Promise<any> => {
    let key = process.env.JWT_SECRET || "";
    console.log("pooo2", token);
    try {
        const decoded: any = jwt.verify(token, key);
        const foundUser: User | null = await getUserById(decoded?.id);
        if (foundUser?.token !== token) {
            return { statusCode: "401", message: " token không đúng" };
        }
        const accessToken = getToken(foundUser.uid, "accessToken");
        return {
            statusCode: "200",
            message: "Đăng nhập thành công ",
            data: { ...foundUser.dataValues, accessToken },
        };
    } catch (error) {
        return { statusCode: "402", message: "token đã hết hạn", error: error };
    }
};


const registerService = async (tmpUser: any) => {
    console.log("regisss", tmpUser);
    const checkUser = await userModel.findOne(
        { where: { [Op.or]: [{ email: tmpUser.email }, { uid: tmpUser.id }] } }
    );
    if (checkUser && checkUser.status === false) {
        // xoas user da ton tai nhuwng chuwa xacs nhaanj quas laau
        // if (checkUser && checkUser.status === false) {
        //     await userModel.destroy({ where: { [Op.or]: [{ email: newUser.email }, { id: newUser.email }] } });
        // }
    console.log("regisss2", tmpUser);

        return 202;// user đã tồn tại nhưng chưa xác nhận
    }
    console.log("regisss3", tmpUser);

    if (checkUser && checkUser.status === true) {
        return 201;// user đã tồn tại
    }
    var newUser: User = {} as User;
    newUser.uid = tmpUser.id;
    newUser.email = tmpUser.email;
    newUser.password = bcrypt.hashSync(tmpUser.password, bcrypt.genSaltSync(8));
    newUser.status = false;
    newUser.token = "";
    console.log("regisss4", tmpUser);

    const check = await userModel.create(newUser);
    console.log("regisss5", check);

    return 200;
}

const changePasswordService = async (email: string, oldPass: string) => {
    const user: User | null = await userModel.findOne({ where: { email: email } });
    if (!user) {
        return 201; // user không tồn tại
    }
    const checkPass = bcrypt.compareSync(oldPass, user.password);
    if (!checkPass) {
        return 202; // sai mật khẩu
    }
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
        const check = await verifyModel.findOne({ where: { email: email, uniqueString: uniqueString } });
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

const changePasswordUserService = async (
    email: string,
    newpassword: string
) => {
    await userModel.update(
        {
            password: newpassword,
        },
        { where: { email: email } }
    );
    return {
        statusCode: "200",
        message: "thay đổi mật khẩu thành công ",
    };
};
export {
    loginService,
    registerService,
    changePasswordService,
    forgotPasswordService,
    verifyAccountService,
    getToken,
    changePasswordUserService,
    loginByTokenService,
    


};