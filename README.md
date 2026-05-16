# GlobalTNA — Mini Service Request Board

A full-stack web app where homeowners post service requests and tradespeople browse, filter, and manage them.

## Tech Stack

- Frontend: Next.js 14 (App Router) + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB Atlas + Mongoose

## Project Structure

- backend/ — Express REST API
- frontend/ — Next.js app
- README.md

## Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free tier)

### 1. Backend setup
cd backend
cp .env.example .env
Add your MONGO_URI to .env
npm install
npm run dev
Runs on http://localhost:5000

### 2. Seed sample data
npm run seed

### 3. Frontend setup
cd frontend
Add NEXT_PUBLIC_API_URL=http://localhost:5000 to .env.local
npm install
npm run dev
Runs on http://localhost:3000

### 4. Run tests
cd backend && npm test

## Environment Variables

### backend/.env
- MONGO_URI — MongoDB Atlas connection string
- PORT — API port (default 5000)
- NODE_ENV — Set to test for Jest

### frontend/.env.local
- NEXT_PUBLIC_API_URL — Express API base URL

## API Endpoints

- GET /api/jobs — List all jobs (supports ?category= ?status= ?search=)
- GET /api/jobs/:id — Fetch single job
- POST /api/jobs — Create new job
- PATCH /api/jobs/:id — Update status only
- DELETE /api/jobs/:id — Delete job

## Bonus Features

- Keyword search across title and description
- Seed script with 7 sample jobs (npm run seed)
- Unit tests with Jest and Supertest (npm test)
