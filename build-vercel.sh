#!/bin/bash
set -e

echo "Building frontend with Vite..."
npx vite build --outDir=dist/public

echo "Build complete!"
echo "Backend will be built automatically by Vercel using @vercel/node"
