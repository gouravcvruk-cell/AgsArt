# AuraArt Full-Stack Setup

## Structure
- `client` - React + Tailwind storefront and admin UI
- `server` - Express + MongoDB API, JWT admin auth, Cloudinary upload, Razorpay payments

## Environment
1. Copy `server/.env.example` to `server/.env` and fill all values.
2. Copy `client/.env.example` to `client/.env` and fill values.

## Install
```powershell
cd server
npm install
cd ..\client
npm install
```

## Seed Products
```powershell
cd server
npm run seed
```

## Run
```powershell
cd server
npm run dev
```

In a second terminal:
```powershell
cd client
npm run dev
```
