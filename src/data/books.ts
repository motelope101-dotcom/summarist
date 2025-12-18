// Defines the shape of a book object
export type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  coverUrl: string;
  audioUrl: string;
  duration: number; // playback length in seconds
  featured?: boolean; // flag for spotlight books
};

// Sample book data used for seeding or local testing
export const books: Book[] = [
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    description:
      "An easy and proven way to build good habits and break bad ones.",
    coverUrl: "/covers/atomic-habits.jpg",
    audioUrl: "/audio/Recording.mp3",   
    duration: 3600,
    featured: true,
  },
  {
    id: "deep-work",
    title: "Deep Work",
    author: "Cal Newport",
    description: "Rules for focused success in a distracted world.",
    coverUrl: "/covers/deep-work.jpg",
    audioUrl: "/audio/Recording.mp3",
    duration: 4200,
  },
  {
    id: "lean-startup",
    title: "The Lean Startup",
    author: "Eric Ries",
    description:
      "How today's entrepreneurs use continuous innovation to create radically successful businesses.",
    coverUrl: "/covers/lean-startup.jpg",
    audioUrl: "/audio/Recording.mp3",
    duration: 3900,
  },
  {
    id: "7-habits",
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    description: "Powerful lessons in personal change.",
    coverUrl: "/covers/7-habits.jpg",
    audioUrl: "/audio/Recording.mp3",
    duration: 4800,
  },
  {
    id: "thinking-fast-slow",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    description: "Explores the two systems that drive the way we think.",
    coverUrl: "/covers/thinking-fast-slow.jpg",
    audioUrl: "/audio/Recording.mp3",
    duration: 5100,
  },
];