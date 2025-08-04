import React from 'react';

interface Metrics {
  customer_engagement: number;
  sales_effectiveness: number;
  conversation_length: number;
  conversation_style: string;
  objections_raised: boolean;
  price_discussed: boolean;
  next_steps_defined: boolean;
}

interface MetricsCardProps {
  metrics: Metrics;
}

const MetricsCard: React.FC<MetricsCardProps> = ({ metrics }) => {
  const formatPercentage = (value: number): string => {
    return Math.round(value * 100) + '%';
  };

  const formatStyle = (style: string): string => {
    if (!style) return 'Not identified';
    return style.split(/[-_]/).map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const metricsData = [
    { 
      label: 'Customer Engagement', 
      value: formatPercentage(metrics.customer_engagement)
    },
    { 
      label: 'Sales Effectiveness', 
      value: formatPercentage(metrics.sales_effectiveness)
    },
    { 
      label: 'Conversation Length', 
      value: `${metrics.conversation_length} exchanges`
    },
    { 
      label: 'Conversation Style', 
      value: formatStyle(metrics.conversation_style)
    },
    { 
      label: 'Objections Raised', 
      value: metrics.objections_raised ? 'Yes' : 'No'
    },
    { 
      label: 'Price Discussed', 
      value: metrics.price_discussed ? 'Yes' : 'No'
    }
  ];

  return (
    <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-blue-500">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white">
          <i className="fas fa-chart-bar text-lg"></i>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">Key Metrics</h3>
          <p className="text-gray-600">Conversation performance indicators</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metricsData.map((metric, index) => (
          <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              {metric.label}
            </div>
            <div className="text-lg font-bold text-gray-800">{metric.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetricsCard;