import { Router } from 'express'
import jwt from 'jsonwebtoken'
const router = Router();

//database connection
import { connect } from '../database'
import { ObjectID } from 'mongodb'

//middleware
import midlewareToken from './middleware'

router.post('/login', async(req, res) => {
    const { id } = req.params;
    const db = await connect();
    const user = {
        "correo": req.body.correo,
        "clave": req.body.clave
    };
    const result = await db.collection('users').findOne(user);
    const token = jwt.sign({ result }, 'my_secret_key');

    res.json({
        "user": result,
        "token": token
    });
});

router.get('/', midlewareToken, async(req, res) => {
    const db = await connect();
    const result = await db.collection('users').find({}).toArray();
    res.json(result);
});


router.post('/', async(req, res) => {
    const db = await connect();
    const user = {
        "nombre": req.body.nombre,
        "correo": req.body.correo,
        "clave": req.body.clave,
    };
    const result = await db.collection('users').insert(user);
    res.json(result);
})

router.get('/:id', async(req, res) => {
    const { id } = req.params;
    const db = await connect();
    const result = await db.collection('users').findOne({ _id: ObjectID(id) });
    res.json(result);
});

router.delete('/:id', async(req, res) => {
    const { id } = req.params;
    const db = await connect();
    const result = await db.collection('users').deleteOne({ _id: ObjectID(id) });
    res.json({
        message: `user ${id} deleted`,
        result
    });
});

router.put('/:id', async(req, res) => {
    const { id } = req.params;
    const db = await connect();
    const user = {
        "nombre": req.body.nombre,
        "correo": req.body.correo,
        "clave": req.body.clave,
    };
    await db.collection('users').updateOne({ _id: ObjectID(id) }, {
        $set: user
    });
    res.json({
        message: `User ${id} update`,
    });
})

export default router;