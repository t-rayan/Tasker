import router from './router/index';


import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';

import dotenv from 'dotenv';

dotenv.config()
const {DB_URL} = process.env;

const app = express();
app.use(cookieParser());

app.use(bodyParser.json());
app.use(cors())

app.use('/', router())
app.use(compression());
// database connection
const dbConnect = async() => {
  try {
    console.log('connecting to database ........')
    await mongoose.connect(DB_URL);
    console.log('Connected to primaryDb')
  } catch (error) {
    console.log(error)
  }
}
dbConnect()


const server = http.createServer(app);

server.listen(8080, () => {
  console.log('server running on port 8080')
})


