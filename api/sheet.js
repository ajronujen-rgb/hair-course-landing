const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, source, course, date } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone required' });
  }

  try {
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const sheetId = process.env.GOOGLE_SHEET_ID;

    if (!privateKey || !serviceAccountEmail || !sheetId) {
      throw new Error('Missing Google credentials env vars');
    }

    const jwt = new JWT({
      email: serviceAccountEmail,
      key: privateKey,
      scopes: SCOPES
    });

    const doc = new GoogleSpreadsheet(sheetId, jwt);
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0];
    await sheet.addRow({
      Имя: name,
      Телефон: phone,
      Источник: source || 'site',
      Курс: course || '',
      Дата: date || new Date().toLocaleString('ru-RU')
    });

    res.status(200).json({ success: true });
  } catch (e) {
    console.error('Sheet error:', e);
    res.status(500).json({ error: 'Failed to save' });
  }
}
