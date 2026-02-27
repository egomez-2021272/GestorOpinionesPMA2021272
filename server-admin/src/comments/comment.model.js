'use strict'
import mongoose from "mongoose"

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'El contenido del comentario es obligatorio.'],
        trim: true,
        minlength: [1, 'El comentario no puede estar vacío.'],
        maxlength: [1000, 'El comentario no puede superar 1000 caracteres.'],
    },
    publication: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Publication',
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
},
    { timestamps: true }

);

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;