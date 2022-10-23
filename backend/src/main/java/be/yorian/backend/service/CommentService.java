package be.yorian.backend.service;

import be.yorian.backend.entity.Comment;

import java.util.List;
import java.util.Optional;

public interface CommentService {
	
	public List<Comment> getComments();
	public Optional<Comment> getCommentById(Long comment_id);
	public void saveComment(Comment comment);
	public void deleteComment(Long comment_id);
	public void updateComment(Long commentId, Comment comment);
}
