const express = require("express")
const bodyparser = require('body-parser')
const userRouter = require('./routes/user')
const cors = require('cors')
require('./database/connection')

const app = express()
const port = 4500;
app.use(cors());
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/user', userRouter);

app.get('/', (req, res) => {
    res.send('Welcome')
})
app.listen(port, () => {
    console.log(`Server is running at ${port}`);
})