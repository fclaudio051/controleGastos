
let contadorId = 1;

document.getElementById("billPaid").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const nome = document.getElementById("nomeConta").value;
    const valorConta = document.getElementById("valorConta").value;
    const vencimentoConta = document.getElementById("vencimentoConta").value;
    const categoriaConta = document.getElementById("categoriaConta").value;

    let status = "pendente";
    let id =contadorId++;

    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${id}</td>
    <td>${nome}</td>
    <td>${valorConta}</td>
    <td>${vencimentoConta}</td>
    <td>${categoriaConta}</td>
    <td>
        <input type="checkbox" ${status === 'pago' ? 'checked' : ''} onchange ="marcarPagamento(this)">
    </td>
    `;

document.getElementById("lista-contas").appendChild(tr);

document.getElementById("nomeConta").value = '';
document.getElementById("valorConta").value = '';
document.getElementById("vencimentoConta").value = '';
document.getElementById("categoriaConta").value = 'Gastos Variaveis';

});

function marcarPagamento(checkbox) {
    const statusCell = checkbox.closest("tr").children[5];
    if (checkbox.checked) {
        statusCell.textContent ="Pago";
        checkbox.closest("tr").style.textDecoration = "line-through";
    } else {
        statusCell.textContent ="pendente";
        checkbox.closest("tr").style.textDecoration = "none";
    }
}