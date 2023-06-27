const express = require("express")
const userRouter = require('./routes/user')
const cors = require('cors')
require('./database/connection')


const app = express();
const port = 4500;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/user', userRouter);


app.listen(port, () => {
    console.log(`Server is running at ${port}`);
})