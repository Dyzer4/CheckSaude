const url = 'https://apichecksaude-dmcqhmgcdwcnehez.centralus-01.azurewebsites.net/api/usuarios';
let btncad = document.getElementById("btn-cadastro")


btncad.addEventListener("click", function (event) {
    event.preventDefault();

    let nomecompleto = document.getElementById("nomecompleto").value
    let cpf = document.getElementById("cpf").value
    let rg = document.getElementById("rg").value
    let telefone = document.getElementById("telefone").value
    let endereco = document.getElementById("endereço").value
    let email = document.getElementById("email").value
    let senha = document.getElementById("senha").value
    let convenio = document.getElementById("convenio").value
    let dtanasc = document.getElementById("dtanasc").value

    console.log(nomecompleto, cpf, rg, telefone, endereco, email, senha, convenio, dtanasc)

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nomeCompleto: nomecompleto,
            cpfUsuario: cpf,
            rgUsuario: rg,
            enderecoUsuario: endereco,
            telefoneUsuario: telefone,
            emailUsuario: email,
            senha: senha,
            idConvenio: convenio,
            dtaNascimento: dtanasc
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro HTTP! status: ${response.status}`);
            }
            return response.json(); // Converte a resposta em JSON
        })
        .then(data => {
            window.location.href = '/index.html';
        })
        .catch(error => {
            alert('Erro ao enviar dados:', error);
        });
})


