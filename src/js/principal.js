const API_BASE_URL = 'https://apichecksaude-dmcqhmgcdwcnehez.centralus-01.azurewebsites.net/api';
const usuarioId = localStorage.getItem('usuarioId');

const nomeUsuario = document.getElementById('nome');
const convenioNome = document.getElementById('convenio');
const btnLogoff = document.getElementById('btn-logoff');
let foto = document.getElementById("foto")

const buscarDados = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Erro ao acessar: ${url} | Status: ${response.status}`);
    }
    return await response.json();
};

const carregarUsuario = async (id) => {
    if (!id) {
        window.location.href = '/index.html';
        return;
    }

    try {
        const usuario = await buscarDados(`${API_BASE_URL}/usuarios/${id}`);
        const urlImagem = `http://localhost:8080/api/usuarios/${usuarioId}/foto`;
        foto.style.width = "200px"

        document.getElementById("foto").src = urlImagem;
        nomeUsuario.innerText = usuario.nomeCompleto;

        const convenio = await buscarDados(`${API_BASE_URL}/convenios/${usuario.idConvenio}`);
        convenioNome.innerText = convenio.nomeConvenio;

    } catch (erro) {
        console.error('Erro ao carregar dados do usuário:', erro);
    }
};

const realizarLogoff = () => {
    localStorage.removeItem('usuarioId');
    window.location.href = '/index.html';
};

window.addEventListener('DOMContentLoaded', () => {
    carregarUsuario(usuarioId);
});

btnLogoff.addEventListener('click', realizarLogoff);
