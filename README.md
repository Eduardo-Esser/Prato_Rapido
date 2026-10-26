# Prato Rápido

Portal de receitas simples e rápidas para quem tem pouco tempo e está começando
a cozinhar. Cada receita mostra, logo de cara, o tempo de preparo, a dificuldade
e o rendimento, com ingredientes e modo de preparo a um clique.

O projeto é o **trabalho individual de tema livre** da disciplina de
Desenvolvimento Web I. A **Versão 1** foi feita somente com HTML e CSS. A
**Versão 2** (atual) acrescenta as interações com JavaScript e amplia o
conteúdo para 16 receitas.

## Justificativa do tema

Cozinhar em casa é uma habilidade útil, mas muitas receitas online são longas e
cheias de passos. Um portal com receitas curtas, bem organizadas e com o tempo
sempre visível ajuda quem tem pouco tempo ou pouca experiência. O tema também
rende conteúdo suficiente para várias páginas e combina bem com listas, cards,
filtros e formulários.

## Objetivo

Reunir receitas simples, organizadas por categoria, para que o visitante
encontre rapidamente o que preparar e consiga fazer a receita do início ao fim.

## Público-alvo

Estudantes e jovens adultos (cerca de 16 a 30 anos) que cozinham pouco e buscam
praticidade.

## Mapa das páginas

```text
Prato Rápido
├── index.html      Início: apresentação, receitas em destaque, categorias e dica
├── receitas.html   Todas as receitas, organizadas por categoria
├── receita.html    Página completa de uma receita (receita.html?id=...)
└── contato.html    Formulário "Sugira uma receita" e informações do projeto
```

## Descrição das páginas

| Página          | Conteúdo                                                                                                                                                                                                                                                                                                                          |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `index.html`    | Apresentação do portal, 6 receitas em destaque, lista de categorias com links e uma dica rápida de cozinha.                                                                                                                                                                                                                       |
| `receitas.html` | 16 receitas em 4 categorias (café da manhã, pratos principais, lanches e sobremesas), 4 por categoria. Cada card tem imagem, tempo, dificuldade, rendimento, favoritar, estrelas, "funcionou pra mim" e o link para a receita completa. A página tem busca, filtros e indicador.                                                  |
| `receita.html`  | Página de uma receita, montada com JavaScript a partir de `receitas-data.js` (o endereço traz o `id`, por exemplo `receita.html?id=panqueca-banana`). Mostra carrossel de fotos, vídeo (quando houver), ingredientes com ícones, utensílios, modo de preparo, estrelas, "funcionou pra mim", favoritar e a anotação do visitante. |
| `contato.html`  | Formulário para sugerir uma receita (nome, e-mail, receita, categoria, dificuldade, mensagem e foto do prato pronto) e uma seção sobre o projeto e a autoria.                                                                                                                                                                     |

## Wireframes

Os wireframes de cada página (desktop) e da versão mobile estão no diretório
`docs/`:

- [Início](./docs/wireframe-index.png);
- [Receitas](./docs/wireframe-receitas.png);
- [Contato](./docs/wireframe-contato.png);
- [Mobile](./docs/wireframe-mobile.png).

## Funcionalidades implementadas na Versão 2

Os dados das receitas estão em `assets/js/receitas-data.js` e todo o JavaScript em `assets/js/script.js`.

| Funcionalidade                | Página                           | Elementos envolvidos                                                           | Ação do usuário                                 | Comportamento                                                                                                                                                | Contribuição para o portal                                 |
| ----------------------------- | -------------------------------- | ------------------------------------------------------------------------------ | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------- |
| Favoritar receita             | `receitas.html` e `receita.html` | Coração no card e botão "Favoritar" na receita                                 | Clicar                                          | Marca ou desmarca a receita e salva no `localStorage`                                                                                                        | Permite guardar as receitas preferidas e filtrá-las depois |
| "Funcionou pra mim"           | `receitas.html` e `receita.html` | Botão pequeno que fica verde, com animação                                     | Clicar                                          | Marca que o visitante já fez a receita e deu certo; fica salvo                                                                                               | Registro pessoal do que já foi testado                     |
| Avaliação com 5 estrelas      | `receitas.html` e `receita.html` | Cinco botões de estrela                                                        | Clicar em uma estrela (de novo na mesma remove) | Pinta as estrelas até a nota escolhida e salva                                                                                                               | Ajuda a lembrar quais receitas foram as melhores           |
| Anotação pessoal              | `receita.html`                   | Campo de texto e botões "Salvar anotação" e "Apagar"                           | Digitar e clicar em salvar                      | Guarda o texto (até 300 caracteres) no navegador e o mostra de novo na próxima visita                                                                        | Permite anotar adaptações e ajustes                        |
| Página de receita dinâmica    | `receita.html`                   | `receitas-data.js`, parâmetro `id` do endereço e `innerHTML`                   | Clicar em "Ver receita"                         | Monta a página da receita escolhida (ingredientes com ícones, utensílios e passos)                                                                           | Uma única página atende todas as receitas                  |
| Carrossel de fotos            | `receita.html`                   | Faixa de fotos, botões, pontos e teclado                                       | Clicar nas setas, nos pontos ou arrastar        | Troca a foto exibida; sem controles quando há uma foto só                                                                                                    | Mostra o prato por mais de um ângulo                       |
| Vídeo da receita              | `receita.html`                   | Campo `video` dos dados, capa com botão de play e `VIDEO_LOCAL` no `script.js` | Clicar na capa                                  | Carrega o player do YouTube só no clique; o vídeo fica em uma seção própria ou no último slide do carrossel (configurável); sem vídeo, mostra um aviso       | Complementa o passo a passo                                |
| Busca por nome ou ingrediente | `receitas.html`                  | Campo de busca e cards                                                         | Digitar no campo                                | Mostra só as receitas que contêm o texto, ignorando acentos e maiúsculas                                                                                     | Acha uma receita específica rapidamente                    |
| Filtros                       | `receitas.html`                  | Botões de categoria, "Favoritas" e "Funcionou pra mim"                         | Clicar nos botões                               | Mostra só as receitas que combinam com os filtros ativos e esconde seções vazias                                                                             | Ajuda a encontrar o tipo de receita desejado               |
| Indicador da lista            | `receitas.html`                  | Texto de resumo e atributos `data-tempo`                                       | Filtrar ou buscar                               | Atualiza "Mostrando X de 16 receitas · tempo médio: Y min"                                                                                                   | Dá retorno imediato sobre o resultado                      |
| Validação, contador e foto    | `contato.html`                   | Campos do formulário, contador e campo de arquivo                              | Preencher, anexar a foto e enviar               | Valida os campos, mostra erros, conta os caracteres (limite de 500), confere tipo e tamanho da foto (JPG, PNG ou WebP, até 2 MB) e mostra a pré-visualização | Orienta o preenchimento e evita envios incompletos         |

Observações:

- favoritos, "funcionou pra mim", estrelas e notas ficam salvos apenas no
  navegador do visitante (`localStorage`);
- como não há back-end, o envio do formulário é simulado: aparece a confirmação,
  mas os dados e a foto não são enviados a nenhum servidor.

### Ideias para versões futuras

- Fotos reais para os ingredientes (hoje são ícones emoji);
- Ordenar as receitas por tempo de preparo;
- Checklist de ingredientes ("o que eu já tenho em casa");
- Timer de cozinha em cada receita;
- Ajuste de porções;
- Modo claro/escuro.

## Tecnologias e ferramentas

- HTML5 semântico (`header`, `nav`, `main`, `section`, `article`, `aside` e
  `footer`);
- CSS3 com Flexbox, variáveis CSS e media queries;
- JavaScript (eventos, manipulação do DOM, validação de formulário e `localStorage`);
- Google Fonts (Bricolage Grotesque e DM Sans);
- EditorConfig;
- Prettier;
- Visual Studio Code.

## Estrutura do projeto

```text
prato-rapido/
├── assets/
│   ├── css/
│   │   └── global.css
│   ├── images/
│   │   └── *.jpg
│   └── js/
│       ├── receitas-data.js
│       └── script.js
├── docs/
│   └── wireframe-*.png
├── index.html
├── receitas.html
├── receita.html
├── contato.html
├── LICENSE
└── README.md
```

## Executar o projeto

Abra o arquivo `index.html` utilizando a extensão Live Server do Visual Studio
Code.

Também é possível abrir o arquivo `index.html` diretamente no navegador. Não há
dependências nem etapa de instalação.

## Link da aplicação publicada

[Preencher com o link do GitHub Pages]

## Capturas de tela

[Adicionar as capturas da página inicial, de receitas e de contato, em desktop e
celular]

## Documentação

- [Guia de padronização do código](./docs/guia-padronizacao-codigo.md):
  explica as configurações utilizadas pelo projeto;
- [Como criar um repositório-base](./docs/criar-repositorio-base.md):
  apresenta como o template deste projeto foi estruturado.

Os materiais didáticos de HTML e CSS estão disponíveis no repositório
[Fundamentos de Desenvolvimento Web I](https://github.com/ifc-dev-web2/rc-web1-fundamentos).

## Referências

- Receitas: preparos tradicionais e simples, revisados pelo estudante.
  [Listar aqui as fontes realmente consultadas];
- Imagens: ilustrações vetoriais criadas para o projeto com apoio de IA
  (Claude), salvas em `assets/images/` (JPG) e `assets/images/svg/` (originais
  editáveis). [Se trocar por fotos, indicar a origem e a licença de cada uma];
- Fontes tipográficas: [Google Fonts](https://fonts.google.com/), licença Open
  Font License;
- Apoio de IA (Claude, da Anthropic) para sugestões de estrutura, revisão de
  código e esclarecimento de dúvidas. O desenvolvimento e a compreensão do
  projeto são do estudante.

## Contexto acadêmico

| Informação  | Descrição                                         |
| ----------- | ------------------------------------------------- |
| Instituição | Instituto Federal Catarinense — Campus Araquari   |
| Curso       | Técnico em Redes de Computadores                  |
| Disciplina  | Desenvolvimento Web I                             |
| Organização | [IFC Dev Web II](https://github.com/ifc-dev-web2) |

## Autoria

Projeto desenvolvido por **[Seu nome completo]** durante as atividades de
Desenvolvimento Web I.

Template elaborado pelo
[Prof. Cristofer Sousa](https://github.com/cristofersousa).

## Licença

Este projeto está disponível sob os termos definidos no arquivo
[LICENSE](./LICENSE).
