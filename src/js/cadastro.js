const API_URL = 'https://apichecksaude-dmcqhmgcdwcnehez.centralus-01.azurewebsites.net/api/usuarios';
const btnCadastro = document.getElementById('btn-cadastro');

// Função para obter os dados do formulário
const obterDadosFormulario = () => {
    return {
        nomeCompleto: document.getElementById('nomecompleto').value.trim(),
        cpfUsuario: document.getElementById('cpf').value.trim(),
        rgUsuario: document.getElementById('rg').value.trim(),
        telefoneUsuario: document.getElementById('telefone').value.trim(),
        enderecoUsuario: document.getElementById('endereço').value.trim(),
        emailUsuario: document.getElementById('email').value.trim(),
        senha: document.getElementById('senha').value.trim(),
        idConvenio: Number(document.getElementById('convenio').value),
        dtaNascimento: document.getElementById('dtanasc').value
    };
};

// Função para enviar os dados para a API
const cadastrarUsuario = async (dadosUsuario) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosUsuario)
    });

    if (!response.ok) {
        throw new Error(`Erro ao cadastrar. Status: ${response.status}`);
    }

    return await response.json();
};

// Evento de clique no botão de cadastro
btnCadastro.addEventListener('click', async (event) => {
    event.preventDefault();

    const dadosUsuario = obterDadosFormulario();
    console.log('Enviando dados:', dadosUsuario);

    try {
        await cadastrarUsuario(dadosUsuario);
        window.location.href = '/index.html';
    } catch (erro) {
        alert('Erro ao enviar dados. Verifique os campos e tente novamente.');
        console.error(erro);
    }
});
