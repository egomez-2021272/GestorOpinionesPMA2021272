export const corsOptions = {
    origin: function (origin, callback) {
        const whitelist = [process.env.FRONTEND_URL, 'http://localhost:3010', 'http://127.0.0.1:3010'];
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    },
    credentials: true
};