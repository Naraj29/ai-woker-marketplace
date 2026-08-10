# ⚡ WorkerX AI — Autonomous AI Specialist Marketplace

> **Official Competition Entry for the [Build with Gemma Hackathon](https://www.kaggle.com/competitions/build-with-gemma-tfug-prayagraj-ai-prayagraj-in-person) (TFUG Prayagraj AI)**  
> *Deploy specialized, autonomous AI professionals at 1/10th the cost of traditional human retainers—powered 100% by Google Gemma 2.*

![Gemma API Verified](https://img.shields.io/badge/AI_Model-Google_Gemma_2-6366f1?style=for-the-badge&logo=google)
![Vercel Serverless](https://img.shields.io/badge/Backend-Vercel_Serverless-000000?style=for-the-badge&logo=vercel)
![Security Passed](https://img.shields.io/badge/Security-Zero_Client_Key_Exposure-10b981?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

---

## 🚀 Overview

**WorkerX AI** is a next-generation web application where users can discover, evaluate, and instantly hire specialized AI professionals—from STEM & Coding Tutors to Bio-Fitness Coaches, Mindful Counselors, and Copy Architects. 

By executing tasks through Google's **Gemma 2 instruction-tuned models**, users save up to **92%** on hourly consultation rates with zero waiting time or scheduling conflicts.

---

## ✨ Key Features

- 🎓 **Gemma STEM & Code Tutor**: Master algorithms, data structures, calculus, and system design with step-by-step code walk-throughs.
- 🏃 **Gemma Bio & Fitness Coach**: Formulate custom macro diets, hypertrophy routines, and sleep optimization strategies.
- 🧠 **Gemma Mindful Counselor**: Safe, compassionate space for emotional reframing, CBT techniques, and stress relief.
- ✍️ **Gemma Copy & Doc Architect**: Transform raw drafts into executive-ready copy, polished resumes, and formatted Markdown reports.
- ⏱️ **Interactive Session Booking**: Hire specialists for 15m, 30m, 1h, or 2h with real-time cost calculation ($1.25 for 15 mins!).
- 📥 **Export Chat Transcripts**: Download full session notes in `.txt` format with a single click.
- 🎨 **Obsidian Dark Glassmorphism UI**: High-contrast, responsive interface built with glass cards, gradient glows, and mobile drawer controls.

---

## 🔒 Security & Architecture (Rule #2 Compliant)

```
  User Browser                Vercel Serverless Edge              Google AI Studio
 ┌──────────────┐   POST     ┌────────────────────────┐   POST   ┌─────────────────┐
 │ WorkerX App  │───────────>│ /api/gemma             │─────────>│ Gemma 2 Model   │
 │ (No API Key) │            │ (Holds GEMMA_API_KEY)  │          │ (Google API)    │
 └──────────────┘ <──────────└────────────────────────┘ <────────└─────────────────┘
                   Response             Response
```

### Server-Side Key Isolation
Unlike naive frontend demos that expose API keys in browser network tabs, WorkerX AI handles all AI inference through a dedicated Vercel Serverless Function ([`api/gemma.ts`](./api/gemma.ts)):
1. The browser sends prompts to `/api/gemma`.
2. The server reads `GEMMA_API_KEY` from secure server environment variables.
3. The server forwards the prompt to Google AI Studio's Gemma model endpoint (`gemma-2-27b-it`).
4. **Result**: Your secret API key **never** reaches client-side JavaScript or browser dev tools.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite 8, React Router v7
- **Styling**: Obsidian Glassmorphism System, Tailwind CSS v4, Inter Typography
- **Backend**: Node.js, Vercel Serverless Functions (`/api/gemma.ts`)
- **AI Core**: Google AI Studio Gemma 2 Models (`gemma-2-27b-it` / `gemma-2-9b-it`)

---

## 🏁 Getting Started Locally

### 1. Prerequisites
- Node.js 18 or higher
- A Google AI Studio API key ([Get one here](https://aistudio.google.com))

### 2. Installation
```bash
git clone https://github.com/Naraj29/ai-woker-marketplace.git
cd ai-woker-marketplace
npm install
```

### 3. Environment Setup
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Add your Google AI Studio key:
```env
GEMMA_API_KEY=your_actual_api_key_here
GEMMA_MODEL=gemma-2-27b-it
```

### 4. Run Dev Server
```bash
npm run dev
```
Open [http://localhost:5174](http://localhost:5174) in your browser.

---

## 🌐 Production Deployment on Vercel

1. Push code to your public GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import your repository.
3. Under **Environment Variables**, add:
   - `GEMMA_API_KEY`: `your_google_ai_studio_key`
   - `GEMMA_MODEL`: `gemma-2-27b-it`
4. Click **Deploy**. Vercel will automatically build the Vite client and deploy the `/api/gemma` serverless endpoint.

---

## 📋 Hackathon Final Checklist

| Requirement | Status | Verification |
| :--- | :---: | :--- |
| **Only Gemma Model Used** | ✅ PASS | Verified in `api/gemma.ts` (`gemma-2-27b-it`) |
| **No API Key Exposure** | ✅ PASS | Grep search for `AIza` returns 0 results |
| **Live Web App Link** | ✅ PASS | Deployed on Vercel |
| **Public GitHub Repository** | ✅ PASS | [GitHub Repo](https://github.com/Naraj29/ai-woker-marketplace) |
| **TypeScript Build** | ✅ PASS | `npm run build` completed with 0 errors |

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 🏆 Acknowledgments

- Built for the **Build with Gemma Hackathon** (TFUG Prayagraj AI)
- Powered by [Google Gemma AI Models](https://ai.google.dev/gemma)