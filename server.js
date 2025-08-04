const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();


const { handleAnalyze, handleHealth, handleModels } = require('./api');

const app = express();
const PORT = process.env.PORT || 3033;


if (!process.env.PREMAI_API_KEY) {
    console.error('❌ PREMAI_API_KEY not found. Please check your .env file.');
    process.exit(1);
}


app.use(cors());
app.use(express.json({ limit: '10mb' }));


app.use(express.static(path.join(__dirname, 'build')));


app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});


app.get('/health', handleHealth);
app.get('/api/models', handleModels);
app.post('/api/analyze', handleAnalyze);


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.use((error, req, res, next) => {
    console.error('Server error:', error);
    res.status(500).json({
        error: 'Internal server error',
        message: 'Something went wrong processing your request'
    });
});


app.listen(PORT, () => {
    console.log('');
    console.log('🚀 Sales Conversation Analyzer');
    console.log('==============================');
    console.log(`📡 Server running on http://localhost:${PORT}`);
    console.log(`🤖 PremAI: ${process.env.PREMAI_API_KEY ? '✅ Connected' : '❌ Missing API Key'}`);
    console.log('');
    console.log('📋 Available:');
    console.log('   🌐 Web App       - Full sales analyzer interface');
    console.log('   🔍 GET /health   - Health check endpoint');
    console.log('   🤖 GET /api/models - Available AI models');
    console.log('   🧠 POST /api/analyze - AI analysis endpoint');
    console.log('');
    console.log('📁 Structure:');
    console.log('   api/analyze.js   - Analysis logic');
    console.log('   api/health.js    - Health check');
    console.log('   src/            - React components');
    console.log('');
    console.log('⏹️  Press Ctrl+C to stop');
});

module.exports = app;