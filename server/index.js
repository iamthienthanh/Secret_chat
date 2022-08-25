import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
const db = mongoose.connection
db.on('error', () => console.error('MongoDB connection error'))
db.once('open', () => console.log('Connected to MongoDB successfully'))


app.get('/', (req, res) => {
    res.send('Welcome');
})

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log('Listening on port ' + port);
});