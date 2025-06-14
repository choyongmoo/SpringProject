export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  replies: number;
  lastReplyAt?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  posts: Post[];
}

export const categories: Category[] = [
  {
    id: "1",
    name: "General Discussion",
    description: "Discuss anything related to programming and technology",
    posts: [
      {
        id: "1",
        title: "What's your favorite programming language in 2024?",
        content: "I'm curious to know what programming languages everyone is using in 2024. Personally, I've been diving deep into TypeScript and Rust...",
        author: "JohnDoe",
        createdAt: "2 hours ago",
        replies: 15,
        lastReplyAt: "30 minutes ago"
      },
      {
        id: "2",
        title: "Best practices for code reviews",
        content: "Looking for tips on how to conduct effective code reviews. What's your process?",
        author: "JaneSmith",
        createdAt: "1 day ago",
        replies: 8,
        lastReplyAt: "5 hours ago"
      }
    ]
  },
  {
    id: "2",
    name: "Web Development",
    description: "Frontend, backend, and full-stack web development discussions",
    posts: [
      {
        id: "3",
        title: "React vs Vue in 2024",
        content: "Which framework do you prefer for new projects in 2024? Let's discuss the pros and cons...",
        author: "TechGuru",
        createdAt: "3 hours ago",
        replies: 23,
        lastReplyAt: "1 hour ago"
      },
      {
        id: "4",
        title: "Building scalable APIs with Node.js",
        content: "Share your experiences and best practices for building scalable APIs...",
        author: "BackendDev",
        createdAt: "2 days ago",
        replies: 12,
        lastReplyAt: "1 day ago"
      }
    ]
  },
  {
    id: "3",
    name: "Mobile Development",
    description: "iOS, Android, and cross-platform mobile development",
    posts: [
      {
        id: "5",
        title: "Flutter vs React Native 2024",
        content: "Which cross-platform framework would you choose for a new project?",
        author: "MobileDev",
        createdAt: "5 hours ago",
        replies: 18,
        lastReplyAt: "2 hours ago"
      },
      {
        id: "6",
        title: "SwiftUI tips and tricks",
        content: "Share your favorite SwiftUI patterns and solutions...",
        author: "iOSDev",
        createdAt: "1 day ago",
        replies: 9,
        lastReplyAt: "6 hours ago"
      }
    ]
  }
]; 