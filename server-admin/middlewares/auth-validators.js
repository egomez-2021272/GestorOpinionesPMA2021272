'use strict'
import { body } from 'express-validator';
import { checkValidators } from './check-validators.js';

export const registerValidators = [
    body('name')
        .trim()
        .notEmpty().withMessage('El nombre es obligatorio.')
        .isLength({ min: 2, max: 100 })
        .withMessage('El nombre debe tener entre 2 y 100 caracteres.'),

    body('username')
        .trim()
        .notEmpty().withMessage('El username es obligatorio.')
        .isLength({ min: 3, max: 30 })
        .withMessage('El username debe tener entre 3 y 30 caracteres.')
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage('El username solo puede contener letras, números y guion bajo.'),

    body('email')
        .trim()
        .notEmpty().withMessage('El correo es obligatorio.')
        .isEmail().withMessage('El correo no tiene un formato válido.'),

    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria.')
        .isLength({ min: 6 })
        .withMessage('La contraseña debe tener al menos 6 caracteres.'),

    checkValidators,
];

export const loginValidators = [
    body('identifier')
        .trim()
        .notEmpty().withMessage('El correo o username es obligatorio.'),

    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria.'),

    checkValidators,
];