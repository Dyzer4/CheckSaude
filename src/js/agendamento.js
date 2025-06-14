const API_BASE_URL = 'https://apichecksaude-dmcqhmgcdwcnehez.centralus-01.azurewebsites.net/api';
const usuarioId = localStorage.getItem('usuarioId');

const btnAgendar = document.getElementById('btn-agend');
const selectExame = document.getElementById('exame');
let idConvenio = null;

// Função para buscar dados do usuário
const buscarUsuario = async (id) => {
    const response = await fetch(`${API_BASE_URL}/usuarios/${id}`);
    if (!response.ok) throw new Error('Erro ao buscar usuário');
    return await response.json();
};

// Função para buscar exames do convênio
const buscarExamesPorConvenio = async (convenioId) => {
    const response = await fetch(`${API_BASE_URL}/exames/${convenioId}`);
    if (!response.ok) throw new Error('Erro ao buscar exames');
    return await response.json();
};

// Função para preencher o <select> com os exames
const preencherSelectExames = (exames) => {
    exames.forEach((exame) => {
        const option = document.createElement('option');
        option.value = exame.id || exame; // Ajuste conforme o retorno da API
        option.textContent = exame.nome || exame;
        selectExame.appendChild(option);
    });
};

// Evento ao carregar a página
window.addEventListener('DOMContentLoaded', async () => {
    try {
        const usuario = await buscarUsuario(usuarioId);
        idConvenio = usuario.idConvenio;

        const exames = await buscarExamesPorConvenio(idConvenio);
        preencherSelectExames(exames);
    } catch (erro) {
        console.error('Erro ao carregar dados iniciais:', erro);
    }
});

// Evento de envio do agendamento
btnAgendar.addEventListener('click', async (event) => {
    event.preventDefault();

    const nomeExame = selectExame.value;
    const hospitalId = Number(document.getElementById('hospital').value);
    const dataExame = document.getElementById('dataagend').value;
    const horaExame = document.getElementById('horaagend').value;

    const agendamento = {
        dataExame,
        nomeExame,
        idHospitais: hospitalId,
        idUsuario: Number(usuarioId),
        idConvenio: Number(idConvenio),
        horaExame: `${horaExame}:00`
    };

    try {
        const response = await fetch(`${API_BASE_URL}/agendamentos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(agendamento)
        });

        if (!response.ok) {
            throw new Error(`Erro ao agendar exame. Status: ${response.status}`);
        }

        await response.json();
        window.location.href = '/src/pages/dashboard/';
    } catch (erro) {
        alert('Erro ao enviar os dados. Tente novamente.');
        console.error(erro);
    }
});
