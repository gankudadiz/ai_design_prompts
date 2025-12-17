import React from 'react';
import { TerminalCard } from '@/components/ui/TerminalCard';
import { ComponentPlayground } from './ComponentPlayground';
import { InteractiveSlider } from './InteractiveSlider';
import { Quote } from 'lucide-react';
import { clsx } from 'clsx';
import Link from 'next/link';

export const MdxComponents = {
  ComponentPlayground,
  TerminalCard,
  InteractiveSlider,
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={clsx(
        "text-2xl md:text-3xl font-bold text-mint-500 mb-6 pb-3 border-b border-border-medium flex items-center gap-3 mt-6",
        className
      )}
      {...props}
    >
      <span className="text-accent-pink text-xl select-none">{`>_`}</span>
      {props.children}
    </h1>
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={clsx(
        "text-lg md:text-xl font-bold text-text-primary mt-8 mb-4 flex items-center gap-2 group",
        className
      )}
      {...props}
    >
      <span className="text-mint-500/50 group-hover:text-mint-500 transition-colors select-none">##</span>
      {props.children}
    </h2>
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={clsx(
        "text-base md:text-lg font-bold text-text-secondary mt-6 mb-3 flex items-center gap-2",
        className
      )}
      {...props}
    >
      <span className="text-accent-purple/70 select-none">###</span>
      {props.children}
    </h3>
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={clsx(
        "text-text-secondary leading-relaxed mb-4 text-sm md:text-base tracking-wide",
        className
      )}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul 
      className={clsx(
        "mb-4 space-y-2 pl-6 list-disc marker:text-mint-500 text-text-secondary leading-relaxed text-sm md:text-base", 
        className
      )} 
      {...props} 
    />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol 
      className={clsx(
        "mb-4 space-y-2 pl-6 list-decimal marker:text-mint-500 marker:font-mono text-text-secondary leading-relaxed text-sm md:text-base", 
        className
      )} 
      {...props} 
    />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={clsx("pl-1", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={clsx(
        "border-l-4 border-mint-500 bg-bg-secondary/30 p-4 my-6 rounded-r-lg relative overflow-hidden",
        className
      )}
    >
      <div className="absolute top-2 right-2 text-mint-500/10 select-none">
        <Quote size={32} />
      </div>
      <div className="relative z-10 text-text-muted italic text-base">
        {props.children}
      </div>
    </blockquote>
  ),
  // Code block container (pre)
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
    // Try to extract language from children
    let title = "terminal";
    const children = props.children as any;
    if (children?.props?.className) {
      const match = children.props.className.match(/language-(\w+)/);
      if (match) {
        title = match[1];
      }
    }

    return (
      <div className="my-6 not-prose">
        <TerminalCard title={title}>
          <pre
            className={clsx(
              "overflow-x-auto p-4 text-xs md:text-sm font-mono leading-relaxed bg-bg-primary/50 text-text-primary",
              className
            )}
            {...props}
          />
        </TerminalCard>
      </div>
    );
  },
  // Inline code and block code content
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    // We rely on CSS in globals.css to distinguish pre > code vs inline code
    // But we can add a base class
    return (
      <code
        className={clsx(
          "font-mono text-sm",
          className
        )}
        {...props}
      />
    );
  },
  a: ({ className, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isInternal = href && (href.startsWith('/') || href.startsWith('#'));
    
    if (isInternal) {
      return (
        <Link
          href={href}
          className={clsx(
            "text-mint-500 hover:text-mint-400 underline underline-offset-4 decoration-mint-500/30 hover:decoration-mint-500 transition-all font-medium",
            className
          )}
          {...props}
        />
      );
    }
    
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx(
          "text-mint-500 hover:text-mint-400 underline underline-offset-4 decoration-mint-500/30 hover:decoration-mint-500 transition-all font-medium inline-flex items-center gap-1",
          className
        )}
        {...props}
      >
        {props.children}
      </a>
    );
  },
  hr: ({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className={clsx("border-border-medium my-12", className)} {...props} />
  ),
  strong: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong className={clsx("font-bold text-text-primary", className)} {...props} />
  ),
  // Table components
  table: ({ className, ...props }: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-6 border border-border-medium rounded-md">
      <table className={clsx("w-full text-left border-collapse", className)} {...props} />
    </div>
  ),
  thead: ({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className={clsx("bg-bg-secondary text-text-primary", className)} {...props} />
  ),
  tbody: ({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className={clsx("divide-y divide-border-medium", className)} {...props} />
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className={clsx("hover:bg-bg-secondary/50 transition-colors", className)} {...props} />
  ),
  th: ({ className, ...props }: React.ThHTMLAttributes<HTMLTableHeaderCellElement>) => (
    <th className={clsx("p-4 font-semibold text-sm tracking-wider border-b border-border-medium", className)} {...props} />
  ),
  td: ({ className, ...props }: React.TdHTMLAttributes<HTMLTableDataCellElement>) => (
    <td className={clsx("p-4 text-sm text-text-secondary", className)} {...props} />
  ),
};
