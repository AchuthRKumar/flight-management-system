const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3002;

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/passengerInfo');

const Passenger = mongoose.model('Passenger', {
    passId: Number ,
    passname: String,
    flightId: Number
});

app.get('/pass', async(req, res) => {
    try{
        const pass = await Passenger.find();
        res.json(pass);
    } catch(error){
        res.status(500).json({error: 'Error while getting passenger information'});
    }
});

app.post('/pass' ,async(req, res) => {
    try{
        const pass = new Passenger(req.body);
        await pass.save();
        res.status(201).json(pass);
    }catch(error){
        res.status(500).json({error: 'Error wile posting passenger information'});
    }
});

app.get('/:flightId', async(req, res) => {
    const {flightId} = req.params;
    try {
        const pass = await Passenger.find({flightId: flightId});
        res.status(201).json(pass);
    } catch (error) {
        res.status(500).json({error: 'Error while fetching data '});
    }
});

app.listen( PORT,  () => {
    console.log(`The passenger service is running in ${PORT}`);
});


