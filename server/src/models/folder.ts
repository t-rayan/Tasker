import mongoose, { Schema, Document, Types } from "mongoose";

export interface IFolder extends Document {
  name: string;
  color: string;
  userId: Types.ObjectId;
  tasks: Types.ObjectId[];
  isComplete?: boolean;
}

const folderSchema: Schema = new Schema({
  name: { type: String, required: true },
  color: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  isComplete: { type: Boolean, default: false },
});

const Folder = mongoose.model<IFolder>("Folder", folderSchema);

export default Folder;
