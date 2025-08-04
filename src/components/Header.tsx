import React from 'react';

interface Model {
  id: string;
  name: string;
  owned_by?: string;
}

interface HeaderProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
  models: Model[];
  modelsLoading: boolean;
}

const Header: React.FC<HeaderProps> = ({ selectedModel, onModelChange, models, modelsLoading }) => {
  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-white/20 py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:items-center justify-between gap-4">

        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
            <i className="fas fa-chart-line text-primary mr-2"></i>
            Sales Conversation Analyzer
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            AI-powered outcome prediction and conversation insights
          </p>
        </div>
        

        <div className="flex items-center gap-3">
          <label htmlFor="modelSelect" className="text-sm font-semibold text-gray-700 whitespace-nowrap">
            Model:
          </label>
          <select 
            id="modelSelect"
            value={selectedModel}
            onChange={(e) => onModelChange(e.target.value)}
            disabled={modelsLoading}
            className="bg-white border-2 border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-primary focus:ring-primary focus:ring-2 focus:ring-opacity-20 transition-all duration-200 min-w-0 disabled:opacity-50"
          >
            {modelsLoading ? (
              <option>Loading models...</option>
            ) : models.length > 0 ? (
              models.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.id}
                </option>
              ))
            ) : (
              <option disabled>No models available</option>
            )}
          </select>
          {modelsLoading && (
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;