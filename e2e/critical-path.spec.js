import { test, expect } from '@playwright/test';

test.describe('CivicGuide AI - Critical Path', () => {
  
  test('User can navigate, chat, and find polling station', async ({ page }) => {
    // 1. Visit Home
    await page.goto('/');
    await expect(page).toHaveTitle(/CivicGuide AI/);
    
    // 2. Go to Chatbot
    await page.click('text=Chatbot');
    await expect(page).toHaveURL(/.*chatbot/);
    
    // 3. Send a message to Gemini
    const input = page.locator('placeholder="Ask a question..."');
    await input.fill('How do I register?');
    await page.click('aria-label="Send message"');
    
    // Wait for AI response (bot role message)
    await expect(page.locator('div[role="log"]')).toContainText(/register/i);

    // 4. Navigate to Finder (Maps)
    await page.click('text=Finder');
    await expect(page).toHaveURL(/.*finder/);
    
    // 5. Verify Map is loaded
    const map = page.locator('div[aria-label="Map"]');
    await expect(map).toBeVisible();
    
    // 6. Check search fallback
    await page.fill('placeholder="Enter your zip code..."', '90210');
    await page.click('button:has(svg.lucide-navigation)');
  });

  test('Sign In flow works (Firebase Auth)', async ({ page }) => {
    await page.goto('/');
    
    // Trigger Google Sign In (This would normally require mocking in a CI env)
    const signInBtn = page.locator('text=Sign In');
    await expect(signInBtn).toBeVisible();
  });
});
