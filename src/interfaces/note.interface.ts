import { InferAttributes, InferCreationAttributes, Model } from "sequelize";

export interface Note 
extends Model <InferAttributes<Note>,InferCreationAttributes<Note>>{
    nid: number;
    uid: string;
    title: string;
    status: boolean;
    share: boolean;
    importance: boolean;
    color: string;
    created: Date;

    }