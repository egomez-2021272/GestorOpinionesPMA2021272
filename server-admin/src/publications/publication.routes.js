'use strict'

import { Router } from 'express';
import {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost,
} from './publication.controller.js';
import {
    validateCreatePublication,
    validateUpdatePublication,
    validatePublicationId,
} from '../../middlewares/publication-validator.js';

const router = Router();

router.route('/')
    .get(validatePublicationId.slice(0, 1), getPosts)
    .post(validateCreatePublication, createPost);

router.route('/:id')
    .get(validatePublicationId, getPostById)
    .put(validateUpdatePublication, updatePost)
    .delete(validatePublicationId, deletePost);

export default router;