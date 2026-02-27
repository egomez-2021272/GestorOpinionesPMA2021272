'use strict'

import Comment from './comment.model.js';
import Publication from '../publications/publication.model.js';

export const createComment = async (req, res, next) => {
    try {
        const publication = await Publication.findById(req.params.publicationId);
        if (!publication) {
            return res.status(404).json({
                success: false,
                message: 'Publicación no encontrada.',
            });
        }

        const comment = await Comment.create({
            content: req.body.content,
            publication: req.params.publicationId,
            author: req.user.id, 
        });

        await comment.populate('author', 'name');

        res.status(201).json({
            success: true,
            message: 'Comentario creado exitosamente.',
            data: { comment },
        });
    } catch (error) {
        next(error);
    }
};

export const getCommentsByPublication = async (req, res, next) => {
    try {
        const publication = await Publication.findById(req.params.publicationId);
        if (!publication) {
            return res.status(404).json({
                success: false,
                message: 'Publicación no encontrada.',
            });
        }

        const { page = 1, limit = 20 } = req.query;
        const skip = (Number(page) - 1) * Number(limit);

        const [comments, total] = await Promise.all([
            Comment.find({ publication: req.params.publicationId })
                .populate('author', 'name')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(Number(limit)),
            Comment.countDocuments({ publication: req.params.publicationId }),
        ]);

        res.status(200).json({
            success: true,
            data: {
                comments,
                paginacion: {
                    total,
                    pagina: Number(page),
                    paginas: Math.ceil(total / Number(limit)),
                    limite: Number(limit),
                },
            },
        });
    } catch (error) {
        next(error);
    }
};

export const updateComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: 'Comentario no encontrado.',
            });
        }

        if (comment.author.toString() !== req.user.id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'No tienes permiso para editar este comentario.',
            });
        }

        comment.content = req.body.content;
        await comment.save();
        await comment.populate('author', 'name');

        res.status(200).json({
            success: true,
            message: 'Comentario actualizado exitosamente.',
            data: { comment },
        });
    } catch (error) {
        next(error);
    }
};

export const deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: 'Comentario no encontrado.',
            });
        }

        if (comment.author.toString() !== req.user.id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'No tienes permiso para eliminar este comentario.',
            });
        }

        await comment.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Comentario eliminado exitosamente.',
        });
    } catch (error) {
        next(error);
    }
};