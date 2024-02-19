package com.nunesd66.service;

import com.nunesd66.entity.HistoricoAutorizador;
import com.nunesd66.repository.HistoricoAutorizadorRepository;
import com.nunesd66.repository.AutorizadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.DateTimeException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class HistoricoAutorizadorService {

    @Autowired
    private HistoricoAutorizadorRepository historicoRepository;

    @Autowired
    private AutorizadorRepository statusRepository;

    public HistoricoAutorizador save(HistoricoAutorizador entity) {
        return historicoRepository.save(entity);
    }

    public Page<HistoricoAutorizador> getLastedStatus() {
        int countOfStatusServicos = statusRepository.findAll().size();

        return historicoRepository.getLastedStatus(PageRequest
                .of(0, countOfStatusServicos, Sort.by(Sort.Direction.DESC, "dataCadastro")));
    }

    public List<HistoricoAutorizador> findByStatusServico(Long idStatusServico) {
        return historicoRepository.findByStatusServico(idStatusServico);
    }

    public List<HistoricoAutorizador> findByDate(LocalDate dataInicial, LocalDate dataFinal) {

        if (dataInicial.isAfter(dataFinal)) {
            throw new DateTimeException("A data inicial não pode ser maior que a data final.");
        }

        LocalDateTime dataInicialLDT = dataInicial.atStartOfDay();
        LocalDateTime dataFinalLDT = dataFinal.atStartOfDay().plusHours(23).plusMinutes(59).plusSeconds(59);

        return historicoRepository.findByDate(dataInicialLDT, dataFinalLDT);
    }

    public HistoricoAutorizador findByMaxUnavailability() {
        return historicoRepository.findByMaxunavailability();
    }
}
