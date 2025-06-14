interface Comment {
  id: number;
  author: string;
  content: string;
  timestamp: string;
}

interface Post {
  id: number;
  title: string;
  author: string;
  category: string;
  content: string;
  timestamp: string;
  comments: Comment[];
}

interface Category {
  id: number;
  name: string;
  description: string;
  memberCount: number;
  latestPosts: Post[];
}

export const categories: Category[] = [
  {
    id: 1,
    name: "Computer Science",
    description: "Discussion about programming, algorithms, and computer science topics",
    memberCount: 1234,
    latestPosts: [
      {
        id: 1,
        title: "Understanding React Hooks",
        author: "JohnDoe",
        category: "Computer Science",
        content: "React Hooks have revolutionized how we write React components. In this post, I'll share my experience with different hooks and best practices.\n\n1. useState: Perfect for managing local state\n2. useEffect: Great for side effects and data fetching\n3. useContext: Essential for global state management\n4. useReducer: Complex state logic made simple\n\nWhat are your favorite hooks and how do you use them?",
        timestamp: "2024-03-20 14:30",
        comments: [
          {
            id: 1,
            author: "ReactExpert",
            content: "Great overview! I'd also add useCallback and useMemo for performance optimization.",
            timestamp: "2024-03-20 15:00"
          },
          {
            id: 2,
            author: "WebDev2024",
            content: "I'm still getting used to hooks. This post really helps!",
            timestamp: "2024-03-20 15:30"
          }
        ]
      },
      {
        id: 2,
        title: "New Algorithm Challenge",
        author: "JaneSmith",
        category: "Computer Science",
        content: "I found this interesting problem in a coding interview:\n\nGiven an array of integers, find the maximum sum of a contiguous subarray.\n\nExample: [-2, 1, -3, 4, -1, 2, 1, -5, 4]\nOutput: 6 (subarray [4, -1, 2, 1])\n\nLet's discuss different approaches and their time complexities!",
        timestamp: "2024-03-20 10:00",
        comments: [
          {
            id: 1,
            author: "AlgoMaster",
            content: "Kadane's algorithm would be perfect for this! O(n) time complexity.",
            timestamp: "2024-03-20 10:15"
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Mathematics",
    description: "Share and discuss mathematical concepts and problems",
    memberCount: 856,
    latestPosts: [
      {
        id: 3,
        title: "Calculus Problem Help",
        author: "MathWizard",
        category: "Mathematics",
        content: "I'm stuck on this integration problem:\n\n∫(x² + 2x + 1)dx from 0 to 1\n\nI've tried substitution but I'm not sure if I'm on the right track. Any help would be appreciated!",
        timestamp: "2024-03-20 09:00",
        comments: [
          {
            id: 1,
            author: "CalculusPro",
            content: "You can solve this by expanding and integrating term by term. The answer should be 4/3.",
            timestamp: "2024-03-20 09:30"
          },
          {
            id: 2,
            author: "MathStudent",
            content: "Could you show your work? I'm trying to learn this concept.",
            timestamp: "2024-03-20 10:00"
          }
        ]
      }
    ]
  }
];

// Helper function to get a post by ID
export const getPostById = (postId: number): Post | undefined => {
  for (const category of categories) {
    const post = category.latestPosts.find(post => post.id === postId);
    if (post) return post;
  }
  return undefined;
};

// Helper function to get category by post ID
export const getCategoryByPostId = (postId: number): Category | undefined => {
  for (const category of categories) {
    const post = category.latestPosts.find(post => post.id === postId);
    if (post) return category;
  }
  return undefined;
};

// Helper function to get next and previous posts
export const getAdjacentPosts = (postId: number): { prev: Post | undefined; next: Post | undefined } => {
  const category = getCategoryByPostId(postId);
  if (!category) return { prev: undefined, next: undefined };

  // Sort posts by timestamp in descending order
  const sortedPosts = [...category.latestPosts].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const currentIndex = sortedPosts.findIndex(post => post.id === postId);
  if (currentIndex === -1) return { prev: undefined, next: undefined };

  return {
    prev: sortedPosts[currentIndex + 1],
    next: sortedPosts[currentIndex - 1]
  };
}; 