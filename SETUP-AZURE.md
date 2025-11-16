# 🚨 Quick Azure Setup Fix

## Problem
The GitHub Actions workflow is failing because `AZURE_STATIC_WEB_APPS_API_TOKEN` secret is missing.

## Solution: 2 Steps

### Step 1: Create Azure Static Web App (2 minutes)

**Azure Portal Method** (Easiest):

1. Go to: https://portal.azure.com
2. Click **"Create a resource"**
3. Search for **"Static Web App"** → Click **Create**

4. Fill in the form:
   ```
   Subscription: [Your Azure subscription]
   Resource Group: [Create new] → Name: "rg-qcrypto"
   Static Web App name: "qcrypto-wallet"
   Plan type: Free
   Region: West Europe (or your closest)
   
   Deployment details:
   - Source: GitHub
   - [Click "Sign in with GitHub" and authorize]
   - Organization: VenomekPL
   - Repository: QC
   - Branch: main
   
   Build Details:
   - Build presets: React
   - App location: /q-crypto-mockup
   - Api location: (leave empty)
   - Output location: dist
   ```

5. Click **"Review + create"** → **"Create"**

6. **WAIT 2-3 minutes** for Azure to:
   - Create the resource
   - Automatically add the secret to GitHub
   - Trigger a new deployment

### Step 2: Verify Deployment

1. **Check Azure Portal**:
   - Go to your new Static Web App resource
   - Copy the URL (looks like: `https://qcrypto-wallet-xxx.azurestaticapps.net`)

2. **Check GitHub Actions**:
   - Go to: https://github.com/VenomekPL/QC/actions
   - You should see a new workflow running
   - Wait for green checkmark ✅

3. **Test Your Site**:
   - Open the Azure URL
   - Should see Q Crypto login page
   - Test navigation

---

## Alternative: Manual Secret Setup

If Azure didn't automatically add the secret:

1. **Get the deployment token from Azure Portal**:
   - Go to your Static Web App resource
   - Click **"Manage deployment token"** in Overview
   - Copy the token

2. **Add to GitHub Secrets**:
   - Go to: https://github.com/VenomekPL/QC/settings/secrets/actions
   - Click **"New repository secret"**
   - Name: `AZURE_STATIC_WEB_APPS_API_TOKEN`
   - Value: [Paste the token from Azure]
   - Click **"Add secret"**

3. **Trigger new deployment**:
   ```powershell
   cd C:\AI\QCrypto2\q-crypto-mockup
   git commit --allow-empty -m "Trigger deployment"
   git push origin main
   ```

---

## That's It! 🎉

Once Azure is set up, every push to `main` will automatically deploy within 2-3 minutes.

**Need detailed instructions?** See [DEPLOYMENT.md](DEPLOYMENT.md)
