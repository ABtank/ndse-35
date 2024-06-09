const express = require('express');
const router = express.Router();
const { v4: uuid } = require('uuid');

class Todo {
    constructor(title = "", descr = "", id = uuid()) {
        this.title = title;
        this.descr = descr;
        this.id = id;
    }
}

const stor = {
    todo: []
};

[1, 2, 3].map(el => {
    const newTodo = new Todo(`todo ${el}`, `descr todo ${el}`);
    stor.todo.push(newTodo);
});


router.get('/', (req, res) => {
    const { todo } = stor;
    res.render('todo/index', { title: "Todo", todos: todo });
})

router.get('/create', (req, res) => {
    res.render('todo/create', { title: "create Todo", todo: {} });
})

router.post('/create', (req, res) => {
    const { title, descr } = req.body;
    const newTodo = new Todo(title, descr);
    stor.todo.push(newTodo);
    res.redirect('/todo');
})

router.get('/:id', (req, res) => {
    const { todo } = stor;
    const { id } = req.params;
    const idx = todo.findIndex(el => el.id === id);
    if (idx === -1) {
        res.redirect('/404');
    }
    res.render('todo/view', { title: "Todo | VIEW", todo: todo[idx] });
})

router.get('/update/:id', (req, res) => {
    const { todo } = stor;
    const { id } = req.params;
    const idx = todo.findIndex(el => el.id === id);
    if (idx === -1) {
        res.redirect('/404');
    }
    res.render('todo/update', { title: "Todo | Update", todo: todo[idx] });
})

router.post('/update/:id', (req, res) => {
    const { todo } = stor;
    const { id } = req.params;
    const idx = todo.findIndex(el => el.id === id);
    if (idx === -1) {
        res.redirect('/404');
    }
    const { title, descr } = req.body;
    todo[idx] = {
        ...todo[idx],
        title,
        descr
    };
    res.redirect(`/todo/${id}`);
})

router.post('/delete/:id', (req, res) => {
    const { todo } = stor;
    const { id } = req.params;
    const idx = todo.findIndex(el => el.id === id);
    if (idx === -1) {
        res.redirect('/404');
    }
    todo.splice(idx, 1);
    res.redirect('/todo');
})


module.exports = router