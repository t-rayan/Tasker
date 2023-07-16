import mongoose, { Document, Schema, mongo } from "mongoose";

interface ITask extends Document {
  title: string;
  isCompleted: boolean;
  userId: mongoose.Types.ObjectId;
  folder: mongoose.Types.ObjectId;
  dueDate: Date;
  completedOn?: Date | any;
  created_at: Date;
  isImportant: Boolean;
}

const taskSchema: Schema = new Schema({
  title: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  folder: { type: Schema.Types.ObjectId, ref: "Folder" },
  isCompleted: { type: Boolean, default: false },
  completedOn: { type: Date },
  dueDate: { type: Date },
  created_at: { type: Date, default: Date.now() },
  isImportant: { type: Boolean, default: false },
});

const Task = mongoose.model<ITask>("Task", taskSchema);
export default Task;
