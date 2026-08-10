# AI Worker Marketplace

A prototype web application for hiring AI workers at a fraction of the cost of human professionals. Built for the Build with Gemma hackathon.

## Features

- **4 AI Worker Types**: Teacher, Health Guide, Therapist, Message Formatter
- **Cost Comparison**: Shows savings compared to human workers (up to 90% savings)
- **Time-based Rental**: Hire workers by hour, day, or week
- **Real-time Chat**: Interactive chat interface with AI workers
- **Gemma API Integration**: Powered by Google's Gemma AI model
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: React Vite with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **AI Integration**: Google Gemma API
- **Authentication**: Mock authentication (prototype)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Google AI Studio API key ([Get one here](https://aistudio.google.com))

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd ai-worker-marketplace
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your Gemma API key:
```
VITE_GEMMA_API_KEY=your_actual_api_key_here
VITE_GEMMA_MODEL=gemma-3-27b-it
```

4. Run the development server:
```bash
npm run dev
```

5. Open your browser to `http://localhost:5173`

## Project Structure

```
ai-worker-marketplace/
├── src/
│   ├── api/              # API integration (Gemma, Workers, Auth)
│   ├── components/       # React components
│   │   ├── chat/        # Chat interface components
│   │   ├── common/      # Shared components
│   │   ├── layout/      # Layout components
│   │   └── workers/     # Worker-related components
│   ├── contexts/         # React Context providers
│   ├── pages/           # Page components
│   ├── types/           # TypeScript interfaces
│   └── utils/           # Utility functions
├── public/              # Static assets
└── package.json
```

## AI Workers Available

### 1. AI Teacher Pro ($5/hr vs $50/hr human)
- Subject tutoring (Math, Science, History, etc.)
- Homework help
- Exam preparation
- Concept explanations

### 2. Wellness Guide AI ($3/hr vs $30/hr human)
- Fitness planning
- Nutrition guidance
- Wellness tips
- Stress management

### 3. MindSupport AI ($8/hr vs $80/hr human)
- Emotional support
- Stress management
- Coping strategies
- Crisis resources

### 4. TextPerfect AI ($2/hr vs $20/hr human)
- Grammar checking
- Style improvement
- Tone adjustment
- Professional formatting

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Add environment variables:
   - `GEMMA_API_KEY`: Your Google AI Studio API key
   - `GEMMA_MODEL`: The Gemma model name (e.g., `gemma-3-27b-it`)
5. Deploy

## Important Security Notes

- **Never commit your `.env` file** to Git
- **Always use environment variables** for API keys
- **API keys should only be used server-side** in production
- This prototype uses client-side API calls for demo purposes

## Hackathon Submission

This project was built for the Build with Gemma hackathon and meets all requirements:

- ✅ Uses Gemma API for AI functionality
- ✅ Public GitHub repository
- ✅ Live deployment on Vercel
- ✅ Demo video showing functionality
- ✅ Kaggle writeup with all links

## Future Enhancements

- Real GitHub OAuth authentication
- Database persistence for user sessions
- Payment integration for real rentals
- More worker types (legal advisor, career coach, etc.)
- Voice input/output capabilities
- File sharing features
- Admin dashboard
- Analytics and usage tracking

## License

MIT License - feel free to use this project for learning and development.

## Acknowledgments

- Built for [Build with Gemma Hackathon](https://www.kaggle.com/competitions/build-with-gemma-tfug-prayagraj-ai-prayagraj-in-person)
- Powered by [Google Gemma](https://ai.google.dev/gemma)
- UI styled with [Tailwind CSS](https://tailwindcss.com/)