const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const fs = require('fs')
const path = require("path");
const app = express();




app.use(cors());
app.use(express.static(path.join(__dirname,"public")));

app.get('/',(req,res)=>{
    return res.sendFile(path.join(__dirname,'/public',"index.html"));
})


app.get('/download/mp4', async (req,res) => {

    var URL = req.query.URL;

res.header('Content-Disposition', 'attachment; filename="video.mp4_convertierer.mp4"');
let info = await ytdl.getInfo(URL);
let format = ytdl.filterFormats(info.formats,'audioandvideo')
let choosed = ytdl.chooseFormat(format,{
    quality: format[format.length -1].itag
});
ytdl(URL, {
format: choosed
}).pipe(res);
})



app.get('/mp3Converter',(req,res)=>{
    return res.sendFile(path.join(__dirname,'/public',"MP3converter.html"));
})


app.get('/download/mp3', async(req,res) => {

    var URL = req.query.URL;

res.header('Content-Disposition', 'attachment; filename="video.mp3_convertierer.mp3"');

let info = await ytdl.getInfo(URL);
let format = ytdl.filterFormats(info.formats,'audioonly')
let choosed = ytdl.chooseFormat(format,{
    quality: "highestaudio" 
});
ytdl(URL, {
format: choosed
}).pipe(res);











})
app.listen(process.env.PORT || 4000, () => {

    console.log('Server Works !!! At port 4000');
    
    });


