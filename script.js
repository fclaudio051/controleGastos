export function marcarPagamento(checkbox, id) {
    const status = checkbox.checked ? 'pago' : 'pendente';
    atualizarStatusNoLocalStorage(id, status);

    // Atualize a tabela para refletir as mudanças de status
    document.querySelectorAll('#lista-contas tr').forEach(tr => {
        if (tr.querySelector('input[type="checkbox"]').dataset.id == id) {
            tr.classList.toggle('pago', status === 'pago');
            tr.classList.toggle('pendente', status === 'pendente');
            tr.querySelector('.status').textContent = status;
        }
    });
}
