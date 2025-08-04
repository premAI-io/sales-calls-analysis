import React from 'react';

interface SummaryCardProps {
  summary: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ summary }) => {
  return (
    <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-green-500">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white">
          <i className="fas fa-file-alt text-lg"></i>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">Executive Summary</h3>
          <p className="text-gray-600">AI-generated conversation overview</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg">
        <p className="text-gray-700 leading-relaxed">{summary}</p>
      </div>
    </div>
  );
};

export default SummaryCard;