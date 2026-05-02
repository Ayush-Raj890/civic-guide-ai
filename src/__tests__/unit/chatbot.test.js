import { findReply, formatTime, formatBytes, fallbackReply } from '../../routes/chatbot';

describe('Chatbot Helper Functions', () => {
  describe('findReply', () => {
    it('returns correct reply for "register" keyword', () => {
      const result = findReply('How do I register?');
      expect(result.reply).toContain('To register as a voter');
      expect(result.followups).toContain('Can I register online?');
    });

    it('returns correct reply for "id" keyword', () => {
      const result = findReply('Do I need an id?');
      expect(result.reply).toContain('government-issued photo ID');
    });

    it('returns fallback reply for unknown input', () => {
      const result = findReply('What is the weather?');
      expect(result.reply).toBe(fallbackReply);
    });

    it('is case insensitive', () => {
      const result = findReply('REGISTER');
      expect(result.reply).toContain('To register as a voter');
    });
  });

  describe('formatTime', () => {
    it('formats timestamp correctly', () => {
      const ts = new Date('2024-05-01T10:30:00').getTime();
      const formatted = formatTime(ts);
      // Note: result might depend on locale, but typically '10:30 AM' or '10:30'
      expect(formatted).toMatch(/10:30/);
    });
  });

  describe('formatBytes', () => {
    it('formats bytes correctly', () => {
      expect(formatBytes(500)).toBe('500 B');
      expect(formatBytes(1024)).toBe('1.0 KB');
      expect(formatBytes(1024 * 1024)).toBe('1.0 MB');
    });
  });
});
