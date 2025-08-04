const PremAI = require('premai');

const premaiClient = new PremAI({
    apiKey: process.env.PREMAI_API_KEY
});


const SYSTEM_PROMPT = `You are an expert sales conversation analyst. Analyze sales conversations between sales representatives and customers, providing insights on customer pain points, sales techniques effectiveness, conversation outcomes, and actionable recommendations for improvement.

Return your analysis as a JSON object with this exact structure:
{
  "outcome_prediction": {
    "will_convert": boolean,
    "confidence": number (0-1),
    "probability_score": number (0-100)
  },
  "metrics": {
    "customer_engagement": number (0-1),
    "sales_effectiveness": number (0-1),
    "conversation_length": number,
    "conversation_style": string,
    "objections_raised": boolean,
    "price_discussed": boolean,
    "next_steps_defined": boolean
  },
  "analysis": {
    "key_themes": [strings],
    "customer_pain_points": [strings],
    "sales_strengths": [strings],
    "areas_for_improvement": [strings],
    "recommended_next_steps": [strings]
  },
  "summary": "Brief 2-3 sentence summary of the conversation and prediction reasoning"
}`;


function hasValidConversationFormat(conversation) {
    const lower = conversation.toLowerCase();
    const hasCustomer = /customer\s*:|client\s*:|prospect\s*:/.test(lower);
    const hasSales = /sales\s*rep\s*:|sales\s*:|rep\s*:|agent\s*:/.test(lower);
    return hasCustomer && hasSales;
}

async function analyzeConversation(conversationText, model = "llama3.2-3b") {
    const prompt = `Analyze this sales conversation and predict the outcome:

${conversationText}

Provide a detailed analysis following the JSON structure specified in the system prompt.`;

    try {
        const response = await premaiClient.chat.completions({
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: prompt }
            ],
            model: model,
            max_tokens: 1500,
            temperature: 0.3
        });

        let analysisText = response.choices[0].message.content.trim();
        
        // Extract JSON from response
        const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            analysisText = jsonMatch[0];
        }

        const analysis = JSON.parse(analysisText);
        
        // Validate structure
        if (!analysis.outcome_prediction || !analysis.metrics || !analysis.analysis) {
            throw new Error('Invalid analysis structure');
        }

        return analysis;

    } catch (error) {
        console.error('PremAI analysis failed:', error);
        throw error;
    }
}




async function handleAnalyze(req, res) {
    try {
        const { conversation, model } = req.body;

        if (!conversation || typeof conversation !== 'string' || conversation.trim().length === 0) {
            return res.status(400).json({
                error: 'Invalid input',
                message: 'Conversation text is required'
            });
        }

        // Validate conversation format
        if (!hasValidConversationFormat(conversation)) {
            return res.status(400).json({
                error: 'Invalid format',
                message: 'Conversation must include both customer and sales rep messages'
            });
        }

        const selectedModel = model || 'llama3.2-3b';
        console.log(`🔍 Analyzing conversation (${conversation.length} characters) with ${selectedModel}...`);

        // Analyze with PremAI
        const analysis = await analyzeConversation(conversation, selectedModel);
        
        console.log('✅ Analysis completed');
        res.json(analysis);

    } catch (error) {
        console.error('❌ Analysis error:', error);
        
        res.status(500).json({
            error: 'Analysis failed',
            message: error.message,
            timestamp: new Date().toISOString()
        });
    }
}

module.exports = { handleAnalyze };