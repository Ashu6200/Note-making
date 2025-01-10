import mongoose, { Schema, Document } from "mongoose";

interface INote extends Document {
    title: string;
    content: string;
    userId: mongoose.Schema.Types.ObjectId;
}

const NoteSchema: Schema = new Schema({
    title: {
        type: String, required: true
    },
    content: {
        type: String, required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
}, {
    timestamps: true
});
const NoteModel = mongoose.model<INote>("Note", NoteSchema);
export default NoteModel
