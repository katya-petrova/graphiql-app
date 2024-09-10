import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SdlDocumentation from './SdlDocumentation';
import en from '@/utils/translation/dictionaries/en.json';

describe('SdlDocumentation Component', () => {
  it('renders SDL documentation when sdlData is provided', () => {
    const sdlData = `
      type Query {
        hello: String
      }
    `;

    render(<SdlDocumentation t={en.graphiql} sdlData={sdlData} />);

    expect(screen.getByText('SDL Documentation')).toBeInTheDocument();
    expect(screen.getByText(/type Query/)).toBeInTheDocument();
  });

  it('does not render anything when sdlData is null', () => {
    render(<SdlDocumentation t={en.graphiql} sdlData={null} />);

    expect(screen.queryByText('SDL Documentation')).toBeNull();
    expect(screen.queryByText(/type Query/)).toBeNull();
  });

  it('applies correct styles', () => {
    const sdlData = `
      type Query {
        hello: String
      }
    `;

    const { container } = render(
      <SdlDocumentation t={en.graphiql} sdlData={sdlData} />
    );
    const divElement = container.querySelector('div');

    expect(divElement).toHaveClass('mt-2 max-w-xl mx-auto');
    expect(divElement?.querySelector('h2')).toHaveClass(
      'text-2xl font-bold mb-2'
    );
    expect(divElement?.querySelector('pre')).toHaveClass(
      'whitespace-pre-wrap break-words text-xs'
    );
    expect(divElement?.querySelector('div')?.className).toContain(
      'bg-gray-100 p-4 rounded text-gray-700 overflow-auto'
    );
  });
});
