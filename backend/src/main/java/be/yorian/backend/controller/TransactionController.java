package be.yorian.backend.controller;

import java.util.List;

import be.yorian.backend.entity.Transaction;

public interface TransactionController {

	List<Transaction> getTransactions();
	void saveTransaction(Transaction transaction);
	
}
