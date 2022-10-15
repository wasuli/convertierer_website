const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const fs = require('fs')
const app = express();
const path = require("path");
const routes = require('./Routes');



app.use("/", routes);
app.use(cors());



app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res)=>{
    res.sendFile("MP3converter.html");
})


app.get('/download', (req,res) => {

    var URL = req.query.URL;
    var type = req.query.type;

res.header('Content-Disposition', 'attachment; filename="video.mp3_convertierer.ch"');

ytdl.chooseFormat(["mp3"],{
    quality:["highest"]
});
ytdl(URL, {
format: 'mp3'
}).pipe(res);


})