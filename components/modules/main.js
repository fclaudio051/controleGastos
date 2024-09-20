import { carregarContas, adicionarContaNaTabela } from './contas.js';
import { salvarContaNoLocalStorage } from './localStorage.js';
import { marcarPagamento } from './pagamento.js';

let contadorId = 1;

document.addEventListener("DOMContentLoaded", function() {
    carregarContas(contadorId, adicionarContaNaTabela);
});

document.getElementById("billPaid").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const nome = document.getElementById("nomeConta").value;
    const valorConta = parseFloat(document.getElementById("valorConta").value);
    const vencimentoConta = document.getElementById("vencimentoConta").value;
    const categoriaConta = document.getElementById("categoriaConta").value;

    let status = "pendente";
    let id = contadorId++;

    const conta = {
        id,
        nome,
        valor: valorConta,
        vencimento: vencimentoConta,
        categoria: categoriaConta,
        status
    };

    adicionarContaNaTabela(conta);
    salvarContaNoLocalStorage(conta);

    document.getElementById("nomeConta").value = '';
    document.getElementById("valorConta").value = '';
    document.getElementById("vencimentoConta").value = '';
    document.getElementById("categoriaConta").value = 'Gastos Variaveis';
});

document.getElementById("lista-contas").addEventListener("change", function(event) {
    if (event.target.type === "checkbox") {
        const checkbox = event.target;
        const id = parseInt(checkbox.dataset.id, 10);
        marcarPagamento(checkbox, id);
    }
});

