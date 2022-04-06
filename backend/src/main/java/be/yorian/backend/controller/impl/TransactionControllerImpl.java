package be.yorian.backend.controller.impl;

import be.yorian.backend.controller.TransactionController;
import be.yorian.backend.entity.Transaction;
import be.yorian.backend.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TransactionControllerImpl implements TransactionController{

    private final TransactionService transactionService;

    @Autowired
    public TransactionControllerImpl(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @Override
    @GetMapping("/transactions")
    public List<Transaction> getTransactions() {
        List<Transaction> transactions = transactionService.getTransactions();
        return transactions;
    }

    @Override
    @GetMapping("/transactions/{year}")
    public List<Transaction> getTransactionsByYear(@PathVariable String year) {
        return transactionService.getTransactionsByYear(year);
    }

	@Override
    @PostMapping("/transactions")
    public void saveTransaction(@RequestBody Transaction transaction) {
        transactionService.saveTransaction(transaction);
    }

}
