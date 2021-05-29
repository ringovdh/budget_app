package be.yorian.backend.helper;

import be.yorian.backend.entity.Comment;
import be.yorian.backend.entity.Transaction;
import be.yorian.backend.repository.CommentRepository;
import java.util.ArrayList;
import java.util.List;

public class TransactionHelper {

    List<Comment> comments = new ArrayList<>();

    private final CommentRepository commentRepository;

    public TransactionHelper(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
        fillCommentsList();
    }

    private void fillCommentsList() {
        comments = commentRepository.findAll();
    }

    public Transaction prepareTransaction(Transaction tx) {
        String originalComment_lower = tx.originalComment.toLowerCase();
        for (Comment cmt : comments) {
            if (originalComment_lower.contains(cmt.getSearchterm())) {
                tx.setComment(cmt.getReplacement());
                tx.setCategory(cmt.getCategory());
            }
        }

        return tx;
    }
}
