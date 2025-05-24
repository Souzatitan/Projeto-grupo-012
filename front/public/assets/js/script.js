
    // Validação do nome para aceitar apenas letras e espaços
    const inputNome = document.getElementById('name');
    const mensagemErro = document.getElementById('mensagem-erro');

    inputNome.addEventListener('input', () => {
      const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/;

      if (!regex.test(inputNome.value)) {
        mensagemErro.style.display = 'inline'; // Mostra a mensagem de erro
        inputNome.value = inputNome.value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, ''); // Remove caracteres inválidos
      } else {
        mensagemErro.style.display = 'none'; // Esconde a mensagem de erro
      }
    });

    // Adicionando evento de envio do formulário
    document.getElementById('commentForm').addEventListener('submit', function (e) {
      e.preventDefault();

      // Captura de valores
      const name = document.getElementById('name').value.trim();
      const comment = document.getElementById('comment').value.trim();

      // Verificação de campos obrigatórios
      if (!name || !comment) {
        alert('Por favor, preencha todos os campos.');
        return;
      }

      // Recupera os comentários existentes do localStorage
      const comments = JSON.parse(localStorage.getItem('comments')) || [];

      // Adiciona o novo comentário no início da lista
      comments.unshift({ name, comment });

      // Limita a quantidade de comentários armazenados no localStorage
      localStorage.setItem('comments', JSON.stringify(comments.slice(0, 4)));

      // Atualiza a exibição dos comentários
      displayComments();

      // Reseta o formulário
      document.getElementById('commentForm').reset();
    });

    // Função para exibir os comentários na tela
    function displayComments() {
      const commentsContainer = document.getElementById('commentsContainer');
      const comments = JSON.parse(localStorage.getItem('comments')) || [];

      commentsContainer.innerHTML = comments
        .map(
          (c) => `
          <div class="comment">
            <strong>${c.name}</strong>
            <p>${c.comment}</p>
          </div>
        `
        )
        .join('');
    }

    // Exibe os comentários ao carregar a página
    displayComments();