const PremAI = require('premai');


const premaiClient = new PremAI({
    apiKey: process.env.PREMAI_API_KEY
});


async function handleModels(req, res) {
    try {
        console.log('🔍 Fetching available models from PremAI...');
        
        const response = await premaiClient.models.list();
        
        if (!response || !response.data) {
            throw new Error('No models data received from PremAI');
        }

  
        const models = response.data
            .filter(model => model.owned_by !== 'premai')
            .map(model => ({
                id: model.id,
                name: model.name || model.id,
                owned_by: model.owned_by
            }));

        console.log(`✅ Found ${models.length} available models`);
        
        res.json({
            models: models,
            total: models.length,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('❌ Error fetching models:', error);
        
        res.status(500).json({
            error: 'Failed to fetch models from PremAI',
            message: error.message,
            timestamp: new Date().toISOString()
        });
    }
}



module.exports = { handleModels };