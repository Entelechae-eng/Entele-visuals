export default async function handler(req, res) {
  // Global CORS & Cache Headers for Vercel
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { offset = 0, source = '', only = '' } = req.query || {};

    let response;

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
      response = await fetch('https://templens.com/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': 'https://templens.com',
          'Referer': 'https://templens.com/',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        },
        body: JSON.stringify(body),
      });
    } else {
      let targetUrl = `https://templens.com/api/search?offset=${offset}`;
      if (source) targetUrl += `&source=${encodeURIComponent(String(source))}`;
      if (only) targetUrl += `&only=${encodeURIComponent(String(only))}`;

      response = await fetch(targetUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Origin': 'https://templens.com',
          'Referer': 'https://templens.com/',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        },
      });
    }

    if (!response.ok) {
      return res.status(response.status).json({ error: `Templens upstream error: ${response.status}` });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      error: err.message || 'Failed to fetch from Templens API',
    });
  }
}

