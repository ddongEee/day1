package io.github.ddongeee.day1.interfaces;

import io.github.ddongeee.day1.domains.Client;
import io.github.ddongeee.day1.domains.ClientRepository;
import io.swagger.annotations.ApiOperation;
import lombok.*;
import org.mapstruct.Mapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/clients")
public class ClientsController {
    private final ClientMapper clientMapper;
    private final ClientRepository clientRepository;

    @GetMapping
    @ApiOperation(value = "list clients", notes = "findAll clients")
    public List<ClientDto> getClients() {
        List<Client> clients = clientRepository.findAll();
        return clients.stream()
                .map(clientMapper::toDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ClientDto getClient(@PathVariable Long id) {
        return clientRepository.findById(id)
                               .map(clientMapper::toDto)
                               .orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity createClient(@RequestBody Client client) throws URISyntaxException {
        Client savedClient = clientRepository.save(client);
        return ResponseEntity.created(new URI("/clients/" + savedClient.getId())).body(savedClient);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateClient(@PathVariable Long id, @RequestBody Client client) {
        Client currentClient = clientRepository.findById(id).orElseThrow(RuntimeException::new);
        currentClient.setName(client.getName());
        currentClient.setEmail(client.getEmail());
        currentClient = clientRepository.save(client);

        return ResponseEntity.ok(currentClient);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteClient(@PathVariable Long id) {
        clientRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @Getter
    @Builder
    @RequiredArgsConstructor
    public static class ClientForm {
        @NotBlank(message = "이름이 비워져 있습니다.")
        private final String name;
        @Email(message = "이메일 형식에 맞지 않습니다.")
        private final String email;
    }

    @Data
    @Builder
    public static class ClientDto {
        Long id;
        String name;
        String email;
    }

    public static class ClientVo {
        Long id;
        String name;
        String email;
    }

    @Mapper(componentModel = "spring")
    public interface ClientMapper {
//        ClientVo toVo(ClientForm clientForm);
        ClientDto toDto(Client client);
    }
}
