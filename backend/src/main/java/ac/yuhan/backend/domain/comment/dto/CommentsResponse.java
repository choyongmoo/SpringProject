package ac.yuhan.backend.domain.comment.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CommentsResponse {

    private List<CommentResponse> comments;
}
