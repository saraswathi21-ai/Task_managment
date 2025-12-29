# Deployment Guide

This guide will help you deploy the Task Management Application to Vercel (Frontend) and Railway/Render (Backend).

## Deployment Architecture

- **Frontend**: Vercel (React + Vite)
- **Backend**: Railway or Render (Node.js + Express)
- **Database**: MongoDB Atlas (already configured)

---

## Step 1: Deploy Backend to Railway or Render

### Option A: Deploy to Railway (Recommended)

1. **Sign up/Login** to [Railway](https://railway.app)

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure Service**
   - Select the `backend` folder as the root directory
   - Railway will auto-detect Node.js

4. **Set Environment Variables**
   - Go to Variables tab
   - Add:
     ```
     PORT=5000
     MONGODB_URI=your-mongodb-atlas-connection-string
     NODE_ENV=production
     ```

5. **Deploy**
   - Railway will automatically deploy
   - Copy the generated URL (e.g., `https://your-app.railway.app`)

### Option B: Deploy to Render

1. **Sign up/Login** to [Render](https://render.com)

2. **Create New Web Service**
   - Connect your GitHub repository
   - Select the `backend` folder
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`

3. **Set Environment Variables**
   - Add:
     ```
     PORT=5000
     MONGODB_URI=your-mongodb-atlas-connection-string
     NODE_ENV=production
     ```

4. **Deploy**
   - Render will deploy automatically
   - Copy the service URL

---

## Step 2: Deploy Frontend to Vercel

### Method 1: Using Vercel CLI (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Navigate to Frontend Directory**
   ```bash
   cd frontend
   ```

4. **Deploy**
   ```bash
   vercel
   ```
   - Follow the prompts
   - Select the `frontend` folder as root
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

### Method 2: Using Vercel Dashboard

1. **Go to [Vercel](https://vercel.com)**
   - Sign up/Login with GitHub

2. **Import Project**
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure:
     - **Framework Preset**: Vite
     - **Root Directory**: `frontend`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
     - **Install Command**: `npm install`

3. **Set Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add:
     ```
     VITE_API_URL=https://your-backend-url.railway.app/api
     ```
     (Replace with your actual backend URL)

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy automatically

---

## Step 3: Update Environment Variables

### Frontend (Vercel)
1. Go to your Vercel project dashboard
2. Settings → Environment Variables
3. Add:
   ```
   VITE_API_URL=https://your-backend-url.railway.app/api
   ```

### Backend (Railway/Render)
Already configured in Step 1.

---

## Step 4: Update CORS Settings

Update your backend `server.js` to allow your Vercel frontend URL:

```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-vercel-app.vercel.app'
  ],
  credentials: true
}));
```

---

## Step 5: Test Your Deployment

1. **Frontend URL**: `https://your-app.vercel.app`
2. **Backend URL**: `https://your-backend.railway.app`
3. **API Health Check**: `https://your-backend.railway.app/api/health`

---

## Troubleshooting

### Frontend Issues
- **Build Fails**: Check that all dependencies are in `package.json`
- **API Not Working**: Verify `VITE_API_URL` environment variable is set correctly
- **404 on Routes**: Ensure Vercel rewrites are configured (already in `vercel.json`)

### Backend Issues
- **MongoDB Connection**: Verify MongoDB Atlas IP whitelist includes Railway/Render IPs (or use `0.0.0.0/0` for development)
- **CORS Errors**: Update CORS settings to include your Vercel URL
- **Port Issues**: Railway/Render automatically assigns ports, use `process.env.PORT`

---

## Quick Commands

### Deploy Frontend to Vercel
```bash
cd frontend
vercel
```

### Update Environment Variables
- Vercel Dashboard → Project → Settings → Environment Variables
- Add: `VITE_API_URL=https://your-backend-url/api`

---

## Post-Deployment Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Environment variables set in both platforms
- [ ] CORS configured for frontend URL
- [ ] MongoDB Atlas IP whitelist updated
- [ ] Test create, read, update, delete operations
- [ ] Check browser console for errors

---

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check Railway/Render deployment logs
3. Verify environment variables are set correctly
4. Test API endpoints directly using Postman/curl

