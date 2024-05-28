const express = require('express')
const { v4: uuid } = require('uuid')

class Todo {
    constructor(title = '', descr = '', id = uuid()) {
        this.title = title
        this.descr = descr
        this.id = id
    }
}

const stor = {
    todo: [
        new Todo(),
        new Todo()
    ]
};

const app = express();
app.use(express.json())

app.get(`/api/todo`, (req, res) => {
    const { todo } = stor
    res.json(todo)
})

app.get(`/api/todo/:id`, (req, res) => {
    const { todo } = stor
    const { id } = req.params
    const idx = todo.findIndex(el => el.id === id)

    if (idx !== -1) {
        res.json(todo[idx])
    } else {
        res.status(404)
        res.json('404 | страница не найдена')
    }
})



app.post(`/api/todo`, (req, res) => {
    const { todo } = stor
    const { title, descr } = req.body

    const newTodo = new Todo(title, descr)
    todo.push(newTodo)

    res.status(201)
    res.json(newTodo)
})

app.put(`/api/todo/:id`, (req, res) => {
    const { todo } = stor
    const { title, descr } = req.body
    const { id } = req.params
    const idx = todo.findIndex(el => el.id === id)

    if (idx !== -1) {
        todo[idx] = {
            ...todo[idx],
            title,
            descr
        }
        res.json(todo[idx])
    } else {
        res.status(404)
        res.json('404 | страница не найдена')
    }
})

app.delete(`/api/todo/:id`, (req, res) => {
    const { todo } = stor
    const { id } = req.params
    const idx = todo.findIndex(el => el.id === id)
    
    if (idx !== -1) {
        todo.splice(idx, 1)
        res.json(true)
    } else {
        res.status(404)
        res.json('404 | страница не найдена')
    }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});