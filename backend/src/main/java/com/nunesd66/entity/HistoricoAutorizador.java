package com.nunesd66.entity;

import com.nunesd66.enumeration.ColorStatusEnum;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "historico_autorizador")
public class HistoricoAutorizador {

    @EqualsAndHashCode.Include
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, cascade = CascadeType.MERGE)
    @JoinColumn(nullable = false, updatable = false, foreignKey = @ForeignKey(name = "fk_historico_autorizador"))
    private Autorizador autorizador;

    @Column(nullable = false, updatable = false)
    @Enumerated(EnumType.STRING)
    private ColorStatusEnum autorizacao;

    @Column(nullable = false, updatable = false)
    @Enumerated(EnumType.STRING)
    private ColorStatusEnum retornoAutorizacao;

    @Column(nullable = false, updatable = false)
    @Enumerated(EnumType.STRING)
    private ColorStatusEnum inutilizacao;

    @Column(nullable = false, updatable = false)
    @Enumerated(EnumType.STRING)
    private ColorStatusEnum consultaProtocolo;

    @Column(nullable = false, updatable = false)
    @Enumerated(EnumType.STRING)
    private ColorStatusEnum statusServico;

    @Column(nullable = false, updatable = false)
    private String tempoMedio;

    @Column(nullable = false, updatable = false)
    @Enumerated(EnumType.STRING)
    private ColorStatusEnum consultaCadastro;

    @Column(nullable = false, updatable = false)
    @Enumerated(EnumType.STRING)
    private ColorStatusEnum recepcaoEvento;

    @Column(name = "data_cadastro", nullable = false, updatable = false)
    private LocalDateTime dataCadastro;

    @PrePersist
    public void prePersist() {
        dataCadastro = LocalDateTime.now();
    }

}
