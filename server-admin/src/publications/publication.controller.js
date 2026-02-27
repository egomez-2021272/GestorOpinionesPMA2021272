'use strict'

import Publication from './publication.model.js'; // ← único cambio real

export const createPost = async (req, res, next) => {
    try {
        const { title, category, content } = req.body;

        const post = await Publication.create({
            title,
            category,
            content,
            author: req.user._id,
        });

        await post.populate('author', 'name username avatar');

        res.status(201).json({
            success: true,
            message: 'Publicación creada exitosamente.',
            data: { post },
        });
    } catch (error) {
        next(error);
    }
};

export const getPosts = async (req, res, next) => {
    try {
        const { category, page = 1, limit = 10 } = req.query;

        const filter = {};
        if (category) filter.category = category;

        const skip = (Number(page) - 1) * Number(limit);

        const [posts, total] = await Promise.all([
            Publication.find(filter)
                .populate('author', 'name username avatar')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(Number(limit)),
            Publication.countDocuments(filter),
        ]);

        res.json({
            success: true,
            data: {
                posts,
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

export const getPostById = async (req, res, next) => {
    try {
        const post = await Publication.findById(req.params.id)
            .populate('author', 'name username avatar');

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Publicación no encontrada.',
            });
        }

        res.json({
            success: true,
            data: { post },
        });
    } catch (error) {
        next(error);
    }
};

export const updatePost = async (req, res, next) => {
    try {
        const post = await Publication.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Publicación no encontrada.',
            });
        }

        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'No tienes permiso para editar esta publicación.',
            });
        }

        const { title, category, content } = req.body;

        const updated = await Publication.findByIdAndUpdate(
            req.params.id,
            { title, category, content },
            { new: true, runValidators: true }
        ).populate('author', 'name username avatar');

        res.json({
            success: true,
            message: 'Publicación actualizada exitosamente.',
            data: { post: updated },
        });
    } catch (error) {
        next(error);
    }
};

export const deletePost = async (req, res, next) => {
    try {
        const post = await Publication.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Publicación no encontrada.',
            });
        }

        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'No tienes permiso para eliminar esta publicación.',
            });
        }

        await post.deleteOne();

        res.json({
            success: true,
            message: 'Publicación eliminada exitosamente.',
        });
    } catch (error) {
        next(error);
    }
};