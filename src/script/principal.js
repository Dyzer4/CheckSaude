function carregarUsuario() {
    fetch('https://apichecksaude-dmcqhmgcdwcnehez.centralus-01.azurewebsites.net/api/usuarios')
        .then(response => response.json())
        .then(data => {
            const usuarioId = localStorage.getItem('usuarioId');
            if (usuarioId == '') {
                window.location.href = '/index.html'
            }
            const usuario = data.find(u => u.id == usuarioId);
            document.getElementById("nome").innerText = usuario.nome;

            fetch(`https://apichecksaude-dmcqhmgcdwcnehez.centralus-01.azurewebsites.net/api/convenios`)
                .then(response => response.json())
                .then(data => {
                    const convenio = data.find(u => u.id == usuario.conv)
                    document.getElementById("convenio").innerText = convenio.nome;
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
    carregarUsuario();
});

let btnlogoff = document.getElementById("btn-logoff")

btnlogoff.addEventListener('click', function () {
    window.location.href = '/index.html'
    window.usuarioId = localStorage.setItem('usuarioId', '');
})

