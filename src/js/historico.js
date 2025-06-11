const usuarioId = localStorage.getItem('usuarioId'); // 
const api = "https://apichecksaude-dmcqhmgcdwcnehez.centralus-01.azurewebsites.net/api"

function listarAgendamentosUsuario(api, usuarioId) {
    fetch(`${api}/agendamentos`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.status);
            }
            return response.json(); // Converte a resposta para JSON
        })
        .then(agendamentos => {
            const container = document.getElementById('agendamentos');
            container.innerHTML = '';
            if (!usuarioId) {
                container.innerHTML = '<p>Usuário não especificado na URL.</p>';
                return;
            }

            // Filtrar agendamentos para o usuário específico
            const agendamentosDoUsuario = agendamentos.filter(agendamentos => agendamentos.idUsuario == usuarioId);
            if (agendamentosDoUsuario.length === 0) {
                container.innerHTML = '<p>Não há agendamentos para este usuário.</p>';
                return;
            }

            // Criar a div que vai conter os itens
            const divContainer = document.createElement('div');
            divContainer.classList.add('agendamentos-list'); // opcional para estilização


            agendamentosDoUsuario.forEach(agendamento => {
                fetch(`${api}/hospitais/${agendamento.idHospitais}`)
                    .then(res => res.json())
                    .then(data => {
                        hospital = data
                        fetch(`${api}/convenios/${agendamento.idConvenio}`)
                            .then(res => res.json())
                            .then(data => {
                                convenio = data
                                const itemDiv = document.createElement('div');
                                itemDiv.classList.add('agendamento-item'); // opcional para estilização
                                itemDiv.textContent = `${agendamento.dataExame} - ${agendamento.nomeExame} - ${hospital.nomeHospital} - ${convenio.nomeConvenio}`;
                                divContainer.appendChild(itemDiv);
                            })
                    })
                    .catch(console.log("erro ao pesquisar hospitais"))
            });
            container.appendChild(divContainer);
        })



        .catch(error => {
            const container = document.getElementById('agendamentos');
            container.innerHTML = `<p>Erro ao carregar agendamentos: ${error.message}</p>`;
            console.error('Erro:', error);
        });
}

// Chama a função para carregar os agendamentos ao carregar a página
listarAgendamentosUsuario(api, usuarioId);
