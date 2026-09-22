# dontotl.github.io

Automated GitHub-synced Developer Portfolio for [@dontotl](https://github.com/dontotl).

Live Site: [https://dontotl.github.io](https://dontotl.github.io)

---

## Features

- ⚡ **Automated Repository Synchronization**: Automatically fetches public repositories, metadata, topics, and stars via GitHub Actions and API.
- 🎨 **Modern Minimalist UI**: Built with Next.js 16, React 19, and Tailwind CSS.
- 🔍 **Interactive Filters & Search**: Real-time keyword search, language filter chips, and sorting options (recent updates, stars, name).
- 🚀 **Zero-Cost Serverless Hosting**: Statically exported and hosted on GitHub Pages with sub-second page loads.
- 🔄 **Daily Auto-Sync**: Configured with a scheduled GitHub Actions cron job to refresh projects daily, plus support for manual one-click dispatch.

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Fetch latest repositories from GitHub
npm run sync

# 3. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view your portfolio locally.

---

## Deployment & GitHub Actions

This repository uses GitHub Actions (`.github/workflows/deploy.yml`) to automatically build and deploy the portfolio to GitHub Pages:

1. **On Push**: Whenever changes are pushed to `main`.
2. **On Schedule**: Every day at 00:00 UTC (09:00 KST).
3. **Manual Trigger**: Via the **Actions** tab -> **Run workflow** button on GitHub.
