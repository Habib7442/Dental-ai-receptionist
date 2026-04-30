import { config } from './config';

export const templates = {
  CONFIRMATION_MESSAGE: (data: any) => `Hi ${data.name}! 🦷 Your appointment at ${config.clinic.name} is confirmed!
📅 Date: ${data.date}
⏰ Time: ${data.time}
📍 Address: ${config.clinic.address}
🔖 Confirmation #: ${data.id}

Please bring your insurance card and arrive 10 mins early for new patients.
To cancel or reschedule reply CANCEL or RESCHEDULE.
See you soon! — ${config.clinic.name} Team`,

  REMINDER_24HR: (data: any) => `Hi ${data.name}! Just a friendly reminder 😊
Your dental appointment at ${config.clinic.name} is TOMORROW
⏰ ${data.time} at ${config.clinic.address}
Reply YES to confirm or call us to reschedule: ${config.clinic.phone}`,

  REMINDER_2HR: (data: any) => `Hi ${data.name}! Your appointment at ${config.clinic.name} is in 2 hours ⏰
See you at ${data.time}! 📍 ${config.clinic.address}`,

  REVIEW_REQUEST: (data: any) => `Hi ${data.name}! We hope your visit went well 😊
Your feedback means the world to us — would you mind leaving us a quick Google review?
👉 ${config.clinic.reviewLink}
Takes less than 60 seconds and helps us so much! Thank you 🙏
— ${config.clinic.name} Team`,

  NO_SHOW_FOLLOWUP: (data: any) => `Hi ${data.name}, we noticed you missed your appointment today at ${config.clinic.name}.
We hope everything is okay! 
Would you like to reschedule? Just reply or call us: ${config.clinic.phone}
We'd love to see you soon 😊`,

  DOCTOR_NOTIFICATION: (data: any) => `🚨 *New Booking Alert* 🚨
A new appointment has been scheduled via AI Voice Agent.
👤 Patient: ${data.name}
📅 Date: ${data.date}
⏰ Time: ${data.time}
🦷 Service: ${data.service}
🔖 Confirmation: ${data.id}
📱 Patient Phone: ${data.phone}`
};
