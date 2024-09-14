document.getElementById("form-conta").addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Obtendo os valores do formulário
    const tipo = document.getElementById("tipo").value;
    const valor = document.getElementById("valor").value;
    const vencimento = document.getElementById("vencimento").value;
    const status = document.getElementById("status").value;
  
    // Criando a linha da tabela
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${tipo}</td>
      <td>R$${valor}</td>
      <td>${vencimento}</td>
      <td>${status}</td>
      <td>
        <input type="checkbox" ${status === 'pago' ? 'checked' : ''} onchange="marcarPagamento(this)">
      </td>
    `;
  
    // Adicionando a linha à tabela
    document.getElementById("lista-contas").appendChild(tr);
  
    // Limpando os campos do formulário
    document.getElementById("tipo").value = 'água';
    document.getElementById("valor").value = '';
    document.getElementById("vencimento").value = '';
    document.getElementById("status").value = 'pendente';
  });
  
  // Função para marcar como pago
  function marcarPagamento(checkbox) {
    const statusCell = checkbox.closest("tr").children[3]; // A célula do status
    if (checkbox.checked) {
      statusCell.textContent = "pago";
      checkbox.closest("tr").style.textDecoration = "line-through";
    } else {
      statusCell.textContent = "pendente";
      checkbox.closest("tr").style.textDecoration = "none";
    }
  }
  
  