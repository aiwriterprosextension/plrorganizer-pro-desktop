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
    const { title, description, fileType } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `You are an expert at evaluating PLR (Private Label Rights) content quality. Analyze the content and provide:
1. Quality score: A (Premium - excellent, ready to use), B (Good - minor edits needed), C (Average - significant editing required), D (Poor - major work needed)
2. Niche categorization (e.g., Health, Finance, Marketing, Business, Technology, etc.)
3. Sub-niche (more specific category within the niche)
4. Brief reasoning for the quality score

Consider factors like:
- Title clarity and professionalism
- Description completeness and value proposition
- Content type suitability
- Apparent effort and quality indicators`;

    const userPrompt = `Assess this PLR content:
Title: ${title}
Description: ${description || "No description provided"}
File Type: ${fileType}

Provide your assessment.`;

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
              name: 'assess_quality',
              description: 'Assess PLR content quality and categorization',
              parameters: {
                type: 'object',
                properties: {
                  quality_score: {
                    type: 'string',
                    enum: ['A', 'B', 'C', 'D'],
                    description: 'Quality grade'
                  },
                  niche: {
                    type: 'string',
                    description: 'Primary niche category'
                  },
                  sub_niche: {
                    type: 'string',
                    description: 'Specific sub-category'
                  },
                  reasoning: {
                    type: 'string',
                    description: 'Brief explanation of the quality score'
                  }
                },
                required: ['quality_score', 'niche', 'sub_niche', 'reasoning'],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: 'function', function: { name: 'assess_quality' } }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract tool call result
    const toolCall = data.choices[0].message.tool_calls?.[0];
    if (!toolCall) {
      throw new Error('No tool call in response');
    }

    const assessment = JSON.parse(toolCall.function.arguments);

    return new Response(
      JSON.stringify({
        quality_score: assessment.quality_score,
        niche: assessment.niche,
        sub_niche: assessment.sub_niche,
        reasoning: assessment.reasoning
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  } catch (error: any) {
    console.error('Error in assess-quality function:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Unknown error occurred' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
