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

    private TransactionRepository transactionRepository;
    private CommentRepository commentRepository;
    private List<Comment> comments = new ArrayList<>();
    private final List<Transaction> transactions;
    private ImportResponse response;


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

        for (Transaction tx : transactions) {
            if (!checkTransaction(tx.getDate(), tx.getNumber())) {
                tx = prepareTransaction(tx);
                filteredTransactions.add(tx);
            } else {
                response.addAmount(tx.getAmount());
            }
        }

        this.response.setFilteredTransactions(filteredTransactions);
    }

    private boolean checkTransaction(Date date, String number) {

        Transaction tx = transactionRepository.findByDateAndNumber(date, number);

        if (tx != null) {
            return true;
        }

        return false;
    }

    private Transaction prepareTransaction(Transaction tx) {

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
