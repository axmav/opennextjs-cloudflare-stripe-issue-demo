import Stripe from 'stripe';

// use web crypto for Cloudflare Workers
export const webCrypto = Stripe.createSubtleCryptoProvider();

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Initialize Stripe with proper Cloudflare Workers configuration
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
      httpClient: Stripe.createFetchHttpClient(), // ensure we use a Fetch client, not Node's http
    });

    const session = await stripe.billingPortal.sessions.create({
        customer: '123',
        return_url: ''
      })

    // Simple test - just return success if Stripe object is created
    return res.status(200).json({ 
      success: true, 
      message: 'Stripe object initialized successfully (Pages API)',
      url: session.url
    });
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
} 