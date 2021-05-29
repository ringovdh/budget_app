package be.yorian.backend.controller.impl;

import be.yorian.backend.entity.Transaction;
import be.yorian.backend.repository.TransactionRepository;
import be.yorian.backend.controller.TransactionController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TransactionControllerImpl implements TransactionController{

    private final TransactionRepository transactionRepository;

    @Autowired
    public TransactionControllerImpl(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    @Override
    @GetMapping("/transactions")
    public List<Transaction> getTransactions() {
        return (List<Transaction>) transactionRepository.findAll(sortByDate());
    }


	@Override
    @PostMapping("/transactions-save")
    public void saveTransaction(@RequestBody Transaction transaction) {
        transactionRepository.save(transaction);
    }


    private Sort sortByDate() {
        return Sort.by("date").ascending();
    }

}
