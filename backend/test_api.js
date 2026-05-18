const jwt = require('jsonwebtoken');
require('dotenv').config();

const token = jwt.sign(
  { id: 1, role: 'superadmin' },
  process.env.JWT_SECRET || 'your_secret_key',
  { expiresIn: '100d' }
);

async function testApi() {
  try {
    const res = await fetch('http://localhost:3000/api/admin/newsletter/send', {
      method: 'POST',
      body: JSON.stringify({
        subscriberIds: [1], // ID for prem30488@gmail.com
        customSubject: 'Test from API',
        customBody: '<p>This is a test from the API route.</p>'
      }),
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    console.log('Response:', data);
  } catch (err) {
    console.error('API Error:', err);
  }
}

testApi();
