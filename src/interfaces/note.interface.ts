import { InferAttributes, InferCreationAttributes, Model } from "sequelize";

export interface Note 
extends Model <InferAttributes<Note>,InferCreationAttributes<Note>>{
    nid: number;
    uid: string;
    title: string;
    status: boolean;
    share: number;// 1=> khóa, không share 2=> chỉ xem 3=> có thể chỉnh sửa
    importance: boolean;
    color: string;
    created: Date;
    }