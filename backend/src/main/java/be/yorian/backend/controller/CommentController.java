package be.yorian.backend.controller;

import be.yorian.backend.entity.Comment;

import java.util.List;
import java.util.Optional;

public interface CommentController {

    List<Comment> getComments();
    Optional<Comment> getCommentById(Long comment_id);
    void saveComment(Comment comment);
    void deleteComment(Long comment_id);
}
