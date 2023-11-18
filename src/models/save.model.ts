import { DataTypes } from "sequelize";
import sequelize from "../config/connectDB";
import { Save } from "../interfaces/save.interface";

export const saveModel = sequelize.define<Save>(
    "save",
    {
        hid: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        gid: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        noteid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        tableName: "save",
    }
);
