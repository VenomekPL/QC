# Azure Static Web Apps Deployment Guide

## 🚀 Step-by-Step Deployment Instructions

### Prerequisites
- Azure account with active subscription
- GitHub repository with admin access
- Azure CLI installed (optional, for CLI deployment)

---

## 📝 Method 1: Azure Portal (Recommended)

### Step 1: Create Azure Static Web App

1. **Login to Azure Portal**
   - Navigate to https://portal.azure.com
   - Sign in with your Azure account

2. **Create New Resource**
   - Click "Create a resource"
   - Search for "Static Web App"
   - Click "Create"

3. **Configure Basics**
   ```
   Subscription: [Your subscription]
   Resource Group: [Create new] "rg-qcrypto-prod"
   Name: "qcrypto-wallet"
   Plan type: Free (or Standard for custom domains)
   Region: Select closest to your users (e.g., West Europe, East US)
   ```

4. **Configure Deployment**
   ```
   Source: GitHub
   GitHub Account: [Authorize and select your account]
   Organization: VenomekPL
   Repository: QC
   Branch: main
   ```

5. **Configure Build**
   ```
   Build Presets: React
   App location: /q-crypto-mockup
   Api location: [leave empty]
   Output location: dist
   ```

6. **Review + Create**
   - Click "Review + create"
   - Click "Create"
   - Wait 2-3 minutes for deployment

### Step 2: Verify Deployment Token

After creation, Azure automatically:
- Creates a GitHub Actions workflow
- Adds `AZURE_STATIC_WEB_APPS_API_TOKEN` to your repository secrets
- Triggers the first deployment

**Check GitHub**:
1. Go to https://github.com/VenomekPL/QC
2. Navigate to "Actions" tab
3. Verify the workflow is running
4. Wait for green checkmark

### Step 3: Access Your Site

1. In Azure Portal, go to your Static Web App resource
2. Click "Browse" or copy the URL (format: `https://qcrypto-wallet-[random].azurestaticapps.net`)
3. Test the application

---

## 📝 Method 2: Azure CLI

### Step 1: Install Azure CLI

```bash
# Windows (PowerShell)
winget install Microsoft.AzureCLI

# Verify installation
az --version
```

### Step 2: Login to Azure

```bash
az login
```

### Step 3: Create Static Web App

```bash
# Set variables
$RESOURCE_GROUP = "rg-qcrypto-prod"
$APP_NAME = "qcrypto-wallet"
$LOCATION = "westeurope"
$GITHUB_REPO = "VenomekPL/QC"
$BRANCH = "main"

# Create resource group
az group create `
  --name $RESOURCE_GROUP `
  --location $LOCATION

# Create Static Web App
az staticwebapp create `
  --name $APP_NAME `
  --resource-group $RESOURCE_GROUP `
  --source $GITHUB_REPO `
  --location $LOCATION `
  --branch $BRANCH `
  --app-location "/q-crypto-mockup" `
  --output-location "dist" `
  --login-with-github
```

### Step 4: Get Deployment Token

```bash
az staticwebapp secrets list `
  --name $APP_NAME `
  --resource-group $RESOURCE_GROUP `
  --query "properties.apiKey" `
  --output tsv
```

### Step 5: Add Token to GitHub Secrets

1. Copy the token from CLI output
2. Go to https://github.com/VenomekPL/QC/settings/secrets/actions
3. Click "New repository secret"
4. Name: `AZURE_STATIC_WEB_APPS_API_TOKEN`
5. Value: [Paste the token]
6. Click "Add secret"

---

## 🔧 Configuration Files

### GitHub Actions Workflow
Location: `.github/workflows/azure-static-web-apps.yml`

**What it does**:
- Triggers on push to `main` branch
- Installs Node.js 18
- Runs `npm ci` to install dependencies
- Runs `npm run build` to create production bundle
- Deploys `dist/` folder to Azure Static Web Apps

### Static Web App Config
Location: `staticwebapp.config.json`

**What it does**:
- Configures fallback routing for React Router
- Sets cache headers for static assets
- Handles 404 errors by serving index.html
- Supports hash-based routing

---

## ✅ Verification Steps

### 1. Check GitHub Actions
```
https://github.com/VenomekPL/QC/actions
```
- Verify workflow completed successfully
- Check build logs for errors

### 2. Test Deployed Site
- Open your Azure Static Web App URL
- Test login (any credentials)
- Navigate through all pages:
  - /#/login
  - /#/wallet
  - /#/transactions
  - /#/settlement
  - /#/staking
  - /#/admin

### 3. Verify Hash Routing
- Refresh page on any route
- Should not get 404 errors
- Should load correct page

### 4. Test Mobile Responsiveness
- Open browser DevTools
- Test at 320px, 768px, 1024px
- Verify hamburger menu works

---

## 🔄 Continuous Deployment

### Automatic Deployments
Every push to `main` branch automatically:
1. Triggers GitHub Actions workflow
2. Builds the application
3. Deploys to Azure
4. Updates live site within 2-3 minutes

### Manual Deployment
```bash
cd C:\AI\QCrypto2\q-crypto-mockup
git add .
git commit -m "Update application"
git push origin main
# Wait 2-3 minutes, then check Actions tab
```

---

## 🌐 Custom Domain (Optional)

### Add Custom Domain

1. In Azure Portal, go to your Static Web App
2. Click "Custom domains" in left menu
3. Click "Add" → "Custom domain on other DNS"
4. Enter your domain (e.g., `qcrypto.yourdomain.com`)
5. Follow DNS validation steps:
   - Add CNAME record: `qcrypto` → `[your-app].azurestaticapps.net`
   - Or add TXT record for verification
6. Click "Validate"
7. Wait for SSL certificate provisioning (5-10 minutes)

### Enable HTTPS (Automatic)
Azure automatically provisions free SSL certificates for:
- Default `*.azurestaticapps.net` domain
- Custom domains (via Let's Encrypt)

---

## 🐛 Troubleshooting

### Build Fails in GitHub Actions

**Check Node version**:
```yaml
# Ensure workflow uses Node 18+
- name: Setup Node.js
  uses: actions/setup-node@v3
  with:
    node-version: '18'
```

**Check build logs**:
1. Go to GitHub Actions
2. Click failed workflow
3. Expand "Build application" step
4. Look for error messages

**Common fixes**:
```bash
# Locally test build
npm ci
npm run build

# Check if dist/ is created
ls dist/
```

### 404 Errors on Routes

**Verify staticwebapp.config.json**:
- Must be in project root
- Must be deployed with application
- Check navigationFallback configuration

**Test hash routing**:
- Ensure all routes use hash (#) prefix
- Example: `/#/wallet` not `/wallet`

### Deployment Token Issues

**Regenerate token**:
```bash
# Via CLI
az staticwebapp secrets reset `
  --name qcrypto-wallet `
  --resource-group rg-qcrypto-prod

# Update GitHub secret with new token
```

**Via Portal**:
1. Azure Portal → Static Web App
2. "Configuration" → "Application settings"
3. Click "Manage deployment token"
4. Copy new token
5. Update GitHub secret

### Site Not Updating

**Force rebuild**:
```bash
# Make a commit to trigger workflow
git commit --allow-empty -m "Trigger rebuild"
git push origin main
```

**Clear cache**:
- Hard refresh browser: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Or open in incognito/private window

---

## 📊 Monitoring & Analytics

### View Deployment History
1. Azure Portal → Static Web App
2. Click "Deployments" in left menu
3. See all deployment history with status

### Enable Application Insights (Optional)
1. Azure Portal → Static Web App
2. Click "Application Insights"
3. Click "Enable"
4. View traffic, performance, errors

### GitHub Actions Insights
```
https://github.com/VenomekPL/QC/actions
```
- View workflow run history
- Check build times
- Monitor success/failure rates

---

## 💰 Cost Estimate

### Free Tier Includes:
- 100 GB bandwidth/month
- Unlimited custom domains
- Automatic SSL certificates
- GitHub Actions CI/CD
- Global CDN distribution

**Estimated cost**: $0/month (within free tier limits)

### Standard Tier ($9/month):
- 100 GB bandwidth included
- Additional features for larger applications

---

## 🔐 Security Best Practices

### Secrets Management
- ✅ Never commit `AZURE_STATIC_WEB_APPS_API_TOKEN` to repository
- ✅ Token stored securely in GitHub Secrets
- ✅ Rotate token every 90 days

### HTTPS Enforcement
- ✅ Automatic HTTPS redirect enabled
- ✅ Free SSL certificates (Let's Encrypt)
- ✅ TLS 1.2+ only

### Access Control
- Configure IP restrictions (optional)
- Enable authentication providers (optional)
- Set up staging environments for testing

---

## 📚 Additional Resources

- [Azure Static Web Apps Documentation](https://docs.microsoft.com/azure/static-web-apps/)
- [GitHub Actions Documentation](https://docs.github.com/actions)
- [Custom Domains Guide](https://docs.microsoft.com/azure/static-web-apps/custom-domain)
- [Configuration Reference](https://docs.microsoft.com/azure/static-web-apps/configuration)

---

## 🆘 Support

If you encounter issues:
1. Check GitHub Actions logs
2. Review Azure Portal deployment status
3. Consult troubleshooting section above
4. Open GitHub issue with details

---

**Next Steps**: Follow Method 1 (Azure Portal) above to deploy your application!
