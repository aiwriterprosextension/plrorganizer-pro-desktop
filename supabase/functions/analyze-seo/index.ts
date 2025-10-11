import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { content, targetKeyword = '' } = await req.json();

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

    const systemPrompt = `You are an expert SEO analyst. Analyze the provided content and return structured SEO metrics and recommendations.`;

    const userPrompt = targetKeyword 
      ? `Analyze this content for SEO with focus on the keyword "${targetKeyword}":\n\n${content}`
      : `Analyze this content for SEO:\n\n${content}`;

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
          { role: 'user', content: userPrompt }
        ],
        tools: [
          {
            type: 'function',
            function: {
              name: 'provide_seo_analysis',
              description: 'Provide comprehensive SEO analysis results',
              parameters: {
                type: 'object',
                properties: {
                  seoScore: {
                    type: 'number',
                    description: 'Overall SEO score from 0-100'
                  },
                  keywordDensity: {
                    type: 'number',
                    description: 'Keyword density percentage (0-100)'
                  },
                  readabilityScore: {
                    type: 'number',
                    description: 'Readability score from 0-100 (Flesch-Kincaid scale)'
                  },
                  recommendations: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        category: {
                          type: 'string',
                          enum: ['critical', 'warning', 'success', 'info'],
                          description: 'Severity level of the recommendation'
                        },
                        title: {
                          type: 'string',
                          description: 'Short title for the recommendation'
                        },
                        description: {
                          type: 'string',
                          description: 'Detailed description of the issue and how to fix it'
                        }
                      },
                      required: ['category', 'title', 'description']
                    },
                    description: 'List of actionable SEO recommendations'
                  }
                },
                required: ['seoScore', 'keywordDensity', 'readabilityScore', 'recommendations'],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: 'function', function: { name: 'provide_seo_analysis' } }
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
    const toolCall = data.choices[0].message.tool_calls?.[0];
    
    if (!toolCall) {
      throw new Error('No tool call received from AI');
    }

    const analysis = JSON.parse(toolCall.function.arguments);

    return new Response(
      JSON.stringify(analysis),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in analyze-seo function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});