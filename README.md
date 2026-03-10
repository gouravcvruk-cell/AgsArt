# RiddhiArt

A full-stack e-commerce website for handmade resin art, resin jewellery, and artificial gold jewellery.

## Features
- Boutique storefront with category browsing and filters
- Product detail pages with gallery and size selection
- Cart and checkout flow
- Payment mode toggle:
  - `direct` (order placement without gateway)
  - `razorpay` (Razorpay checkout integration)
- Admin panel with JWT auth
  - Add/edit/delete products
  - Image upload via Cloudinary
  - View orders

## Tech Stack
- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Auth: JWT
- Media: Cloudinary
- Payments: Razorpay (optional via env toggle)

## Project Structure
```text
RiddhiArt/
  client/
  server/
```

## Environment Setup

### Server (`server/.env`)
```env
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://127.0.0.1:27017/riddhiart
JWT_SECRET=replace_with_strong_secret
PAYMENT_MODE=direct
ADMIN_EMAIL=admin@riddhiart.com
ADMIN_PASSWORD=ChangeMe123!

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

### Client (`client/.env`)
```env
VITE_API_URL=http://localhost:5000/api
VITE_PAYMENT_MODE=direct
VITE_RAZORPAY_KEY_ID=
```

## Install Dependencies
```powershell
cd server
npm install
cd ..\client
npm install
```

## Seed Sample Products
```powershell
cd server
npm run seed
```

## Run Locally

Terminal 1:
```powershell
cd server
npm run dev
```

Terminal 2:
```powershell
cd client
npm run dev
```

Open: `http://localhost:5173`

## Admin Login
- Email: value from `ADMIN_EMAIL`
- Password: value from `ADMIN_PASSWORD`

## Payment Mode Toggle
- Use `direct` for no-gateway checkout
- Use `razorpay` to enable Razorpay checkout

Set both sides:
- Server: `PAYMENT_MODE=direct|razorpay`
- Client: `VITE_PAYMENT_MODE=direct|razorpay`

When using Razorpay mode, set:
- `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` in server env
- `VITE_RAZORPAY_KEY_ID` in client env

## Notes
- Keep `.env` files private; only `.env.example` should be committed.
- If MongoDB is local, ensure service is running before starting server.

## One-Click Deploy
Render (backend):
- Use `render.yaml` in the repo root for a Render Blueprint deploy.

Vercel (frontend):
- Use the `client/vercel.json` config.
- Set Vercel Root Directory to `client` if prompted.
