import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RootLayoutContent, metadata } from '../layout';

describe('RootLayoutContent', () => {
  it('should render without crashing', () => {
    render(<RootLayoutContent><div>Test Child</div></RootLayoutContent>);
  });

  it('sets the correct metadata', () => {
    expect(metadata.title).toBe('Wikipedia on this day app');
    expect(metadata.description).toBe('A simple app to show the current Wikipedia article on a given day');
    expect(metadata.icons).toEqual([{ rel: 'icon', url: '/favicon.ico' }]);
  });

  it('renders children correctly', () => {
    render(<RootLayoutContent><div>Test Child</div></RootLayoutContent>);
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });
});
