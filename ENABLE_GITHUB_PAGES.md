# 🔧 Enable GitHub Pages - Step-by-Step Guide

## The Problem
GitHub Pages isn't automatically enabled on your repository. We need to configure it to deploy the built site.

---

## ✅ **Step 1: Go to Repository Settings**

1. Open: https://github.com/AY-OmoP/AjoCircle
2. Click the **Settings** tab (top right)
3. Look for **"Pages"** in the left sidebar

---

## ✅ **Step 2: Configure GitHub Pages**

In the **Pages** section:

### **Source:**
- Change the dropdown from "None" to **"GitHub Actions"**
- (If you see "Deploy from a branch", select that instead and choose `main` + `/root`)

### Screenshot Guide:
```
Settings → Pages
├─ Source: GitHub Actions ✓
└─ Custom domain: (leave blank)
```

---

## ✅ **Step 3: Save & Wait**

1. Click **Save** (if needed)
2. GitHub will automatically trigger a new deployment
3. Wait 1-2 minutes for the site to build and deploy
4. You'll see a green checkmark with the live URL

---

## ✅ **Step 4: Verify Deployment**

After saving:

1. Go to **Actions** tab in your repo
2. You should see a new workflow run triggered
3. Wait for it to complete (green checkmark ✓)
4. Visit: https://ay-omop.github.io/AjoCircle/

---

## 📋 Alternative: If "GitHub Actions" Option Not Available

If you only see "Deploy from a branch" option:

1. Select **"Deploy from a branch"**
2. Choose branch: **main**
3. Choose folder: **/ (root)** or **/root**
4. Click **Save**

Then:
1. Go to **Actions** tab
2. Manually trigger the workflow OR just wait for the next push

---

## 🔄 How It Works

Your `.github/workflows/deploy.yml` is already configured to:

1. **Build** your app with `npm run build` → creates `dist/` folder
2. **Upload** the `dist/` folder as an artifact
3. **Deploy** to GitHub Pages automatically

**All you need to do:** Enable the Pages source in Settings!

---

## ✅ When You're Done

Once enabled, every time you push to `main`:
- ✅ Workflow automatically builds
- ✅ Site auto-deploys to GitHub Pages
- ✅ Live at: https://ay-omop.github.io/AjoCircle/

---

## 🆘 If It Still Doesn't Work

Try these:

1. **Check Actions are enabled:**
   - Settings → Actions → General
   - Make sure "Allow all actions and reusable workflows" is selected

2. **Check branch permissions:**
   - Settings → Branches
   - Make sure `main` branch allows Actions

3. **Re-trigger the workflow:**
   - Go to Actions tab
   - Find the deploy workflow
   - Click "Re-run jobs"

4. **Check for errors:**
   - Actions tab → Latest run
   - Click on the job to see logs
   - Look for any error messages

---

## 📞 Need Help?

If you get stuck:
1. Screenshot the Pages settings screen
2. Check the Actions tab for error messages
3. The error logs will tell you what's wrong

**Common issues:**
- ❌ "No artifact found" → Your build might be failing
- ❌ "Permission denied" → Check branch permissions
- ❌ "Source not configured" → You missed Step 2

---

**👉 ACTION REQUIRED:** Go to your repo Settings → Pages and change the Source to "GitHub Actions"

Once you do that, your site will be live! 🚀
