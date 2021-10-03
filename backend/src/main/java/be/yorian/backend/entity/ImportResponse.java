package be.yorian.backend.entity;

import java.util.Date;
import java.util.List;


public class ImportResponse {

    private Date transactionPeriod;
    private List<Transaction> filteredTransactions;
    private Double saldo;

    public ImportResponse() {
        this.saldo = (double) 0;
    }

    public void setFilteredTransactions(List<Transaction> filteredTransactions) {
        this.filteredTransactions = filteredTransactions;
    }

    public Double getSaldo() {
        return saldo;
    }

    public void setSaldo(Double saldo) {
        this.saldo = saldo;
    }


    public void addAmount(Double amount) {
        this.saldo = this.saldo + amount;
    }

    public List<Transaction> getFilteredTransactions() {
        return filteredTransactions;
    }
}
