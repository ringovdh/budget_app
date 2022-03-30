package be.yorian.backend.helper;

import be.yorian.backend.entity.Comment;
import be.yorian.backend.entity.ImportResponse;
import be.yorian.backend.entity.Transaction;
import be.yorian.backend.repository.CommentRepository;
import be.yorian.backend.repository.TransactionRepository;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

public class ImportResponseHelper {

    private final TransactionRepository transactionRepository;
    private final CommentRepository commentRepository;
    private List<Comment> comments = new ArrayList<>();
    private final List<Transaction> transactions;
    private final ImportResponse response;


    public ImportResponseHelper(TransactionRepository transactionRepository, CommentRepository commentRepository, List<Transaction> transactions) {

        this.transactionRepository = transactionRepository;
        this.commentRepository = commentRepository;
        this.transactions = transactions;
        this.response = new ImportResponse();
    }


    public ImportResponse createImportResponse() {

        loadAllComments();
        filterNewTransactions();

        return this.response;
    }

    private void loadAllComments() {

        comments = commentRepository.findAll();
    }

    private void filterNewTransactions() {

        List<Transaction> filteredTransactions = new ArrayList<>();
        List<Transaction> existingTransactions = new ArrayList<>();

        for (Transaction tx : transactions) {
            Transaction existingTransaction = checkTransaction(tx.getDate(), tx.getNumber());
            if (null == existingTransaction) {
                prepareTransaction(tx);
                filteredTransactions.add(tx);
            } else {
                existingTransactions.add(existingTransaction);
            }
        }

        this.response.setExistingTransactions(existingTransactions);
        this.response.setFilteredTransactions(filteredTransactions);
    }

    private Transaction checkTransaction(Date date, String number) {

        return transactionRepository.findByDateAndNumber(date, number);
    }

    private void prepareTransaction(Transaction tx) {

        String originalComment_lower = tx.originalComment.toLowerCase();

        for (Comment cmt : comments) {
            if (originalComment_lower.contains(cmt.getSearchterm())) {
                tx.setComment(cmt.getReplacement());
                tx.setCategory(cmt.getCategory());
            }
        }
    }

}