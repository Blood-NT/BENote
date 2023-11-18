import { DataTypes } from "sequelize";
import sequelize from "../config/connectDB";
import { User } from "../interfaces/user.interface";

export const userModel = sequelize.define<User>(
    "users",
    {
        uid: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
       
        status: {

            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    {
        timestamps: false,
        tableName: "users",
    }
);
