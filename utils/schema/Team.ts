import mongoose, { Document, model, Model, Schema } from "mongoose";

export interface ITeam extends Document {
  name: string;
  domain: string;
  joined: number;
  category: string;
}

const TeamSchema: Schema = new Schema({
  name: {
    type: String,
  },
  domain: {
    type: String,
  },
  joined: {
    type: Number,
  },
  category: {
    type: String,
  },
});

export const Team: Model<ITeam> =
  mongoose.models.Post || model("Team", TeamSchema);
