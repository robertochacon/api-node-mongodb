import express, { json } from 'express'

const app = express();

//Routes
import indexRoutes from './routes/index.routes'
import weekRoutes from './routes/weeks.routes'
import usersRoutes from './routes/user.routes'

//Setings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(json());

//Routes
app.use(indexRoutes);
app.use('/weeks', weekRoutes);
app.use('/users', usersRoutes);

export default app;