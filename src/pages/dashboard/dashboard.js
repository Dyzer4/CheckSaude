function carregarUsuario() {
    fetch('http://localhost:3000/usuario')
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const usuario = data[0];
                document.getElementById("email").innerText = usuario.email_usuario;
                document.getElementById("endereco").innerText = usuario.endereco_usuario;
            } else {
                document.getElementById("email").innerText = 'Nenhum usuário encontrado';
                document.getElementById("endereco").innerText = '';
            }
        })
        .catch(error => {
            console.error('Erro ao consumir a API:', error);
        });
}

// Executa a função assim que o DOM estiver carregado
window.addEventListener('DOMContentLoaded', (event) => {
    carregarUsuario();
});
