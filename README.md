# Sales Conversation Analyzer

A modern web application that analyzes sales conversations and predicts outcomes using AI. Built with Node.js, Express, and PremAI integration.

## 🚀 Features

- **Outcome Prediction**: AI predicts whether a conversation will lead to a sale
- **Detailed Metrics**: Customer engagement, sales effectiveness, conversation analysis
- **Key Insights**: Automatic detection of themes, pain points, and strengths
- **Modern UI**: Clean, responsive interface optimized for sales teams
- **Real-time Analysis**: Fast AI-powered analysis using PremAI models
- **Sample Conversations**: Built-in examples for quick testing

## 📋 Prerequisites

- Node.js 16.0.0 or higher
- PremAI API key ([Get it here](https://app.premai.io/))

## 🛠 Setup

### 1. Environment Configuration

Create a `.env` file with your PremAI API key:

```bash
echo "PREMAI_API_KEY=your-premai-api-key-here" > .env
```

Or manually create `.env`:
```
PREMAI_API_KEY=your-premai-api-key-here
```

### 2. Start the Application

**Quick start (recommended):**
```bash
npm run quick-start
```

**Or step by step:**
```bash
npm run setup        # Check environment and install dependencies
npm run launch       # Check environment and start server
```

**For development with auto-restart:**
```bash
npm run dev
```

### 3. Open in Browser

Navigate to [http://localhost:3001](http://localhost:3001)

## 🎯 Usage

### Basic Analysis

1. **Select Model**: Choose your preferred AI model from the dropdown (top right)
2. **Paste Conversation**: Copy your sales conversation transcript into the text area
3. **Format**: Use this format:
   ```
   Customer: [customer message]
   Sales Rep: [sales rep response]
   Customer: [customer follow-up]
   ...
   ```
4. **Analyze**: Click "Analyze Conversation" to get AI insights
5. **Review Results**: Get detailed predictions and recommendations

### Sample Conversation

Click "Load Sample" to try the analyzer with a pre-loaded example conversation.

## 📊 API Reference

### `POST /api/analyze`

Analyzes a sales conversation and returns structured insights.

**Request:**
```json
{
  "conversation": "Customer: Hi...\nSales Rep: Hello..."
}
```

**Response:**
```json
{
  "outcome_prediction": {
    "will_convert": true,
    "confidence": 0.85,
    "probability_score": 78
  },
  "metrics": {
    "customer_engagement": 0.8,
    "sales_effectiveness": 0.7,
    "conversation_length": 12,
    "conversation_style": "consultative",
    "objections_raised": false,
    "price_discussed": true,
    "next_steps_defined": true
  },
  "analysis": {
    "key_themes": ["product_demo", "pricing_discussion"],
    "customer_pain_points": ["budget_constraints", "time_to_value"],
    "sales_strengths": ["rapport_building", "needs_analysis"],
    "areas_for_improvement": ["closing_technique"],
    "recommended_next_steps": ["schedule_demo", "send_proposal"]
  },
  "summary": "Positive conversation with engaged customer who showed interest in pricing and next steps."
}
```

### `GET /health`

Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-08-04T19:30:00.000Z",
  "premai": true
}
```

## 🏗 Architecture

### Backend (`server.js`)
- **Express.js** server with RESTful API
- **PremAI integration** for AI-powered analysis
- **Error handling** with fallback analysis
- **CORS enabled** for development

### Frontend (`public/`)
- **Vanilla JavaScript** for optimal performance
- **Tailwind CSS** for modern, responsive design
- **Progressive enhancement** with loading states
- **Accessible UI** following WCAG guidelines

### AI Integration
- **Multiple Models Available**:
  - **Llama 3.2 3B** (Default) - Fast and efficient
  - **Llama 3.2 7B** - More detailed analysis
  - **Llama 3.1 8B** - Enhanced understanding
  - **GPT-4o Mini** - OpenAI's compact model
  - **Claude 3 Haiku** - Anthropic's fast model
- **Structured prompts** for consistent JSON responses
- **Fallback analysis** when AI is unavailable
- **Confidence scoring** for prediction reliability

## 🎨 UI Components

### Input Section
- Large textarea for conversation input
- Auto-resize functionality
- Sample conversation loader
- Form validation and error handling

### Results Dashboard
- Outcome prediction with confidence visualization
- Metrics grid with key performance indicators
- Analysis cards with themes and recommendations
- Executive summary with actionable insights

### Visual Design
- **Color Scheme**: Custom primary/secondary gradients with Tailwind
- **Typography**: System fonts optimized for readability
- **Layout**: Tailwind's responsive grid system
- **Animations**: Built-in Tailwind transitions and hover effects

## 🔧 Configuration

### Environment Variables
```bash
PREMAI_API_KEY=your-api-key     # Required
PORT=3000                       # Optional, defaults to 3000
```

### Available NPM Scripts

| Command | Description |
|---------|-------------|
| `npm run quick-start` | ✅ **Recommended** - Complete setup and start |
| `npm run setup` | Check environment and install dependencies |
| `npm run launch` | Check environment and start server |
| `npm run check-env` | Verify .env file and API key configuration |
| `npm start` | Start the server (basic) |
| `npm run dev` | Start with auto-restart for development |

### AI Model Settings
Configure in `server.js`:
```javascript
model: "llama3.2-3b",           # PremAI model
max_tokens: 1500,               # Response length
temperature: 0.3                # Creativity (0.0-1.0)
```

## 🚨 Error Handling

The application includes comprehensive error handling:

1. **Input Validation**: Checks conversation format and content
2. **API Errors**: Graceful handling of PremAI API issues
3. **Fallback Analysis**: Rule-based analysis when AI fails
4. **User Feedback**: Clear error messages and guidance
5. **Logging**: Server-side error logging for debugging

## 📱 Responsive Design

- **Desktop**: Two-column layout with side-by-side input/results
- **Tablet**: Stacked layout with optimized spacing
- **Mobile**: Single-column layout with touch-friendly controls

## 🔍 Troubleshooting

### Common Issues

**"PREMAI_API_KEY not found"**
- Ensure `.env` file exists in parent directory (`../`)
- Check API key is correctly formatted
- Verify no extra spaces or quotes

**"Invalid conversation format"**
- Ensure conversation includes both "Customer:" and "Sales Rep:" labels
- Check for proper line breaks between speakers
- Use the sample conversation as a template

**"Analysis failed"**
- Check internet connection
- Verify PremAI API status
- Review server logs for detailed error information

### Debug Mode

Enable detailed logging by setting environment variable:
```bash
DEBUG=true npm start
```

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Docker (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 📈 Performance

- **Response Time**: Typically 2-5 seconds for AI analysis
- **Conversation Length**: Supports conversations up to 10MB
- **Concurrent Users**: Optimized for small-medium teams
- **Fallback Analysis**: Instant response when AI unavailable

## 🔐 Security

- **Input Sanitization**: All inputs validated server-side
- **API Key Security**: Environment variable storage
- **CORS Configuration**: Configurable for different environments
- **Rate Limiting**: Consider adding for production use

## 📝 License

MIT License - feel free to use and modify for your needs.

## 🤝 Support

For issues or questions:
1. Check this README for common solutions
2. Review server logs for detailed error messages
3. Verify PremAI API key and service status
4. Ensure conversation formatting requirements are met

## 🔮 Future Enhancements

- [ ] Conversation history and storage
- [ ] Batch analysis for multiple conversations
- [ ] Custom model training capabilities
- [ ] Export results to PDF/CSV
- [ ] Team collaboration features
- [ ] Integration with CRM systems
- [ ] Advanced analytics dashboard
- [ ] Real-time conversation coaching