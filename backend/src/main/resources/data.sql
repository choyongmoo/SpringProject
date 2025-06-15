-- USERS
INSERT INTO users (username, password_hash, email, created_at) VALUES
('prof_smith', 'hash_prof_smith', 'smith@university.edu', CURRENT_TIMESTAMP),
('dr_johnson', 'hash_dr_johnson', 'johnson@research.edu', CURRENT_TIMESTAMP),
('grad_student', 'hash_grad_student', 'grad@university.edu', CURRENT_TIMESTAMP),
('research_assistant', 'hash_research_assistant', 'ra@university.edu', CURRENT_TIMESTAMP),
('postdoc_lee', 'hash_postdoc_lee', 'lee@research.edu', CURRENT_TIMESTAMP);

-- CATEGORIES
INSERT INTO categories (name, description) VALUES
('computer_science', 'Research and discussions in computer science, algorithms, and software engineering'),
('artificial_intelligence', 'Machine learning, deep learning, and AI research developments'),
('data_science', 'Data analysis, statistics, and big data technologies'),
('academic_writing', 'Research paper writing, publication strategies, and academic communication'),
('research_methods', 'Research methodologies, experimental design, and scientific methods');

-- POSTS
-- computer_science
INSERT INTO posts (title, content, category_name, author_username, created_at) VALUES
('Recent Advances in Quantum Computing', 'This paper discusses the latest developments in quantum computing algorithms and their potential applications in solving complex computational problems. We explore quantum supremacy and its implications for cryptography.', 'computer_science', 'prof_smith', CURRENT_TIMESTAMP),
('Software Architecture Patterns for Microservices', 'An analysis of different architectural patterns used in microservices development, including their trade-offs and best practices for implementation in large-scale systems.', 'computer_science', 'dr_johnson', CURRENT_TIMESTAMP),
('Performance Optimization in Distributed Systems', 'A comprehensive study of performance bottlenecks in distributed systems and strategies for optimization, including caching mechanisms and load balancing techniques.', 'computer_science', 'grad_student', CURRENT_TIMESTAMP),
('Blockchain Technology: Beyond Cryptocurrency', 'Exploring the applications of blockchain technology in supply chain management, healthcare, and digital identity verification.', 'computer_science', 'research_assistant', CURRENT_TIMESTAMP),
('Cybersecurity in Cloud Computing', 'Analysis of security challenges in cloud environments and emerging solutions for protecting sensitive data and maintaining system integrity.', 'computer_science', 'postdoc_lee', CURRENT_TIMESTAMP),

-- artificial_intelligence
('Transformer Models: Evolution and Applications', 'A detailed examination of transformer architecture evolution, from BERT to GPT models, and their impact on natural language processing tasks.', 'artificial_intelligence', 'dr_johnson', CURRENT_TIMESTAMP),
('Ethical Considerations in AI Development', 'Critical analysis of ethical challenges in AI development, including bias, transparency, and accountability in machine learning systems.', 'artificial_intelligence', 'prof_smith', CURRENT_TIMESTAMP),
('Reinforcement Learning in Robotics', 'Case studies of reinforcement learning applications in robotics, focusing on autonomous navigation and manipulation tasks.', 'artificial_intelligence', 'postdoc_lee', CURRENT_TIMESTAMP),
('Computer Vision: Recent Breakthroughs', 'Overview of recent advances in computer vision, including object detection, image segmentation, and 3D reconstruction techniques.', 'artificial_intelligence', 'grad_student', CURRENT_TIMESTAMP),
('Natural Language Processing Challenges', 'Discussion of current challenges in NLP, including multilingual processing, context understanding, and domain adaptation.', 'artificial_intelligence', 'research_assistant', CURRENT_TIMESTAMP),

-- data_science
('Big Data Analytics in Healthcare', 'Analysis of big data applications in healthcare, including patient care optimization and disease prediction models.', 'data_science', 'postdoc_lee', CURRENT_TIMESTAMP),
('Statistical Methods for Large Datasets', 'Review of statistical approaches for analyzing large-scale datasets, including sampling techniques and dimensionality reduction.', 'data_science', 'prof_smith', CURRENT_TIMESTAMP),
('Data Visualization Best Practices', 'Comprehensive guide to effective data visualization techniques for communicating complex research findings.', 'data_science', 'dr_johnson', CURRENT_TIMESTAMP),
('Time Series Analysis in Finance', 'Advanced methods for analyzing financial time series data, including forecasting and anomaly detection.', 'data_science', 'grad_student', CURRENT_TIMESTAMP),
('Machine Learning for Predictive Analytics', 'Practical applications of machine learning in predictive analytics across various domains.', 'data_science', 'research_assistant', CURRENT_TIMESTAMP),

-- academic_writing
('Writing Effective Research Papers', 'Guidelines for structuring and writing research papers that effectively communicate scientific findings.', 'academic_writing', 'prof_smith', CURRENT_TIMESTAMP),
('Peer Review Process: Best Practices', 'Insights into the peer review process and strategies for responding to reviewer comments effectively.', 'academic_writing', 'dr_johnson', CURRENT_TIMESTAMP),
('Academic Publishing Strategies', 'Analysis of different publishing strategies and their impact on research visibility and citation rates.', 'academic_writing', 'postdoc_lee', CURRENT_TIMESTAMP),
('Literature Review Methodology', 'Systematic approach to conducting comprehensive literature reviews in scientific research.', 'academic_writing', 'grad_student', CURRENT_TIMESTAMP),
('Research Grant Writing Tips', 'Practical advice for writing successful research grant proposals and securing funding.', 'academic_writing', 'research_assistant', CURRENT_TIMESTAMP),

-- research_methods
('Experimental Design in Computer Science', 'Principles of designing and conducting experiments in computer science research.', 'research_methods', 'dr_johnson', CURRENT_TIMESTAMP),
('Qualitative vs Quantitative Research', 'Comparative analysis of qualitative and quantitative research methods in scientific studies.', 'research_methods', 'prof_smith', CURRENT_TIMESTAMP),
('Research Ethics in AI Development', 'Ethical considerations and guidelines for conducting research in artificial intelligence.', 'research_methods', 'postdoc_lee', CURRENT_TIMESTAMP),
('Data Collection Methods', 'Overview of various data collection methods and their applications in research.', 'research_methods', 'grad_student', CURRENT_TIMESTAMP),
('Statistical Analysis Techniques', 'Advanced statistical methods for analyzing research data and drawing valid conclusions.', 'research_methods', 'research_assistant', CURRENT_TIMESTAMP);

-- COMMENTS
INSERT INTO comments (content, post_id, author_username, created_at) VALUES
('Excellent overview of quantum computing developments. Have you considered the implications for post-quantum cryptography?', 1, 'dr_johnson', CURRENT_TIMESTAMP),
('The section on quantum supremacy could be expanded to include recent experimental results.', 1, 'postdoc_lee', CURRENT_TIMESTAMP),

('Very practical insights on microservices architecture. Would you recommend any specific tools for monitoring these systems?', 2, 'grad_student', CURRENT_TIMESTAMP),
('The trade-off analysis between different patterns is particularly valuable.', 2, 'research_assistant', CURRENT_TIMESTAMP),

('The performance optimization strategies you discussed align well with our recent findings.', 3, 'prof_smith', CURRENT_TIMESTAMP),

('Interesting perspective on blockchain applications. Have you considered the energy consumption implications?', 4, 'dr_johnson', CURRENT_TIMESTAMP),

('The security challenges in cloud computing are becoming increasingly complex. Great analysis.', 5, 'grad_student', CURRENT_TIMESTAMP),

('The evolution of transformer models is fascinating. How do you see this technology developing in the next five years?', 6, 'prof_smith', CURRENT_TIMESTAMP),

('Ethical considerations are crucial in AI development. This paper provides valuable insights.', 7, 'postdoc_lee', CURRENT_TIMESTAMP),

('The case studies in reinforcement learning are very well documented.', 8, 'research_assistant', CURRENT_TIMESTAMP),

('Recent breakthroughs in computer vision are indeed remarkable. Would you consider writing a follow-up on real-time applications?', 9, 'dr_johnson', CURRENT_TIMESTAMP),

('The challenges in NLP you identified are spot on. Have you explored solutions for low-resource languages?', 10, 'prof_smith', CURRENT_TIMESTAMP),

('Healthcare applications of big data are crucial. Great analysis of current trends.', 11, 'grad_student', CURRENT_TIMESTAMP),

('The statistical methods you discussed are particularly relevant for our current research.', 12, 'postdoc_lee', CURRENT_TIMESTAMP),

('Data visualization is indeed crucial for effective communication. Excellent guidelines.', 13, 'research_assistant', CURRENT_TIMESTAMP),

('The time series analysis methods are well explained. Would you consider adding more examples?', 14, 'dr_johnson', CURRENT_TIMESTAMP),

('Machine learning applications in predictive analytics are becoming increasingly important. Great overview.', 15, 'prof_smith', CURRENT_TIMESTAMP),

('The guidelines for research paper writing are very practical and well-structured.', 16, 'grad_student', CURRENT_TIMESTAMP),

('Peer review process is often challenging. Your insights are valuable.', 17, 'postdoc_lee', CURRENT_TIMESTAMP),

('Publishing strategies are crucial for research visibility. Excellent analysis.', 18, 'research_assistant', CURRENT_TIMESTAMP),

('The literature review methodology is comprehensive and well-organized.', 19, 'dr_johnson', CURRENT_TIMESTAMP),

('Grant writing tips are always valuable. Would you consider adding more examples of successful proposals?', 20, 'prof_smith', CURRENT_TIMESTAMP),

('Experimental design in computer science is often overlooked. Great coverage of the topic.', 21, 'grad_student', CURRENT_TIMESTAMP),

('The comparison between qualitative and quantitative methods is very insightful.', 22, 'postdoc_lee', CURRENT_TIMESTAMP),

('Research ethics in AI is a critical topic. Well-articulated points.', 23, 'research_assistant', CURRENT_TIMESTAMP),

('Data collection methods are fundamental to good research. Excellent overview.', 24, 'dr_johnson', CURRENT_TIMESTAMP),

('Statistical analysis techniques are well explained. Would you consider adding more practical examples?', 25, 'prof_smith', CURRENT_TIMESTAMP);
