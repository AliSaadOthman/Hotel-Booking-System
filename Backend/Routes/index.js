import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
    res.status(200).send("Reached Home Page");
});

export default router;
