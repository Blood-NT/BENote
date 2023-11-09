import { DataTypes } from "sequelize";
import sequelize from "../config/connectDB";
import { Contents } from "../interfaces/content.interface";

export const contentModel = sequelize.define<Contents>(
    "contents",
    {
        cid: {
            type: DataTypes.NUMBER, primaryKey: true  },
        uid: {
            type: DataTypes.STRING  },
        nid: {
            type: DataTypes.NUMBER  },
        content: {
            type: DataTypes.STRING  },
        updateat: {
            type: DataTypes.DATE  },

    },
    {
        timestamps: false,
        tableName: "contents",
    }
);
