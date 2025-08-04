import React from 'react';
import PredictionCard from './results/PredictionCard';
import MetricsCard from './results/MetricsCard';
import AnalysisCard from './results/AnalysisCard';
import SummaryCard from './results/SummaryCard';

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

interface ResultsDisplayProps {
  analysis: AnalysisData | null;
  loading: boolean;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ analysis, loading }) => {
  return (
    <section className="bg-white rounded-2xl shadow-xl p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          <i className="fas fa-chart-bar text-primary mr-2"></i>
          Analysis Results
        </h2>
        <p className="text-gray-600">AI-powered insights and predictions</p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full mb-4"></div>
          <p className="text-gray-600">Analyzing conversation with AI...</p>
        </div>
      ) : analysis ? (
        <div className="space-y-6">
          <PredictionCard prediction={analysis.outcome_prediction} />
          <MetricsCard metrics={analysis.metrics} />
          <AnalysisCard analysis={analysis.analysis} />
          <SummaryCard summary={analysis.summary} />
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <i className="fas fa-chart-bar text-4xl mb-4 opacity-50"></i>
          <p>Enter a conversation and click "Analyze" to see AI insights</p>
        </div>
      )}
    </section>
  );
};

export default ResultsDisplay;