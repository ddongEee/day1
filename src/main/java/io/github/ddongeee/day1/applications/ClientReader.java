package io.github.ddongeee.day1.applications;

import io.github.ddongeee.day1.domains.Client;
import io.github.ddongeee.day1.domains.ClientRepository;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ClientReader {
    private final ClientRepository clientRepository;

    public ClientReader(final ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public String findAnyName() {
        List<Client> all = clientRepository.findAll();
        return all.get(0).getName();
    }
}
