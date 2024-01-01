import { Request, Response } from "express";
import { changePasswordService, changePasswordUserService, forgotPasswordService, loginByTokenService, loginService, registerService, verifyAccountService } from "../service/userService";
import { v4 as uuidv4 } from 'uuid';
import { createVerifyToken } from "../service/tokenService";
import { sendVerifiForgotPassword, sendVerificationEmail } from "../External/emailSMTP";
import { forgotPassword } from "../interfaces/forgotPassword.interface";
import { createVerifyPasswordService, deleteVerifyPasswordService, getVerifyPasswordService } from "../service/forgotPassword.service";
import { User } from "../interfaces/user.interface";
import { decryptt, encrypt } from "../enDeCode/enDeCode";
const login = async (req: Request, res: Response) => {
    try {
        const log = await loginService(req.body);
        if (log.statusCode === 200) {
            // delete log.status;
            console.log("đăng nhập thành công", log);
            return res.status(200).json(log);
        }
        else if (log.statusCode === 201) {
            console.log("user không tồn tại");
            return res.status(200).json({ message: "User không tồn tại", statusCode: 201 });
        }
        else if (log.statusCode === 202) {
            console.log("mật khẩu không đúng");
            return res.status(200).json({ message: "Mật khẩu không đúng" , statusCode: 202});
        }
        else if (log.statusCode === 203) {
            console.log("tài khoản chưa được xác thực");
            return res.status(200).json({ message: "Tài khoản chưa được xác thực", statusCode: 203 });
        }
        else {
            console.log("lỗi không xác định");
            return res.status(200).json({ message: "Lỗi không xác định", statusCode: 204 });
        }
    }
    catch (e) {
        return res.status(200).json({ message: "Lỗi", error: e , statusCode: 205});
    }
}

const register = async (req: Request, res: Response) => {
    console.log("req.body register", req.body);
    try {
        const log = await registerService(req.body);
        if (log === 200) {
            const uniqueString = uuidv4();
            const newVerify: any = {
                email: req.body.email,
                uniqueString: uniqueString,
            };
            await createVerifyToken(newVerify);
            await sendVerificationEmail(newVerify.email, newVerify.uniqueString);
            return res.status(200).json({ message: "đăng ký thành công", statusCode: 210 });
        }
        else if (log === 201) {
            return res.status(200).json({ message: "User đã tồn tại", statusCode: 211});
        }
        else if (log === 202) {
            return res.status(200).json({ message: "User đã tồn tại nhưng chưa xác nhận", statusCode: 212 });
        }
        else {
            return res.status(200).json({ message: "Lỗi không xác định" , statusCode: 213});
        }
    }
    catch (e) {
        return res.status(200).json({ message: "Lỗi", error: e, statusCode: 214 });
    }

}

const verifyAccount = async (req: Request, res: Response) => {
    try {
        console.log("join");
        const { email, uniqueString } = req.params;
        const check = await verifyAccountService(email, uniqueString);
        if (check === 200) {
            return res.status(200).json({ message: "Xác thực thành công" });
        }
        return res.status(200).json({ message: "Xác thực thất bại" });
    }
    catch (e) {
        return res.status(200).json({ message: "Lỗi", error: e });
    }

}

const createForgotPassword = async (req: Request, res: Response) => {
    console.log("done createForgotPassword");
    try {
        const { email } = req.body;
        const check = await forgotPasswordService(email);
        if (check !== 200) {
            return res.json({ statusCode: 221, message: "Tài khoản không tồn tại" });
        }
        const uniqueString = uuidv4();
        const password = "1234"
        await sendVerifiForgotPassword(email, uniqueString, password);
        const newVerify: any = {
            email: email,
            uniqueString: uniqueString,
            password: password,
        };
        await createVerifyPasswordService(newVerify);
        res.status(200).json({ statusCode: 220, message: "Mật khẩu mới đã được gửi về email của bạn" });
    } catch (error) {
        res.status(200).json({ statusCode: 400, message: `${error}` });
    }
};
const changePassword = async (req: Request, res: Response) => {
    try {
        const { uid, oldPass, newPass } = req.body;
        const getuser:any = await changePasswordService(uid, oldPass);
        if (getuser === 202) {
            res.status(200).json({ statusCode: "400", message: "sai mật khẩu" });
        }
        else if (getuser === 201) {
            res.status(200).json({ statusCode: "400", message: "user không tồn tại" });
        }
        else {
            const uniqueString = uuidv4();
            await sendVerifiForgotPassword(getuser.email, uniqueString, newPass);
            const newww: any = {
                email: getuser.email,
                uniqueString: uniqueString,
                password: newPass,
            };
            await createVerifyPasswordService(newww);
            res.status(200).json({ statusCode: "200", message: "Hãy kiểm tra email để xác nhận thay đổi mật khẩu" });
        }
      
    } catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};

const verifyChangePassword = async (req: Request, res: Response) => {
    try {
        const email: string = req.params.email;
        const uniqueString: string = req.params.uniqueString;
        const foundVerify: forgotPassword | null = (
            await getVerifyPasswordService(email, uniqueString)
        ).data;
        if (!foundVerify) {
            const message = "Tài khoản không tồn tại hoặc đã được xác minh";
            return res.status(200).json(message);
            return;
        }
        if (
            foundVerify.createAt.getTime() + foundVerify.effectiveSeconds * 1000 <
            new Date().getTime()
        ) {
            const message = "Liên kết đã hết hạn, vui lòng thao tác lại";
            
            return res.status(200).json(message);
        }
        await deleteVerifyPasswordService(email);
        await changePasswordUserService(email, foundVerify.password);
        // res.redirect(`/user/verified`);
        return res.status(200).json({ message: "Xác thwucj quên mật khẩu thành công" });
    } catch (error) {
        console.log(error);
        const message = "Đã xảy ra lỗi khi kiểm tra xác minh người dùng hiện tại";
        return res.status(200).json(message);
    }
};

const loginByToken = async (req: Request, res: Response) => {
    const codeee= encrypt("123456789")
    console.log("check code",codeee);
    console.log("CHECK ENCODE", decryptt(codeee));
    console.log("loginByToken", req.body);
    const { refreshToken } = req.body;
    try {
        const userr = await loginByTokenService(refreshToken);
        if (userr) {
            return res.status(200).json(userr);
        }
        return res.status(200).json({ message: "Đăng nhập thất bại" });
    } catch (error) {
        return res.status(200).json({ message: "Lỗi", error });
    }
}
export default {
    login,
    loginByToken,
    register,
    verifyAccount,
    createForgotPassword,
    changePassword,
    verifyChangePassword
}