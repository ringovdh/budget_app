package be.yorian.backend.repository;

import be.yorian.backend.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction,Long> {

    @Query(value = "select tx from Transaction tx " +
            "where tx.date = ?1 and tx.number = ?2")
    Transaction findByDateAndNumber(Date date, String number);

    @Query(value = "select tx from Transaction tx " +
            "where SUBSTRING(tx.date, 1, 4) = ?1")
    List<Transaction> findByYear(String year);

    @Query(value = "select tx from Transaction tx " +
            "where SUBSTRING(tx.date, 6, 2) = ?1 " +
            "and SUBSTRING(tx.date, 1, 4) = ?2")
    List<Transaction> findByMonth(String month, String year);

    @Query(value = "select tx from Transaction tx " +
            "where SUBSTRING(tx.date, 1, 7) = ?1 " +
            "and (tx.category.id = ?2 or tx.category.id = ?3)")
    List<Transaction> findByDateAndCategory(String date, long loon, long kindergeld);
}
