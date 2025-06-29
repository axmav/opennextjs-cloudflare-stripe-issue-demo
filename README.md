# Next.js App with Stripe Integration for Cloudflare Workers

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) and configured to deploy to Cloudflare Workers using [OpenNext](https://opennext.js.org/cloudflare).

## Project Creation

This app was created using the official Cloudflare CLI:
```bash
npm create cloudflare@latest -- my-next-app --framework=next --platform=workers
```

## Issue Description

This repository demonstrates a **Stripe integration issue** when deploying Next.js applications to Cloudflare Workers using OpenNext. The problem occurs specifically when trying to use the Stripe SDK in **Pages API routes**, while **App Router routes work correctly**.

### Problem Details

- **Working**: App Router endpoint (`/api/stripe-test`) - builds and deploys successfully
- **Failing**: Pages API endpoint (`/api/stripe-test-pages`) - build fails with Stripe module resolution error
- **Error**: `Could not resolve "stripe"` during OpenNext build process for Pages API routes
- **Specific Error**: `The module "./esm/stripe.esm.worker.js" was not found on the file system`
- **Environment**: Cloudflare Workers via OpenNext

### Current Configuration

- **Next.js Version**: 15.3.4
- **OpenNext Version**: 1.3.1
- **Stripe Version**: 18.2.1
- **Deployment Target**: Cloudflare Workers

### Attempted Solutions

1. **External Package Configuration**: Added `serverExternalPackages: ["stripe"]` to `next.config.ts`
2. **OpenNext Configuration**: Added `externalPackages: ["stripe"]` to `open-next.config.ts`
3. **Import Path Changes**: Updated imports to use `stripe/lib/stripe.js`
4. **HTTP Client Configuration**: Used `Stripe.createFetchHttpClient()` for Cloudflare Workers compatibility

### Files Demonstrating the Issue

- `src/app/api/stripe-test/route.ts` - **App Router Stripe endpoint (✅ Working)**
- `src/pages/api/stripe-test-pages/route.ts` - **Pages API Stripe endpoint (❌ Failing)**
- `next.config.ts` - Next.js configuration with external packages
- `open-next.config.ts` - OpenNext configuration with external packages

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing the Stripe Integration

### Local Development
- App Router endpoint: `http://localhost:3000/api/stripe-test` (✅ Works)
- Pages API endpoint: `http://localhost:3000/api/stripe-test-pages` (✅ Works locally)

### Cloudflare Workers Deployment
```bash
# Build and preview locally
yarn preview

# Deploy to Cloudflare
yarn deploy
```

**Note**: The build fails during `yarn preview` due to the Pages API Stripe endpoint, preventing deployment.

## Error Reproduction

To reproduce the issue:

1. Install dependencies: `yarn install`
2. Run the preview command: `yarn preview`
3. Observe the build error related to Stripe module resolution for Pages API routes

The error occurs during the OpenNext build process when bundling the server functions for Cloudflare Workers, specifically when processing the Pages API route.

## Environment Variables

Create a `.dev.vars` file with your Stripe test key:
```