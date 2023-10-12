const express=require('express');
const app=express();
const cors = require('cors');
const cookieparser=require('cookie-parser');
const notesRoutes=require('../src/routers/notesRoutes')
const userRoutes=require('../src/routers/userRoutes')
const imagesRoutes=require('../src/routers/imagesRoutes')
const errorMiddleware=require('./errorHandling/errorMiddleware')

app.use(express.json());
app.use(cookieparser())
app.use(express.urlencoded({extended:true}));
app.use(cors())

app.use('/api/v1/note-keeper',notesRoutes);
app.use('/api/user',userRoutes);
app.use('/api/images',imagesRoutes);


app.use(errorMiddleware);
module.exports= app
