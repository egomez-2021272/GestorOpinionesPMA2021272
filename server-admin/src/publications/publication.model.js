import mongoose from 'mongoose';

export const CATEGORIAS = [
    'tecnología',
    'deportes',
    'ciencia',
    'política',
    'entretenimiento',
    'salud',
    'cultura',
    'otros',
];

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'El título es obligatorio.'],
            trim: true,
            minlength: [3, 'El título debe tener al menos 3 caracteres.'],
            maxlength: [150, 'El título no puede superar 150 caracteres.'],
        },
        category: {
            type: String,
            required: [true, 'La categoría es obligatoria.'],
            enum: {
                values: CATEGORIAS,
                message: `La categoría debe ser una de: ${CATEGORIAS.join(', ')}.`,
            },
        },
        content: {
            type: String,
            required: [true, 'El contenido es obligatorio.'],
            trim: true,
            minlength: [10, 'El contenido debe tener al menos 10 caracteres.'],
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);
export default Post;