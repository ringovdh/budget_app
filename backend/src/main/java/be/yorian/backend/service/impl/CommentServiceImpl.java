package be.yorian.backend.service.impl;

import java.util.List;
import java.util.Optional;

import be.yorian.backend.entity.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import be.yorian.backend.repository.CommentRepository;
import be.yorian.backend.service.CommentService;

@Service
public class CommentServiceImpl implements CommentService{
	
	private CommentRepository commentRepository;
	

	@Autowired
	public CommentServiceImpl(CommentRepository commentRepository) {
		this.commentRepository = commentRepository;
	}

	@Override
	public List<Comment> getComments() {
		return commentRepository.findAll(sortBySearchterm());
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
	public void deleteComment(Long comment_id) {
		commentRepository.deleteById(comment_id);
	}

	
	private Sort sortBySearchterm() {
        return Sort.by("searchterm").ascending();
    }
}
