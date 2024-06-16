const express = require('express');
const redis = require('redis');

const REDIS_URL = process.env.STORAGE_URL || 'redis://localhost';
const client = redis.createClient({ url: REDIS_URL });

(async () => {
    await client.connect()
})();

const app = express();




app.use(express.json());

app.get('/:name', async (req, res) => {
    const { name } = req.params;

    try {
        const cnt = await client.incr(name)
        res.status(200).json({ message: `Hello ${name}!`, cnt })
    } catch (e) {
        res.status(500).json({ercode:500, errmsg: `redis error ${e}!` })
    }

})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});