import { Router } from 'express'
const router = Router();

//database connection
import { connect } from '../database'
import { ObjectID } from 'mongodb'

//middleware
import midlewareToken from './middleware'

router.get('/', midlewareToken, async(req, res) => {
    const db = await connect();
    const result = await db.collection('weeks').find({}).toArray();
    res.json(result);
});

router.post('/', midlewareToken, async(req, res) => {
    const db = await connect();
    const week = {
        "id_user": req.body.id_user,
        "week_1": req.body.week_1,
        "week_2": req.body.week_2,
        "week_3": req.body.week_3,
        "week_4": req.body.week_4,
        "week_declined": req.body.week_declined,
        "date": req.body.date
    };
    const result = await db.collection('weeks').insert(week);
    res.json(result);
})

router.get('/:id', midlewareToken, async(req, res) => {
    const { id } = req.params;
    const db = await connect();
    const result = await db.collection('weeks').findOne({ _id: ObjectID(id) });
    res.json(result);
});

router.delete('/:id', midlewareToken, async(req, res) => {
    const { id } = req.params;
    const db = await connect();
    const result = await db.collection('weeks').deleteOne({ _id: ObjectID(id) });
    res.json({
        message: `Week ${id} deleted`,
        result
    });
});

router.put('/:id', midlewareToken, async(req, res) => {
    const { id } = req.params;
    const db = await connect();
    const updateWeek = {
        "week_1": req.body.week_1,
        "week_2": req.body.week_2,
        "week_3": req.body.week_3,
        "week_4": req.body.week_4,
        "week_declined": req.body.week_declined
    };
    await db.collection('weeks').updateOne({ _id: ObjectID(id) }, {
        $set: updateWeek
    });
    res.json({
        message: `Week ${id} update`,
    });
})

export default router;