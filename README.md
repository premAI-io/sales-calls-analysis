# Sales Conversation Analyzer

AI-powered sales conversation analysis using your PremAI fine-tuned models.
![Sales Conversation Analyzer](https://github.com/user-attachments/assets/183a544a-92e5-4b48-8065-0e4533854a3c)

## Model Training

1. Visit [studio.premai.io](https://studio.premai.io)
2. Create dataset from `/data/training_data_500_clean.jsonl` (500 sample phone call transcripts)
3. Create snapshot
4. Fine-tune the model and see which one learns best
5. Run `npm start` and use UI to test the model

## Setup

```bash
npm install
cp env.example .env
# Add your PREMAI_API_KEY to .env
```

## Run

```bash
npm start
```

- Frontend: http://localhost:3066
- API: http://localhost:3033

## Clean Ports

```bash
```

**Structure:**
- `src/` - React TypeScript components
- `api/` - Express route handlers  
- `data/` - Training datasets (.jsonl, .csv)
- `public/` - Static files