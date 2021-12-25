import path from 'path';
import express from 'express';
import sequelize from './config/database.js';

import authRouter from './routes/auth.routes.js';

const app = express();

/* ------------------------- essential/basic config ------------------------- */
app.set('view engine', 'ejs');
app.set('views', path.resolve('views'));

/* ------------------------------- middlewares ------------------------------ */
app.use(express.static(path.resolve('public')));
app.use(express.urlencoded({ extended: true }));

/* --------------------------------- routes --------------------------------- */
app.use(authRouter);

/* --------------------------------- server --------------------------------- */
sequelize.sync().then(() => {
	app.listen(8000);
});

export default app;
