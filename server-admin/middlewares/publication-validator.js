import { body } from 'express-validator';
import { validateJWT } from './validate-JWT.js';
import { checkValidators } from './check-validators.js';

export const validatePublicationFields = [
    validateJWT,

    body('title')
        .trim()
        .notEmpty()
        .withMessage('El título es requerido')
        .isLength({ min: 5, max: 150 })
        .withMessage('El título debe tener entre 5 y 150 caracteres'),

    body('category')
        .trim()
        .notEmpty()
        .withMessage('La categoría es requerida')
        .isLength({ min: 3, max: 100 })
        .withMessage('La categoría debe tener entre 3 y 100 caracteres'),

    body('author')
        .trim()
        .notEmpty()
        .withMessage('El autor es requerido')
        .isLength({ min: 3, max: 100 })
        .withMessage('El nombre del autor debe tener entre 3 y 100 caracteres'),

    body('text')
        .trim()
        .notEmpty()
        .withMessage('El texto es requerido')
        .isLength({ min: 10, max: 5000 })
        .withMessage('El texto debe tener entre 10 y 5000 caracteres'),

    body('publicationDate')
        .optional()
        .isISO8601()
        .withMessage('La fecha debe tener un formato válido (ISO 8601)'),

    checkValidators,
];