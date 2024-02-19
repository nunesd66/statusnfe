package com.nunesd66.service;

import com.nunesd66.entity.Autorizador;
import com.nunesd66.repository.AutorizadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AutorizadorService {

    @Autowired
    private AutorizadorRepository statusRepository;

    public Optional<Autorizador> findByAutorizador(String nome) {
        return statusRepository.findByAutorizador(nome);
    }

    public Autorizador save(Autorizador entity) {
        return statusRepository.save(entity);
    }

    public List<Autorizador> getAll() {
        return statusRepository.findAll();
    }
}
