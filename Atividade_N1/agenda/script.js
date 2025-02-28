document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('agendamentoForm');
    const listaEventos = document.getElementById('listaEventos');
  
    // Carregar eventos ao iniciar
    carregarEventos();
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
  
      // Coletar dados do formulário
      const nome = document.getElementById('nome').value.trim();
      const email = document.getElementById('email').value.trim();
      const data = document.getElementById('data').value;
      const horario = document.getElementById('horario').value;
      const descricao = document.getElementById('descricao').value.trim();
  
      // Validações
      if (!nome || !email || !data || !horario || !descricao) {
        alert('Por favor, preencha todos os campos.');
        return;
      }
  
      if (!validarEmail(email)) {
        alert('Por favor, insira um e-mail válido.');
        return;
      }
  
      if (!validarData(data)) {
        alert('Por favor, insira uma data futura.');
        return;
      }
  
      // Criar objeto do evento
      const evento = {
        id: Date.now(),
        nome,
        email,
        data,
        horario,
        descricao
      };
  
      // Salvar evento no JSON
      salvarEvento(evento);
  
      // Limpar formulário
      form.reset();
  
      // Atualizar lista de eventos
      carregarEventos();
    });
  
    // Função para validar e-mail
    function validarEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }
  
    // Função para validar data (futura)
    function validarData(data) {
      const hoje = new Date().toISOString().split('T')[0];
      return data >= hoje;
    }
  
    // Função para salvar evento no localStorage
    function salvarEvento(evento) {
      let eventos = JSON.parse(localStorage.getItem('eventos')) || [];
      eventos.push(evento);
      localStorage.setItem('eventos', JSON.stringify(eventos));
    }
  
    // Função para carregar e exibir eventos
    function carregarEventos() {
      listaEventos.innerHTML = '';
      const eventos = JSON.parse(localStorage.getItem('eventos')) || [];
  
      // Agrupar eventos por data
      const eventosPorData = eventos.reduce((acc, evento) => {
        const data = evento.data;
        if (!acc[data]) {
          acc[data] = [];
        }
        acc[data].push(evento);
        return acc;
      }, {});
  
      // Ordenar as datas
      const datasOrdenadas = Object.keys(eventosPorData).sort();
  
      // Exibir eventos agrupados por data
      datasOrdenadas.forEach(data => {
        const eventosDaData = eventosPorData[data];
  
        // Criar um título para a data (formato compacto)
        const tituloData = document.createElement('h3');
        tituloData.textContent = new Date(data).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
        tituloData.classList.add('titulo-data');
        listaEventos.appendChild(tituloData);
  
        // Adicionar eventos da data
        eventosDaData.forEach(evento => {
          const item = document.createElement('li');
          item.innerHTML = `
            <strong>${evento.descricao}</strong><br>
            <small>${evento.horario}</small>
            <div class="acoes">
              <button onclick="editarEvento(${evento.id})">✏️</button>
              <button onclick="excluirEvento(${evento.id})">🗑️</button>
            </div>
          `;
          listaEventos.appendChild(item);
        });
      });
    }
  
    // Função para editar evento
    window.editarEvento = function (id) {
      const eventos = JSON.parse(localStorage.getItem('eventos')) || [];
      const evento = eventos.find(e => e.id === id);
  
      if (evento) {
        // Preencher formulário com os dados do evento
        document.getElementById('nome').value = evento.nome;
        document.getElementById('email').value = evento.email;
        document.getElementById('data').value = evento.data;
        document.getElementById('horario').value = evento.horario;
        document.getElementById('descricao').value = evento.descricao;
  
        // Remover o evento antigo
        excluirEvento(id);
      }
    };
  
    // Função para excluir evento
    window.excluirEvento = function (id) {
      let eventos = JSON.parse(localStorage.getItem('eventos')) || [];
      eventos = eventos.filter(e => e.id !== id);
      localStorage.setItem('eventos', JSON.stringify(eventos));
      carregarEventos();
    };
  });