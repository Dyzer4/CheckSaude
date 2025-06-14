const usuarioId = localStorage.getItem('usuarioId');
const API_BASE_URL = 'https://apichecksaude-dmcqhmgcdwcnehez.centralus-01.azurewebsites.net/api';

// Referências aos elementos da página
const cpf = document.getElementById('cpf');
const rg = document.getElementById('rg');
const telefone = document.getElementById('telefone');
const email = document.getElementById('email');
const endereco = document.getElementById('endereco');
const convenio = document.getElementById('convenio');
const exameAgendado = document.getElementById('exameagend');
const dataAgendamento = document.getElementById('datagend');
const hospitalAgendamento = document.getElementById('hospagend');
const convenioAgendamento = document.getElementById('convagend');
const erroMsg = document.getElementById('erro');
const agendamentoContent = document.querySelector('.agendamento-content');

// Função para buscar dados da API
const buscarDados = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
    }
    return await response.json();
};

// Carrega dados do usuário, convênio e último agendamento
const carregarDadosUsuario = async () => {
    try {
        const usuario = await buscarDados(`${API_BASE_URL}/usuarios/${usuarioId}`);
        preencherDadosUsuario(usuario);

        const convenioData = await buscarDados(`${API_BASE_URL}/convenios/${usuario.idConvenio}`);
        convenio.innerText = convenioData.nomeConvenio;
        convenioAgendamento.innerText = convenioData.nomeConvenio;

        const agendamentos = await buscarDados(`${API_BASE_URL}/agendamentos`);
        const agendamentosUsuario = agendamentos.filter(a => a.idUsuario == usuarioId);

        if (agendamentosUsuario.length === 0) {
            erroMsg.textContent = 'Nenhum agendamento realizado!';
            agendamentoContent.style.display = 'none';
        } else {
            preencherUltimoAgendamento(agendamentosUsuario.at(-1));
        }

    } catch (erro) {
        console.error('Erro ao carregar dados:', erro);
    }
};

// Preenche os dados do usuário na tela
const preencherDadosUsuario = (usuario) => {
    cpf.innerText = usuario.cpfUsuario;
    rg.innerText = usuario.rgUsuario;
    telefone.innerText = usuario.telefoneUsuario;
    email.innerText = usuario.emailUsuario;
    endereco.innerText = usuario.enderecoUsuario;
};

// Preenche os dados do último agendamento
const preencherUltimoAgendamento = async (agendamento) => {
    try {
        exameAgendado.innerText = agendamento.nomeExame;
        dataAgendamento.innerText = agendamento.dataExame;

        const hospital = await buscarDados(`${API_BASE_URL}/hospitais/${agendamento.idHospitais}`);
        hospitalAgendamento.innerText = hospital.nomeHospital;

        erroMsg.style.display = 'none';
    } catch (erro) {
        console.error('Erro ao buscar hospital do agendamento:', erro);
    }
};

// Inicia carregamento ao abrir a página
window.addEventListener('DOMContentLoaded', carregarDadosUsuario);
