package com.nunesd66.controller;

import com.nunesd66.entity.Autorizador;
import com.nunesd66.entity.HistoricoAutorizador;
import com.nunesd66.service.AutorizadorService;
import com.nunesd66.service.HistoricoAutorizadorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/status-servicos")
@CrossOrigin(origins = "http://localhost:4200")
public class AutorizadorController {

    @Autowired
    private HistoricoAutorizadorService historicoService;

    @Autowired
    private AutorizadorService autorizadorService;

    @GetMapping
    @ResponseBody
    public ResponseEntity<List<Autorizador>> getAllStatus() {
        return new ResponseEntity<>(autorizadorService.getAll(), HttpStatus.OK);
    }


    @GetMapping("/historic")
    @ResponseBody
    public ResponseEntity<List<HistoricoAutorizador>> getLastedStatus() {
        return new ResponseEntity<>(historicoService.getLastedStatus().getContent(), HttpStatus.OK);
    }

    @GetMapping("/historic/{idAutorizador}")
    @ResponseBody
    public ResponseEntity<List<HistoricoAutorizador>> findHistoricoByAutorizador(@PathVariable Long idAutorizador) {
        return new ResponseEntity<>(historicoService.findByStatusServico(idAutorizador), HttpStatus.OK);
    }

    @GetMapping("/historic/filter-by-date/{dataInicial}/{dataFinal}")
    @ResponseBody
    public ResponseEntity<List<HistoricoAutorizador>> findHistoricByDate(
            @PathVariable @DateTimeFormat(pattern="dd-MM-yyyy") LocalDate dataInicial,
            @PathVariable @DateTimeFormat(pattern="dd-MM-yyyy") LocalDate dataFinal) {
        return new ResponseEntity<>(historicoService.findByDate(dataInicial, dataFinal), HttpStatus.OK);
    }

    @GetMapping("/historic/max-unavailability")
    @ResponseBody
    public ResponseEntity<HistoricoAutorizador> findByMaxUnavailability() {
        return new ResponseEntity<>(historicoService.findByMaxUnavailability(), HttpStatus.OK);
    }

}
