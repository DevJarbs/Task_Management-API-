import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './dbConnection.js';
import taskRoutes from './routes/taskRoutes.js';
dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(express.json());

app.get('/', async(_req,res)=>{
    res.send('Hell yeah');
})
app.use('/api/tasks', taskRoutes);

const startServer = async()=>{
    try{
        await connectDB();
        console.log('Connected to Database');

        app.listen(port,()=>{
            console.log(`Server is running on port http://localhost:${port}`);
        });
    }catch(e){
        console.error("Failed to connect to database", e);
        process.exit(1);
    }
}
startServer();
