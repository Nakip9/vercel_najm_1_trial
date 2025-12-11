import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// CORS headers helper
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default async function handler(req, res) {
  // Set CORS headers for all responses
  Object.keys(corsHeaders).forEach(key => {
    res.setHeader(key, corsHeaders[key]);
  });

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse request body
    const { passport_number, status, admin_notes } = req.body;

    // Validation
    if (!passport_number || passport_number.trim() === '') {
      return res.status(400).json({ error: 'Passport number is required' });
    }

    const validStatuses = ['pending', 'processing', 'ready', 'rejected'];
    const entryStatus = status || 'pending';

    if (!validStatuses.includes(entryStatus)) {
      return res.status(400).json({
        error: 'Invalid status. Must be: pending, processing, ready, or rejected',
      });
    }

    // Sanitize input
    const sanitizedPassport = passport_number.trim().toUpperCase();
    const sanitizedNotes = admin_notes ? admin_notes.trim() : null;

    // Insert into database
    const { data, error } = await supabase
      .from('visa_status')
      .insert({
        passport_number: sanitizedPassport,
        status: entryStatus,
        admin_notes: sanitizedNotes,
      })
      .select()
      .single();

    if (error) {
      // Check if passport number already exists
      if (error.code === '23505') {
        return res.status(409).json({
          error: 'Passport number already exists in the system',
        });
      }

      console.error('Database error:', error);
      return res.status(500).json({ error: 'Failed to create entry' });
    }

    // Return success
    return res.status(201).json({
      success: true,
      data: {
        id: data.id,
        passport_number: data.passport_number,
        status: data.status,
        admin_notes: data.admin_notes,
        created_at: data.created_at,
      },
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

