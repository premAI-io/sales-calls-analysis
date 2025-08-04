import React from 'react';

interface Analysis {
  key_themes: string[];
  customer_pain_points: string[];
  sales_strengths: string[];
  areas_for_improvement: string[];
  recommended_next_steps: string[];
}

interface AnalysisCardProps {
  analysis: Analysis;
}

const AnalysisCard: React.FC<AnalysisCardProps> = ({ analysis }) => {
  const formatText = (text: string): string => {
    return text
      .split(/[-_]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const analysisItems = [
    {
      title: 'Key Themes',
      items: analysis.key_themes,
      icon: 'fa-tags',
      color: 'purple'
    },
    {
      title: 'Customer Pain Points',
      items: analysis.customer_pain_points,
      icon: 'fa-exclamation-triangle',
      color: 'red'
    },
    {
      title: 'Sales Strengths',
      items: analysis.sales_strengths,
      icon: 'fa-thumbs-up',
      color: 'green'
    },
    {
      title: 'Areas for Improvement',
      items: analysis.areas_for_improvement,
      icon: 'fa-arrow-up',
      color: 'orange'
    },
    {
      title: 'Recommended Next Steps',
      items: analysis.recommended_next_steps,
      icon: 'fa-lightbulb',
      color: 'blue'
    }
  ];

  const colorClasses = {
    purple: 'border-purple-500 bg-purple-500',
    red: 'border-red-500 bg-red-500',
    green: 'border-green-500 bg-green-500',
    orange: 'border-orange-500 bg-orange-500',
    blue: 'border-blue-500 bg-blue-500'
  };

  return (
    <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-indigo-500">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center text-white">
          <i className="fas fa-brain text-lg"></i>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">AI Analysis</h3>
          <p className="text-gray-600">Detailed conversation insights</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {analysisItems.map((item, index) => (
          <div key={index} className={`bg-white rounded-lg p-4 border-l-4 ${colorClasses[item.color as keyof typeof colorClasses]?.split(' ')[0]}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-8 h-8 ${colorClasses[item.color as keyof typeof colorClasses]?.split(' ')[1]} rounded-lg flex items-center justify-center text-white`}>
                <i className={`fas ${item.icon} text-sm`}></i>
              </div>
              <h4 className="font-semibold text-gray-800">{item.title}</h4>
            </div>
            <ul className="space-y-2">
              {item.items.map((listItem, itemIndex) => (
                <li key={itemIndex} className="text-gray-700 text-sm flex items-start gap-2">
                  <i className="fas fa-circle text-xs text-gray-400 mt-1.5"></i>
                  <span>{formatText(listItem)}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalysisCard;