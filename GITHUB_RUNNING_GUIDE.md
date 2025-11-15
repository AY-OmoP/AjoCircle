# Running AjoCircle on GitHub

There are multiple ways to run and deploy your AjoCircle project on GitHub. Here's a comprehensive guide:

---

## 🚀 Option 1: GitHub Pages (Automatic Deployment) ⭐ **RECOMMENDED**

Your project is already configured for automatic deployment to GitHub Pages when you push to `main`.

### How It Works:
1. **Push to main branch** → Triggers GitHub Actions workflow
2. **Workflow builds your app** → Runs `npm run build`
3. **Deploys to GitHub Pages** → Site goes live automatically

### View Your Live Site:
```
https://ay-omop.github.io/AjoCircle/
```

### Check Deployment Status:
1. Go to your repository: https://github.com/AY-OmoP/AjoCircle
2. Click **"Actions"** tab
3. View workflow runs and deployment logs
4. Once the green checkmark appears, your site is live

### Current Configuration:
- **Trigger**: Push to `main` branch (see `.github/workflows/deploy.yml`)
- **Build Command**: `npm run build`
- **Output**: `dist/` directory
- **Node Version**: 18

---

## 🔧 Option 2: Run Locally Before Pushing

### Development Server (Hot Reload)
```bash
npm install
npm run dev
```
- Opens at: http://localhost:5173
- Changes auto-reload

### Build for Production
```bash
npm run build
```
- Creates optimized `dist/` folder
- Ready to deploy anywhere

### Preview Production Build
```bash
npm run preview
```
- Shows what your site looks like after build
- Useful for testing before pushing

---

## 📝 Option 3: Create a GitHub Issue or Discussion

1. Go to your repository: https://github.com/AY-OmoP/AjoCircle
2. Click **"Issues"** or **"Discussions"** tab
3. Describe what you want to run or test
4. Get feedback from collaborators

---

## 🔄 Option 4: Use GitHub Codespaces (Free Cloud IDE)

Run your project directly in the browser without installing anything locally:

1. Go to: https://github.com/AY-OmoP/AjoCircle
2. Click **"Code"** → **"Codespaces"** → **"Create codespace on main"**
3. Wait for the environment to load
4. In the terminal, run:
   ```bash
   npm install
   npm run dev
   ```
5. Click the forwarded URL (e.g., http://localhost:5173)

---

## ✅ Option 5: Run Tests on GitHub Actions

Add a test workflow to run tests automatically:

Create `.github/workflows/test.yml`:
```yaml
name: Tests

on:
  push:
    branches: ["main", "dev"]
  pull_request:
    branches: ["main"]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm install
      - run: npm test
```

---

## 📊 Option 6: Monitor with GitHub Actions Insights

View performance and build metrics:
1. Go to **Actions** tab
2. Click on any workflow run
3. See execution time, memory usage, and logs

---

## 🎯 Quick Reference: What Runs Where

| Where | Command | How to View |
|-------|---------|------------|
| **Local Machine** | `npm run dev` | http://localhost:5173 |
| **Local Production** | `npm run build` | Files in `dist/` folder |
| **GitHub Pages** | Auto-triggered on `main` push | https://ay-omop.github.io/AjoCircle/ |
| **GitHub Codespaces** | `npm run dev` | Forwarded port URL |
| **GitHub Actions (Tests)** | `npm test` | Actions tab in repo |

---

## 🔐 Environment Variables (if needed)

If you need environment variables for your app:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **"New repository secret"**
3. Add your variables (e.g., `VITE_API_URL`)
4. Access in your code: `import.meta.env.VITE_API_URL`

---

## 🐛 Troubleshooting

### Site Not Deploying?
1. Check **Actions** tab for errors
2. Verify Node version matches (18+)
3. Check `npm run build` works locally first

### 404 Errors on GitHub Pages?
- Your base path might need adjustment
- Update `vite.config.ts`:
  ```typescript
  export default defineConfig({
    base: '/AjoCircle/',
    // ... rest of config
  });
  ```

### Build Fails in GitHub?
1. Clear node_modules locally: `rm -rf node_modules && npm install`
2. Commit and push: `git add . && git commit -m "fix: dependencies"`
3. Push triggers new build

---

## 📚 Next Steps

1. **View your live site**: https://ay-omop.github.io/AjoCircle/
2. **Check Actions**: https://github.com/AY-OmoP/AjoCircle/actions
3. **Create a PR**: Use the feature branch you created to make a pull request
4. **Run locally**: `npm install && npm run dev`

---

**Your project is ready to go! 🎉**
