async function carregarUsuario() {
    try {
        const responseUsuario = await fetch('https://apichecksaude-dmcqhmgcdwcnehez.centralus-01.azurewebsites.net/api/usuarios');
        const usuarios = await responseUsuario.json();

        const usuarioId = localStorage.getItem('usuarioId');
        const usuario = usuarios[usuarioId - 1];

        document.getElementById("cpf").innerText = usuario.cpf;
        document.getElementById("rg").innerText = usuario.rg;
        document.getElementById("telefone").innerText = usuario.telefone;
        document.getElementById("email").innerText = usuario.email;
        document.getElementById("endereco").innerText = usuario.endereco;

        try {
            const responseConvenios = await fetch('https://apichecksaude-dmcqhmgcdwcnehez.centralus-01.azurewebsites.net/api/convenios');
            const convenios = await responseConvenios.json();
            const convenio = convenios.find(u => u.id == usuario.conv);

            document.getElementById("convenio").innerText = convenio.nome;
            document.getElementById("convagend").innerText = convenio.nome;
        } catch (error) {
            console.error('Erro ao buscar convênio:', error);
        }

        try {
            const responseAgendamentos = await fetch('https://apichecksaude-dmcqhmgcdwcnehez.centralus-01.azurewebsites.net/api/agendamentos');
            const agendamentos = await responseAgendamentos.json();
            const agendamento = agendamentos.find(u => u.usuario == usuario.id);

            document.getElementById("codagend").innerText = agendamento.id;
            document.getElementById("exameagend").innerText = agendamento.exame;
            document.getElementById("datagend").innerText = agendamento.data;

            try {
                const responseHospitais = await fetch('https://apichecksaude-dmcqhmgcdwcnehez.centralus-01.azurewebsites.net/api/hospitais');
                const hospitais = await responseHospitais.json();
                const hospital = hospitais.find(u => u.id == agendamento.hospital);

                document.getElementById("hospagend").innerText = hospital.nome;
            } catch (error) {
                console.error('Erro ao buscar hospital:', error);
            }
        } catch (error) {
            console.error('Erro ao buscar agendamento:', error);
        }

    } catch (error) {
        console.error('Erro ao consumir a API de usuários:', error);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    carregarUsuario();
});
