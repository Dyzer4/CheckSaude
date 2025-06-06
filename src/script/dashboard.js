const usuarioId = localStorage.getItem('usuarioId');
let cpf = document.getElementById("cpf")
let rg = document.getElementById("rg")
let convenio = document.getElementById("convenio")
let telefone = document.getElementById("telefone")
let email = document.getElementById("email")
let endereco = document.getElementById("endereço")
console.log(usuarioId)

function carregarUsuario(id){
    fetch(`https://apichecksaude-dmcqhmgcdwcnehez.centralus-01.azurewebsites.net/api/usuarios/${id}`)
    .then(response => {
    if (!response.ok) {
      throw new Error(`Erro HTTP! Status: ${response.status}`);
    }
    return response.json();
  })
    .then(data => {
        cpf.innerText = data.cpfUsuario
        rg.innerText = data.rgUsuario
        convenio.innerText = data.idConvenio
        telefone.innerText = data.telefoneUsuario
        email.innerText = data.emailUsuario
        endereco.innerText = data.enderecoUsuario
    }

    )
    .catch()
}

window.addEventListener('DOMContentLoaded', () => {
    carregarUsuario(usuarioId);
});
