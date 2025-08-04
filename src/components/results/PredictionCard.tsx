import React from 'react';

interface OutcomePrediction {
  will_convert: boolean;
  confidence: number;
  probability_score: number;
}

interface PredictionCardProps {
  prediction: OutcomePrediction;
}

const PredictionCard: React.FC<PredictionCardProps> = ({ prediction }) => {
  return (
    <div className="bg-gradient-to-r from-primary to-secondary text-white p-6 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">
          <i className="fas fa-crystal-ball mr-2"></i>
          Conversion Prediction
        </h3>
        <div className="text-right">
          <div className="text-2xl font-bold">
            {prediction.probability_score}%
          </div>
          <div className="text-white/80 text-sm">likelihood</div>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <i className={`fas ${prediction.will_convert ? 'fa-thumbs-up' : 'fa-thumbs-down'} text-xl`}></i>
            <span className="font-medium">
              {prediction.will_convert ? 'Likely to Convert' : 'Unlikely to Convert'}
            </span>
          </div>
          <div className="text-white/80 text-sm">
            Confidence: {Math.round(prediction.confidence * 100)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionCard;