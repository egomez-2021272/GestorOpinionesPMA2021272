'use strict'

import { body } from 'express-validator';
import { checkValidators } from './check-validators.js';

export const updateProfileValidators = [
    body('name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('El nombre debe tener entre 2 y 100 caracteres.'),

    body('username')
        .optional()
        .trim()
        .isLength({ min: 3, max: 30 })
        .withMessage('El username debe tener entre 3 y 30 caracteres.')
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage('El username solo puede contener letras, números y guion bajo.'),

    body('oldPassword')
        .optional()
        .notEmpty()
        .withMessage('La contraseña actual no puede estar vacía.'),

    body('newPassword')
        .optional()
        .isLength({ min: 6 })
        .withMessage('La nueva contraseña debe tener al menos 6 caracteres.'),

    body('role').not().exists().withMessage('No puedes modificar el rol.'),
    body('status').not().exists().withMessage('No puedes modificar el status.'),

    checkValidators,
];