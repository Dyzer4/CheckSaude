const usuarioId = localStorage.getItem('usuarioId');
let cpf = document.getElementById("cpf")
let rg = document.getElementById("rg")
let convenio = document.getElementById("convenio")
let telefone = document.getElementById("telefone")
let email = document.getElementById("email")
let endereco = document.getElementById("endereco")

function carregarUsuario(id) {
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
      telefone.innerText = data.telefoneUsuario
      email.innerText = data.emailUsuario
      endereco.innerText = data.enderecoUsuario
      let idconvenio = data.idConvenio

      fetch(`https://apichecksaude-dmcqhmgcdwcnehez.centralus-01.azurewebsites.net/api/convenios/${idconvenio}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          convenio.innerText = data.nomeConvenio
        })
        .catch(error => {
          console.error('Erro ao consumir a API:', error);
        })

        fetch(`https://apichecksaude-dmcqhmgcdwcnehez.centralus-01.azurewebsites.net/api/agendamentos`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          convenio.innerText = data.nomeConvenio
        })
        .catch(error => {
          console.error('Erro ao consumir a API:', error);
        })

        

    })
    .catch(error => {
      console.error('Erro ao consumir a API:', error);
    })
}

window.addEventListener('DOMContentLoaded', () => {
  carregarUsuario(usuarioId);
});
