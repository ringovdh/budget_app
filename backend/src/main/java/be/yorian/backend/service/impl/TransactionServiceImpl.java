package be.yorian.backend.service.impl;

import be.yorian.backend.entity.Transaction;
import be.yorian.backend.repository.CommentRepository;
import be.yorian.backend.repository.TransactionRepository;
import be.yorian.backend.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TransactionServiceImpl implements TransactionService {

    final
    TransactionRepository transactionRepository;

    final
    CommentRepository commentRepository;

    public TransactionServiceImpl(TransactionRepository transactionRepository, CommentRepository commentRepository) {
        this.transactionRepository = transactionRepository;
        this.commentRepository = commentRepository;
    }


    @Override
    public List<Transaction> getTransactions() {
        return transactionRepository.findAll(sortByDate());
    }

    @Override
    public void saveTransaction(Transaction transaction) {
        transactionRepository.save(transaction);
    }


    private Sort sortByDate() {
        return Sort.by("date").ascending();
    }

}
