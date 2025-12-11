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
  'Access-Control-Allow-Methods': 'PUT, OPTIONS',
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

  // Only allow PUT requests
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse request body
    const { id, status, admin_notes } = req.body;

    // Validation
    if (!id) {
      return res.status(400).json({ error: 'Entry ID is required' });
    }

    const validStatuses = ['pending', 'processing', 'ready', 'rejected'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        error: 'Invalid status. Must be: pending, processing, ready, or rejected',
      });
    }

    // Build update object
    const updateData = {
      updated_at: new Date().toISOString(),
    };

    if (status) {
      updateData.status = status;
    }

    if (admin_notes !== undefined) {
      updateData.admin_notes = admin_notes ? admin_notes.trim() : null;
    }

    // Update database
    const { data, error } = await supabase
      .from('visa_status')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Entry not found' });
      }

      console.error('Database error:', error);
      return res.status(500).json({ error: 'Failed to update entry' });
    }

    // Return success
    return res.status(200).json({
      success: true,
      data: {
        id: data.id,
        passport_number: data.passport_number,
        status: data.status,
        admin_notes: data.admin_notes,
        updated_at: data.updated_at,
      },
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

