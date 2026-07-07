const form = document.getElementById("form-busca");
const campoCep = document.getElementById("campo-cep");
const resultado = document.getElementById("resultado");
const botaoCopiar = document.getElementById("botao-copiar");
const botaoLimpar = document.getElementById("botao-limpar");

botaoCopiar.style.display = "none";
botaoLimpar.style.display = "none";


campoCep.addEventListener("input", () => {

    let cep = campoCep.value.replace(/\D/g, "");

    if (cep.length > 5) {
        cep = cep.replace(/^(\d{5})(\d)/, "$1-$2");
    }

    campoCep.value = cep;

});

/*BUSCA*/

form.addEventListener("submit", (event) => {

    event.preventDefault();

    buscarCep();

});

/*CONSULTAR API*/

async function buscarCep() {

    const cep = campoCep.value.replace(/\D/g, "");

    if (!validarCep(cep)) {
        mostrarErro("Digite um CEP válido com 8 números.");
        return;
    }

    mostrarLoading();

    try {

        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

        const dados = await resposta.json();

        if (dados.erro) {
            mostrarErro("CEP não encontrado.");
            return;
        }

        mostrarEndereco(dados);

    } catch {

        mostrarErro("Não foi possível consultar o CEP.");

    }

}

/*VALIDAÇÃO*/

function validarCep(cep) {

    return /^\d{8}$/.test(cep);

}

/*LOADING*/

function mostrarLoading() {

    resultado.innerHTML = `
        <p>Buscando endereço...</p>
    `;

}

/*RESULTADO*/

function mostrarEndereco(endereco) {

    resultado.innerHTML = `
        <p><strong>CEP:</strong> ${endereco.cep}</p>
        <p><strong>Logradouro:</strong> ${endereco.logradouro}</p>
        <p><strong>Bairro:</strong> ${endereco.bairro}</p>
        <p><strong>Cidade:</strong> ${endereco.localidade}</p>
        <p><strong>Estado:</strong> ${endereco.uf}</p>
    `;

    botaoCopiar.style.display = "block";
    botaoLimpar.style.display = "block";

}

/*ERRO*/

function mostrarErro(mensagem) {

    resultado.innerHTML = `
        <p>${mensagem}</p>
    `;

    botaoCopiar.style.display = "none";

}

/*LIMPAR*/

botaoLimpar.addEventListener("click", () => {

    campoCep.value = "";

    resultado.innerHTML = "";

    botaoCopiar.style.display = "none";
    botaoLimpar.style.display = "none";

    campoCep.focus();

});

/*COPIAR*/

botaoCopiar.addEventListener("click", async () => {

    try {

        await navigator.clipboard.writeText(resultado.innerText);

        alert("Endereço copiado!");

    } catch {

        alert("Não foi possível copiar.");

    }

});