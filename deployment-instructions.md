# FoodMine Project Deployment Guide

This guide outlines the steps to deploy your FoodMine application, first deploying the backend and then the frontend.

## Backend Deployment

1. **Prepare Environment Variables**:
   - Create a `.env` file in the backend directory based on the example in `backend-env-sample.txt`
   - Update the MongoDB URI, JWT secret, and allowed origins with your production values
   - Set `NODE_ENV=production` to disable automatic data seeding

2. **Database Preparation**:
   - You will need to prepare your production database with your food items and admin users
   - For security reasons, the application won't automatically seed data in production
   - Consider creating scripts or using MongoDB tools to populate your production database

3. **Deploy to a Hosting Service** (e.g., Heroku, Render, DigitalOcean, etc.):

   **For Heroku:**
   ```bash
   # Navigate to backend directory
   cd backend
   
   # Initialize git (if not already done)
   git init
   
   # Create Heroku app
   heroku create your-app-name
   
   # Set environment variables
   heroku config:set MONGO_URI=your_mongo_uri
   heroku config:set JWT_SECRET=your_jwt_secret
   heroku config:set ALLOWED_ORIGINS=https://your-frontend-url.com
   heroku config:set NODE_ENV=production
   
   # Deploy to Heroku
   git add .
   git commit -m "Deploy backend"
   git push heroku master
   ```

   **For Render:**
   - Create a new Web Service
   - Connect your GitHub repository
   - Specify the build command: `npm install`
   - Specify the start command: `npm start`
   - Add environment variables from your `.env` file

4. **Verify Backend Deployment**:
   - Test API endpoints using tools like Postman or cURL
   - Ensure all endpoints are working correctly

## Frontend Deployment

1. **Test with Deployed Backend**:
   - Create a `.env` file in the frontend directory based on `frontend-env-sample.txt`
   - Set `REACT_APP_API_URL` to your deployed backend URL
   - Set `REACT_APP_PAYPAL_CLIENT_ID` to your PayPal client ID
   - Test locally:
     ```bash
     cd frontend
     npm start
     ```
   - Verify that the frontend can communicate with the deployed backend

2. **Deploy Frontend** (e.g., Netlify, Vercel, GitHub Pages):

   **For Netlify:**
   ```bash
   # Navigate to frontend directory
   cd frontend
   
   # Build the project
   npm run build
   
   # Deploy using Netlify CLI (if installed)
   netlify deploy
   ```

   **For Vercel:**
   ```bash
   # Install Vercel CLI if not installed
   npm install -g vercel
   
   # Navigate to frontend directory
   cd frontend
   
   # Deploy to Vercel
   vercel
   ```

3. **Configure Environment Variables on Hosting Platform**:
   - Set `REACT_APP_API_URL` on your hosting platform's environment settings
   - Set `REACT_APP_PAYPAL_CLIENT_ID` for payment functionality

## PayPal Integration

1. **PayPal Developer Account**:
   - Create a PayPal Developer account at https://developer.paypal.com
   - Create a new application to get your client ID
   - Use sandbox mode for testing before going to production

2. **Configure PayPal Client ID**:
   - Add your PayPal Client ID to your frontend environment variables
   - Test payment flow in development mode before deploying

## Alternative: Full-Stack Deployment

If you prefer to serve both frontend and backend from the same server:

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Copy the build folder to the backend public directory:
   ```bash
   # From the project root
   npm run build
   # This will run the build script in the root package.json
   ```

3. Deploy only the backend, which will now serve the frontend as static files.

## Post-Deployment

1. **Monitor your application**:
   - Set up monitoring tools
   - Check server logs for errors

2. **Update CORS settings** if needed:
   - Ensure your backend's ALLOWED_ORIGINS environment variable includes your frontend domain

3. **Set up a custom domain** (optional):
   - Purchase a domain name
   - Configure DNS settings as per your hosting provider's instructions
   - Update CORS settings accordingly

## Troubleshooting

- **CORS Issues**: Ensure the backend ALLOWED_ORIGINS includes the frontend's full URL
- **Connection Problems**: Check that the REACT_APP_API_URL is correctly set
- **Database Connection**: Verify your MongoDB connection string and network access settings
- **404 Errors**: Ensure frontend routing works with your hosting provider (may require configuration)
- **PayPal Integration Issues**: Verify your client ID is correct and the account is properly configured 