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

## Fine-Tuning Results

<details>
<summary><strong>Conversation 1</strong> - <a href="data/positive_customer.txt">Input Transcript</a></summary>

**Model 1 (Fine-tuned):**
```json
{
    "outcome_prediction": {
        "will_convert": true,
        "confidence": 0.85,
        "probability_score": 75
    }
}
```

**Model 2 (Base):**
```json
{
    "outcome_prediction": {
        "will_convert": false,
        "confidence": 0.15,
        "probability_score": 23
    }
}
```

[Full Fine-tuned Response](data/responses/conversation1_finetuned.json) | [Full Base Response](data/responses/conversation1_base.json)
</details>

<details>
<summary><strong>Conversation 2</strong> - <a href="data/amateur_salesperson.txt">Input Transcript</a></summary>

**Model 1 (Fine-tuned):**
```json
{
    "outcome_prediction": {
        "will_convert": false,
        "confidence": 0.1,
        "probability_score": 20
    }
}
```

**Model 2 (Base):**
```json
{
    "outcome_prediction": {
        "will_convert": false,
        "confidence": 0.25,
        "probability_score": 35
    }
}
```

[Full Fine-tuned Response](data/responses/conversation2_finetuned.json) | [Full Base Response](data/responses/conversation2_base.json)
</details>

<details>
<summary><strong>Conversation 3</strong> - <a href="data/positive_too_expensive.txt">Input Transcript</a></summary>

**Model 1 (Fine-tuned):**
```json
{
    "outcome_prediction": {
        "will_convert": false,
        "confidence": 0.35,
        "probability_score": 42
    }
}
```

**Model 2 (Base):**
```json
{
    "outcome_prediction": {
        "will_convert": false,
        "confidence": 0.15,
        "probability_score": 25
    }
}
```

[Full Fine-tuned Response](data/responses/conversation3_finetuned.json) | [Full Base Response](data/responses/conversation3_base.json)
</details>

<details>
<summary><strong>Conversation 4</strong> - <a href="data/impolite_salesperson.txt">Input Transcript</a></summary>

**Model 1 (Fine-tuned):**
```json
{
    "outcome_prediction": {
        "will_convert": true,
        "confidence": 0.85,
        "probability_score": 75
    }
}
```

**Model 2 (Base):**
```json
{
    "outcome_prediction": {
        "will_convert": true,
        "confidence": 0.85,
        "probability_score": 75
    }
}
```

[Full Fine-tuned Response](data/responses/conversation4_finetuned.json) | [Full Base Response](data/responses/conversation4_base.json)
</details>

**Structure:**
- `src/` - React TypeScript components
- `api/` - Express route handlers  
- `data/` - Training datasets and transcripts
  - `training_data_500_clean.jsonl` - Training dataset
  - `*.txt` - Sample conversation transcripts
  - `responses/` - Individual model response files
- `compare.json` - Model comparison analysis results (original)
- `public/` - Static files