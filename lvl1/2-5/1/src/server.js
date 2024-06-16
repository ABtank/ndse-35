const express = require('express')

const app = express();

app.use(express.json())

app.get('/:name', (req, res) => {
    const { name } = req.params;
    res.status(200).json({ message: `Hello ${name}!` })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});