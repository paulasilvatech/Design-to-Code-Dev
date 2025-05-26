#!/bin/bash

echo "🔧 Testing GitHub Actions workflow locally..."
echo ""

# Navigate to landing-page directory
cd "landing-page" || exit 1

echo "📦 Installing dependencies..."
npm install

echo ""
echo "🏗️ Building the project..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Build successful!"
    echo "📁 Build output:"
    ls -la dist/
else
    echo ""
    echo "❌ Build failed!"
    exit 1
fi

echo ""
echo "🧪 Testing built files..."
if [ -f "dist/index.html" ]; then
    echo "✅ index.html exists"
else
    echo "❌ index.html missing"
fi

if [ -d "dist/assets" ]; then
    echo "✅ assets directory exists"
    echo "📂 Assets:"
    ls -la dist/assets/
else
    echo "❌ assets directory missing"
fi

echo ""
echo "🎉 Test complete!"
