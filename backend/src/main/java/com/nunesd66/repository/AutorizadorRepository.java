package com.nunesd66.repository;

import com.nunesd66.entity.Autorizador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AutorizadorRepository extends JpaRepository<Autorizador, Long> {

    @Query("select a from Autorizador a where a.nome = :nome")
    Optional<Autorizador> findByAutorizador(String nome);

}
