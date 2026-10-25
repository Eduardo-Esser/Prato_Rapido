/* ===========================================================
   PRATO RÁPIDO — script.js (Versão 2)
   Um único arquivo para o portal. Cada bloco só roda se os
   elementos existirem na página.
   Sumário:
   1. Utilitários e armazenamento (localStorage)
   2. Receitas: favoritar, "funcionou pra mim", estrelas e notas
   3. Receitas: busca, filtros e indicador
   4. Contato: validação, contador e foto do prato
   =========================================================== */
'use strict';

/* ---------- 1. Utilitários e armazenamento ---------- */

// Tira acentos e deixa minúsculo: "Ovo" e "óvo" passam a ser iguais na busca.
function normalizar(texto) {
  return texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
}

const CHAVE = 'pratoRapido.v1';
const estadoPadrao = () => ({ favoritas: {}, usei: {}, estrelas: {}, notas: {} });

// Lê o que o visitante já salvou. Se não houver nada (ou der erro), começa vazio.
function carregarEstado() {
  try {
    return { ...estadoPadrao(), ...JSON.parse(localStorage.getItem(CHAVE)) };
  } catch (erro) {
    return estadoPadrao();
  }
}

const estado = carregarEstado();

function salvarEstado() {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(estado));
  } catch (erro) {
    /* sem localStorage (modo privado, por exemplo): o site segue funcionando */
  }
}

/* ---------- 2 e 3. Página de receitas ---------- */

const receitas = [...document.querySelectorAll('.recipe')];

if (receitas.length > 0) {
  iniciarReceitas();
}

function iniciarReceitas() {
  const filtro = { categoria: 'todas', busca: '', favoritas: false, usei: false };

  // Texto usado na busca: nome + ingredientes (calculado uma vez só).
  const indice = new Map(
    receitas.map((card) => [
      card,
      normalizar(card.querySelector('h3').textContent + ' ' + card.querySelector('.recipe-steps ul').textContent),
    ])
  );

  /* --- desenhar o estado salvo em cada card --- */

  function pintarFavorito(card) {
    const botao = card.querySelector('.fav-btn');
    const ativo = Boolean(estado.favoritas[card.id]);
    botao.setAttribute('aria-pressed', String(ativo));
    botao.classList.toggle('is-on', ativo);
    botao.textContent = ativo ? '♥' : '♡';
  }

  function pintarUsei(card) {
    const botao = card.querySelector('.used-btn');
    const ativo = Boolean(estado.usei[card.id]);
    botao.setAttribute('aria-pressed', String(ativo));
    botao.classList.toggle('is-on', ativo);
  }

  function pintarEstrelas(card) {
    const nota = estado.estrelas[card.id] || 0;
    card.querySelectorAll('.star').forEach((estrela) => {
      const valor = Number(estrela.dataset.valor);
      estrela.textContent = valor <= nota ? '★' : '☆';
      estrela.classList.toggle('is-on', valor <= nota);
      estrela.setAttribute('aria-pressed', String(valor === nota));
    });
  }

  function pintarNota(card) {
    const texto = estado.notas[card.id] || '';
    card.querySelector('.note-panel textarea').value = texto;
    card.querySelector('.note-toggle').textContent = texto ? 'Ver ou editar nota' : 'Adicionar nota';
  }

  receitas.forEach((card) => {
    pintarFavorito(card);
    pintarUsei(card);
    pintarEstrelas(card);
    pintarNota(card);
  });

  /* --- cliques nos botões dos cards (um único "ouvinte" para todos) --- */

  document.addEventListener('click', (evento) => {
    const botao = evento.target.closest('[data-acao]');
    if (!botao) return;

    const card = botao.closest('.recipe');
    const id = card.id;

    switch (botao.dataset.acao) {
      case 'favoritar':
        estado.favoritas[id] = !estado.favoritas[id];
        pintarFavorito(card);
        break;

      case 'usei':
        estado.usei[id] = !estado.usei[id];
        pintarUsei(card);
        break;

      case 'estrela': {
        const valor = Number(botao.dataset.valor);
        // clicar de novo na mesma estrela remove a avaliação
        estado.estrelas[id] = estado.estrelas[id] === valor ? 0 : valor;
        pintarEstrelas(card);
        break;
      }

      case 'nota': {
        const painel = card.querySelector('.note-panel');
        painel.hidden = !painel.hidden;
        botao.setAttribute('aria-expanded', String(!painel.hidden));
        if (!painel.hidden) painel.querySelector('textarea').focus();
        break;
      }
    }

    salvarEstado();
    aplicarFiltros(); // se "Favoritas" estiver ativo, o card some ao desfavoritar
  });

  // Salva a nota enquanto o visitante digita.
  document.addEventListener('input', (evento) => {
    if (!evento.target.matches('.note-panel textarea')) return;

    const card = evento.target.closest('.recipe');
    const texto = evento.target.value.trim();

    if (texto) {
      estado.notas[card.id] = evento.target.value;
    } else {
      delete estado.notas[card.id];
    }
    salvarEstado();

    card.querySelector('.note-status').textContent = 'Nota salva neste navegador.';
    card.querySelector('.note-toggle').textContent = texto ? 'Ver ou editar nota' : 'Adicionar nota';
  });

  /* --- busca, filtros e indicador --- */

  const campoBusca = document.getElementById('busca');
  const indicador = document.getElementById('indicador');
  const mensagemVazia = document.getElementById('vazio');

  function aplicarFiltros() {
    const termo = normalizar(filtro.busca);
    let visiveis = 0;
    let somaTempo = 0;

    receitas.forEach((card) => {
      const passaCategoria = filtro.categoria === 'todas' || card.dataset.categoria === filtro.categoria;
      const passaBusca = termo === '' || indice.get(card).includes(termo);
      const passaFavorita = !filtro.favoritas || estado.favoritas[card.id];
      const passaUsei = !filtro.usei || estado.usei[card.id];

      const mostrar = passaCategoria && passaBusca && passaFavorita && passaUsei;
      card.closest('li').hidden = !mostrar;

      if (mostrar) {
        visiveis++;
        somaTempo += Number(card.dataset.tempo);
      }
    });

    // esconde a seção inteira quando nenhum card dela aparece
    document.querySelectorAll('.category-block').forEach((secao) => {
      secao.hidden = !secao.querySelector('li.card:not([hidden])');
    });

    mensagemVazia.hidden = visiveis > 0;
    indicador.textContent =
      visiveis > 0
        ? `Mostrando ${visiveis} de ${receitas.length} receitas · tempo médio: ${Math.round(somaTempo / visiveis)} min`
        : `Mostrando 0 de ${receitas.length} receitas`;
  }

  campoBusca.addEventListener('input', () => {
    filtro.busca = campoBusca.value;
    aplicarFiltros();
  });

  // Chips de categoria: só um fica ativo por vez.
  document.querySelectorAll('[data-filtro]').forEach((chip) => {
    chip.addEventListener('click', () => {
      filtro.categoria = chip.dataset.filtro;
      document.querySelectorAll('[data-filtro]').forEach((outro) => {
        outro.setAttribute('aria-pressed', String(outro === chip));
      });
      aplicarFiltros();
    });
  });

  // Chips "Favoritas" e "Funcionou pra mim": ligam e desligam.
  document.querySelectorAll('[data-toggle]').forEach((chip) => {
    chip.addEventListener('click', () => {
      const chave = chip.dataset.toggle === 'favoritas' ? 'favoritas' : 'usei';
      filtro[chave] = !filtro[chave];
      chip.setAttribute('aria-pressed', String(filtro[chave]));
      aplicarFiltros();
    });
  });

  aplicarFiltros();
}

/* ---------- 4. Página de contato ---------- */

const formulario = document.getElementById('contact-form');

if (formulario) {
  iniciarContato();
}

function iniciarContato() {
  const campos = {
    nome: document.getElementById('nome'),
    email: document.getElementById('email'),
    receita: document.getElementById('receita'),
    mensagem: document.getElementById('mensagem'),
    foto: document.getElementById('foto'),
  };
  const contador = document.getElementById('contador');
  const retorno = document.getElementById('contact-feedback');
  const previa = document.getElementById('foto-preview');
  const imagemPrevia = document.getElementById('foto-img');
  const botaoRemover = document.getElementById('foto-remover');

  const TIPOS_ACEITOS = ['image/jpeg', 'image/png', 'image/webp'];
  const TAMANHO_MAXIMO = 2 * 1024 * 1024; // 2 MB
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  /* mostra ou remove a mensagem de erro de um campo */
  function mostrarErro(campo, mensagem) {
    const caixa = campo.closest('.field');
    let erro = caixa.querySelector('.field-error');

    if (!mensagem) {
      campo.removeAttribute('aria-invalid');
      campo.removeAttribute('aria-describedby');
      if (erro) erro.remove();
      return;
    }
    if (!erro) {
      erro = document.createElement('p');
      erro.className = 'field-error';
      erro.id = `${campo.id}-erro`;
      caixa.appendChild(erro);
    }
    erro.textContent = mensagem;
    campo.setAttribute('aria-invalid', 'true');
    campo.setAttribute('aria-describedby', erro.id);
  }

  /* regras de cada campo: devolvem o texto do erro ou '' se estiver certo */
  const regras = {
    nome: (valor) => (valor.length < 2 ? 'Informe seu nome.' : ''),
    email: (valor) => (!valor ? 'Informe seu e-mail.' : !emailValido.test(valor) ? 'E-mail inválido.' : ''),
    receita: (valor) => (valor.length < 2 ? 'Informe o nome da receita.' : ''),
    mensagem: (valor) => (valor.length < 10 ? 'Conte os ingredientes e o preparo (mínimo de 10 caracteres).' : ''),
    foto: () => {
      const arquivo = campos.foto.files[0];
      if (!arquivo) return ''; // a foto é opcional
      if (!TIPOS_ACEITOS.includes(arquivo.type)) return 'Escolha uma imagem JPG, PNG ou WebP.';
      if (arquivo.size > TAMANHO_MAXIMO) return 'A imagem deve ter até 2 MB.';
      return '';
    },
  };

  /* valida todos os campos e devolve o primeiro com problema */
  function validar() {
    let primeiroInvalido = null;
    Object.keys(regras).forEach((nome) => {
      const erro = regras[nome](campos[nome].value.trim());
      mostrarErro(campos[nome], erro);
      if (erro && !primeiroInvalido) primeiroInvalido = campos[nome];
    });
    return primeiroInvalido;
  }

  /* contador de caracteres da mensagem */
  campos.mensagem.addEventListener('input', () => {
    contador.textContent = campos.mensagem.value.length;
  });

  /* o erro some quando o visitante volta a digitar */
  ['nome', 'email', 'receita', 'mensagem'].forEach((nome) => {
    campos[nome].addEventListener('input', () => mostrarErro(campos[nome], ''));
  });

  /* foto: valida e mostra a pré-visualização */
  function limparPrevia() {
    if (imagemPrevia.src.startsWith('blob:')) URL.revokeObjectURL(imagemPrevia.src);
    imagemPrevia.removeAttribute('src');
    previa.hidden = true;
  }

  campos.foto.addEventListener('change', () => {
    limparPrevia();
    const erro = regras.foto();
    mostrarErro(campos.foto, erro);

    if (!erro && campos.foto.files[0]) {
      imagemPrevia.src = URL.createObjectURL(campos.foto.files[0]);
      previa.hidden = false;
    }
  });

  botaoRemover.addEventListener('click', () => {
    campos.foto.value = '';
    mostrarErro(campos.foto, '');
    limparPrevia();
  });

  /* envio do formulário */
  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const invalido = validar();
    if (invalido) {
      retorno.textContent = 'Corrija os campos destacados.';
      retorno.classList.add('is-error');
      invalido.focus();
      return;
    }

    // Não há back-end nesta versão: aqui entraria um fetch() enviando os dados.
    const temFoto = Boolean(campos.foto.files[0]);
    const nome = campos.nome.value.trim();
    const receita = campos.receita.value.trim();

    formulario.reset();
    limparPrevia();
    contador.textContent = '0';

    retorno.classList.remove('is-error');
    retorno.textContent = `Obrigado, ${nome}! Recebemos a sua receita "${receita}"${temFoto ? ', com a foto' : ''}.`;
  });
}
