import { DataTypes } from "sequelize";
import sequelize from "../config/connectDB";
import { Save } from "../interfaces/save.interface";

export const saveModel = sequelize.define<Save>(
    "save",
    {
        sid : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        hid: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gid: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        tableName: "save",
    }
);
