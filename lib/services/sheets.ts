import { google } from 'googleapis';
import { config } from '../config';
import path from 'path';

const auth = new google.auth.GoogleAuth({
  credentials: config.google.credentialsJSON ? JSON.parse(config.google.credentialsJSON) : undefined,
  keyFile: !config.google.credentialsJSON && config.google.keyPath ? path.resolve(process.cwd(), config.google.keyPath) : undefined,
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets'
  ],
});

const sheets = google.sheets({ version: 'v4', auth });

export async function logBooking(bookingData: any) {
  const { name, phone, service, date, time, status = 'Confirmed' } = bookingData;
  const values = [
    [name, phone, service, `${date} ${time}`, status, new Date().toISOString()]
  ];

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: config.google.sheetId!,
      range: 'Sheet1!A:F',
      valueInputOption: 'USER_ENTERED',
      requestBody: { values },
    });
  } catch (error) {
    console.error('Error logging to Google Sheets:', error);
  }
}

export async function getPendingReminders() {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: config.google.sheetId!,
      range: 'Sheet1!A:J', // Adjust range based on columns
    });

    const rows = response.data.values || [];
    const headers = rows[0];
    const data = rows.slice(1);

    // Map rows to objects for easier processing
    return data.map((row, index) => {
      const obj: any = { rowIndex: index + 2 }; // +2 because 1-indexed and header row
      headers.forEach((header, i) => {
        obj[header.toLowerCase()] = row[i];
      });
      return obj;
    });
  } catch (error) {
    console.error('Error fetching from Google Sheets:', error);
    return [];
  }
}

export async function markReminderSent(rowIndex: number, column: string) {
  try {
    // This is a bit complex without knowing the exact column letter for 'column' name.
    // Assuming H is 24h sent, I is 2h sent, J is review sent.
    const columnMap: any = { '24h': 'H', '2h': 'I', 'review': 'J' };
    const range = `Sheet1!${columnMap[column]}${rowIndex}`;
    
    await sheets.spreadsheets.values.update({
      spreadsheetId: config.google.sheetId!,
      range: range,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [['TRUE']] },
    });
  } catch (error) {
    console.error('Error marking reminder as sent:', error);
  }
}
