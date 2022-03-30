package be.yorian.backend.entity;

import java.util.List;

public class ImportResponse {

    private List<Transaction> filteredTransactions;
    private List<Transaction> existingTransactions;


    public List<Transaction> getFilteredTransactions() {
        return filteredTransactions;
    }

    public void setFilteredTransactions(List<Transaction> filteredTransactions) {
        this.filteredTransactions = filteredTransactions;
    }


    public List<Transaction> getExistingTransactions() {
        return existingTransactions;
    }

    public void setExistingTransactions(List<Transaction> existingTransactions) {
        this.existingTransactions = existingTransactions;
    }

}
