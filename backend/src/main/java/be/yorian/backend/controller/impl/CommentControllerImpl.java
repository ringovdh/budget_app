package be.yorian.backend.controller.impl;

import be.yorian.backend.controller.CommentController;
import be.yorian.backend.entity.Comment;
import be.yorian.backend.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
        return commentService.getComments();
    }
    
    @Override
    @GetMapping("/comments/{comment_id}")
    public Optional<Comment> getCommentById(@PathVariable("comment_id") Long commentId) {
    	return commentService.getCommentById(commentId);
    }

    @Override
    @PutMapping("/comments/{comment_id}")
    public void updateComment(@PathVariable("comment_id")Long commentId, @RequestBody Comment comment) {
        commentService.updateComment(commentId, comment);
    }

    @Override
    @PostMapping("/comments")
    public void createComment(@RequestBody Comment comment) {
        commentService.saveComment(comment);
    }
    
    @Override
    @DeleteMapping("/comments/{comment_id}")
	public void deleteComment(@PathVariable("comment_id")Long commentId) {
        commentService.deleteComment(commentId);
	}

    private Sort sortBySearchterm() {
        return Sort.by("searchterm").ascending();
    }
}
