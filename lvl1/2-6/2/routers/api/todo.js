const express = require('express')
const Todo = require('../../models/todo')

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const todo = await Todo.find().select('-__v');
        res.json(todo)
    } catch (e) {
        console.log(e)
        res.status(500).json(e)
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const todo = await Todo.findById(id).select('-__v');
        res.json(todo);
    } catch (e) {
        console.log(e)
        res.status(500).json(e)
    }
});

router.post('/', async (req, res) => {
    const { title, descr } = req.body;
    try {
        const newTodo = new Todo({ title, descr })
        await newTodo.save()
        res.redirect(`/api/todo/${newTodo.id}`)
    } catch (e) {
        console.log(e)
        res.status(500).json(e)
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { title, descr } = req.body
    try {
        await Todo.findByIdAndUpdate(id, { title, descr });
        res.redirect(`/api/todo/${id}`)
    } catch (e) {
        console.log(e)
        res.status(500).json(e)
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        await Todo.deleteOne({ _id: id })
        res.json(true)
    } catch (e) {
        console.log(e)
        res.status(500).json(e)
    }
});

module.exports = router;