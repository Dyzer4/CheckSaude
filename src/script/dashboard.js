function carregarUsuario() {
    fetch('https://apichecksaude-dmcqhmgcdwcnehez.centralus-01.azurewebsites.net/api/usuarios')
        .then(response => response.json())
        .then(data => {
                const usuario = data[(window.usuarioId = localStorage.getItem('usuarioId')) - 1];
                document.getElementById("email").innerText = usuario.email;
                document.getElementById("endereco").innerText = usuario.endereco;
        })
        .catch(error => {
            console.error('Erro ao consumir a API:', error);
        });
}

// Executa a função assim que o DOM estiver carregado
window.addEventListener('DOMContentLoaded', (event) => {
    carregarUsuario();
});
