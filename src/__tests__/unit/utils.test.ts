import { cn } from '../../lib/utils';

describe('Utility Functions', () => {
  describe('cn', () => {
    it('merges tailwind classes correctly', () => {
      const result = cn('px-2 py-2', 'px-4');
      expect(result).toBe('py-2 px-4');
    });

    it('handles conditional classes', () => {
      const result = cn('text-red-500', false && 'bg-blue-500', true && 'font-bold');
      expect(result).toBe('text-red-500 font-bold');
    });
  });
});
