import React from 'react';
import { render, screen } from '@testing-library/react';
import { Home } from '../../routes/index';
import { StepsPage } from '../../routes/steps';

// Mock sub-components
jest.mock('../../components/Layout', () => ({
  Layout: ({ children }) => <div data-testid="layout">{children}</div>,
}));

// Mock assets
jest.mock('@/assets/hero-vote.jpg', () => 'test-file-stub');

describe('Main Pages', () => {
  describe('Home Page', () => {
    it('renders hero title and subtitle', () => {
      render(<Home />);
      expect(screen.getByText(/Understand elections,/)).toBeInTheDocument();
      expect(screen.getByText(/the easy way/)).toBeInTheDocument();
    });

    it('renders feature cards', () => {
      render(<Home />);
      expect(screen.getByText('Step-by-step guide')).toBeInTheDocument();
      expect(screen.getByText('AI chatbot')).toBeInTheDocument();
    });
  });

  describe('StepsPage', () => {
    it('renders all process steps', () => {
      render(<StepsPage />);
      expect(screen.getByText('Voter Registration')).toBeInTheDocument();
      expect(screen.getByText('Campaigning')).toBeInTheDocument();
      expect(screen.getByText('Voting Day')).toBeInTheDocument();
      expect(screen.getByText('Vote Counting')).toBeInTheDocument();
      expect(screen.getByText('Result Declaration')).toBeInTheDocument();
    });

    it('renders tips for steps', () => {
      render(<StepsPage />);
      expect(screen.getByText(/Register online in under 5 minutes/)).toBeInTheDocument();
    });
  });
});
