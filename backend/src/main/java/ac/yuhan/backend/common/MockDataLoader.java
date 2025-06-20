package ac.yuhan.backend.common;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import ac.yuhan.backend.domain.category.Category;
import ac.yuhan.backend.domain.category.CategoryRepository;
import ac.yuhan.backend.domain.comment.Comment;
import ac.yuhan.backend.domain.comment.CommentRepository;
import ac.yuhan.backend.domain.post.Post;
import ac.yuhan.backend.domain.post.PostRepository;
import ac.yuhan.backend.domain.user.User;
import ac.yuhan.backend.domain.user.UserRepository;
import jakarta.annotation.PostConstruct;

@Component
public class MockDataLoader {

        private final UserRepository userRepository;
        private final CategoryRepository categoryRepository;
        private final PostRepository postRepository;
        private final CommentRepository commentRepository;
        private final PasswordEncoder passwordEncoder;

        public MockDataLoader(UserRepository userRepository, CategoryRepository categoryRepository,
                        PostRepository postRepository, CommentRepository commentRepository,
                        PasswordEncoder passwordEncoder) {
                this.userRepository = userRepository;
                this.categoryRepository = categoryRepository;
                this.postRepository = postRepository;
                this.commentRepository = commentRepository;
                this.passwordEncoder = passwordEncoder;
        }

        @PostConstruct
        public void loadMockData() {
                // Only load if no users exist
                if (userRepository.count() > 0) {
                        return;
                }

                // Create users
                User string = createUser("string", "string@forum.com", "string");
                User john = createUser("john", "john@example.com", "password123");
                User sarah = createUser("sarah", "sarah@example.com", "password123");
                User mike = createUser("mike", "mike@example.com", "password123");
                User emma = createUser("emma", "emma@example.com", "password123");
                User alex = createUser("alex", "alex@example.com", "password123");
                User lisa = createUser("lisa", "lisa@example.com", "password123");
                User david = createUser("david", "david@example.com", "password123");
                User maria = createUser("maria", "maria@example.com", "password123");
                User tom = createUser("tom", "tom@example.com", "password123");

                // Create categories with kebab-case names
                Category generalDiscussion = createCategory("general-discussion", "General topics and discussions",
                                string);
                Category technology = createCategory("technology", "Tech news, programming, and software discussions",
                                john);
                Category gaming = createCategory("gaming", "Video games, board games, and gaming culture", sarah);
                Category sports = createCategory("sports", "Sports news, discussions, and analysis", mike);
                Category cooking = createCategory("cooking", "Recipes, cooking tips, and food discussions", emma);
                Category movies = createCategory("movies", "Movie reviews, discussions, and recommendations", alex);
                Category music = createCategory("music", "Music discussions, album reviews, and artist news", lisa);
                Category travel = createCategory("travel", "Travel tips, destination guides, and trip planning", david);
                Category fitness = createCategory("fitness", "Workout routines, health tips, and fitness discussions",
                                maria);
                Category books = createCategory("books",
                                "Book reviews, reading recommendations, and literary discussions", tom);

                // Create posts
                Post welcomePost = createPost("Welcome to Our Forum!",
                                "Welcome everyone! This is a great place to discuss various topics. Feel free to introduce yourself and start participating in discussions.",
                                generalDiscussion, string);

                Post springBootPost = createPost("Getting Started with Spring Boot",
                                "Spring Boot is a powerful framework for building Java applications. In this post, I'll share some tips for beginners.\n\n"
                                                +
                                                "Key features:\n- Auto-configuration\n- Embedded servers\n- Production-ready metrics\n- Externalized configuration\n\n"
                                                +
                                                "What's your experience with Spring Boot?",
                                technology, john);

                Post reactPost = createPost("React vs Vue: Which to Choose?",
                                "I've been working with both React and Vue for the past year. Here's my comparison:\n\n"
                                                +
                                                "React:\n- Larger ecosystem\n- More job opportunities\n- Steeper learning curve\n\n"
                                                +
                                                "Vue:\n- Easier to learn\n- Better documentation\n- Smaller bundle size\n\n"
                                                +
                                                "What's your preference?",
                                technology, sarah);

                Post gamingPost = createPost("Best Games of 2024",
                                "What are your favorite games released this year? I've been playing some amazing titles and would love to hear your recommendations.\n\n"
                                                +
                                                "My top picks:\n1. Cyberpunk 2077: Phantom Liberty\n2. Baldur's Gate 3\n3. Alan Wake 2\n\n"
                                                +
                                                "What about you?",
                                gaming, sarah);

                Post indieGamesPost = createPost("Hidden Gem Indie Games",
                                "Let's share some amazing indie games that deserve more attention!\n\n" +
                                                "My recent discoveries:\n- Hollow Knight: Silksong (when it releases)\n- Stardew Valley\n- Celeste\n\n"
                                                +
                                                "What indie games have you been enjoying?",
                                gaming, mike);

                Post sportsPost = createPost("Championship Predictions",
                                "With the season heating up, who do you think will take home the championship this year? I'm rooting for the underdogs!\n\n"
                                                +
                                                "Current standings look interesting, and there are some surprising performances this season.",
                                sports, mike);

                Post recipePost = createPost("Easy Weeknight Dinner Ideas",
                                "Looking for quick and delicious dinner recipes? Here are some of my favorites that take less than 30 minutes:\n\n"
                                                +
                                                "1. One-Pan Chicken and Rice\n2. Quick Pasta Carbonara\n3. Sheet Pan Salmon with Vegetables\n\n"
                                                +
                                                "Share your favorite quick recipes!",
                                cooking, emma);

                Post bakingPost = createPost("Sourdough Bread Making",
                                "I've been experimenting with sourdough bread making. Here's what I've learned:\n\n" +
                                                "Key tips:\n- Maintain consistent feeding schedule\n- Use quality flour\n- Don't rush the fermentation\n\n"
                                                +
                                                "Anyone else into bread making?",
                                cooking, alex);

                Post moviePost = createPost("Must-Watch Movies of 2024",
                                "What movies have blown you away this year? Here are my recommendations:\n\n" +
                                                "1. Dune: Part Two\n2. Poor Things\n3. The Zone of Interest\n\n" +
                                                "What's on your watchlist?",
                                movies, alex);

                Post musicPost = createPost("Album of the Year Contenders",
                                "We're halfway through the year! What albums do you think will be in the running for album of the year?\n\n"
                                                +
                                                "My picks:\n- Taylor Swift - The Tortured Poets Department\n- Beyoncé - Cowboy Carter\n- Dua Lipa - Radical Optimism\n\n"
                                                +
                                                "What's your favorite album so far?",
                                music, lisa);

                Post travelPost = createPost("Best Travel Destinations for 2024",
                                "Planning your next trip? Here are some amazing destinations to consider:\n\n" +
                                                "1. Japan - Cherry blossom season\n2. Iceland - Northern lights\n3. Portugal - Affordable and beautiful\n\n"
                                                +
                                                "Where are you planning to travel this year?",
                                travel, david);

                Post fitnessPost = createPost("Home Workout Routines",
                                "Can't make it to the gym? Here are some effective home workout routines:\n\n" +
                                                "Equipment-free workouts:\n- Push-ups and variations\n- Squats and lunges\n- Planks and core work\n\n"
                                                +
                                                "What's your favorite home workout?",
                                fitness, maria);

                Post bookPost = createPost("Summer Reading List",
                                "Looking for some great books to read this summer? Here are my recommendations:\n\n" +
                                                "Fiction:\n- The Seven Husbands of Evelyn Hugo\n- Tomorrow, and Tomorrow, and Tomorrow\n- Lessons in Chemistry\n\n"
                                                +
                                                "What's on your reading list?",
                                books, tom);

                Post techNewsPost = createPost("Latest in AI Development",
                                "AI technology is advancing rapidly. Here are some recent developments that caught my attention:\n\n"
                                                +
                                                "- New language models with improved reasoning\n- AI in healthcare applications\n- Ethical considerations in AI development\n\n"
                                                +
                                                "What are your thoughts on the future of AI?",
                                technology, string);

                // Create comments
                createComment("Thanks for the welcome! Looking forward to being part of this community.", welcomePost,
                                john);
                createComment("Great to be here! This forum looks promising.", welcomePost, sarah);
                createComment("Welcome everyone! Let's make this a great place for discussions.", welcomePost, mike);
                createComment("Excited to see what topics we'll discuss here!", welcomePost, emma);

                createComment("Spring Boot is indeed amazing! The auto-configuration feature saves so much time.",
                                springBootPost, sarah);
                createComment("I've been using Spring Boot for 2 years now. It's revolutionized how I build applications.",
                                springBootPost, string);
                createComment("Any recommendations for learning resources?", springBootPost, emma);
                createComment("The embedded server feature is a game-changer for development.", springBootPost, alex);

                createComment("I prefer Vue for smaller projects and React for larger ones.", reactPost, john);
                createComment("Vue's documentation is definitely superior!", reactPost, lisa);
                createComment("React has more third-party libraries available.", reactPost, david);
                createComment("Both are great choices, it really depends on the project requirements.", reactPost,
                                maria);

                createComment("Baldur's Gate 3 is absolutely incredible! The storytelling is unmatched.", gamingPost,
                                mike);
                createComment("I'm still playing through Cyberpunk. The updates have made it so much better!",
                                gamingPost, john);
                createComment("Haven't played any of these yet, but they're all on my wishlist!", gamingPost, emma);
                createComment("Alan Wake 2 was a masterpiece of horror gaming.", gamingPost, alex);

                createComment("Stardew Valley is such a relaxing game!", indieGamesPost, sarah);
                createComment("Celeste has amazing platforming mechanics.", indieGamesPost, john);
                createComment("Hollow Knight is one of my all-time favorites.", indieGamesPost, emma);

                createComment("The underdogs always make it interesting! Rooting for them too.", sportsPost, sarah);
                createComment("This season has been full of surprises. Can't wait to see how it ends!", sportsPost,
                                string);
                createComment("The playoffs are going to be intense this year.", sportsPost, david);

                createComment("That pasta carbonara recipe sounds delicious! Do you have the full recipe?", recipePost,
                                john);
                createComment("I love one-pan meals! They're perfect for busy weeknights.", recipePost, sarah);
                createComment("Thanks for sharing! I'll definitely try the salmon recipe.", recipePost, mike);
                createComment("These recipes look perfect for meal prep!", recipePost, lisa);

                createComment("Sourdough is so rewarding to make!", bakingPost, emma);
                createComment("I've been trying to get my starter going for weeks.", bakingPost, sarah);
                createComment("The smell of fresh bread is unbeatable.", bakingPost, john);

                createComment("Dune: Part Two was absolutely spectacular!", moviePost, john);
                createComment("Poor Things was such a unique film.", moviePost, sarah);
                createComment("I need to catch up on these movies!", moviePost, emma);

                createComment("Taylor's new album is incredible!", musicPost, sarah);
                createComment("Beyoncé's country album was a bold move.", musicPost, john);
                createComment("I'm loving the new Dua Lipa album.", musicPost, emma);

                createComment("Japan during cherry blossom season is magical!", travelPost, sarah);
                createComment("Iceland is on my bucket list.", travelPost, john);
                createComment("Portugal is so underrated as a travel destination.", travelPost, emma);

                createComment("These home workouts are perfect for busy schedules!", fitnessPost, john);
                createComment("I love that these don't require any equipment.", fitnessPost, sarah);
                createComment("Planks are deceptively difficult!", fitnessPost, emma);

                createComment("Lessons in Chemistry was such a great read!", bookPost, sarah);
                createComment("I'm currently reading Tomorrow, and Tomorrow, and Tomorrow.", bookPost, john);
                createComment("Thanks for the recommendations!", bookPost, emma);

                createComment("AI in healthcare is fascinating. The potential for early disease detection is huge.",
                                techNewsPost, sarah);
                createComment("We need to be careful about the ethical implications though.", techNewsPost, emma);
                createComment("The reasoning capabilities of new models are impressive.", techNewsPost, john);
                createComment("AI will definitely change how we work in the next decade.", techNewsPost, alex);
        }

        private User createUser(String username, String email, String password) {
                User user = new User();
                user.setUsername(username);
                user.setEmail(email);
                user.setPasswordHash(passwordEncoder.encode(password));
                return userRepository.save(user);
        }

        private Category createCategory(String name, String description, User author) {
                Category category = new Category();
                category.setName(name);
                category.setDescription(description);
                category.setAuthor(author);
                return categoryRepository.save(category);
        }

        private Post createPost(String title, String content, Category category, User author) {
                Post post = new Post();
                post.setTitle(title);
                post.setContent(content);
                post.setCategory(category);
                post.setAuthor(author);
                return postRepository.save(post);
        }

        private Comment createComment(String content, Post post, User author) {
                Comment comment = new Comment();
                comment.setContent(content);
                comment.setPost(post);
                comment.setAuthor(author);
                return commentRepository.save(comment);
        }
}
