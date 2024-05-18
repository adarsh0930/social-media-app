const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require('./authRoutes');
const userRouter = require('./userRoutes');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());


app.use('/auth', authRouter); 
// app.use('/user', userRouter); 


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
