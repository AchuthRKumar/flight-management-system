const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

const app = express();
const PORT = 3001;

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/airlineInfo');

const airline = mongoose.model('airline', {
    airlineId: Number,
    name: String,
    number_of_flights: Number
});

app.get('/airline', async(req, res) => {
    try{
        const airlines = await airline.find();
        res.json(airlines);
    } catch(error) {
        res.status(500).json({error: 'Error while fetching airlines'});
    }
});

app.post('/airline', async(req, res) => {
    try{
        const air = new airline(req.body);
        await air.save();
        res.status(201).json(air);
    } catch(error) {
        res.status(500).json({error: 'Error while creating the airline'});
    }
});

app.get('/airline/:id', async(req, res) =>{
    const {id} = req.params;
    try {
        const flights = await axios.get(`http://localhost:3003/${id}`);
        res.status(201).json(flights.data);
    } catch (error) {
     res.status(500).json({error: 'Error while fetching flights v'});
    }
});

app.listen(PORT, () => {
    console.log(`Airline service is running on ${PORT}`);
});