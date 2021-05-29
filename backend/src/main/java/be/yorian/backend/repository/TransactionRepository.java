package be.yorian.backend.repository;

import be.yorian.backend.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.sql.Date;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction,Long> {

    @Query("select tx from Transaction tx where tx.date = ?1 and tx.number = ?2")
    Transaction findByDateAndNumber(Date date, String number);

}
