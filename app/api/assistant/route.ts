import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';
import { CONTACT_EMAIL } from '@/lib/contact';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function getApiKey(): string | undefined {
  // Try process.env first
  if (process.env.GROQ_API_KEY) {
    return process.env.GROQ_API_KEY;
  }

  // Fallback: read from .env.local file
  try {
    const envPath = join(process.cwd(), '.env.local');
    const envContent = readFileSync(envPath, 'utf-8');
    const match = envContent.match(/^GROQ_API_KEY=(.+)$/m);
    if (match) {
      return match[1].trim();
    }
  } catch (error) {
    console.error('Failed to read .env.local:', error);
  }

  return undefined;
}

export async function OPTIONS() {
  return NextResponse.json(null, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  try {
    const { messages, systemPrompt } = await req.json();

    const apiKey = getApiKey();

    console.log('API Key exists:', !!apiKey);
    console.log('API Key length:', apiKey?.length);

    if (!apiKey) {
      return NextResponse.json(
        {
          content: `I apologize, but the AI assistant is not configured yet. Please contact our team at ${CONTACT_EMAIL} for assistance.`,
        },
        { headers: corsHeaders }
      );
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-20b',
        messages: [
          { role: 'system', content: systemPrompt || 'You are a helpful jewelry consultant.' },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    console.log('Groq Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Groq API error:', errorText);
      throw new Error('Groq API error');
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || 'I apologize, I could not generate a response.';

    console.log('Groq Response content:', content);

    return NextResponse.json({ content }, { headers: corsHeaders });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        content: `I apologize, but I am having trouble connecting right now. Please try again in a moment, or contact our team at ${CONTACT_EMAIL} for immediate assistance.`,
      },
      { headers: corsHeaders }
    );
  }
}
