package com.nunesd66.schedule;

import com.nunesd66.entity.Autorizador;
import com.nunesd66.entity.HistoricoAutorizador;
import com.nunesd66.service.AutorizadorService;
import com.nunesd66.service.HistoricoAutorizadorService;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import static com.nunesd66.externalapis.NfeFazendaGovExternalAPI.consumer;

@Component
@EnableScheduling
public class AutorizadorSchedule {

    private final long CINCO_MINUTOS = 1000 * 60 * 5;
    private final AutorizadorService statusService;

    private final HistoricoAutorizadorService historicoService;

    protected AutorizadorSchedule(
            final AutorizadorService statusService,
            final HistoricoAutorizadorService historicoService) {
        this.statusService = statusService;
        this.historicoService = historicoService;
    }

    @Scheduled(fixedDelay = CINCO_MINUTOS)
    public void scheduleGerarHistoricoStatusServicosNfe() throws IOException {
        List<HistoricoAutorizador> listHistorico = consumer();

        for(HistoricoAutorizador historico : listHistorico) {
            String nome = historico.getAutorizador().getNome();

            Optional<Autorizador> statusEntity = statusService.findByAutorizador(nome);
            if (statusEntity.isEmpty()) {
                final var statusEntitySave = statusService.save(historico.getAutorizador());
                historico.setAutorizador(statusEntitySave);
            } else {
                historico.setAutorizador(statusEntity.get());
            }

            historicoService.save(historico);
        }
    }

}
