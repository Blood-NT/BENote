import { DataTypes } from "sequelize";
import sequelize from "../config/connectDB";
import { Note } from "../interfaces/note.interface";

export const noteModel = sequelize.define<Note>(
    "notes",
    {
        nid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        uid: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        share: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        importance: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        created: {
            type: DataTypes.DATE,
            allowNull: false,
        },

    },
    {
        timestamps: false,
        tableName: "notes",
    }
);
