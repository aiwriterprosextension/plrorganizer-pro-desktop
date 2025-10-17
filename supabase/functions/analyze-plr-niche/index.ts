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
    const { folderStructure, fileTypes, metadataContent, filenames } = await req.json();
    
    console.log('Analyzing PLR package:', { 
      fileCount: filenames?.length || 0,
      hasMetadata: !!metadataContent 
    });

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // Build analysis prompt
    const prompt = `Analyze this PLR package and determine its niche:

Folder Structure:
${JSON.stringify(folderStructure, null, 2)}

File Types Distribution:
${JSON.stringify(fileTypes, null, 2)}

Sample Filenames:
${filenames?.slice(0, 20).join('\n') || 'None'}

${metadataContent ? `Metadata Content:\n${metadataContent}` : ''}

Identify the PRIMARY niche category from these options:
- E-Commerce (sales pages, product descriptions, checkout templates)
- Digital Marketing (email templates, social graphics, landing pages, ad copy)
- Courses (modules, lessons, worksheets, student materials)
- Writing/Content (articles, blog posts, social media content, copywriting)
- Design (graphics, templates, fonts, logos, banners)
- Code/Development (plugins, scripts, themes, tools)
- Business/Finance (business plans, financial templates, calculators)
- Health/Wellness (fitness guides, meal plans, wellness content)

Also provide a sub-niche for more specific categorization.

Respond with your analysis including:
1. Primary niche (one of the categories above)
2. Sub-niche (more specific)
3. Confidence level (0-100)
4. Reasoning for your classification
5. Suggested folder name for organization`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { 
            role: 'system', 
            content: 'You are a PLR content classification expert. Analyze package contents and accurately categorize them by niche.' 
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    console.log('AI Analysis:', aiResponse);

    // Parse AI response to extract structured data
    const nicheMatch = aiResponse.match(/Primary niche:\s*([^\n]+)/i);
    const subNicheMatch = aiResponse.match(/Sub-niche:\s*([^\n]+)/i);
    const confidenceMatch = aiResponse.match(/Confidence.*?(\d+)/i);
    const reasoningMatch = aiResponse.match(/Reasoning:\s*([^\n]+)/i);
    const folderMatch = aiResponse.match(/Suggested folder.*?:\s*([^\n]+)/i);

    const result = {
      niche: nicheMatch ? nicheMatch[1].trim() : 'Other',
      subNiche: subNicheMatch ? subNicheMatch[1].trim() : '',
      confidence: confidenceMatch ? parseInt(confidenceMatch[1]) : 50,
      reasoning: reasoningMatch ? reasoningMatch[1].trim() : aiResponse.substring(0, 200),
      suggestedFolder: folderMatch ? folderMatch[1].trim() : 'PLR-Content',
      fullAnalysis: aiResponse
    };

    console.log('Parsed result:', result);

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze-plr-niche:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        niche: 'Other',
        subNiche: 'Unknown',
        confidence: 0,
        reasoning: 'Failed to analyze',
        suggestedFolder: 'Unclassified'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
