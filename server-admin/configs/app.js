'use strict'

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { dbConnection } from './db.js';
import { corsOptions } from './cors.configuration.js';
import { helmetConfig } from './helmet.configuration.js';
import { requestLimit } from './rateLimit.configuration.js';
import { errorHandler } from '../middlewares/handle-errors.js';
import publicationRoutes from '../src/publications/publication.routes.js';


const BASE_PATH = '/opiniones/v1';

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false, limit: '10mb' }));
    app.use(express.json({ limit: '10mb' }));
    app.use(cors(corsOptions));
    app.use(morgan('dev'));
    app.use(helmet(helmetConfig));
    app.use(requestLimit);
};

const routes = (app) => {
    app.use(`${BASE_PATH}/publications`, publicationRoutes);
    app.get(`${BASE_PATH}/health`, (req, res) => {
        res.status(200).json({
            status: 'healthy',
            service: 'Gestor de opiniones Admin Server'
        });
    });


    app.use((req, res) => {
        res.status(404).json({
            success: false,
            message: 'Ruta no existe en el servidor'
        });
    });
};

export const initServer = async () => {
    const app = express();
    const PORT = process.env.PORT;
    app.set('trust proxy', 1);

    try {
        middlewares(app);
        await dbConnection();
        routes(app);
        app.use(errorHandler);
        app.listen(PORT, () => {
            console.log(`Gestor de opiniones corriendo en puerto ${PORT}`);
            console.log(`Health check: http://localhost:${PORT}${BASE_PATH}/health`);
        });
    } catch (err) {
        console.error(`Error al iniciar el servidor: ${err.message}`);
        process.exit(1);
    }
};