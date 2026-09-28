import { Fragment } from 'react';

export interface TextRevealProps {
  /** Plain text. Split on spaces, so keep markup out of it. */
  text: string;
  className?: string;
  /** Words listed here are set in the accent colour. Case-insensitive. */
  accentWords?: string[];
  /** Kept for API compatibility. Headings no longer animate in. */
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  /** Forwarded so headings can be referenced by aria-labelledby. */
  id?: string;
}

const strip = (word: string) => word.replace(/[^\p{L}\p{N}]/gu, '').toLowerCase();

/**
 * Section heading with optional accent words. It used to reveal word by word;
 * it now renders as a plain, static heading.
 */
export function TextReveal({
  text,
  className = '',
  accentWords = [],
  as: Tag = 'h2',
  id,
}: TextRevealProps) {
  if (accentWords.length === 0) {
    return (
      <Tag className={className} id={id}>
        {text}
      </Tag>
    );
  }

  const words = text.split(' ');
  const accents = new Set(accentWords.map(strip));

  return (
    <Tag className={className} id={id}>
      {words.map((word, i) => {
        const space = i < words.length - 1 ? ' ' : '';
        return (
          <Fragment key={`${word}-${i}`}>
            {accents.has(strip(word)) ? <span className="text-accent">{word}</span> : word}
            {space}
          </Fragment>
        );
      })}
    </Tag>
  );
}
