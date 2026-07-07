document.getElementById('botao-buscar').addEventListener('click', function() {
    var cep = document.getElementById('campo-cep').value.trim();
    if (cep) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(resposta => resposta.json())
        .then(dados => {
            if (dados.erro) {
                document.getElementById('resultado').innerHTML = '<p>CEP não encontrado.</p>';
            } else {
                document.getElementById('resultado').innerHTML = `
                <p><strong>Endereço:</strong> ${dados.logradouro}</p>
                <p><strong>Bairro:</strong> ${dados.bairro}</p>
                <p><strong>Cidade:</strong> ${dados.localidade}</p>
                <p><strong>Estado:</strong> ${dados.uf}</p>
                <p><strong>CEP:</strong> ${dados.cep}</p>
                `;
            }
        })
        .catch(() => {
            document.getElementById('resultado').innerHTML = '<p>Erro ao buscar o CEP.</p>';
        });
    }
});
