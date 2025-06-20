package ac.yuhan.backend.domain.post.dto;

import java.util.List;
import java.util.stream.Collectors;

import ac.yuhan.backend.domain.comment.Comment;
import ac.yuhan.backend.domain.comment.dto.CommentResponse;
import ac.yuhan.backend.domain.post.Post;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class PostCommentsResponse extends PostResponse {

    private List<CommentResponse> comments;

    public PostCommentsResponse(Post post, List<Comment> comments) {
        super(post);
        this.comments = comments.stream().map(CommentResponse::new).collect(Collectors.toList());
    }
}