import mongoose, { Document, Schema, mongo } from "mongoose";

type Priority = "High" | "Medium" | "Low";
interface ISubTask {
  title?: string;
  isCompleted?: boolean;
  dueDate?: Date;
  dueTime?: Date;
  completedOn?: Date | any;
  created_at?: Date;
  priority?: Priority;
  description?: string;
  reminder?: boolean;
  reminderDate?: Date;
}

interface ITask extends Document {
  title: string;
  isCompleted: boolean;
  userId: mongoose.Types.ObjectId;
  folder: mongoose.Types.ObjectId;
  dueDate: Date;
  dueTime: Date;
  completedOn?: Date | any;
  created_at: Date;
  priority: Priority;
  description?: string;
  reminder?: boolean;
  reminderDate?: Date;
  subTasks?: ISubTask[];
}

const taskSchema: Schema = new Schema({
  title: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  folder: { type: Schema.Types.ObjectId, ref: "Folder" },
  isCompleted: { type: Boolean, default: false },
  completedOn: { type: Date },
  dueDate: { type: Date },
  dueTime: { type: Date },
  created_at: { type: Date, default: Date.now() },
  priority: { type: String, enum: ["High", "Medium", "Low"] },
  subTasks: [{ type: String }],
});

const Task = mongoose.model<ITask>("Task", taskSchema);
export default Task;
