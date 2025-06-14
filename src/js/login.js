const btnLogin = document.getElementById('btn-login');
const btnCadastro = document.getElementById('btn-cad');
const API_BASE_URL = 'https://apichecksaude-dmcqhmgcdwcnehez.centralus-01.azurewebsites.net/api';
const mensagem = document.getElementById('mensagem');

const realizarLogin = async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value.trim();

  if (!email || !senha) {
    mensagem.textContent = 'Preencha todos os campos.';
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/usuarios/login?email=${encodeURIComponent(email)}&senha=${encodeURIComponent(senha)}`);

    if (!response.ok) {
      throw new Error('Erro ao conectar com o servidor');
    }

    const usuario = await response.json();

    if (usuario?.id) {
      localStorage.setItem('usuarioId', usuario.id);
      window.location.href = './src/pages/principal';
    } else {
      mensagem.textContent = 'E-mail ou senha incorretos!';
    }
  } catch (erro) {
    mensagem.textContent = 'Erro ao conectar com o servidor!';
    console.error(erro);
  }
};

const redirecionarParaCadastro = () => {
  window.location.href = './src/pages/cadastro/';
};

btnLogin.addEventListener('click', realizarLogin);
btnCadastro.addEventListener('click', redirecionarParaCadastro);
