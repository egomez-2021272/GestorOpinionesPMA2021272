'use strict'

import { Router } from 'express';
import {
    createComment,
    getCommentsByPublication,
    updateComment,
    deleteComment,
} from './comment.controller.js';
import { validateJWT } from '../../middlewares/validate-JWT.js';
import { validateComment, validateCommentId } from '../../middlewares/comment-validator.js';

const router = Router();

router.route('/publications/:publicationId/comments')
    .get(validateJWT, getCommentsByPublication)
    .post(validateJWT, validateComment, createComment);

router.route('/comments/:id')
    .put(validateJWT, validateComment, updateComment)
    .delete(validateJWT, validateCommentId, deleteComment);

export default router;