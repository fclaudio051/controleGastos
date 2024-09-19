import { atualizarStatusNoLocalStorage } from './localStorage.js';

export function marcarPagamento(checkbox, id) {
    const status = checkbox.checked ? 'pago' : 'pendente';
    atualizarStatusNoLocalStorage(id, status);

    // Atualiza o status na tabela
    const statusCell = checkbox.closest('tr').querySelector('.status');
    statusCell.textContent = status;

    const row = checkbox.closest('tr');
    if (status === 'pago') {
        row.classList.add('pago');
    } else {
        row.classList.remove('pago');
    }
}
