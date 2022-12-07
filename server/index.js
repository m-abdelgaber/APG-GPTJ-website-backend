const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const poemModel = require('./models/poem.js');
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors());

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI);




mongoose.connection.on('connected', function(){
    console.log('db is connected successfully');
});
mongoose.connection.on('error', function(){
    console.log('db is errored successfully');
});
mongoose.connection.on('disconnected', function(){
    console.log('db is disconnected successfully');
});

app.get('/getPoems', (req, res)=>{
    poemModel.find({},(err, result)=>{
        if(err){
            res.json(err);
        }else{
            res.json(result);
        }
    })
});
app.get('/getModels', (req, res)=>{
    poemModel.find().distinct('model', function(err, result) {
        if (err){
            res.json(err)
        }
        else{
            res.json(result);
        }
    });
});
app.get('/getMeters', (req, res)=>{
    poemModel.find().distinct('meter', function(err, result) {
        if (err){
            res.json(err)
        }
        else{
            res.json(result);
        }
    });
});
app.get('/getTopics', (req, res)=>{
    poemModel.find().distinct('topic', function(err, result) {
        if (err){
            res.json(err)
        }
        else{
            res.json(result);
        }
    });
});
app.get('/getQafyas', (req, res)=>{
    poemModel.find().distinct('qafya', function(err, result) {
        if (err){
            res.json(err)
        }
        else{
            res.json(result);
        }
    });
});

app.get('/getPoemsOfMeterModel', (req, res)=>{
    const model = req.query.model;
    const meter = req.query.meter;
    const topic = req.query.topic;
    const qafya = req.query.qafya;
    var params = {}
    switch(model){
        case "Meter": 
            params = {model: model, meter: meter};
            break;
        case "Topic":
            params = {model: model, topic: topic};
            break;
        case "Meter & Qafya":
            params = {model: model, meter: meter, qafya:qafya};
            break;
        case "Topic & Qafya":
            params = {model: model, topic: topic, qafya:qafya};
            break;
    }
    // console.log(meter);
    poemModel.find(params).distinct('out', function (err, result) {
        if (err){
            res.json(err)
        }
        else{
            res.json(result);
        }
    });
});

app.listen(3001, ()=>{
    console.log('server is running successfully');
});
