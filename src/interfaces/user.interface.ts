import { InferAttributes, InferCreationAttributes, Model } from "sequelize";

export interface User 
extends Model <InferAttributes<User>,InferCreationAttributes<User>>{
    uid: string;
    password: string;
    email: string;
    token: string;
    fullname: string;
    status: Boolean;

    }