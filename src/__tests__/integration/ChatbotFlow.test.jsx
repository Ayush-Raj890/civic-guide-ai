import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChatbotPage } from '../../routes/chatbot';

// Integration tests for Chatbot Page

jest.mock('../../components/Layout', () => ({
  Layout: ({ children }) => <div data-testid="layout">{children}</div>,
}));

jest.mock('../../components/Header', () => ({
  Header: () => <div data-testid="header" />,
}));

jest.mock('../../components/Footer', () => ({
  Footer: () => <div data-testid="footer" />,
}));

describe('Chatbot Integration Flow', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    // Pre-fill localStorage to test history rendering
    localStorage.setItem('civic_chat_history', JSON.stringify([
        { id: '1', role: 'user', text: 'Hello', ts: Date.now() },
        { id: '2', role: 'bot', text: 'Hi there!', ts: Date.now() }
    ]));
  });

  it('renders chat history from localStorage', () => {
    render(<ChatbotPage />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('Hi there!')).toBeInTheDocument();
  });

  it('sends a message and receives a reply', async () => {
    const user = userEvent.setup();
    render(<ChatbotPage />);

    const input = screen.getByPlaceholderText(/Type your question or drop a file/);
    await user.type(input, 'register');
    await user.keyboard('{Enter}');

    // User message should appear
    expect(screen.getByText('register')).toBeInTheDocument();

    // Wait for the bot response
    await waitFor(() => {
      expect(screen.getByText(/To register as a voter/)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('handles suggestion chips', async () => {
    const user = userEvent.setup();
    render(<ChatbotPage />);

    const chip = screen.getByText(/How do I register to vote\?/);
    await user.click(chip);

    // Message should be sent
    expect(screen.getAllByText(/How do I register to vote\?/i).length).toBeGreaterThan(0);
    
    // Reply should appear
    await waitFor(() => {
        expect(screen.getByText(/To register as a voter/)).toBeInTheDocument();
    });
  });

  it('clears chat history when reset button is clicked', async () => {
    const user = userEvent.setup();
    render(<ChatbotPage />);

    const resetBtn = screen.getByLabelText(/Reset conversation/);
    await user.click(resetBtn);

    expect(localStorage.removeItem).toHaveBeenCalledWith('civic_chat_history');
    // History should be gone
    expect(screen.queryByText('Hello')).not.toBeInTheDocument();
  });
});
