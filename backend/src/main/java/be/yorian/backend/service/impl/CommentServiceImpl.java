package be.yorian.backend.service.impl;

import be.yorian.backend.entity.Comment;
import be.yorian.backend.repository.CommentRepository;
import be.yorian.backend.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService{
	
	private final CommentRepository commentRepository;

	@Autowired
	public CommentServiceImpl(CommentRepository commentRepository) {
		this.commentRepository = commentRepository;
	}

	@Override
	public List<Comment> getComments() {
		return commentRepository.findAll();
	}
	
	@Override
	public Optional<Comment> getCommentById(Long comment_id) {
		return commentRepository.findById(comment_id);
	}

	@Override
	public void saveComment(Comment comment) {
		commentRepository.save(comment);
	}

	@Override
	public void updateComment(Long commentId, Comment updatedComment) {
		Optional<Comment> optionalComment = commentRepository.findById(commentId);
		if (optionalComment.isEmpty()) {
			throw new EntityNotFoundException("comment_not_found");
		} else {
			Comment comment = optionalComment.get();
			comment.setSearchterm(updatedComment.getSearchterm());
			comment.setReplacement(updatedComment.getReplacement());
			comment.setCategory(updatedComment.getCategory());
			commentRepository.save(comment);
		}
	}

	@Override
	public void deleteComment(Long comment_id) {
		commentRepository.deleteById(comment_id);
	}

}
