import { verifyModel } from "../models/token.model";
import { Token } from "../interfaces/token.interface";


const createVerifyToken = async (newVerify:Token) => {
    newVerify.createAt = new Date();
    newVerify.effectiveSeconds = 3600;//60p
    const check = await verifyModel.create(newVerify);
    console.log(check);
    return 200;
    }
export {
    createVerifyToken,

}
