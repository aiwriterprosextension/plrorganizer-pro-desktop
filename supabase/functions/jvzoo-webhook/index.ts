import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data = await req.formData();
    
    // JVZoo sends data as form-encoded
    const notification = {
      type: data.get('ctransaction') as string,
      email: data.get('ccustemail') as string,
      firstName: data.get('ccustname')?.toString().split(' ')[0] || '',
      lastName: data.get('ccustname')?.toString().split(' ').slice(1).join(' ') || '',
      transactionId: data.get('ctransreceipt') as string,
      productId: data.get('cproditem') as string,
      amount: parseFloat(data.get('ctransamount') as string || '0'),
      secretKey: data.get('cverify') as string,
    };

    // Verify secret key
    const JVZOO_SECRET_KEY = Deno.env.get('JVZOO_SECRET_KEY');
    if (notification.secretKey !== JVZOO_SECRET_KEY) {
      throw new Error('Invalid secret key');
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Handle different notification types
    switch (notification.type) {
      case 'SALE': {
        // Determine plan based on product ID
        let planName = 'starter';
        if (notification.productId.includes('pro')) planName = 'pro';
        if (notification.productId.includes('enterprise')) planName = 'enterprise';

        // Generate random password for user
        const password = crypto.randomUUID();

        // Create user account
        const { data: authData, error: authError } = await supabaseClient.auth.admin.createUser({
          email: notification.email,
          password: password,
          email_confirm: true,
          user_metadata: {
            full_name: `${notification.firstName} ${notification.lastName}`,
          },
        });

        if (authError) {
          console.error('Error creating user:', authError);
          throw authError;
        }

        // Create license key
        const licenseKey = `PLR-${crypto.randomUUID().substring(0, 8).toUpperCase()}`;
        
        await supabaseClient
          .from('license_keys')
          .insert({
            key: licenseKey,
            user_id: authData.user.id,
            product: notification.productId,
            transaction_id: notification.transactionId,
            status: 'active',
          });

        // Update subscription to paid plan
        await supabaseClient
          .from('subscriptions')
          .update({
            plan_name: planName,
            status: 'lifetime',
          })
          .eq('user_id', authData.user.id);

        // Send welcome email with login credentials
        console.log(`Welcome email should be sent to ${notification.email} with password: ${password}`);
        
        break;
      }

      case 'RFND': {
        // Handle refund - downgrade to free
        const { data: userData } = await supabaseClient
          .from('profiles')
          .select('id')
          .eq('email', notification.email)
          .single();

        if (userData) {
          await supabaseClient
            .from('subscriptions')
            .update({
              plan_name: 'free',
              status: 'refunded',
            })
            .eq('user_id', userData.id);

          // Deactivate license key
          await supabaseClient
            .from('license_keys')
            .update({ status: 'refunded' })
            .eq('transaction_id', notification.transactionId);
        }
        break;
      }

      case 'CGBK': {
        // Handle chargeback - similar to refund
        const { data: userData } = await supabaseClient
          .from('profiles')
          .select('id')
          .eq('email', notification.email)
          .single();

        if (userData) {
          await supabaseClient
            .from('subscriptions')
            .update({
              plan_name: 'free',
              status: 'chargeback',
            })
            .eq('user_id', userData.id);

          await supabaseClient
            .from('license_keys')
            .update({ status: 'chargeback' })
            .eq('transaction_id', notification.transactionId);
        }
        break;
      }

      default:
        console.log(`Unhandled notification type: ${notification.type}`);
    }

    return new Response(
      notification.transactionId,
      { headers: { ...corsHeaders, 'Content-Type': 'text/plain' } }
    );
  } catch (error: any) {
    console.error('JVZoo webhook error:', error);
    return new Response(
      JSON.stringify({ error: error?.message || 'An error occurred' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
