export function salvarContaNoLocalStorage(conta) {
    const contas = JSON.parse(localStorage.getItem("contas")) || [];
    conta.valor = Number(conta.valor); 
    contas.push(conta);
    localStorage.setItem("contas", JSON.stringify(contas));
    
    console.log("Contas após salvar:", JSON.parse(localStorage.getItem("contas")));
}

export function atualizarStatusNoLocalStorage(id, status) {
    const contas = JSON.parse(localStorage.getItem("contas")) || [];
    const conta = contas.find(c => c.id === id);
    if (conta) {
        conta.status = status;
        localStorage.setItem("contas", JSON.stringify(contas));

        console.log("Contas após atualizar status:", JSON.parse(localStorage.getItem("contas")));
    }
}

