package be.yorian.backend.service;

import be.yorian.backend.entity.Transaction;

import java.util.List;

public interface TransactionService {

    List<Transaction> filterTransactions(List<Transaction> transactions);
}
