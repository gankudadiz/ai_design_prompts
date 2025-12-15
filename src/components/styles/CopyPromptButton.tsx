'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function CopyPromptButton({ prompt }: { prompt: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-2 bg-bg-tertiary hover:bg-bg-primary border border-border-medium rounded-md transition-colors text-text-muted hover:text-mint-500"
      title="Copy to clipboard"
    >
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
    </button>
  );
}
