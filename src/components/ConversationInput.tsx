import React, { useRef, useEffect } from 'react';

interface ConversationInputProps {
  conversation: string;
  onConversationChange: (conversation: string) => void;
  onAnalyze: (conversation: string) => Promise<void>;
  onLoadSample: () => void;
  loading: boolean;
  error: string;
  onClearError: () => void;
}

const ConversationInput: React.FC<ConversationInputProps> = ({
  conversation,
  onConversationChange,
  onAnalyze,
  onLoadSample,
  loading,
  error,
  onClearError
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [conversation]);

  const handleAnalyze = (): void => {
    if (conversation.trim() && !loading) {
      onAnalyze(conversation);
    }
  };

  return (
    <section className="bg-white rounded-2xl shadow-xl p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          <i className="fas fa-comments text-primary mr-2"></i>
          Conversation Input
        </h2>
        <p className="text-gray-600">Paste your sales conversation transcript below</p>
      </div>

      <div className="mb-4">
        <label htmlFor="conversationInput" className="block text-sm font-semibold text-gray-700 mb-2">
          Conversation Transcript
        </label>
        <textarea
          ref={textareaRef}
          id="conversationInput"
          value={conversation}
          onChange={(e) => onConversationChange(e.target.value)}
          className="w-full min-h-[400px] p-4 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-primary focus:ring-2 focus:ring-opacity-20 transition-all duration-200 font-mono text-sm resize-y"
          placeholder="Customer: Hi, I'm interested in learning more about your product...

Sales Rep: Great! I'd love to help you with that. What's your biggest challenge right now?

Customer: We're struggling with..."
          required
        />
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <i className="fas fa-exclamation-triangle text-red-500 mr-2"></i>
              <span className="text-red-700">{error}</span>
            </div>
            <button
              onClick={onClearError}
              className="text-red-500 hover:text-red-700 focus:outline-none"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onLoadSample}
          disabled={loading}
          className="flex-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
        >
          <i className="fas fa-magic"></i> Load Sample
        </button>
        <button
          type="button"
          onClick={handleAnalyze}
          disabled={loading || !conversation.trim()}
          className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Analyzing...
            </>
          ) : (
            <>
              <i className="fas fa-brain"></i> Analyze Conversation
            </>
          )}
        </button>
      </div>
    </section>
  );
};

export default ConversationInput;