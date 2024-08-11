const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/todo-app')
    .then(() => {
        console.log('DB Connected');
    })
    .catch((err) => {
        console.log(err);
    });

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
});

const todoModel = mongoose.model('Todo', todoSchema);

// POST route to create a new todo
app.post('/todos', async (req, res) => {
    const { title, description} = req.body;

    try {
        const newTodo = new todoModel({ title, description });
        await newTodo.save();
        res.status(201).json(newTodo); 
    } catch (error) {
        console.log(error);
        res.status(500).send('Error saving todo');
    }
});

// GET route to retrieve all todos
app.get('/todos', async (req, res) => {
    try {
        const todos = await todoModel.find(); 
        res.json(todos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error fetching todos');
    }
});

app.put('/todos/:id', async (req, res) => {
    try {
        const { title, description } = req.body;
        const id = req.params.id;
        const updateTodoItems = await todoModel.findByIdAndUpdate(
            id,{ title, description },{ new: true }
        );

        if (!updateTodoItems) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.json(updateTodoItems);
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: 'An error occurred' });
    }
});

app.delete('/todos/:id', async(req,res)=>{
    try {
        const{title,description}=req.body;
        const id = req.params.id;
        await todoModel.findByIdAndDelete(id)
        res.status(204).end()
    } catch (error) {
        console.error(error); 
        res.status(500).json({message:'Error Occured'})
    }
})


