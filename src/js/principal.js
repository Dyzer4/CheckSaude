const usuarioId = localStorage.getItem('usuarioId');
let convenio = document.getElementById("convenio")
function carregarUsuario(id) {
    fetch(`https://apichecksaude-dmcqhmgcdwcnehez.centralus-01.azurewebsites.net/api/usuarios/${id}`)
        .then(response => response.json())
        .then(data => {
            if (usuarioId == '') {
                window.location.href = '/index.html'
            }
            document.getElementById("nome").innerText = data.nomeCompleto;

            fetch(`https://apichecksaude-dmcqhmgcdwcnehez.centralus-01.azurewebsites.net/api/convenios/${data.idConvenio}`)
                .then(response => response.json())
                .then(data => {
                    convenio.innerText = data.nomeConvenio;
                })
                .catch(error => {
                    console.error('Erro ao buscar convênio:', error);
                });
            
            fetch(`https://apichecksaude-dmcqhmgcdwcnehez.centralus-01.azurewebsites.net/api/agendamentos`)
                .then(response => response.json())
                .then(data => {
                    const agendamento = data.filter(data => data.idUsuario == usuarioId);
                    console.log(agendamento[agendamento.length - 1])
                })
                .catch(error => {
                    console.error('Erro ao buscar convênio:', error);
                });
            
        })
        .catch(error => {
            console.error('Erro ao consumir a API:', error);
        });

}

// Executa a função assim que o DOM estiver carregado
window.addEventListener('DOMContentLoaded', (event) => {
    carregarUsuario(usuarioId);
});

let btnlogoff = document.getElementById("btn-logoff")

btnlogoff.addEventListener('click', function () {
    window.location.href = '/index.html'
    window.usuarioId = localStorage.setItem('usuarioId', '');
})

