package be.yorian.backend.controller.impl;

import java.util.List;
import java.util.Optional;

import be.yorian.backend.entity.Comment;
import be.yorian.backend.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import be.yorian.backend.controller.CommentController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class CommentControllerImpl implements CommentController {

    private CommentService commentService;
    
    @Autowired
    public CommentControllerImpl(CommentService commentService) {
        this.commentService = commentService;
    }

    
    @Override
    @GetMapping("/comments")
    public List<Comment> getComments() {
        List<Comment> comments = commentService.getComments();
        return comments;
    }
    
    @Override
    @GetMapping("/comments/{comment_id}")
    public Optional<Comment> getCommentById(@PathVariable("comment_id") Long comment_id) {
    	return commentService.getCommentById(comment_id);
    }

    @Override
    @PostMapping("/comments")
    public void saveComment(@RequestBody Comment comment) {
        commentService.saveComment(comment);
    }

    
    @Override
    @DeleteMapping("/comments/{comment_id}")
	public void deleteComment(@PathVariable("comment_id")Long comment_id) {
		commentService.deleteComment(comment_id);	
	}
    
}
