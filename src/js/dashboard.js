const usuarioId = localStorage.getItem('usuarioId');
const api = "https://apichecksaude-dmcqhmgcdwcnehez.centralus-01.azurewebsites.net/api"
let cpf = document.getElementById("cpf")
let rg = document.getElementById("rg")
let convenio = document.getElementById("convenio")
let telefone = document.getElementById("telefone")
let email = document.getElementById("email")
let endereco = document.getElementById("endereco")

let codagend = document.getElementById("codagend")
let exameagend = document.getElementById("exameagend")
let datagend = document.getElementById("datagend")
let hospagend = document.getElementById("hospagend")
let convagend = document.getElementById("convagend")

function carregarUsuario(id, api) {
  fetch(`${api}/usuarios/${id}`)
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


      fetch(`${api}/convenios/${idconvenio}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          convenio.innerText = data.nomeConvenio
          convagend.innerText = data.nomeConvenio
        })
        .catch(error => {
          console.error('Erro ao consumir a API:', error);
        })

      fetch(`${api}/agendamentos`)
        .then(response => response.json())
        .then(data => {

          const agendamento = data.filter(data => data.idUsuario == usuarioId);

          if (agendamento.length == 0) {
            document.getElementById('erro').textContent = 'Nenhum agendamento realizado!';
            document.querySelector(".agendamento-content").style.display = "none";
          } else {
            codagend.innerText = agendamento[agendamento.length - 1].idAgendamento
            exameagend.innerText = agendamento[agendamento.length - 1].nomeExame
            datagend.innerText = agendamento[agendamento.length - 1].dataExame
            hospagend.innerText = agendamento[agendamento.length - 1].idHospitais
            convagend.innerText = agendamento[agendamento.length - 1].idConvenio
            document.getElementById('erro').style.display = "none";

            fetch(`${api}/hospitais/${agendamento[agendamento.length - 1].idHospitais}`)
              .then(response => {
                if (!response.ok) {
                  throw new Error(`Erro HTTP! Status: ${response.status}`);
                }
                return response.json();
              })
              .then(data => {
                hospagend.innerText = data.nomeHospital
              })
              .catch(error => {
                console.error('Erro ao consumir a API:', error);
              })
          }
        })
        .catch(error => {
          console.error('Erro ao buscar convênio:', error);
        });
    })
    .catch(error => {
      console.error('Erro ao consumir a API:', error);
    })
}

window.addEventListener('DOMContentLoaded', () => {
  carregarUsuario(usuarioId, api);
});
