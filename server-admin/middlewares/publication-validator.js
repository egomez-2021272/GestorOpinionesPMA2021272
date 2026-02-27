import { body, param } from 'express-validator';
import { validateJWT } from './validate-JWT.js';
import { checkValidators } from './check-validators.js';
import { CATEGORIAS } from '../src/publications/publication.model.js';

export const validateCreatePublication = [
    validateJWT,

    body('title')
        .trim()
        .notEmpty().withMessage('El título es requerido.')
        .isLength({ min: 3, max: 150 })
        .withMessage('El título debe tener entre 3 y 150 caracteres.'),

    body('category')
        .trim()
        .notEmpty().withMessage('La categoría es requerida.')
        .isIn(CATEGORIAS)
        .withMessage(`La categoría debe ser una de: ${CATEGORIAS.join(', ')}.`),

    body('content')
        .trim()
        .notEmpty().withMessage('El contenido es requerido.')
        .isLength({ min: 10 })
        .withMessage('El contenido debe tener al menos 10 caracteres.'),

    checkValidators,
];

export const validateUpdatePublication = [
    validateJWT,

    param('id')
        .isMongoId().withMessage('El ID de la publicación no es válido.'),

    body('title')
        .optional()
        .trim()
        .isLength({ min: 3, max: 150 })
        .withMessage('El título debe tener entre 3 y 150 caracteres.'),

    body('category')
        .optional()
        .trim()
        .isIn(CATEGORIAS)
        .withMessage(`La categoría debe ser una de: ${CATEGORIAS.join(', ')}.`),

    body('content')
        .optional()
        .trim()
        .isLength({ min: 10 })
        .withMessage('El contenido debe tener al menos 10 caracteres.'),

    checkValidators,
];

export const validatePublicationId = [
    validateJWT,

    param('id')
        .isMongoId().withMessage('El ID de la publicación no es válido.'),

    checkValidators,
];