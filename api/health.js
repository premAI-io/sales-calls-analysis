
function handleHealth(req, res) {
    res.json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        premai: !!process.env.PREMAI_API_KEY
    });
}

module.exports = { handleHealth };