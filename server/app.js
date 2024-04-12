const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();


mongoose.connect('mongodb://localhost:27017/rockPaperScissors', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));




    

const userSchema = new mongoose.Schema({
    player1: String,
    totalPointsplayer1:Number,
    player2: String,
    totalPointsplayer2:Number,
    winner: String,
    winningPoint:Number,
    rounds: Object

});

const User = mongoose.model('User', userSchema);


app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.post('/api/users', async (req, res) => {
    try {
        const { player1,totalPointsplayer1, player2,totalPointsplayer2, winner,winningPoint,rounds} = req.body;
        const user = new User({  player1,totalPointsplayer1, player2,totalPointsplayer2, winner,winningPoint,rounds});
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user' });
    }
});

app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
        console.log("api called")
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
});


const PORT =  5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
