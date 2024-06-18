import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import RootLayoutContent from '../RootLayoutContent';

describe('RootLayoutContent', () => {
  it('should render without crashing', () => {
    render(<RootLayoutContent><div>Test Child</div></RootLayoutContent>);
  });

  it('renders children correctly', () => {
    render(<RootLayoutContent><div>Test Child</div></RootLayoutContent>);
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });
});
