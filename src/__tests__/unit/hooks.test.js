import { renderHook, act } from '@testing-library/react';
import { useIsMobile } from '../../hooks/use-mobile';

describe('useIsMobile Hook', () => {
  it('returns true when width is less than 768', () => {
    window.innerWidth = 500;
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it('returns false when width is 768 or more', () => {
    window.innerWidth = 1024;
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });
});
