import Stripe from 'stripe';

export async function GET() {
  try {
    // Initialize Stripe with a test key
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
      //apiVersion: '2024-12-18.acacia',
    });

    const session = await stripe.billingPortal.sessions.create({
        customer: '123',
        return_url: ''
      })

    // Simple test - just return success if Stripe object is created
    return Response.json({ 
      success: true, 
      message: 'Stripe object initialized successfully',
      url: session.url
      //stripeVersion: stripe.getApiField('version')
    });
  } catch (error) {
    return Response.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
} 