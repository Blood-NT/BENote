import { Request, Response } from "express";
import { changePasswordService, forgotPasswordService, loginService, registerService, verifyAccountService } from "../service/userService";
import { v4 as uuidv4 } from 'uuid';
import { createVerifyToken } from "../service/tokenService";
import { sendVerifiForgotPassword, sendVerificationEmail } from "../External/emailSMTP";
const login = async (req: Request, res: Response) => {
    try {
        const log = await loginService(req.body);
        if (log.statusCode === 200) {
            // delete log.status;
            console.log("đăng nhập thành công",log);
            return res.status(200).json(log);
        }
        else if (log.statusCode === 201) {
            console.log("user không tồn tại");
            return res.status(200).json({ message: "User không tồn tại" });
        }
        else if (log.statusCode === 202) {
            console.log("mật khẩu không đúng");
            return res.status(200).json({ message: "Mật khẩu không đúng" });
        }
        else if (log.statusCode === 203) {
            console.log("tài khoản chưa được xác thực");
            return res.status(200).json({ message: "Tài khoản chưa được xác thực" });
        }
        else {
            console.log("lỗi không xác định");
            return res.status(200).json({ message: "Lỗi không xác định" });
        }
    }
    catch (e) {
        return res.status(200).json({ message: "Lỗi", error: e });
    }
    return res.status(200).json({ message: "Lỗi không xác định" });
}
   
const register = async (req: Request, res: Response) => {
    console.log("req.body", req.body);
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
            return res.status(200).json({ message: "Đăng ký thành công, vui lòng kiểm tra email để xác thực tài khoản" });
        }
        else if (log === 201) {
            return res.status(200).json({ message: "User đã tồn tại" });
        }
        else if (log === 202) {
            return res.status(200).json({ message: "User đã tồn tại nhưng chưa xác nhận" });
        }
        else {
            return res.status(200).json({ message: "Lỗi không xác định" });
        }
    }
    catch (e) {
        return res.status(200).json({ message: "Lỗi", error: e });
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
const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const check = await forgotPasswordService(email);
        if (check === 200) {
            const uniqueString = uuidv4();
            const newVerify: any = {
                email: email,
                uniqueString: uniqueString,
            };
            await createVerifyToken(newVerify);
            await sendVerifiForgotPassword(newVerify.email, newVerify.uniqueString);
            return res.status(200).json({ message: "Kiểm tra email để thay đổi mật khẩu" });
        }
        return res.status(200).json({ message: "Email không tồn tại" });

    }
    catch (e) {
        return res.status(200).json({ message: "Lỗi", error: e });
    }
}
const changePassword = async (req: Request, res: Response) => {
    try {
        const { email, oldPass, newPass } = req.body;
        const check = await changePasswordService(email, oldPass, newPass);
        if (check === 200) {

            const uniqueString = uuidv4();
            const newVerify: any = {
                email: req.body.email,
                uniqueString: uniqueString,
            };
            await createVerifyToken(newVerify);
            await sendVerificationEmail(newVerify.email, newVerify.uniqueString);
            return res.status(200).json({ message: "Đăng ký thành công, vui lòng kiểm tra email để xác thực tài khoản" });
        }

        return res.status(200).json({ message: "Xác thực thất bại" });

    }

    catch (e) {
        return res.status(200).json({ message: "Lỗi", error: e });

    }
}

export default {
    login,
    register,
    verifyAccount,
    forgotPassword,
    changePassword,
}