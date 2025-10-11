import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.75.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { content, uniquenessLevel = 50 } = await req.json();

    if (!content || content.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Content is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Determine rewriting intensity based on uniqueness level
    let intensity = 'moderate';
    if (uniquenessLevel < 40) {
      intensity = 'light';
    } else if (uniquenessLevel > 70) {
      intensity = 'heavy';
    }

    const systemPrompt = `You are a professional content rewriter specializing in PLR (Private Label Rights) content. Your task is to rewrite content to make it unique while preserving the original meaning and key information.

Rewriting intensity: ${intensity}
- Light (30-40%): Minor word substitutions, sentence restructuring
- Moderate (40-70%): Significant rewording, paragraph restructuring, synonym usage
- Heavy (70-100%): Complete rewrite with new examples, different sentence structures, varied vocabulary

Guidelines:
1. Maintain the core message and facts
2. Use natural, flowing language
3. Keep the same tone and reading level
4. Ensure the rewritten content is SEO-friendly
5. Do not add new information or change facts
6. Return only the rewritten content, no explanations`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Rewrite this content:\n\n${content}` }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Payment required. Please add credits to your workspace.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      throw new Error('AI gateway error');
    }

    const data = await response.json();
    const spunContent = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ spunContent }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in spin-content function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});