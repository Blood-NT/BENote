import { InferAttributes, InferCreationAttributes, Model } from "sequelize";

export interface Save 
extends Model <InferAttributes<Save>,InferCreationAttributes<Save>>{
    hid: string;
    gid: string;
    noteid: string;
    status: string;
    }