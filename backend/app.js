const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const pool = require('./config/db');
const authRoutes = require('./routes/auth/authRoutes');
const UserModel = require('./models/userModels');

const app = express();
const PORT = process.env.PORT 

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Crypto Vault API');
});

app.use('/api/authentication', authRoutes);

app.use('*', (req, res) => {
    res.status(404).send('Not Found');
});

const initializeTables = async () => {
    try {
        await UserModel.createUserSchema();
        console.log('Database tables initialized successfully.');
    } catch (error) {
        console.error('Error initializing database tables:', error);
        process.exit(1);
    }
};

const startServer = async () => {
    try {
        await pool.query('SELECT NOW()');
        console.log('Database connection successful.');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

initializeTables().then(startServer);
