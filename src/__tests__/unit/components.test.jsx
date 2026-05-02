import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Layout } from '../../components/Layout';

describe('Shared Components', () => {
  describe('Header', () => {
    it('renders logo and nav items', () => {
      render(<Header />);
      expect(screen.getAllByText(/CivicGuide/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Home/i).length).toBeGreaterThan(0);
    });
  });

  describe('Footer', () => {
    it('renders copyright and links', () => {
      render(<Footer />);
      expect(screen.getAllByText(/CivicGuide AI/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Steps/i).length).toBeGreaterThan(0);
    });
  });

  describe('Layout', () => {
    it('renders children within header and footer', () => {
      render(
        <Layout>
          <div data-testid="child">Test Child</div>
        </Layout>
      );
      expect(screen.getByTestId('child')).toBeInTheDocument();
    });
  });
});
