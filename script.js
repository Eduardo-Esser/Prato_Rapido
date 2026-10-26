/* ===========================================================
   PRATO RÁPIDO — script.js (Versão 2)
   Um único arquivo para o portal. Cada bloco só roda se os
   elementos existirem na página.
   Sumário:
   1. Utilitários e armazenamento (localStorage)
   2. Controles das receitas: favoritar, "funcionou pra mim",
      estrelas e anotação (cards e página da receita)
   3. receitas.html: busca, filtros e indicador
   4. receita.html: página montada a partir dos dados,
      com carrossel de fotos
   5. contato.html: validação, contador e foto do prato
   =========================================================== */
'use strict';

/* ---------- 1. Utilitários e armazenamento ---------- */

// Tira acentos e deixa minúsculo: "Ovo" e "óvo" passam a ser iguais na busca.
function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

const CATEGORIAS = {
  cafe: 'Café da manhã',
  principais: 'Pratos principais',
  lanches: 'Lanches',
  sobremesas: 'Sobremesas',
};

const CHAVE = 'pratoRapido.v1';
const estadoPadrao = () => ({
  favoritas: {},
  usei: {},
  estrelas: {},
  notas: {},
});

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

/* ---------- 2. Controles das receitas ---------- */

// "raiz" é qualquer elemento com data-receita="id": um card ou a página da receita.
function pintarControles(raiz) {
  const id = raiz.dataset.receita;

  const favorito = raiz.querySelector('[data-acao="favoritar"]');
  if (favorito) {
    const ativo = Boolean(estado.favoritas[id]);
    const icone = favorito.querySelector('.fav-icon') || favorito; // no card o próprio botão é o ícone
    favorito.setAttribute('aria-pressed', String(ativo));
    favorito.classList.toggle('is-on', ativo);
    icone.textContent = ativo ? '♥' : '♡';
  }

  const usei = raiz.querySelector('.used-btn');
  if (usei) {
    const ativo = Boolean(estado.usei[id]);
    usei.setAttribute('aria-pressed', String(ativo));
    usei.classList.toggle('is-on', ativo);
  }

  const nota = estado.estrelas[id] || 0;
  raiz.querySelectorAll('.star').forEach((estrela) => {
    const valor = Number(estrela.dataset.valor);
    estrela.textContent = valor <= nota ? '★' : '☆';
    estrela.classList.toggle('is-on', valor <= nota);
    estrela.setAttribute('aria-pressed', String(valor === nota));
  });
}

// Reinicia a animação do botão "Funcionou pra mim" a cada clique.
function animar(botao) {
  botao.classList.remove('animar');
  void botao.offsetWidth; // força o navegador a recalcular, para a animação rodar de novo
  botao.classList.add('animar');
}

let aplicarFiltros = null; // definida em iniciarReceitas()

// Um único "ouvinte" de clique cuida de todos os botões das receitas.
document.addEventListener('click', (evento) => {
  const botao = evento.target.closest('[data-acao]');
  if (!botao) return;

  const raiz = botao.closest('[data-receita]');
  if (!raiz) return;
  const id = raiz.dataset.receita;

  switch (botao.dataset.acao) {
    case 'favoritar':
      estado.favoritas[id] = !estado.favoritas[id];
      break;

    case 'usei':
      estado.usei[id] = !estado.usei[id];
      if (estado.usei[id]) animar(botao);
      break;

    case 'estrela': {
      const valor = Number(botao.dataset.valor);
      // clicar de novo na mesma estrela remove a avaliação
      estado.estrelas[id] = estado.estrelas[id] === valor ? 0 : valor;
      break;
    }

    case 'salvar-nota': {
      const texto = raiz.querySelector('.note-box textarea').value.trim();
      const aviso = raiz.querySelector('.note-status');
      if (texto) {
        estado.notas[id] = texto;
        aviso.textContent = 'Anotação salva neste navegador.';
      } else {
        delete estado.notas[id];
        aviso.textContent = 'Anotação vazia: nada foi salvo.';
      }
      break;
    }

    case 'apagar-nota': {
      delete estado.notas[id];
      raiz.querySelector('.note-box textarea').value = '';
      raiz.querySelector('.note-status').textContent = 'Anotação apagada.';
      break;
    }
  }

  salvarEstado();
  pintarControles(raiz);
  if (aplicarFiltros) aplicarFiltros(); // se "Favoritas" estiver ativo, o card some ao desfavoritar
});

/* ---------- 3. receitas.html: busca, filtros e indicador ---------- */

const cards = [...document.querySelectorAll('.recipe')];

if (cards.length > 0) {
  iniciarReceitas();
}

function iniciarReceitas() {
  const filtro = {
    categoria: 'todas',
    busca: '',
    favoritas: false,
    usei: false,
  };

  cards.forEach(pintarControles);

  // Texto usado na busca: nome + ingredientes (calculado uma vez só).
  const indice = new Map(
    cards.map((card) => {
      const receita = RECEITAS.find((r) => r.id === card.id);
      const ingredientes = receita.grupos
        .flatMap((g) => g.itens.map((i) => i.texto))
        .join(' ');
      return [card, normalizar(`${receita.nome} ${ingredientes}`)];
    }),
  );

  const campoBusca = document.getElementById('busca');
  const indicador = document.getElementById('indicador');
  const mensagemVazia = document.getElementById('vazio');

  aplicarFiltros = function () {
    const termo = normalizar(filtro.busca);
    let visiveis = 0;
    let somaTempo = 0;

    cards.forEach((card) => {
      const passaCategoria =
        filtro.categoria === 'todas' ||
        card.dataset.categoria === filtro.categoria;
      const passaBusca = termo === '' || indice.get(card).includes(termo);
      const passaFavorita = !filtro.favoritas || estado.favoritas[card.id];
      const passaUsei = !filtro.usei || estado.usei[card.id];

      const mostrar =
        passaCategoria && passaBusca && passaFavorita && passaUsei;
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
        ? `Mostrando ${visiveis} de ${cards.length} receitas · tempo médio: ${Math.round(somaTempo / visiveis)} min`
        : `Mostrando 0 de ${cards.length} receitas`;
  };

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

/* ---------- 4. receita.html: página montada a partir dos dados ---------- */

// ONDE FICA O VÍDEO DA RECEITA (mude aqui para comparar):
//   'secao'     -> bloco "Vídeo" próprio, depois do modo de preparo
//   'carrossel' -> último slide do carrossel de fotos
const VIDEO_LOCAL = 'secao';

// true: mostra o espaço do vídeo mesmo nas receitas que ainda não têm vídeo
// (útil para avaliar o layout). Quando decidirem, mude para false.
const MOSTRAR_VIDEO_VAZIO = true;

const raizDetalhe = document.getElementById('receita-root');

if (raizDetalhe) {
  iniciarDetalhe();
}

function iniciarDetalhe() {
  const id = new URLSearchParams(location.search).get('id');
  const receita = RECEITAS.find((r) => r.id === id);

  if (!receita) {
    raizDetalhe.innerHTML =
      '<h1>Receita não encontrada</h1><p><a href="receitas.html">Voltar para todas as receitas</a></p>';
    return;
  }

  document.title = `${receita.nome} — Prato Rápido`;
  raizDetalhe.dataset.receita = receita.id;
  raizDetalhe.innerHTML = montarReceita(receita);

  raizDetalhe.querySelector('.note-box textarea').value =
    estado.notas[receita.id] || '';
  pintarControles(raizDetalhe);
  iniciarCarrossel(raizDetalhe.querySelector('.carousel'));
}

// Aceita o link inteiro do YouTube (watch?v=, youtu.be/, shorts/, embed/) ou só o código do vídeo.
function idDoVideo(texto) {
  const valor = (texto || '').trim();
  const achado = valor.match(
    /(?:v=|youtu\.be\/|embed\/|shorts\/)([A-Za-z0-9_-]{11})/,
  );
  return achado ? achado[1] : valor;
}

// Vídeo: começa só com a capa e o botão de play ("facade"). O player do YouTube
// só é carregado quando o visitante clica, o que deixa a página mais leve.
function capaVideo(id, titulo) {
  return `<button type="button" class="video-facade" aria-label="Assistir ao vídeo: ${titulo}"
    style="background-image: url('https://i.ytimg.com/vi/${id}/hqdefault.jpg')"></button>`;
}

function blocoVideo(r) {
  const id = idDoVideo(r.video);
  if (id) {
    return `<div class="video-wrap" data-video="${id}" data-titulo="${r.nome}">${capaVideo(id, r.nome)}</div>`;
  }
  if (MOSTRAR_VIDEO_VAZIO) {
    return `<div class="video-wrap video-placeholder"><span aria-hidden="true">▶</span><p>O vídeo desta receita chega em breve.</p></div>`;
  }
  return '';
}

// Volta o player para a capa (usado quando o visitante troca de slide).
function resetarVideo(bloco) {
  if (bloco && bloco.querySelector('iframe')) {
    bloco.innerHTML = capaVideo(bloco.dataset.video, bloco.dataset.titulo);
  }
}

// Clique na capa: troca a capa pelo player do YouTube.
document.addEventListener('click', (evento) => {
  const capa = evento.target.closest('.video-facade');
  if (!capa) return;
  const bloco = capa.parentElement;
  bloco.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${bloco.dataset.video}?autoplay=1&rel=0"
    title="Vídeo: ${bloco.dataset.titulo}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
});

// Monta o HTML de cada parte da página.
function montarReceita(r) {
  const estrelas = [1, 2, 3, 4, 5]
    .map(
      (n) =>
        `<button type="button" class="star" data-acao="estrela" data-valor="${n}" aria-pressed="false" aria-label="${n} estrela${n > 1 ? 's' : ''}">☆</button>`,
    )
    .join('');

  const grupos = r.grupos
    .map((grupo) => {
      const itens = grupo.itens
        .map((item) => {
          const figura = item.imagem
            ? `<img src="${item.imagem}" alt="" width="56" height="56">`
            : `<span aria-hidden="true">${item.icone}</span>`;
          return `<li class="ingredient"><span class="ingredient-icon">${figura}</span><span>${item.texto}</span></li>`;
        })
        .join('');
      const titulo = grupo.titulo ? `<h3>${grupo.titulo}</h3>` : '';
      return `${titulo}<ul class="ingredients">${itens}</ul>`;
    })
    .join('');

  const utensilios = r.utensilios
    .map((u) => `<li><span aria-hidden="true">${u.icone}</span> ${u.nome}</li>`)
    .join('');

  const passos = r.preparo.map((p) => `<li>${p}</li>`).join('');

  // Vídeo: no carrossel (último slide) ou em uma seção própria.
  const video = blocoVideo(r);
  const videoNoCarrossel = VIDEO_LOCAL === 'carrossel' && video !== '';
  const videoNaSecao = VIDEO_LOCAL === 'secao' && video !== '';

  const slides =
    r.fotos
      .map(
        (foto, i) =>
          `<div class="carousel-slide"><img src="${foto}" alt="${r.nome}, foto ${i + 1} de ${r.fotos.length}" width="800" height="600"></div>`,
      )
      .join('') +
    (videoNoCarrossel
      ? `<div class="carousel-slide carousel-video">${video}</div>`
      : '');

  const pontos =
    r.fotos
      .map(
        (_, i) =>
          `<button type="button" class="carousel-dot" data-ponto="${i}" aria-label="Ir para a foto ${i + 1}"></button>`,
      )
      .join('') +
    (videoNoCarrossel
      ? `<button type="button" class="carousel-dot is-video" data-ponto="${r.fotos.length}" aria-label="Ir para o vídeo">▶</button>`
      : '');

  const atalhoVideo =
    videoNaSecao && idDoVideo(r.video)
      ? `<a class="btn-sm" href="#video">▶ Ver vídeo</a>`
      : '';

  return `
    <div class="detail-hero">
      <div class="carousel" role="region" aria-roledescription="carrossel" aria-label="Fotos de ${r.nome}" tabindex="0">
        <div class="carousel-track">${slides}</div>
        <button type="button" class="carousel-btn prev" data-carrossel="anterior" aria-label="Anterior">‹</button>
        <button type="button" class="carousel-btn next" data-carrossel="proxima" aria-label="Próximo">›</button>
        <div class="carousel-dots">${pontos}</div>
      </div>

      <div class="detail-info">
        <p class="detail-category">${CATEGORIAS[r.categoria]}</p>
        <h1>${r.nome}</h1>
        <p class="detail-desc">${r.desc}</p>
        <ul class="meta">
          <li>${r.tempo} min</li>
          <li>${r.dificuldade}</li>
          <li>${r.porcoes}</li>
        </ul>
        <div class="stars" role="group" aria-label="Avaliar ${r.nome}">${estrelas}</div>
        <div class="card-footer">
          <button type="button" class="used-btn" data-acao="usei" aria-pressed="false">Funcionou pra mim</button>
          <button type="button" class="fav-pill" data-acao="favoritar" aria-pressed="false"><span class="fav-icon" aria-hidden="true">♡</span> Favoritar</button>
          ${atalhoVideo}
        </div>
      </div>
    </div>

    <section class="detail-section" aria-labelledby="ing-titulo">
      <h2 id="ing-titulo">Ingredientes <small>(${r.porcoes})</small></h2>
      ${grupos}
    </section>

    <section class="detail-section" aria-labelledby="ut-titulo">
      <h2 id="ut-titulo">Utensílios</h2>
      <ul class="utensils">${utensilios}</ul>
    </section>

    <section class="detail-section" aria-labelledby="prep-titulo">
      <h2 id="prep-titulo">Modo de preparo</h2>
      <ol class="steps">${passos}</ol>
    </section>

    ${
      videoNaSecao
        ? `<section class="detail-section" id="video" aria-labelledby="video-titulo">
             <h2 id="video-titulo">Vídeo</h2>
             ${video}
           </section>`
        : ''
    }

    <section class="detail-section note-box" aria-labelledby="nota-titulo">
      <h2 id="nota-titulo">Minha anotação</h2>
      <label for="nota-texto" class="visually-hidden">Sua anotação sobre ${r.nome}</label>
      <textarea id="nota-texto" maxlength="300" rows="4" placeholder="${r.dicaNota || 'Ex.: usei menos açúcar e ficou ótimo'}"></textarea>
      <div class="note-actions">
        <button type="button" class="btn" data-acao="salvar-nota">Salvar anotação</button>
        <button type="button" class="link-btn" data-acao="apagar-nota">Apagar</button>
        <span class="note-status" role="status"></span>
      </div>
    </section>`;
}

// Carrossel: move a "faixa" de slides (fotos e, se for o caso, o vídeo) com translateX.
function iniciarCarrossel(carrossel) {
  const trilho = carrossel.querySelector('.carousel-track');
  const slides = carrossel.querySelectorAll('.carousel-slide');
  const pontos = carrossel.querySelectorAll('.carousel-dot');
  let atual = 0;

  // Com um slide só, não há o que navegar: esconde os controles.
  if (slides.length < 2) {
    carrossel.classList.add('is-single');
    carrossel.removeAttribute('tabindex');
    return;
  }

  function ir(indice) {
    atual = (indice + slides.length) % slides.length; // volta ao início/fim
    trilho.style.transform = `translateX(-${atual * 100}%)`;
    pontos.forEach((ponto, i) =>
      ponto.setAttribute('aria-current', String(i === atual)),
    );
    slides.forEach((slide, i) => {
      const ativo = i === atual;
      slide.setAttribute('aria-hidden', String(!ativo));
      slide.inert = !ativo; // slides fora da tela não recebem foco do teclado
      if (!ativo) resetarVideo(slide.querySelector('.video-wrap')); // para o vídeo ao sair do slide
    });
  }

  carrossel
    .querySelector('[data-carrossel="anterior"]')
    .addEventListener('click', () => ir(atual - 1));
  carrossel
    .querySelector('[data-carrossel="proxima"]')
    .addEventListener('click', () => ir(atual + 1));
  pontos.forEach((ponto) =>
    ponto.addEventListener('click', () => ir(Number(ponto.dataset.ponto))),
  );

  carrossel.addEventListener('keydown', (evento) => {
    if (evento.key === 'ArrowLeft') ir(atual - 1);
    if (evento.key === 'ArrowRight') ir(atual + 1);
  });

  // Arrastar com o dedo no celular.
  let inicioX = null;
  carrossel.addEventListener(
    'touchstart',
    (e) => {
      inicioX = e.touches[0].clientX;
    },
    { passive: true },
  );
  carrossel.addEventListener('touchend', (e) => {
    if (inicioX === null) return;
    const diferenca = e.changedTouches[0].clientX - inicioX;
    if (Math.abs(diferenca) > 40) ir(diferenca < 0 ? atual + 1 : atual - 1);
    inicioX = null;
  });

  ir(0);
}

/* ---------- 5. Página de contato ---------- */

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
    email: (valor) =>
      !valor
        ? 'Informe seu e-mail.'
        : !emailValido.test(valor)
          ? 'E-mail inválido.'
          : '',
    receita: (valor) => (valor.length < 2 ? 'Informe o nome da receita.' : ''),
    mensagem: (valor) =>
      valor.length < 10
        ? 'Conte os ingredientes e o preparo (mínimo de 10 caracteres).'
        : '',
    foto: () => {
      const arquivo = campos.foto.files[0];
      if (!arquivo) return ''; // a foto é opcional
      if (!TIPOS_ACEITOS.includes(arquivo.type))
        return 'Escolha uma imagem JPG, PNG ou WebP.';
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
    if (imagemPrevia.src.startsWith('blob:'))
      URL.revokeObjectURL(imagemPrevia.src);
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
