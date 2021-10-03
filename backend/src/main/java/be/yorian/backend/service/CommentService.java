package be.yorian.backend.service;

import java.util.List;
import java.util.Optional;

import be.yorian.backend.entity.Comment;

public interface CommentService {
	
	public List<Comment> getComments();
	public Optional<Comment> getCommentById(Long comment_id);
	public void saveComment(Comment comment);
	public void deleteComment(Long comment_id);
	
}
