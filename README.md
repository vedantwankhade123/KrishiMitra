# KrishiMitra - AI Farming Assistant

KrishiMitra is a modern, AI-powered web application designed to assist farmers by providing intelligent crop recommendations, a comprehensive crop library, and real-time weather information. Built with a powerful and modern tech stack, it aims to empower farmers with data-driven insights for sustainable and profitable agriculture.

![KrishiMitra Landing Page](https://picsum.photos/seed/screenshot/1200/600)

## ✨ Features

- **🤖 AI Chat Assistant**: A conversational interface powered by Google's Gemini model to provide personalized crop recommendations based on soil type, weather, market prices, and more.
- **📚 Comprehensive Crop Library**: A searchable database of various crops with detailed information on planting, climate, soil requirements, and expected yields.
- **☀️ Real-time Weather Page**: Integrated weather service to fetch and display current weather conditions based on the user's location.
- **🗣️ Voice Input & Text-to-Speech**: Users can speak their queries and listen to the AI's responses.
- **🌍 Multi-language Support**: The interface supports English, Hindi, and Marathi to cater to a diverse user base.
- **🎨 Modern, Responsive UI**: A sleek and intuitive user interface built with ShadCN UI and Tailwind CSS, featuring both light and dark modes.
- **🔐 User Session Management**: Manages chat history and user preferences locally in the browser.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [ShadCN UI](https://ui.shadcn.com/)
- **AI/Generative**: [Google's Genkit](https://firebase.google.com/docs/genkit) with Gemini models
- **Icons**: [Lucide React](https://lucide.dev/guide/packages/lucide-react)
- **State Management**: React Context API

## 🚀 Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) (or yarn/pnpm)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <project-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of your project and add your Google Gemini API key:
    ```env
    GEMINI_API_KEY=YOUR_API_KEY_HERE
    ```
    You can obtain an API key from [Google AI Studio](https://aistudio.google.com/).

### Running the Application

This project requires running two separate processes concurrently: the Next.js frontend server and the Genkit flows server.

1.  **Run the Next.js development server:**
    Open a terminal and run:
    ```bash
    npm run dev
    ```
    This will start the web application, typically on `http://localhost:9002`.

2.  **Run the Genkit development server:**
    Open a second terminal and run:
    ```bash
    npm run genkit:dev
    ```
    This starts the Genkit flows that the AI assistant relies on. You can view the Genkit developer UI at `http://localhost:4000`.

Once both servers are running, you can open your browser to `http://localhost:9002` to see the application in action.
# KrishiMitra
