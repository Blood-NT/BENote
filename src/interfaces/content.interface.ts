import { InferAttributes, InferCreationAttributes, Model } from "sequelize";

export interface Contents
    extends Model<InferAttributes<Contents>, InferCreationAttributes<Contents>> {
    cid?: number;
    uid: string;
    nid: number;
    content: string;
    updateat: Date;

}
