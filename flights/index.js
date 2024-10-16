const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const { createProxyMiddleware } = require('http-proxy-middleware');


const app = express();
const PORT = 3003;

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/flight');

const Flight = mongoose.model('Flight', {
   flightId: Number,
   flightName: String,
   airlineId: Number
});

app.get('/flights', async(req, res) => {
    try {
        const flight = await Flight.find();
        res.json(flight);
    } catch (error) {
        res.status(500).json({error: 'Error while fetching data'});
    }
});

app.post('/flights' , async(req, res) => {
    try {
        const flight = new Flight(req.body);
        await flight.save();
        res.status(201).json(flight);
    } catch (error) {
        res.status(500).json({error: 'Error while posting flight data'});
    }
});

app.get('/flightid/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const pass = await axios.get(`http://localhost:3002/${id}`);
        res.status(201).json(pass.data);
    } catch (error) {
        res.status(500).json({error: 'Error while fetching passenger details'});
    }
})


app.get('/:airlineId', async(req ,res) => {
    const {airlineId} = req.params;
    try {
        const flights = await Flight.find({airlineId: airlineId});
        res.status(201).json(flights);
    } catch (error) {
        res.status(500).json({error: 'Error wihle fetching flights in flights'});
    }
});

app.listen(PORT, () => {
    console.log(`Flight service running on port ${PORT}`);
  });