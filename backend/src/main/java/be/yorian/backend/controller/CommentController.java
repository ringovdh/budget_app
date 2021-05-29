package be.yorian.backend.controller;

import be.yorian.backend.entity.Comment;

import java.util.List;
import java.util.Optional;

public interface CommentController {

    public List<Comment> getComments();
    public Optional<Comment> getCommentById(Long comment_id);
    public void saveComment(Comment comment);
    public Comment updateComment(Comment comment);
    public void deleteComment(Long comment_id);
}
