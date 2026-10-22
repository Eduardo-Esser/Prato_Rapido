# Prato Rápido

Portal de receitas simples e rápidas para quem tem pouco tempo e está começando
a cozinhar. Cada receita mostra, logo de cara, o tempo de preparo, a dificuldade
e o rendimento, com ingredientes e modo de preparo a um clique.

O projeto é o **trabalho individual de tema livre** da disciplina de
Desenvolvimento Web I. A **Versão 1** (atual) utiliza somente HTML e CSS. As
interações com JavaScript estão planejadas para a **Versão 2**.

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
└── contato.html    Formulário "Sugira uma receita" e informações do projeto
```

## Descrição das páginas

| Página          | Conteúdo                                                                                                                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `index.html`    | Apresentação do portal, 3 receitas em destaque, lista de categorias com links e uma dica rápida de cozinha.                                                                                 |
| `receitas.html` | 8 receitas em 4 categorias (café da manhã, pratos principais, lanches e sobremesas). Cada card tem imagem, tempo, dificuldade, rendimento, ingredientes e modo de preparo.                  |
| `contato.html`  | Formulário para sugerir uma receita (nome, e-mail, receita, categoria, dificuldade e mensagem) e uma seção sobre o projeto e a autoria.                                                     |

## Wireframes

Os wireframes de cada página (desktop) e da versão mobile estão no diretório
`docs/`:

- [Início](./docs/wireframe-index.png);
- [Receitas](./docs/wireframe-receitas.png);
- [Contato](./docs/wireframe-contato.png);
- [Mobile](./docs/wireframe-mobile.png).

## Funcionalidades planejadas para a Versão 2

| Funcionalidade | Página | Elementos envolvidos | Ação do usuário | Comportamento esperado | Contribuição para o portal |
| --- | --- | --- | --- | --- | --- |
| Filtro por categoria | `receitas.html` | Atributos `data-categoria` dos cards e botões de categoria | Clicar em uma categoria | Mostrar apenas as receitas da categoria escolhida e permitir voltar a ver todas | Ajuda o visitante a encontrar o tipo de receita que procura |
| Busca por nome | `receitas.html` | Campo de busca e cards de receita | Digitar no campo de busca | Ocultar as receitas que não contêm o texto digitado e avisar quando nada for encontrado | Permite achar uma receita específica rapidamente |
| Indicador da lista | `receitas.html` | Texto de resumo e atributos `data-tempo` | Filtrar ou buscar | Atualizar um texto como "Mostrando 5 de 8 receitas · tempo médio: 12 min" | Dá retorno imediato sobre o resultado do filtro |
| Validação do formulário e contador de caracteres | `contato.html` | Campos do formulário, mensagens de erro e contador da mensagem | Preencher e enviar o formulário | Validar nome, e-mail e mensagem, mostrar erros por campo, contar os caracteres (limite de 500) e confirmar o envio | Orienta o preenchimento e evita envios incompletos |
| Modo claro/escuro (opcional) | Todas | Botão no cabeçalho, classe no `body` e `localStorage` | Clicar no botão | Alternar o tema e lembrar a escolha nas próximas visitas | Melhora o conforto de leitura |

O planejamento poderá mudar durante o desenvolvimento, e este README será
atualizado quando isso acontecer.

## Tecnologias e ferramentas

- HTML5 semântico (`header`, `nav`, `main`, `section`, `article`, `aside` e
  `footer`);
- CSS3 com Flexbox, variáveis CSS e media queries;
- JavaScript (a partir da Versão 2);
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
│   └── images/
│       ├── svg/
│       └── *.jpg
├── docs/
│   └── wireframe-*.png
├── index.html
├── receitas.html
├── contato.html
├── LICENSE
└── README.md
```

O diretório `assets/js/` será criado na Versão 2, com o arquivo `script.js`.

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

| Informação  | Descrição                                           |
| ----------- | --------------------------------------------------- |
| Instituição | Instituto Federal Catarinense — Campus Araquari     |
| Curso       | Técnico em Redes de Computadores                    |
| Disciplina  | Desenvolvimento Web I                               |
| Organização | [IFC Dev Web II](https://github.com/ifc-dev-web2)   |

## Autoria

Projeto desenvolvido por **[Seu nome completo]** durante as atividades de
Desenvolvimento Web I.

Template elaborado pelo
[Prof. Cristofer Sousa](https://github.com/cristofersousa).

## Licença

Este projeto está disponível sob os termos definidos no arquivo
[LICENSE](./LICENSE).
