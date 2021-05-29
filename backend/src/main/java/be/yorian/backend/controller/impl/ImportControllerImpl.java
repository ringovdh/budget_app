package be.yorian.backend.controller.impl;

import be.yorian.backend.entity.Transaction;
import be.yorian.backend.helper.PDFReader;
import be.yorian.backend.service.impl.TransactionServiceImpl;
import be.yorian.backend.controller.ImportController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ImportControllerImpl implements ImportController {

    @Autowired
    TransactionServiceImpl transactionService;

    @Override
    @PostMapping("/importTransactions")
    public List<Transaction> importTransactions(@RequestParam("file") MultipartFile file) {
        PDFReader pdfReader = new PDFReader(file);
        List<Transaction> transactions = pdfReader.parsePDFToTransactions();
        List<Transaction> filteredTransactions = this.transactionService.filterTransactions(transactions);

        return filteredTransactions;
    }
}
