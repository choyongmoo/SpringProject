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
                User kim = createUser("kim", "kim@example.com", "password123");
                User lee = createUser("lee", "lee@example.com", "password123");
                User park = createUser("park", "park@example.com", "password123");
                User choi = createUser("choi", "choi@example.com", "password123");
                User jung = createUser("jung", "jung@example.com", "password123");
                User kang = createUser("kang", "kang@example.com", "password123");
                User yoon = createUser("yoon", "yoon@example.com", "password123");
                User han = createUser("han", "han@example.com", "password123");
                User lim = createUser("lim", "lim@example.com", "password123");

                // Create categories with kebab-case names
                Category generalDiscussion = createCategory("general-discussion", "일반적인 주제와 토론",
                                string);
                Category technology = createCategory("technology", "기술 뉴스, 프로그래밍, 소프트웨어 토론",
                                kim);
                Category gaming = createCategory("gaming", "비디오 게임, 보드 게임, 게임 문화", lee);
                Category sports = createCategory("sports", "스포츠 뉴스, 토론, 분석", park);
                Category cooking = createCategory("cooking", "레시피, 요리 팁, 음식 토론", choi);
                Category movies = createCategory("movies", "영화 리뷰, 토론, 추천", jung);
                Category music = createCategory("music", "음악 토론, 앨범 리뷰, 아티스트 뉴스", kang);
                Category travel = createCategory("travel", "여행 팁, 여행지 가이드, 여행 계획", yoon);
                Category fitness = createCategory("fitness", "운동 루틴, 건강 팁, 피트니스 토론",
                                han);
                Category books = createCategory("books",
                                "도서 리뷰, 독서 추천, 문학 토론", lim);

                // Create posts
                Post welcomePost = createPost("우리 포럼에 오신 것을 환영합니다!",
                                "모든 분들을 환영합니다! 다양한 주제를 토론할 수 있는 좋은 곳입니다. 자유롭게 자기소개를 하고 토론에 참여해 주세요.",
                                generalDiscussion, string);

                Post springBootPost = createPost("Spring Boot 시작하기",
                                "Spring Boot는 Java 애플리케이션을 구축하기 위한 강력한 프레임워크입니다. 이 글에서는 초보자를 위한 팁을 공유하겠습니다.\n\n"
                                                +
                                                "주요 기능:\n- 자동 구성\n- 내장 서버\n- 프로덕션 준비 메트릭\n- 외부화된 구성\n\n"
                                                +
                                                "Spring Boot에 대한 여러분의 경험은 어떠신가요?",
                                technology, kim);

                Post reactPost = createPost("React vs Vue: 어떤 것을 선택할까요?",
                                "지난 1년간 React와 Vue를 모두 사용해왔습니다. 제 비교 분석입니다:\n\n"
                                                +
                                                "React:\n- 더 큰 생태계\n- 더 많은 취업 기회\n- 더 가파른 학습 곡선\n\n"
                                                +
                                                "Vue:\n- 학습하기 쉬움\n- 더 나은 문서화\n- 더 작은 번들 크기\n\n"
                                                +
                                                "어떤 것을 선호하시나요?",
                                technology, lee);

                Post gamingPost = createPost("2024년 최고의 게임들",
                                "올해 출시된 여러분이 가장 좋아하는 게임은 무엇인가요? 놀라운 게임들을 플레이하고 있어서 여러분의 추천을 듣고 싶습니다.\n\n"
                                                +
                                                "제 최고 선택:\n1. 사이버펑크 2077: 팬텀 리버티\n2. 발더스 게이트 3\n3. 앨런 웨이크 2\n\n"
                                                +
                                                "여러분은 어떤가요?",
                                gaming, lee);

                Post indieGamesPost = createPost("숨겨진 보석 인디 게임들",
                                "더 많은 관심을 받아야 할 놀라운 인디 게임들을 공유해봅시다!\n\n" +
                                                "최근 발견한 게임들:\n- 할로우 나이트: 실크송 (출시될 때)\n- 스타듀 밸리\n- 셀레스트\n\n"
                                                +
                                                "어떤 인디 게임들을 즐기고 계신가요?",
                                gaming, park);

                Post sportsPost = createPost("챔피언십 예측",
                                "시즌이 뜨거워지면서 올해 누가 챔피언십을 차지할 것 같나요? 저는 약체팀을 응원하고 있습니다!\n\n"
                                                +
                                                "현재 순위가 흥미롭고 이번 시즌에는 놀라운 활약들이 있습니다.",
                                sports, park);

                Post recipePost = createPost("쉬운 평일 저녁 요리 아이디어",
                                "빠르고 맛있는 저녁 요리 레시피를 찾고 계신가요? 30분 이내에 만들 수 있는 제가 좋아하는 요리들입니다:\n\n"
                                                +
                                                "1. 원팬 치킨 라이스\n2. 빠른 파스타 까르보나라\n3. 시트팬 연어와 채소\n\n"
                                                +
                                                "여러분이 좋아하는 빠른 레시피를 공유해주세요!",
                                cooking, choi);

                Post bakingPost = createPost("사워도우 빵 만들기",
                                "사워도우 빵 만들기를 실험해보고 있습니다. 배운 것들을 공유합니다:\n\n" +
                                                "주요 팁:\n- 일관된 급여 일정 유지\n- 좋은 품질의 밀가루 사용\n- 발효 과정을 서두르지 않기\n\n"
                                                +
                                                "빵 만들기에 관심 있으신 분 있나요?",
                                cooking, jung);

                Post moviePost = createPost("2024년 꼭 봐야 할 영화들",
                                "올해 어떤 영화들이 여러분을 놀라게 했나요? 제 추천 영화들입니다:\n\n" +
                                                "1. 듄: 파트 2\n2. 푸어 씽즈\n3. 존 오브 인터레스트\n\n" +
                                                "여러분의 시청 목록에는 무엇이 있나요?",
                                movies, jung);

                Post musicPost = createPost("올해의 앨범 후보들",
                                "1년의 절반이 지났습니다! 올해의 앨범 후보로 어떤 앨범들이 있을 것 같나요?\n\n"
                                                +
                                                "제 선택:\n- 테일러 스위프트 - 더 토처드 포츠 디파트먼트\n- 비욘세 - 카우보이 카터\n- 두아 리파 - 래디컬 옵티미즘\n\n"
                                                +
                                                "지금까지 가장 좋아하는 앨범은 무엇인가요?",
                                music, kang);

                Post travelPost = createPost("2024년 최고의 여행지",
                                "다음 여행을 계획하고 계신가요? 고려해볼 만한 놀라운 여행지들입니다:\n\n" +
                                                "1. 일본 - 벚꽃 시즌\n2. 아이슬란드 - 오로라\n3. 포르투갈 - 저렴하고 아름다운\n\n"
                                                +
                                                "올해 어디로 여행 계획을 세우고 계신가요?",
                                travel, yoon);

                Post fitnessPost = createPost("홈 운동 루틴",
                                "헬스장에 갈 수 없나요? 효과적인 홈 운동 루틴들입니다:\n\n" +
                                                "장비 없는 운동:\n- 푸시업과 변형 동작\n- 스쿼트와 런지\n- 플랭크와 코어 운동\n\n"
                                                +
                                                "여러분이 좋아하는 홈 운동은 무엇인가요?",
                                fitness, han);

                Post bookPost = createPost("여름 독서 목록",
                                "이번 여름 읽을 좋은 책들을 찾고 계신가요? 제 추천 도서들입니다:\n\n" +
                                                "소설:\n- 에블린 휴고의 일곱 남편들\n- 내일, 그리고 내일, 그리고 내일\n- 화학 수업\n\n"
                                                +
                                                "여러분의 독서 목록에는 무엇이 있나요?",
                                books, lim);

                Post techNewsPost = createPost("AI 개발 최신 동향",
                                "AI 기술이 빠르게 발전하고 있습니다. 제가 주목한 최근 발전들입니다:\n\n"
                                                +
                                                "- 개선된 추론 능력을 가진 새로운 언어 모델\n- 의료 분야의 AI 응용\n- AI 개발의 윤리적 고려사항\n\n"
                                                +
                                                "AI의 미래에 대해 어떻게 생각하시나요?",
                                technology, string);

                // Create comments
                createComment("환영해주셔서 감사합니다! 이 커뮤니티의 일원이 되어 기대됩니다.", welcomePost,
                                kim);
                createComment("여기 있게 되어 기쁩니다! 이 포럼이 유망해 보입니다.", welcomePost, lee);
                createComment("모든 분들을 환영합니다! 토론을 위한 좋은 곳을 만들어봅시다.", welcomePost, park);
                createComment("여기서 어떤 주제들을 토론할지 기대됩니다!", welcomePost, choi);

                createComment("Spring Boot는 정말 놀랍습니다! 자동 구성 기능이 시간을 많이 절약해줍니다.",
                                springBootPost, lee);
                createComment("Spring Boot를 2년간 사용하고 있습니다. 애플리케이션 구축 방식을 혁신했습니다.",
                                springBootPost, string);
                createComment("학습 자료 추천해주실 수 있나요?", springBootPost, choi);
                createComment("내장 서버 기능은 개발에 게임 체인저입니다.", springBootPost, jung);

                createComment("작은 프로젝트에는 Vue를, 큰 프로젝트에는 React를 선호합니다.", reactPost, kim);
                createComment("Vue의 문서화가 확실히 우수합니다!", reactPost, kang);
                createComment("React에는 더 많은 서드파티 라이브러리가 있습니다.", reactPost, yoon);
                createComment("둘 다 좋은 선택이고, 정말 프로젝트 요구사항에 달려있습니다.", reactPost,
                                han);

                createComment("발더스 게이트 3는 정말 놀랍습니다! 스토리텔링이 무척 뛰어납니다.", gamingPost,
                                park);
                createComment("아직 사이버펑크를 플레이하고 있습니다. 업데이트가 훨씬 좋아졌어요!",
                                gamingPost, kim);
                createComment("아직 이 게임들을 플레이하지 못했지만, 모두 위시리스트에 있습니다!", gamingPost, choi);
                createComment("앨런 웨이크 2는 호러 게임의 걸작이었습니다.", gamingPost, jung);

                createComment("스타듀 밸리는 정말 편안한 게임입니다!", indieGamesPost, lee);
                createComment("셀레스트는 놀라운 플랫포밍 메커니즘을 가지고 있습니다.", indieGamesPost, kim);
                createComment("할로우 나이트는 제가 가장 좋아하는 게임 중 하나입니다.", indieGamesPost, choi);

                createComment("약체팀들이 항상 흥미롭게 만듭니다! 저도 응원하고 있습니다.", sportsPost, lee);
                createComment("이번 시즌은 놀라움으로 가득했습니다. 어떻게 끝날지 기다릴 수 없어요!", sportsPost,
                                string);
                createComment("플레이오프가 올해는 격렬할 것 같습니다.", sportsPost, yoon);

                createComment("그 파스타 까르보나라 레시피가 맛있어 보입니다! 전체 레시피를 가지고 계신가요?", recipePost,
                                kim);
                createComment("원팬 요리를 좋아합니다! 바쁜 평일 저녁에 완벽해요.", recipePost, lee);
                createComment("공유해주셔서 감사합니다! 연어 레시피는 꼭 시도해보겠습니다.", recipePost, park);
                createComment("이 레시피들이 식단 준비에 완벽해 보입니다!", recipePost, kang);

                createComment("사워도우는 만드는 것이 정말 보람있습니다!", bakingPost, choi);
                createComment("스타터를 몇 주간 시작하려고 노력하고 있습니다.", bakingPost, lee);
                createComment("신선한 빵의 냄새는 대체할 수 없습니다.", bakingPost, kim);

                createComment("듄: 파트 2는 정말 장관이었습니다!", moviePost, kim);
                createComment("푸어 씽즈는 정말 독특한 영화였습니다.", moviePost, lee);
                createComment("이 영화들을 따라잡아야겠어요!", moviePost, choi);

                createComment("테일러의 새 앨범이 놀랍습니다!", musicPost, lee);
                createComment("비욘세의 컨트리 앨범은 대담한 시도였습니다.", musicPost, kim);
                createComment("새로운 두아 리파 앨범을 좋아하고 있습니다.", musicPost, choi);

                createComment("벚꽃 시즌의 일본은 마법 같습니다!", travelPost, lee);
                createComment("아이슬란드는 제 버킷리스트에 있습니다.", travelPost, kim);
                createComment("포르투갈은 여행지로서 너무 과소평가되었습니다.", travelPost, choi);

                createComment("이 홈 운동들이 바쁜 일정에 완벽합니다!", fitnessPost, kim);
                createComment("장비가 필요 없다는 것이 좋습니다.", fitnessPost, lee);
                createComment("플랭크는 생각보다 어렵습니다!", fitnessPost, choi);

                createComment("화학 수업은 정말 좋은 책이었습니다!", bookPost, lee);
                createComment("지금 내일, 그리고 내일, 그리고 내일을 읽고 있습니다.", bookPost, kim);
                createComment("추천해주셔서 감사합니다!", bookPost, choi);

                createComment("의료 분야의 AI는 매혹적입니다. 조기 질병 발견의 잠재력이 엄청납니다.",
                                techNewsPost, lee);
                createComment("윤리적 함의에 대해 조심해야 합니다.", techNewsPost, choi);
                createComment("새로운 모델들의 추론 능력이 인상적입니다.", techNewsPost, kim);
                createComment("AI는 확실히 다음 10년간 우리가 일하는 방식을 바꿀 것입니다.", techNewsPost, jung);
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
