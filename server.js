const express = require('express');
const path = require('path');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 4000;

const NASA_API_KEY = 'yO04rMmVOGn824sB5W1nT0AxBqlAvF0eEfZ6Swrv';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(express.static('public'));

app.get('/api/neo-feed', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];

    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${NASA_API_KEY}`;

    const response = await axios.get(url);

    res.json(response.data); // SEND RAW NASA DATA
  } catch (err) {
    console.error('NASA API ERROR:', err.message);
    res.status(500).json({ error: 'NASA API offline' });
  }
});

// --- Mock Database (In-Memory for Demo) ---
// If you have MongoDB installed via npm install mongoose, uncomment the connection logic below.
const users = []; 
const accessLogs = [];

/* // MongoDB Connection (Uncomment if you have a .env file with MONGO_URI)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));
*/

// --- API Routes ---

// Auth Endpoint
app.post('/api/auth', (req, res) => {
    const { identifier, role, passKey } = req.body;
    
    // Simulate Login
    console.log(`Login Attempt: ${identifier} (${role})`);
    
    const user = { identifier, role, token: 'demo-token-' + Date.now() };
    users.push(user);
    
    // Log Access
    accessLogs.push({
        user: identifier,
        timestamp: new Date(),
        action: 'LOGIN'
    });

    res.json({
        success: true,
        message: 'Access Granted',
        data: user
    });
});

// NASA Proxy Endpoint (Optional: Hides API Key from Frontend)
// This effectively solves CORS issues by making the request from the backend
app.get('/api/neo-feed', async (req, res) => {
    const { start_date } = req.query;
    const apiKey = 'yO04rMmVOGn824sB5W1nT0AxBqlAvF0eEfZ6Swrv'; // Replace with your real NASA Key if you have one
    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start_date}&api_key=${apiKey}`;

    try {
        // Dynamic import for node-fetch (since v3 is ESM only) or use axios if installed
        // For simplicity in this specific file structure, we'll try to fetch natively (Node 18+)
        // If on older Node, install axios: npm install axios
        const axios = require('axios');

        const response = await axios.get(url);
        const data = response.data;

        res.json(data);
    } catch (error) {
        console.error("NASA API Error:", error);
        res.status(500).json({ error: "Failed to fetch from NASA" });
    }
});

// Serve Frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
