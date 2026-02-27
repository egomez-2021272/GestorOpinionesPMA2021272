import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

export const validateComment = [
    body('content')
        .trim()
        .notEmpty().withMessage('El contenido del comentario es obligatorio.')
        .isLength({ min: 1, max: 1000 })
        .withMessage('El comentario debe tener entre 1 y 1000 caracteres.'),

    checkValidators,
];

export const validateCommentId = [
    param('id')
        .isMongoId().withMessage('El ID del comentario no es válido.'),

    checkValidators,
];