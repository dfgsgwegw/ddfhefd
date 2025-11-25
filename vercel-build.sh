#!/bin/bash
set -e

echo "Running Vercel build..."
npx vite build --outDir=dist/public
echo "Frontend build complete!"
