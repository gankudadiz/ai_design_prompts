import { clsx } from 'clsx';
import { ReactNode } from 'react';

interface TerminalCardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  command?: string;
}

export function TerminalCard({ children, className, title, command }: TerminalCardProps) {
  return (
    <div className={clsx(
      "bg-bg-card border border-border-medium shadow-sm overflow-hidden",
      className
    )}>
      {/* Optional Header */}
      {(title || command) && (
        <div className="flex items-center justify-between px-4 py-2 bg-bg-secondary border-b border-border-medium">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50"></div>
          </div>
          {title && (
            <div className="text-xs text-text-muted font-mono select-none">{title}</div>
          )}
          {command && (
            <div className="text-xs text-mint-500 font-mono flex items-center gap-1">
              <span className="opacity-50">$</span>
              {command}
            </div>
          )}
        </div>
      )}
      
      {/* Content */}
      <div className="p-4 sm:p-6">
        {children}
      </div>
    </div>
  );
}
