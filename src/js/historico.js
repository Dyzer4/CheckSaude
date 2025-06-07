const usuarioId = localStorage.getItem('usuarioId'); // 
const apiUrl = `https://apichecksaude-dmcqhmgcdwcnehez.centralus-01.azurewebsites.net/api/agendamentos?usuario=${usuarioId}`; 

function listarAgendamentosUsuario() {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.status);
            }
            return response.json(); // Converte a resposta para JSON
        })
        .then(agendamentos => {
            const container = document.getElementById('agendamentos');
            container.innerHTML = '';

            // Extrair userId da URL (exemplo: ?userId=123)
            const urlParams = new URLSearchParams(window.location.search);
            const userId = urlParams.get('userId');

            if (!usuarioId) {
                container.innerHTML = '<p>Usuário não especificado na URL.</p>';
                return;
            }

            // Filtrar agendamentos para o usuário específico
            const agendamentosDoUsuario = agendamentos.filter(agendamentos => agendamentos.usuario == usuarioId);

            if (agendamentosDoUsuario.length === 0) {
                container.innerHTML = '<p>Não há agendamentos para este usuário.</p>';
                return;
            }

            // Criar a div que vai conter os itens
            const divContainer = document.createElement('div');
            divContainer.classList.add('agendamentos-list'); // opcional para estilização

            agendamentosDoUsuario.forEach(agendamento => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('agendamento-item'); // opcional para estilização
                itemDiv.textContent = `${agendamento.data} - ${agendamento.exame} - ${agendamento.hospital} - ${agendamento.convenio}`;
                divContainer.appendChild(itemDiv);
            });

            container.appendChild(divContainer);
        })


        
        .catch (error => {
    const container = document.getElementById('agendamentos');
    container.innerHTML = `<p>Erro ao carregar agendamentos: ${error.message}</p>`;
    console.error('Erro:', error);
});
}

// Chama a função para carregar os agendamentos ao carregar a página
listarAgendamentosUsuario();
