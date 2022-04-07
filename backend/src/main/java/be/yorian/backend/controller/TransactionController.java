package be.yorian.backend.controller;

import be.yorian.backend.entity.Transaction;

import java.util.List;

public interface TransactionController {

	List<Transaction> getTransactions();
    List<Transaction> getTransactionsByYear(String year);
    List<Transaction> getTransactionsByMonth(String month, String year);
    void saveTransaction(Transaction transaction);
	
}
