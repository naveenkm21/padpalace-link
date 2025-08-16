import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set');
    }

    const { message, budget, city, propertyType, context } = await req.json();
    
    console.log('Received chat request:', { message, budget, city, propertyType });

    const systemPrompt = `You are an expert Indian real estate assistant helping users find the perfect property. Your name is PropertyBuddy and you specialize in the Indian real estate market.

Key guidelines:
- Always use Indian Rupees (₹) for pricing
- Focus on major Indian cities like Mumbai, Delhi, Bangalore, Chennai, Pune, Hyderabad, etc.
- Understand Indian property types: 1BHK, 2BHK, 3BHK, Independent House, Villa, Plot, Commercial
- Consider Indian-specific factors: parking, power backup, water supply, locality amenities
- Be conversational and helpful, asking follow-up questions to better understand needs
- Provide practical advice about Indian real estate trends, pricing, and locations
- When users share their budget and preferences, give specific recommendations

Current user context:
${context ? `Budget: ₹${budget?.toLocaleString('en-IN') || 'Not specified'}
Preferred City: ${city || 'Not specified'}
Property Type: ${propertyType || 'Not specified'}
Previous conversation context: ${context}` : 'New conversation'}

Always be helpful, friendly, and provide actionable advice for Indian property buyers and sellers.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const botResponse = data.choices[0].message.content;

    console.log('Bot response generated successfully');

    return new Response(JSON.stringify({ 
      response: botResponse,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ai-chatbot function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'An error occurred',
      response: "I'm sorry, I'm having trouble responding right now. Please try again in a moment."
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});