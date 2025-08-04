import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ConversationInput from './components/ConversationInput';
import ResultsDisplay from './components/ResultsDisplay';
import Footer from './components/Footer';
import { sampleConversation } from './data/sampleData';
import { API_CONFIG, UI_CONFIG } from './constants/config';

interface Model {
  id: string;
  name: string;
  owned_by?: string;
}

interface AnalysisData {
  outcome_prediction: {
    will_convert: boolean;
    confidence: number;
    probability_score: number;
  };
  metrics: {
    customer_engagement: number;
    sales_effectiveness: number;
    conversation_length: number;
    conversation_style: string;
    objections_raised: boolean;
    price_discussed: boolean;
    next_steps_defined: boolean;
  };
  analysis: {
    key_themes: string[];
    customer_pain_points: string[];
    sales_strengths: string[];
    areas_for_improvement: string[];
    recommended_next_steps: string[];
  };
  summary: string;
}

function App(): JSX.Element {
  const [selectedModel, setSelectedModel] = useState<string>(API_CONFIG.DEFAULT_MODEL);
  const [conversation, setConversation] = useState<string>('');
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [models, setModels] = useState<Model[]>([]);
  const [modelsLoading, setModelsLoading] = useState<boolean>(true);

  const analyzeConversation = async (conversationText: string): Promise<void> => {
    if (!conversationText.trim()) {
      setError('Please enter a conversation transcript');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ANALYZE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          conversation: conversationText,
          model: selectedModel 
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Analysis failed');
      }

      const analysisData: AnalysisData = await response.json();
      setAnalysis(analysisData);

    } catch (error) {
      setError(`Analysis failed: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  const loadSampleConversation = (): void => {
    setConversation(sampleConversation);
  };

  const clearError = (): void => {
    setError('');
  };

  const fetchModels = async (): Promise<void> => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.MODELS}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch models');
      }
      
      const data = await response.json();
      
      if (!data.models || data.models.length === 0) {
        throw new Error('No models available in your PremAI account');
      }
      
      setModels(data.models);
      
      setSelectedModel(data.models[0].id);
      

      
    } catch (error) {
      setError(`Model loading failed: ${(error as Error).message}`);
    } finally {
      setModelsLoading(false);
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, UI_CONFIG.ERROR_DISPLAY_DURATION);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary">
      <div className="min-h-screen flex flex-col">
        <Header
          selectedModel={selectedModel}
          onModelChange={setSelectedModel}
          models={models}
          modelsLoading={modelsLoading}
        />
        
        <main className="flex-1 p-8 pb-24">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ConversationInput
              conversation={conversation}
              onConversationChange={setConversation}
              onAnalyze={analyzeConversation}
              onLoadSample={loadSampleConversation}
              loading={loading}
              error={error}
              onClearError={clearError}
            />

            <ResultsDisplay
              analysis={analysis}
              loading={loading}
            />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;