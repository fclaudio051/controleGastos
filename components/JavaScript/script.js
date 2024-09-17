let contadorId = 1;

document.addEventListener("DOMContentLoaded", function() {
    const contasSalvas = JSON.parse(localStorage.getItem("contas")) || [];
    
    contasSalvas.forEach(conta => {
        adicionarContaNaTabela(conta);
        contadorId = Math.max(contadorId, conta.id + 1);
    });
});

document.getElementById("billPaid").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const nome = document.getElementById("nomeConta").value;
    const valorConta = document.getElementById("valorConta").value;
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

function adicionarContaNaTabela(conta) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${conta.id}</td>
        <td>${conta.nome}</td>
        <td>${conta.valor}</td>
        <td>${conta.vencimento}</td>
        <td>${conta.categoria}</td>
        <td class="status">${conta.status}</td>
        <td>
            <input type="checkbox" ${conta.status === 'pago' ? 'checked' : ''} onchange="marcarPagamento(this, ${conta.id})">
        </td>
    `;
    document.getElementById("lista-contas").appendChild(tr);
}

function marcarPagamento(checkbox, id) {
    const statusCell = checkbox.closest("tr").children[5];
    if (checkbox.checked) {
        statusCell.textContent = "Pago";
        checkbox.closest("tr").style.textDecoration = "line-through";
        atualizarStatusNoLocalStorage(id, 'pago');
    } else {
        statusCell.textContent = "pendente";
        checkbox.closest("tr").style.textDecoration = "none";
        atualizarStatusNoLocalStorage(id, 'pendente');
    }
}

function salvarContaNoLocalStorage(conta) {
    const contas = JSON.parse(localStorage.getItem("contas")) || [];
    contas.push(conta);
    localStorage.setItem("contas", JSON.stringify(contas));
}

function atualizarStatusNoLocalStorage(id, status) {
    const contas = JSON.parse(localStorage.getItem("contas")) || [];
    const conta = contas.find(c => c.id === id);
    if (conta) {
        conta.status = status;
        localStorage.setItem("contas", JSON.stringify(contas));
    }
}
