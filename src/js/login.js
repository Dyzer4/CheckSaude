document.getElementById('loginForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value.trim();
  const api = "https://apichecksaude-dmcqhmgcdwcnehez.centralus-01.azurewebsites.net/api"

  try {
    const response = await fetch(`${api}/usuarios/login?email=${encodeURIComponent(email)}&senha=${encodeURIComponent(senha)}`, {
      method: 'GET'
    });

    if (!response.ok) {
      throw new Error('Erro ao conectar com o servidor');
    }

    const usuario = await response.json();
    console.log(usuario)

    if (usuario && usuario.id) {
      window.usuarioId = localStorage.setItem('usuarioId', usuario.id);
      window.location.href = './src/pages/principal';
    } else {
      document.getElementById('mensagem').textContent = 'E-mail ou senha incorretos!';
    }
  } catch (error) {
    document.getElementById('mensagem').textContent = 'Erro ao conectar com o servidor!';
    console.error(error);
  }
});

  