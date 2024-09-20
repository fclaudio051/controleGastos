import { marcarPagamento } from './pagamento.js';

export function carregarContas(contadorId, adicionarContaNaTabela) {
    const contasSalvas = JSON.parse(localStorage.getItem("contas")) || [];
    console.log("Contas carregadas do LocalStorange:",contasSalvas);
    
    contasSalvas.forEach(conta => {
        conta.valor = Number(conta.valor);
        adicionarContaNaTabela(conta);
        contadorId = Math.max(contadorId, conta.id + 1);
    });

    window.contadorId = contadorId;
}

export function adicionarContaNaTabela(conta) {
    console.log("Adicionando conta à tabela:", conta);

    const tr = document.createElement("tr");
    tr.classList.add(conta.status === 'pago' ? 'pago' : 'pendente');
    tr.innerHTML = `
        <td>${conta.id}</td>
        <td>${conta.nome}</td>
        <td>${conta.valor.toFixed(2)}</td>
        <td>${conta.vencimento}</td>
        <td>${conta.categoria}</td>
        <td class="status">${conta.status}</td>
        <td>
            <input type="checkbox" ${conta.status === 'pago' ? 'checked' : ''} data-id="${conta.id}">
        </td>
        <td>
            <button data-id="${conta.id}" class="btn-deletar">Deletar</button>
        </td>
    `;

    const checkbox = tr.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', () => marcarPagamento(checkbox, conta.id));

    document.getElementById("lista-contas").appendChild(tr);
}

document.getElementById("lista-contas").addEventListener("click", function(event) {
    if (event.target.classList.contains("btn-deletar")) {
        const id = parseInt(event.target.dataset.id, 10);
        deletarConta(id);
    }
});

function deletarConta(id) {
    
    let contas = JSON.parse(localStorage.getItem('contas')) || [];
    contas = contas.filter(conta => conta.id !== id);
    localStorage.setItem('contas', JSON.stringify(contas));
    
    
    const linha = document.querySelector(`button[data-id="${id}"]`).closest("tr");
    if (linha) {
        linha.remove();
    }
}
