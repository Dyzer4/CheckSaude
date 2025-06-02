function carregarUsuario() {
    fetch('https://apichecksaude-dmcqhmgcdwcnehez.centralus-01.azurewebsites.net/api/usuarios')
        .then(response => response.json())
        .then(data => {
            const usuario = data[(window.usuarioId = localStorage.getItem('usuarioId')) - 1];
            document.getElementById("cpf").innerText = usuario.cpf
            document.getElementById("rg").innerText = usuario.rg
            document.getElementById("telefone").innerText = usuario.telefone
            document.getElementById("email").innerText = usuario.email;
            document.getElementById("endereco").innerText = usuario.endereco;

            fetch(`https://apichecksaude-dmcqhmgcdwcnehez.centralus-01.azurewebsites.net/api/convenios`)
                .then(response => response.json())
                .then(data => {
                    const convenio = data.find(u => u.id == usuario.conv)
                    document.getElementById("convenio").innerText = convenio.nome;
                    document.getElementById("convagend").innerText = convenio.nome;

                })
                .catch(error => {
                    console.error('Erro ao buscar convênio:', error);
                });
            fetch('https://apichecksaude-dmcqhmgcdwcnehez.centralus-01.azurewebsites.net/api/agendamentos')
                .then(response => response.json())
                .then(data => {
                    const agendamento = data.find(u => u.usuario == usuario.id)
                    document.getElementById("codagend").innerText = agendamento.id
                    document.getElementById("exameagend").innerText = agendamento.exame
                    document.getElementById("datagend").innerText = agendamento.data
                    fetch(`https://apichecksaude-dmcqhmgcdwcnehez.centralus-01.azurewebsites.net/api/hospitais`)
                        .then(response => response.json())
                        .then(data => {
                            const hospital = data.find(u => u.id == agendamento.hospital)
                            document.getElementById("hospagend").innerText = hospital.nome;
                        })
                        .catch(error => {
                            console.error('Erro ao buscar hospital:', error);
                        });
                })
                .catch(error => {
                    console.error('Erro ao consumir a API:', error);
                });
        })
        .catch(error => {
            console.error('Erro ao consumir a API:', error);
        });
}

window.addEventListener('DOMContentLoaded', (event) => {
    carregarUsuario();
    // carregarAgendamentos();
});
