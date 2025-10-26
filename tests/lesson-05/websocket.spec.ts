import { test, expect } from '@playwright/test';

test.describe('Web Socket', async () => {
  const url = 'https://echo.websocket.org/.ws';
  const connectedMessage = 'connected';
  const disconnectedMessage = 'disconnected';
  const messageToSend = 'Hello from PWA102';

  test('TC01 - Send message', async ({ page }) => {
    const contentInputLocator = page.locator('#content');
    const sendButtonLocator = page.locator('#send');
    const disconnectButtonLocator = page.locator('#disconnect');
    const connectionStatusLocator = page.locator('//div[@class="info"]').nth(1);
    const disconnectionStatusLocator = page.locator('//div[@class="info"]').nth(2);

    let sentPayload = '';
    let receivedPayload = '';
    let isSent = false;
    let isReceived = false;

    page.on('websocket', ws => {
      ws.on('framesent', frame => {
        const payload = frame.payload?.toString() || '';
        if (payload.includes(messageToSend)) {
          sentPayload = payload;
          isSent = true;
        }
      });

      ws.on('framereceived', frame => {
        const payload = frame.payload?.toString() || '';
        if (payload.includes(messageToSend)) {
          receivedPayload = payload;
          isReceived = true;
        }
      });
    });

    await test.step('Step 1: Go to page', async () => {
      await page.goto(url);
      expect(await connectionStatusLocator.textContent()).toBe(connectedMessage);
    });

    await test.step('Step 2: Verify sending and receiving messages', async () => {
      await contentInputLocator.fill(messageToSend);
      await sendButtonLocator.click();

      await expect.poll(() => isSent && isReceived, {
        message: 'Waiting for WebSocket messages',
        timeout: 5000
      }).toBeTruthy();

      expect(sentPayload).toBe(messageToSend);
      expect(receivedPayload).toBe(messageToSend);
    });

    await test.step('Step 3: Verify disconnection successful', async () => {
      await disconnectButtonLocator.click();
      expect(await disconnectionStatusLocator.textContent()).toBe(disconnectedMessage);
    });
  });
});
