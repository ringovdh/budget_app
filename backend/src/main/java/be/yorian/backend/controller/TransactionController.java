package be.yorian.backend.controller;

import java.util.List;

import be.yorian.backend.entity.Transaction;

public interface TransactionController {

	public List<Transaction> getTransactions();
	public void saveTransaction(Transaction transaction);
	
}
