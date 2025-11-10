'use client';

import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <ReactMarkdown
        components={{
          // ✅ Code block support
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');

            return !inline && match ? (
              <SyntaxHighlighter
                style={oneDark}
                language={match[1]}
                PreTag="div"
                className="rounded-md my-4"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className="px-1 py-0.5 rounded bg-muted text-sm" {...props}>
                {children}
              </code>
            );
          },

          // ✅ Headings
          h1: ({ children }) => (
            <h1 className="text-3xl md:text-4xl font-bold mt-10 mb-6 leading-tight">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl md:text-3xl font-semibold mt-8 mb-4">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl md:text-2xl font-semibold mt-6 mb-3">
              {children}
            </h3>
          ),

          // ✅ Text + Lists
          p: ({ children }) => (
            <p className="mb-5 leading-relaxed">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-6 mb-6 space-y-2">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-6 mb-6 space-y-2">{children}</ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,

          // ✅ Quotes
          blockquote: ({ children }) => (
            <blockquote
              className="border-l-4 pl-5 my-6 italic opacity-90"
              style={{ borderColor: 'var(--color-primary)' }}
            >
              {children}
            </blockquote>
          ),

          // ✅ Links
          a: ({ children, href }) => (
            <a
              href={href}
              className="font-medium underline underline-offset-4 transition-colors hover:opacity-80"
              style={{ color: 'var(--color-primary)' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
