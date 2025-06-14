const usuarioId = localStorage.getItem('usuarioId');
const API_BASE_URL = 'https://apichecksaude-dmcqhmgcdwcnehez.centralus-01.azurewebsites.net/api';

// Função utilitária para buscar dados da API
const buscarDados = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
    }
    return await response.json();
};

// Função principal para listar agendamentos do usuário
const listarAgendamentosUsuario = async () => {
    const container = document.getElementById('agendamentos');
    container.innerHTML = '';

    if (!usuarioId) {
        container.innerHTML = '<p>Usuário não especificado.</p>';
        return;
    }

    try {
        const todosAgendamentos = await buscarDados(`${API_BASE_URL}/agendamentos`);
        const agendamentosUsuario = todosAgendamentos.filter(a => a.idUsuario == usuarioId);

        if (agendamentosUsuario.length === 0) {
            container.innerHTML = '<p>Não há agendamentos para este usuário.</p>';
            return;
        }

        const listaAgendamentos = document.createElement('div');
        listaAgendamentos.classList.add('agendamentos-list');

        // Buscar hospital e convênio para cada agendamento
        for (const agendamento of agendamentosUsuario) {
            try {
                const hospital = await buscarDados(`${API_BASE_URL}/hospitais/${agendamento.idHospitais}`);
                const convenio = await buscarDados(`${API_BASE_URL}/convenios/${agendamento.idConvenio}`);

                const itemDiv = document.createElement('div');
                itemDiv.classList.add('agendamento-item');
                itemDiv.textContent = `${agendamento.dataExame} - ${agendamento.nomeExame} - ${hospital.nomeHospital} - ${convenio.nomeConvenio}`;
                listaAgendamentos.appendChild(itemDiv);
            } catch (erroInterno) {
                console.error('Erro ao buscar hospital ou convênio:', erroInterno);
            }
        }

        container.appendChild(listaAgendamentos);

    } catch (erro) {
        container.innerHTML = `<p>Erro ao carregar agendamentos: ${erro.message}</p>`;
        console.error('Erro:', erro);
    }
};

// Executar ao carregar a página
window.addEventListener('DOMContentLoaded', listarAgendamentosUsuario);
