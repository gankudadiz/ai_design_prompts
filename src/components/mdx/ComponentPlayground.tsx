import React from 'react';
import { TerminalCard } from '@/components/ui/TerminalCard';

interface ComponentPlaygroundProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export const ComponentPlayground: React.FC<ComponentPlaygroundProps> = ({ 
  children, 
  title = "Component Demo",
  description
}) => {
  return (
    <div className="my-8">
      <TerminalCard title={title}>
        <div className="p-8 bg-bg-card flex flex-col items-center justify-center gap-6 min-h-[160px] border-b border-border-medium/30">
          <div className="w-full flex justify-center">
            {children}
          </div>
          {description && (
            <p className="text-text-muted text-sm text-center max-w-md">
              {description}
            </p>
          )}
        </div>
      </TerminalCard>
    </div>
  );
};
