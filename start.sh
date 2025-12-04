#!/bin/bash

# SaeJaeDang Cafe - Quick Start Script
# This script starts both the backend and frontend servers

echo "🍞 Starting SaeJaeDang Cafe Application..."
echo "============================================"

# Check if node_modules exist
if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend && npm install && cd ..
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend && npm install && cd ..
fi

echo ""
echo "✅ Dependencies ready"
echo ""
echo "🚀 Starting servers..."
echo ""
echo "Backend API: http://localhost:5000"
echo "Frontend:    http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo "============================================"
echo ""

# Start backend in background
cd backend && npm run dev &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 2

# Start frontend
cd ../frontend && npm start

# When frontend is stopped, also stop backend
kill $BACKEND_PID
