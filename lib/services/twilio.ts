import twilio from 'twilio';
import { config } from '../config';

const client = twilio(config.twilio.accountSid, config.twilio.authToken);

export async function sendWhatsApp(to: string, message: string) {
  try {
    const response = await client.messages.create({
      from: config.twilio.whatsappFrom,
      to: `whatsapp:${to.replace('whatsapp:', '')}`,
      body: message,
    });
    return response;
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    throw error;
  }
}

export async function sendSMS(to: string, message: string) {
  try {
    const response = await client.messages.create({
      from: config.twilio.phone || config.twilio.whatsappFrom.replace('whatsapp:', ''), // Fallback
      to: to,
      body: message,
    });
    return response;
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw error;
  }
}
