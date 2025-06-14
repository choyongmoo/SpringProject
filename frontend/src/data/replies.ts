export interface Reply {
  id: string;
  postId: string;
  content: string;
  author: string;
  createdAt: string;
  likes: number;
}

export const replies: Reply[] = [
  // Replies for "What's your favorite programming language in 2024?"
  {
    id: "1",
    postId: "1",
    content: "I've been using TypeScript for most of my projects lately. The type safety and better IDE support make it worth the extra setup time. What about you?",
    author: "JaneSmith",
    createdAt: "2 hours ago",
    likes: 5
  },
  {
    id: "2",
    postId: "1",
    content: "Rust has been my go-to language for performance-critical applications. The memory safety without garbage collection is a game-changer.",
    author: "TechGuru",
    createdAt: "1 hour ago",
    likes: 8
  },
  {
    id: "3",
    postId: "1",
    content: "Python is still my favorite for data science and ML projects. The ecosystem is unmatched, and the syntax is so readable.",
    author: "DataScientist",
    createdAt: "45 minutes ago",
    likes: 12
  },
  {
    id: "4",
    postId: "1",
    content: "I'm really enjoying Go for microservices. The simplicity and performance are perfect for cloud-native applications.",
    author: "CloudArchitect",
    createdAt: "30 minutes ago",
    likes: 6
  },

  // Replies for "React vs Vue in 2024"
  {
    id: "5",
    postId: "3",
    content: "I prefer React for its ecosystem and community support. The recent updates with Server Components are really promising.",
    author: "ReactDev",
    createdAt: "3 hours ago",
    likes: 12
  },
  {
    id: "6",
    postId: "3",
    content: "Vue 3's Composition API is really nice to work with, and the documentation is excellent. But React's job market is still bigger.",
    author: "VueFan",
    createdAt: "2 hours ago",
    likes: 6
  },
  {
    id: "7",
    postId: "3",
    content: "Both frameworks are great, but I've been using Svelte lately. The compiled output is so small and fast!",
    author: "SvelteEnthusiast",
    createdAt: "1 hour ago",
    likes: 9
  },
  {
    id: "8",
    postId: "3",
    content: "The choice really depends on your team's experience. I'd choose React for larger teams and Vue for smaller, focused projects.",
    author: "TeamLead",
    createdAt: "45 minutes ago",
    likes: 7
  },

  // Replies for "Flutter vs React Native 2024"
  {
    id: "9",
    postId: "5",
    content: "Flutter's hot reload is amazing for development speed, but React Native has better native module support. It really depends on your needs.",
    author: "MobileDev",
    createdAt: "4 hours ago",
    likes: 9
  },
  {
    id: "10",
    postId: "5",
    content: "I've built apps with both, and Flutter's performance is noticeably better, especially for complex animations.",
    author: "FlutterDev",
    createdAt: "3 hours ago",
    likes: 11
  },
  {
    id: "11",
    postId: "5",
    content: "React Native's JavaScript ecosystem is a huge advantage. You can reuse a lot of web code and npm packages.",
    author: "JSDeveloper",
    createdAt: "2 hours ago",
    likes: 8
  },
  {
    id: "12",
    postId: "5",
    content: "The new React Native architecture with Fabric and TurboModules is closing the performance gap with Flutter.",
    author: "ReactNativeDev",
    createdAt: "1 hour ago",
    likes: 6
  },

  // Replies for "Best practices for code reviews"
  {
    id: "13",
    postId: "2",
    content: "Always start with the big picture. Does the code solve the problem effectively? Then dive into implementation details.",
    author: "SeniorDev",
    createdAt: "1 day ago",
    likes: 15
  },
  {
    id: "14",
    postId: "2",
    content: "I use a checklist: functionality, security, performance, maintainability, and test coverage. It helps keep reviews consistent.",
    author: "CodeReviewer",
    createdAt: "20 hours ago",
    likes: 12
  },
  {
    id: "15",
    postId: "2",
    content: "Don't forget to check for accessibility issues! Many teams overlook this crucial aspect.",
    author: "A11yAdvocate",
    createdAt: "18 hours ago",
    likes: 9
  }
]; 