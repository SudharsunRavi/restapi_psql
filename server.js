const express=require('express');
const app=express();

const studentRoute=require('./routes/studentRoute');

app.use(express.json());
app.use('/api/v1/students', studentRoute);

app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
})