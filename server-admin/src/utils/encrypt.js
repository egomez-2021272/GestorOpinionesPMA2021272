'use strict'

import bcrypt from 'bcryptjs';

export const encrypt = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

export const verifyPassword = async (hashedPassword, plainPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};