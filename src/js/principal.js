const usuarioId = localStorage.getItem('usuarioId');
const api = "https://apichecksaude-dmcqhmgcdwcnehez.centralus-01.azurewebsites.net/api"
let convenio = document.getElementById("convenio")
function carregarUsuario(id, api) {
    fetch(`${api}/usuarios/${id}`)
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
            
            
            
        })
        .catch(error => {
            console.error('Erro ao consumir a API:', error);
        });

}

// Executa a função assim que o DOM estiver carregado
window.addEventListener('DOMContentLoaded', (event) => {
    carregarUsuario(usuarioId, api);
});

let btnlogoff = document.getElementById("btn-logoff")

btnlogoff.addEventListener('click', function () {
    window.location.href = '/index.html'
    window.usuarioId = localStorage.setItem('usuarioId', '');
})

