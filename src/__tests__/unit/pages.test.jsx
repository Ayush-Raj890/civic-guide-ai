import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FaqPage } from '../../routes/faq';
import { TimelinePage } from '../../routes/timeline';

// Mock sub-components
jest.mock('../../components/Layout', () => ({
  Layout: ({ children }) => <div data-testid="layout">{children}</div>,
}));

describe('Page Components', () => {
  describe('FaqPage', () => {
    it('renders FAQ questions', () => {
      render(<FaqPage />);
      expect(screen.getByText(/How do I register as a voter\?/)).toBeInTheDocument();
      expect(screen.getByText(/What documents are required\?/)).toBeInTheDocument();
    });

    it('toggles accordion on click', () => {
      render(<FaqPage />);
      const button = screen.getByText(/How do I register as a voter\?/).closest('button');
      
      // Initially first one is open (index 0 is default state)
      expect(button).toHaveAttribute('aria-expanded', 'true');
      
      // Click to close
      fireEvent.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'false');
      
      // Click another one
      const button2 = screen.getByText(/What documents are required\?/).closest('button');
      fireEvent.click(button2);
      expect(button2).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('TimelinePage', () => {
    it('renders all election phases', () => {
      render(<TimelinePage />);
      expect(screen.getAllByText('Registration').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Campaign').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Voting').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Counting').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Results').length).toBeGreaterThan(0);
    });

    it('renders step indicators', () => {
      render(<TimelinePage />);
      // Should find "Step 1", "Step 2", etc. (multiple times for desktop/mobile)
      expect(screen.getAllByText(/Step 1/).length).toBeGreaterThan(0);
    });
  });
});
