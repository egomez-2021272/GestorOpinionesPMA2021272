'use strict'

import jwt from 'jsonwebtoken';

export const generateJWT = (id, username, email, role) => {
    return new Promise((resolve, reject) => {
        const payload = { username, email, role };

        const options = {
            subject: id.toString(),
            expiresIn: process.env.JWT_EXPIRES_IN || '1h',
            issuer: process.env.JWT_ISSUER,
            audience: process.env.JWT_AUDIENCE,
        };

        jwt.sign(payload, process.env.JWT_SECRET, options, (err, token) => {
            if (err) reject(err);
            else resolve(token);
        });
    });
};