# Smart Learn 🎓

A personalized learning platform that adapts to your study style using AI-powered recommendations.

![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Firebase](https://img.shields.io/badge/Firebase-12-orange)
![Vite](https://img.shields.io/badge/Vite-6-purple)

## Features

- 🎯 **Personalized Learning Paths** - AI generates custom study plans based on your profile
- 📊 **Student Clustering** - Categorizes learners (Topper, Average, Below Average) for targeted content
- 🎥 **Video Lectures** - Embedded YouTube tutorials for each topic
- 📝 **Interactive Quizzes** - Test your knowledge with immediate feedback
- 📈 **Progress Tracking** - Monitor your learning journey
- 💡 **Smart Recommendations** - AI-powered resource suggestions

## Tech Stack

- **Frontend:** React 18, TypeScript, Tailwind CSS
- **Backend:** Firebase (Auth, Firestore)
- **AI:** Google AI (Gemini 2.0 Flash)
- **Build:** Vite

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Firebase account
- Google AI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/likith824788-png/Smart-learn.git
cd Smart-learn
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key

VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

4. Start development server:
```bash
npm run dev
```

## Project Structure

```
smart-learn/
├── components/       # React components
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   ├── CourseView.tsx
│   ├── Quiz.tsx
│   └── Profile.tsx
├── services/         # API services
│   ├── firebase.ts
│   ├── geminiService.ts
│   └── storageService.ts
├── constants.ts      # Course data
├── types.ts          # TypeScript types
└── App.tsx           # Main app with routing
```

## Available Courses

- 🐍 **Python Programming** - Basics to OOP
- 🤖 **Machine Learning** - Fundamentals to deployment
- 📊 **Data Science** - Analysis and visualization

## License

MIT License
