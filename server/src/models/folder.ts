import mongoose, {Schema, Document, Types} from "mongoose";


interface IFolder extends Document {
  name:string;
  userId:Types.ObjectId
}

const folderSchema: Schema = new Schema({
  name:{type: String, required: true},
  userId:{type:Schema.Types.ObjectId, ref: 'User'}
})

const Folder = mongoose.model<IFolder>('Folder', folderSchema);

export default Folder;