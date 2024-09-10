const fs = require('fs').promises;
const caminhoArquivo = 'data.json';

async function readDataMock() {
    try {
        return JSON.parse(await fs.readFile(caminhoArquivo, 'utf8'));
    } catch (err) {
        console.error("Erro ao ler ou parsear o arquivo:", err);
    }
}

async function mapData(data) {
    return data.map(despesa => {
        console.log("Categoria:", despesa.categoria);
        console.log("Despesa:", despesa.nome);
        console.log("Mês:");
        return despesa.mes.map(mes => {
            console.log("Nome:", mes.nome);
            console.log("Valor:", mes.valor);
        });    
    });
}

async function main() {
    const data = await readDataMock();
    if (data) await mapData(data);
}

main();
