import { Router } from 'express'

const router = Router();

//Routes
router.get('/', (req, res) => {
    res.send('Welcome')
});

export default router;