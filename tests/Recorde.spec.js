import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://playwright.dev/docs/running-tests');
  await page.getByRole('button', { name: 'Getting Started' }).click();
  await page.getByRole('link', { name: 'Playwright logo Playwright' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'VS Code' }).click();
  const page1 = await page1Promise;
  await page1.locator('#download-buttons').getByRole('link', { name: 'Get Copilot Free' }).click();
});

test('DataIntegrations', async ({ page }) => {
  await page.goto('https://login.microsoftonline.com/f0e47f34-4b37-4ad9-86a2-433a50720bc3/oauth2/v2.0/authorize?client_id=dac05f83-289e-4d31-907e-d919862a158a&scope=openid%20profile%20offline_access&redirect_uri=https%3A%2F%2Fapp-dataintegrations-web-test-scus-001.asev3-shared-devtest.appserviceenvironment.net&client-request-id=0194b091-83f8-7e55-b2f3-50476ca0661d&response_mode=fragment&response_type=code&x-client-SKU=msal.js.browser&x-client-VER=3.23.0&client_info=1&code_challenge=gOdigTAXpYnLugmwrWo1VXiCPJnLacCsr7yRvUAR4h4&code_challenge_method=S256&nonce=0194b091-83f9-759a-bdf1-1a46beb8780e&state=eyJpZCI6IjAxOTRiMDkxLTgzZjgtNzQxNS05MmUwLTVjMjYwZTkwNTc0ZiIsIm1ldGEiOnsiaW50ZXJhY3Rpb25UeXBlIjoicmVkaXJlY3QifX0%3D&sso_reload=true');
  await page.getByRole('textbox', { name: 'Use your Express email address' }).click();
  await page.getByRole('textbox', { name: 'Use your Express email address' }).fill('viren.chauhan@expresspros.com');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('textbox', { name: 'Enter the password for viren.' }).click();
  await page.getByRole('textbox', { name: 'Enter the password for viren.' }).fill('Reflik01082024*');
  await page.getByRole('textbox', { name: 'Enter the password for viren.' }).press('Enter');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('textbox', { name: 'Enter the password for viren.' }).click();
  await page.getByRole('textbox', { name: 'Enter the password for viren.' }).fill('Reflik@01082024');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'Yes' }).click();
  await page.getByRole('button', { name: 'Events' }).click();
  await page.getByRole('link', { name: 'c08cb5ee' }).click();
  await page.getByRole('button', { name: 'Flow view' }).click();
  await page.getByTestId('rf__node-c08cb5ee-23ee-4cc2-a49b-c9da528e2a88').click();
  await page.getByTestId('rf__node-c08cb5ee-23ee-4cc2-a49b-c9da528e2a88').getByRole('button').click();
  await page.getByText('C_Chauhan, Viren X (Reflik').click();
  await page.getByRole('button', { name: 'Logout' }).click(); 
});