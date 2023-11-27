import { InferAttributes, InferCreationAttributes, Model } from "sequelize";

export interface Save 
extends Model <InferAttributes<Save>,InferCreationAttributes<Save>>{
    sid: number;
    hid: string;
    gid: string;
    nid: number;
    status: boolean;
    }