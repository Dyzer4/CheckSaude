const url = 'https://apichecksaude-dmcqhmgcdwcnehez.centralus-01.azurewebsites.net/api/agendamentos'; 
const usuarioId = localStorage.getItem('usuarioId');
let btnagend = document.getElementById("btn-agend")


btnagend.addEventListener("click", function(event) {
    event.preventDefault();

    let exame = document.getElementById("exame").value
    let hospital = document.getElementById("hospital").value
    let dataagend = document.getElementById("dataagend").value
    let horaagend = document.getElementById("horaagend").value
    let convenio = document.getElementById("convenio").value

    console.log(exame, hospital, dataagend, `${horaagend}:00`, convenio)

    fetch(url, {
    method: 'POST', 
    headers: {
        'Content-Type': 'application/json' 
    },
    body: JSON.stringify({
    dataExame: dataagend,
    nomeExame: exame,
    idHospitais: Number(hospital),
    idUsuario: Number(usuarioId),
    idConvenio: Number(convenio),
    horaExame: `${horaagend}:00`
})
})
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro HTTP! status: ${response.status}`);
        }
        return response.json(); // Converte a resposta em JSON
    })
    .then(data => {
        window.location.href = '/src/pages/dashboard/';
    })
    .catch(error => {
        alert('Erro ao enviar dados:', error);
    });
})


