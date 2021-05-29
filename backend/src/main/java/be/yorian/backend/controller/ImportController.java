package be.yorian.backend.controller;

import be.yorian.backend.entity.Transaction;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ImportController {

    List<Transaction> importTransactions(MultipartFile file);
}
