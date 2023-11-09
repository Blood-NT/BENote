import { Model, InferAttributes, InferCreationAttributes } from "sequelize";

export interface Token
  extends Model<InferAttributes<Token>, InferCreationAttributes<Token>> {
  id?: number;
  email: string;
  uniqueString: string;
  createAt: Date;
  effectiveSeconds: number;
}
