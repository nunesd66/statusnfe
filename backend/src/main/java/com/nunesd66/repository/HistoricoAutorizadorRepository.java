package com.nunesd66.repository;

import com.nunesd66.entity.HistoricoAutorizador;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface HistoricoAutorizadorRepository extends JpaRepository<HistoricoAutorizador, Long> {

    @Query("select h from HistoricoAutorizador h")
    Page<HistoricoAutorizador> getLastedStatus(Pageable pageable);

    @Query("select h from HistoricoAutorizador h " +
            "where h.autorizador.id = :id")
    List<HistoricoAutorizador> findByStatusServico(Long id);

    @Query("select h from HistoricoAutorizador h " +
            "where  h.dataCadastro >= :dataInicial AND h.dataCadastro <= :dataFinal " +
            "ORDER BY h.dataCadastro DESC")
    List<HistoricoAutorizador> findByDate(LocalDateTime dataInicial, LocalDateTime dataFinal);

    @Query(value =
            "SELECT h1.* " +
                "FROM statusnfe.historico_autorizador h1, (" +
                    "SELECT a.id AS idAutorizador " +
                        "FROM statusnfe.autorizador a, (" +
                            "SELECT autorizador_id, (" +
                                "SUM(CASE WHEN autorizacao = 'VERDE' THEN 1 ELSE 0 END) + " +
                                "SUM(CASE WHEN consulta_cadastro = 'VERDE' THEN 1 ELSE 0 END) + " +
                                "SUM(CASE WHEN consulta_protocolo = 'VERDE' THEN 1 ELSE 0 END) + " +
                                "SUM(CASE WHEN inutilizacao = 'VERDE' THEN 1 ELSE 0 END) + " +
                                "SUM(CASE WHEN recepcao_evento = 'VERDE' THEN 1 ELSE 0 END) + " +
                                "SUM(CASE WHEN retorno_autorizacao = 'VERDE' THEN 1 ELSE 0 END) + " +
                                "SUM(CASE WHEN status_servico = 'VERDE' THEN 1 ELSE 0 END)" +
                            ") AS total_verde " +
                            "FROM statusnfe.historico_autorizador h2 " +
                            "GROUP BY autorizador_id " +
                            "ORDER BY total_verde ASC " +
                            "LIMIT 1" +
                        ") AS statusMaisInstavel " +
                        "WHERE a.id = statusMaisInstavel.autorizador_id " +
                ") AS autorizador1 " +
                "WHERE h1.autorizador_id = autorizador1.idAutorizador " +
                "ORDER BY h1.data_cadastro DESC " +
                "LIMIT 1;"
            , nativeQuery = true)
    HistoricoAutorizador findByMaxunavailability();
}
