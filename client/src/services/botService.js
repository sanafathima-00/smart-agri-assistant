// client/src/services/botServices.js

const webhookUrl = 'https://chat-bot-webhook.onrender.com/webhook';
export async function sendMessageToBot(userMessage, language = "en") {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage, language }),
    });

    const data = await response.json();
    return [data.reply || '🤖 कोई उत्तर नहीं मिला।'];
  } catch (error) {
    console.error('❌ Error contacting AI webhook:', error);
    return ['⚠️ सहायक से संपर्क नहीं हो पाया। कृपया पुनः प्रयास करें।'];
  }
}
