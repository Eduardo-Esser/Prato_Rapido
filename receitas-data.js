/* ===========================================================
   PRATO RÁPIDO — receitas-data.js
   Dados das receitas usados pela página receita.html e pela
   busca em receitas.html.

   Como acrescentar conteúdo a uma receita:
   - fotos:  lista de caminhos das imagens, escritos por inteiro a
             partir da pasta do projeto, ex.: 'assets/images/panqueca.jpg'
             (o carrossel aparece quando há 2 ou mais fotos);
   - video:  link do vídeo do YouTube ou só o código dele (a parte
             depois de "v=" no endereço, ex.: 'dQw4w9WgXcQ'). Deixe '' enquanto não
             houver vídeo. O lugar onde ele aparece (seção própria ou
             carrossel) é escolhido em script.js, em VIDEO_LOCAL;
   - dicaNota: texto de exemplo (placeholder) do campo de
             anotação. Escreva algo que ajude o visitante a
             lembrar o que anotar nessa receita;
   - itens:  "icone" é um emoji. Para usar uma foto no lugar,
             coloque o caminho completo em "imagem"
             (ex.: 'assets/images/ovo.png').
   =========================================================== */
const RECEITAS = [
  {
    id: 'panqueca-banana',
    nome: 'Panqueca de banana',
    categoria: 'cafe',
    tempo: 10,
    dificuldade: 'Fácil',
    porcoes: '2 porções',
    desc: 'Três ingredientes, uma frigideira e nenhuma farinha de trigo.',
    fotos: [
      'img/panqueca.webp',
      'assets/images/panqueca-banana-2.jpg',
      'assets/images/panqueca-banana-3.jpg',
    ],
    video: 'https://www.youtube.com/watch?v=Km5E02lFPWg',
    grupos: [
      {
        titulo: '',
        itens: [
          {
            texto: '1 banana madura',
            icone: '🍌',
            imagem: '',
          },
          {
            texto: '2 ovos',
            icone: '🥚',
            imagem: '',
          },
          {
            texto: '4 colheres (sopa) de aveia em flocos',
            icone: '🌾',
            imagem: '',
          },
          {
            texto: '1 pitada de canela (opcional)',
            icone: '🍂',
            imagem: '',
          },
          {
            texto: 'Óleo ou manteiga para untar',
            icone: '🧈',
            imagem: '',
          },
        ],
      },
    ],
    utensilios: [
      {
        icone: '🍳',
        nome: 'Frigideira antiaderente',
      },
      {
        icone: '🥣',
        nome: 'Tigela',
      },
      {
        icone: '🍴',
        nome: 'Garfo',
      },
      {
        icone: '🥄',
        nome: 'Concha',
      },
    ],
    preparo: [
      'Amasse a banana com um garfo até virar um purê.',
      'Misture os ovos, a aveia e a canela.',
      'Unte a frigideira e aqueça em fogo baixo.',
      'Coloque uma concha da massa e deixe cerca de 2 minutos de cada lado.',
    ],
    dicaNota:
      'Ex.: usei banana bem madura e nem precisei de açúcar. Virei quando as bordas soltaram. Da próxima vez, com mel por cima!',
  },
  {
    id: 'ovos-mexidos',
    nome: 'Ovos mexidos cremosos',
    categoria: 'cafe',
    tempo: 8,
    dificuldade: 'Fácil',
    porcoes: '1 porção',
    desc: 'O segredo é o fogo baixo e mexer devagar.',
    fotos: [
      'assets/images/ovos-mexidos.jpg',
      'assets/images/ovos-mexidos-2.jpg',
    ],
    video: '',
    grupos: [
      {
        titulo: '',
        itens: [
          {
            texto: '2 ovos',
            icone: '🥚',
            imagem: '',
          },
          {
            texto: '1 colher (chá) de manteiga',
            icone: '🧈',
            imagem: '',
          },
          {
            texto: '1 colher (sopa) de leite',
            icone: '🥛',
            imagem: '',
          },
          {
            texto: 'Sal a gosto',
            icone: '🧂',
            imagem: '',
          },
        ],
      },
    ],
    utensilios: [
      {
        icone: '🍳',
        nome: 'Frigideira pequena',
      },
      {
        icone: '🥣',
        nome: 'Tigela',
      },
      {
        icone: '🥄',
        nome: 'Colher de pau',
      },
    ],
    preparo: [
      'Bata os ovos com o leite e o sal.',
      'Derreta a manteiga em fogo baixo.',
      'Despeje os ovos e mexa devagar com uma colher de pau.',
      'Retire do fogo quando ainda estiverem úmidos: eles terminam de cozinhar no calor da panela.',
    ],
    dicaNota:
      'Ex.: tirei do fogo ainda úmido e ficou cremoso. Reduzi o sal. Com torrada, perfeito.',
  },
  {
    id: 'torrada-abacate',
    nome: 'Torrada de abacate',
    categoria: 'cafe',
    tempo: 5,
    dificuldade: 'Fácil',
    porcoes: '1 porção',
    desc: 'Cremosa, crocante e pronta antes do café esfriar.',
    fotos: ['assets/images/torrada-abacate.jpg'],
    video: '',
    grupos: [
      {
        titulo: '',
        itens: [
          {
            texto: '2 fatias de pão',
            icone: '🍞',
            imagem: '',
          },
          {
            texto: '1/2 abacate maduro',
            icone: '🥑',
            imagem: '',
          },
          {
            texto: 'Suco de 1/2 limão',
            icone: '🍋',
            imagem: '',
          },
          {
            texto: 'Sal e pimenta-do-reino a gosto',
            icone: '🌶️',
            imagem: '',
          },
          {
            texto: 'Azeite (opcional)',
            icone: '🧴',
            imagem: '',
          },
        ],
      },
    ],
    utensilios: [
      {
        icone: '🍞',
        nome: 'Torradeira ou frigideira',
      },
      {
        icone: '🍴',
        nome: 'Garfo',
      },
      {
        icone: '🔪',
        nome: 'Faca',
      },
    ],
    preparo: [
      'Toste as fatias de pão.',
      'Amasse o abacate com o limão, o sal e a pimenta.',
      'Espalhe sobre as torradas.',
      'Finalize com um fio de azeite.',
    ],
    dicaNota:
      'Ex.: o abacate pediu mais limão. Pão de fermentação natural deu a melhor crocância.',
  },
  {
    id: 'tapioca-queijo',
    nome: 'Tapioca de queijo',
    categoria: 'cafe',
    tempo: 10,
    dificuldade: 'Fácil',
    porcoes: '1 porção',
    desc: 'Massa de goma, queijo derretido e só uma frigideira.',
    fotos: ['assets/images/tapioca-queijo.jpg'],
    video: '',
    grupos: [
      {
        titulo: '',
        itens: [
          {
            texto: '4 colheres (sopa) de goma de tapioca hidratada',
            icone: '⚪',
            imagem: '',
          },
          {
            texto: '3 colheres (sopa) de queijo ralado ou 2 fatias de queijo',
            icone: '🧀',
            imagem: '',
          },
          {
            texto: '1 pitada de sal',
            icone: '🧂',
            imagem: '',
          },
        ],
      },
    ],
    utensilios: [
      {
        icone: '🍳',
        nome: 'Frigideira antiaderente',
      },
      {
        icone: '🥄',
        nome: 'Peneira ou colher',
      },
      {
        icone: '🥢',
        nome: 'Espátula',
      },
    ],
    preparo: [
      'Aqueça uma frigideira antiaderente em fogo médio.',
      'Espalhe a goma formando um disco fino.',
      'Quando firmar e soltar do fundo (cerca de 1 minuto), coloque o queijo em uma metade.',
      'Dobre ao meio e deixe 1 minuto para o queijo derreter.',
    ],
    dicaNota:
      'Ex.: hidratei a goma 10 minutos antes e ela soltou fácil da frigideira. Com queijo coalho ficou ótima.',
  },
  {
    id: 'macarrao-alho-oleo',
    nome: 'Macarrão alho e óleo',
    categoria: 'principais',
    tempo: 20,
    dificuldade: 'Fácil',
    porcoes: '2 porções',
    desc: 'O clássico de geladeira vazia, pronto no tempo de ferver a água.',
    fotos: ['assets/images/macarrao-alho-oleo.jpg'],
    video: '',
    grupos: [
      {
        titulo: '',
        itens: [
          {
            texto: '200 g de espaguete',
            icone: '🍝',
            imagem: '',
          },
          {
            texto: '4 dentes de alho fatiados',
            icone: '🧄',
            imagem: '',
          },
          {
            texto: '4 colheres (sopa) de azeite',
            icone: '🧴',
            imagem: '',
          },
          {
            texto: 'Sal a gosto',
            icone: '🧂',
            imagem: '',
          },
          {
            texto: 'Pimenta em flocos e salsinha (opcional)',
            icone: '🌶️',
            imagem: '',
          },
        ],
      },
    ],
    utensilios: [
      {
        icone: '🍲',
        nome: 'Panela grande',
      },
      {
        icone: '🍳',
        nome: 'Frigideira',
      },
      {
        icone: '🔪',
        nome: 'Faca e tábua',
      },
      {
        icone: '🥢',
        nome: 'Pegador',
      },
    ],
    preparo: [
      'Cozinhe o macarrão em água com sal até ficar al dente.',
      'Reserve meia xícara da água do cozimento e escorra.',
      'Em fogo baixo, doure o alho no azeite sem deixar queimar.',
      'Junte o macarrão e um pouco da água reservada e misture bem.',
      'Finalize com pimenta e salsinha.',
    ],
    dicaNota:
      'Ex.: o alho dourou rápido, então baixei o fogo. Meia xícara da água do macarrão deixou cremoso. Capricho na pimenta!',
  },
  {
    id: 'frango-limao',
    nome: 'Frango grelhado com limão',
    categoria: 'principais',
    tempo: 25,
    dificuldade: 'Média',
    porcoes: '2 porções',
    desc: 'Filé suculento com tempero simples. Inclui 10 minutos de marinada.',
    fotos: ['assets/images/frango-limao.jpg'],
    video: '',
    grupos: [
      {
        titulo: '',
        itens: [
          {
            texto: '2 filés de peito de frango',
            icone: '🍗',
            imagem: '',
          },
          {
            texto: 'Suco de 1 limão',
            icone: '🍋',
            imagem: '',
          },
          {
            texto: '2 dentes de alho amassados',
            icone: '🧄',
            imagem: '',
          },
          {
            texto: 'Sal a gosto',
            icone: '🧂',
            imagem: '',
          },
          {
            texto: '1 colher (sopa) de azeite',
            icone: '🧴',
            imagem: '',
          },
        ],
      },
    ],
    utensilios: [
      {
        icone: '🍳',
        nome: 'Frigideira ou grelha',
      },
      {
        icone: '🔪',
        nome: 'Faca e tábua',
      },
      {
        icone: '🥣',
        nome: 'Tigela',
      },
    ],
    preparo: [
      'Tempere o frango com limão, alho e sal e deixe descansar por 10 minutos.',
      'Aqueça a frigideira com o azeite em fogo médio.',
      'Grelhe de 5 a 6 minutos de cada lado, até dourar e não haver parte rosada por dentro.',
      'Deixe descansar 2 minutos antes de servir.',
    ],
    dicaNota:
      'Ex.: marinei 20 minutos em vez de 10 e ficou mais saboroso. Grelhei 6 minutos de cada lado e deu o ponto.',
  },
  {
    id: 'omelete-queijo-tomate',
    nome: 'Omelete de queijo e tomate',
    categoria: 'principais',
    tempo: 10,
    dificuldade: 'Fácil',
    porcoes: '1 porção',
    desc: 'Proteína, queijo derretido e um toque fresco de tomate.',
    fotos: ['assets/images/omelete-queijo-tomate.jpg'],
    video: '',
    grupos: [
      {
        titulo: '',
        itens: [
          {
            texto: '2 ovos',
            icone: '🥚',
            imagem: '',
          },
          {
            texto: '1/2 tomate em cubos pequenos',
            icone: '🍅',
            imagem: '',
          },
          {
            texto: '3 colheres (sopa) de queijo ralado',
            icone: '🧀',
            imagem: '',
          },
          {
            texto: 'Sal a gosto',
            icone: '🧂',
            imagem: '',
          },
          {
            texto: '1 colher (chá) de óleo ou manteiga',
            icone: '🧈',
            imagem: '',
          },
        ],
      },
    ],
    utensilios: [
      {
        icone: '🍳',
        nome: 'Frigideira antiaderente',
      },
      {
        icone: '🥣',
        nome: 'Tigela',
      },
      {
        icone: '🍴',
        nome: 'Garfo',
      },
      {
        icone: '🔪',
        nome: 'Faca',
      },
    ],
    preparo: [
      'Bata os ovos com uma pitada de sal.',
      'Aqueça a frigideira untada em fogo médio.',
      'Despeje os ovos e, quando as bordas firmarem, coloque o queijo e o tomate em uma metade.',
      'Dobre ao meio e deixe mais 1 minuto.',
    ],
    dicaNota:
      'Ex.: tirei as sementes do tomate para não soltar água. Fogo médio-baixo e dobrei só no final.',
  },
  {
    id: 'salada-grao-de-bico',
    nome: 'Salada de grão-de-bico',
    categoria: 'principais',
    tempo: 10,
    dificuldade: 'Fácil',
    porcoes: '2 porções',
    desc: 'Refeição fresca de despensa, sem usar o fogão.',
    fotos: ['assets/images/salada-grao-de-bico.jpg'],
    video: '',
    grupos: [
      {
        titulo: '',
        itens: [
          {
            texto: '1 lata (cerca de 300 g) de grão-de-bico',
            icone: '🥜',
            imagem: '',
          },
          {
            texto: '1 tomate em cubos',
            icone: '🍅',
            imagem: '',
          },
          {
            texto: '1/2 pepino em cubos',
            icone: '🥒',
            imagem: '',
          },
          {
            texto: '1/4 de cebola roxa em fatias finas',
            icone: '🧅',
            imagem: '',
          },
          {
            texto: 'Suco de 1/2 limão',
            icone: '🍋',
            imagem: '',
          },
          {
            texto: '2 colheres (sopa) de azeite',
            icone: '🧴',
            imagem: '',
          },
          {
            texto: 'Sal e salsinha a gosto',
            icone: '🧂',
            imagem: '',
          },
        ],
      },
    ],
    utensilios: [
      {
        icone: '🥣',
        nome: 'Tigela grande',
      },
      {
        icone: '🔪',
        nome: 'Faca e tábua',
      },
      {
        icone: '🥄',
        nome: 'Colher',
      },
    ],
    preparo: [
      'Escorra e lave o grão-de-bico.',
      'Misture com o tomate, o pepino e a cebola.',
      'Tempere com limão, azeite e sal.',
      'Finalize com salsinha.',
    ],
    dicaNota:
      'Ex.: lavei bem o grão-de-bico e caprichei no limão. Rendeu duas marmitas para a semana.',
  },
  {
    id: 'sanduiche-natural',
    nome: 'Sanduíche natural',
    categoria: 'lanches',
    tempo: 10,
    dificuldade: 'Fácil',
    porcoes: '2 porções',
    desc: 'Lanche frio e leve para levar na mochila.',
    fotos: ['assets/images/sanduiche-natural.jpg'],
    video: '',
    grupos: [
      {
        titulo: '',
        itens: [
          {
            texto: '4 fatias de pão integral',
            icone: '🍞',
            imagem: '',
          },
          {
            texto: '1 xícara de frango desfiado',
            icone: '🍗',
            imagem: '',
          },
          {
            texto: '2 colheres (sopa) de requeijão',
            icone: '🧀',
            imagem: '',
          },
          {
            texto: '1 cenoura pequena ralada',
            icone: '🥕',
            imagem: '',
          },
          {
            texto: 'Folhas de alface',
            icone: '🥬',
            imagem: '',
          },
        ],
      },
    ],
    utensilios: [
      {
        icone: '🥣',
        nome: 'Tigela',
      },
      {
        icone: '🍴',
        nome: 'Garfo',
      },
      {
        icone: '🔪',
        nome: 'Faca',
      },
    ],
    preparo: [
      'Misture o frango, o requeijão e a cenoura ralada.',
      'Espalhe o recheio em duas fatias de pão.',
      'Cubra com alface e feche com as outras fatias.',
      'Corte ao meio e sirva.',
    ],
    dicaNota:
      'Ex.: usei o frango de ontem e mais requeijão. Levei na mochila e aguentou até o almoço.',
  },
  {
    id: 'quesadilla',
    nome: 'Quesadilla de queijo',
    categoria: 'lanches',
    tempo: 10,
    dificuldade: 'Fácil',
    porcoes: '1 porção',
    desc: 'Crocante por fora, queijo derretido por dentro.',
    fotos: ['assets/images/quesadilla.jpg'],
    video: '',
    grupos: [
      {
        titulo: '',
        itens: [
          {
            texto: '2 tortilhas ou massas de wrap',
            icone: '🌮',
            imagem: '',
          },
          {
            texto: '1 xícara de queijo muçarela ralado',
            icone: '🧀',
            imagem: '',
          },
          {
            texto: '2 colheres (sopa) de milho (opcional)',
            icone: '🌽',
            imagem: '',
          },
        ],
      },
    ],
    utensilios: [
      {
        icone: '🍳',
        nome: 'Frigideira antiaderente',
      },
      {
        icone: '🔪',
        nome: 'Faca',
      },
      {
        icone: '🥢',
        nome: 'Espátula',
      },
    ],
    preparo: [
      'Aqueça uma frigideira antiaderente em fogo médio.',
      'Coloque uma tortilha, espalhe o queijo e o milho.',
      'Cubra com a segunda tortilha.',
      'Doure cerca de 2 minutos de cada lado e corte em fatias.',
    ],
    dicaNota:
      'Ex.: fogo médio-baixo derrete o queijo sem queimar a tortilha. Fiz com milho e orégano.',
  },
  {
    id: 'misto-quente',
    nome: 'Misto quente na frigideira',
    categoria: 'lanches',
    tempo: 8,
    dificuldade: 'Fácil',
    porcoes: '1 porção',
    desc: 'Queijo derretido e pão dourado, sem precisar de sanduicheira.',
    fotos: ['assets/images/misto-quente.jpg'],
    video: '',
    grupos: [
      {
        titulo: '',
        itens: [
          {
            texto: '2 fatias de pão de forma',
            icone: '🍞',
            imagem: '',
          },
          {
            texto: '2 fatias de queijo',
            icone: '🧀',
            imagem: '',
          },
          {
            texto: '1 fatia de presunto',
            icone: '🍖',
            imagem: '',
          },
          {
            texto: '1 colher (chá) de manteiga',
            icone: '🧈',
            imagem: '',
          },
        ],
      },
    ],
    utensilios: [
      {
        icone: '🍳',
        nome: 'Frigideira',
      },
      {
        icone: '🥢',
        nome: 'Espátula',
      },
      {
        icone: '🔪',
        nome: 'Faca',
      },
    ],
    preparo: [
      'Monte o sanduíche com queijo, presunto e mais uma fatia de queijo.',
      'Passe um pouco de manteiga por fora do pão.',
      'Doure na frigideira em fogo médio-baixo, de 2 a 3 minutos de cada lado, até o queijo derreter.',
    ],
    dicaNota:
      'Ex.: manteiga por fora deu a crocância. Fogo baixo e tampei 1 minuto para o queijo derreter.',
  },
  {
    id: 'wrap-frango',
    nome: 'Wrap de frango',
    categoria: 'lanches',
    tempo: 10,
    dificuldade: 'Fácil',
    porcoes: '2 porções',
    desc: 'Recheio cremoso e fresco, enrolado em poucos minutos.',
    fotos: ['assets/images/wrap-frango.jpg'],
    video: '',
    grupos: [
      {
        titulo: '',
        itens: [
          {
            texto: '2 tortilhas',
            icone: '🌮',
            imagem: '',
          },
          {
            texto: '1 xícara de frango desfiado',
            icone: '🍗',
            imagem: '',
          },
          {
            texto: '2 colheres (sopa) de iogurte natural ou requeijão',
            icone: '🧀',
            imagem: '',
          },
          {
            texto: 'Folhas de alface',
            icone: '🥬',
            imagem: '',
          },
          {
            texto: '1/2 tomate em fatias',
            icone: '🍅',
            imagem: '',
          },
        ],
      },
    ],
    utensilios: [
      {
        icone: '🥣',
        nome: 'Tigela',
      },
      {
        icone: '🍴',
        nome: 'Garfo',
      },
      {
        icone: '🔪',
        nome: 'Faca',
      },
    ],
    preparo: [
      'Misture o frango com o iogurte (ou o requeijão).',
      'Espalhe sobre as tortilhas.',
      'Adicione a alface e o tomate.',
      'Enrole bem e corte ao meio.',
    ],
    dicaNota:
      'Ex.: iogurte no lugar do requeijão deixou mais leve. Enrolei bem apertado e embrulhei em papel.',
  },
  {
    id: 'bolo-caneca',
    nome: 'Bolo de caneca de chocolate',
    categoria: 'sobremesas',
    tempo: 5,
    dificuldade: 'Fácil',
    porcoes: '1 porção',
    desc: 'Sobremesa no micro-ondas, direto na caneca.',
    fotos: ['assets/images/bolo-caneca.jpg'],
    video: '',
    grupos: [
      {
        titulo: '',
        itens: [
          {
            texto: '4 colheres (sopa) de farinha de trigo',
            icone: '🌾',
            imagem: '',
          },
          {
            texto: '3 colheres (sopa) de açúcar',
            icone: '🍬',
            imagem: '',
          },
          {
            texto: '2 colheres (sopa) de chocolate em pó',
            icone: '🍫',
            imagem: '',
          },
          {
            texto: '1 ovo',
            icone: '🥚',
            imagem: '',
          },
          {
            texto: '3 colheres (sopa) de leite',
            icone: '🥛',
            imagem: '',
          },
          {
            texto: '2 colheres (sopa) de óleo',
            icone: '🧴',
            imagem: '',
          },
          {
            texto: '1 colher (chá) de fermento',
            icone: '🥄',
            imagem: '',
          },
        ],
      },
    ],
    utensilios: [
      {
        icone: '☕',
        nome: 'Caneca grande',
      },
      {
        icone: '🍴',
        nome: 'Garfo',
      },
      {
        icone: '⏲️',
        nome: 'Micro-ondas',
      },
    ],
    preparo: [
      'Em uma caneca grande, misture os ingredientes secos.',
      'Adicione o ovo, o leite e o óleo e mexa até ficar liso.',
      'Leve ao micro-ondas por cerca de 1 minuto e 30 segundos. O tempo varia conforme o aparelho.',
      'Espere esfriar um pouco antes de comer.',
    ],
    dicaNota:
      'Ex.: meu micro-ondas precisou de 1 min 20 s. Coloquei uma colher de doce de leite no meio. Dividi com um amigo.',
  },
  {
    id: 'mousse-maracuja',
    nome: 'Mousse de maracujá',
    categoria: 'sobremesas',
    tempo: 10,
    dificuldade: 'Fácil',
    porcoes: '4 porções',
    desc: 'Três ingredientes no liquidificador. Precisa de 2 horas na geladeira.',
    fotos: ['assets/images/mousse-maracuja.jpg'],
    video: '',
    grupos: [
      {
        titulo: '',
        itens: [
          {
            texto: '1 lata de leite condensado',
            icone: '🥫',
            imagem: '',
          },
          {
            texto: '1 lata (medida da lata) de creme de leite',
            icone: '🥛',
            imagem: '',
          },
          {
            texto: '1/2 xícara de suco concentrado de maracujá',
            icone: '🍊',
            imagem: '',
          },
        ],
      },
    ],
    utensilios: [
      {
        icone: '🥤',
        nome: 'Liquidificador',
      },
      {
        icone: '🍨',
        nome: 'Taças ou copinhos',
      },
      {
        icone: '🥄',
        nome: 'Colher',
      },
    ],
    preparo: [
      'Bata todos os ingredientes no liquidificador por 1 minuto.',
      'Distribua em taças ou copinhos.',
      'Leve à geladeira por pelo menos 2 horas antes de servir.',
    ],
    dicaNota:
      'Ex.: na geladeira por 3 horas ficou mais firme. Enfeitei com sementes de maracujá.',
  },
  {
    id: 'brigadeiro-colher',
    nome: 'Brigadeiro de colher',
    categoria: 'sobremesas',
    tempo: 15,
    dificuldade: 'Fácil',
    porcoes: '4 porções',
    desc: 'O doce de festa, servido no copinho e sem enrolar.',
    fotos: ['assets/images/brigadeiro-colher.jpg'],
    video: '',
    grupos: [
      {
        titulo: '',
        itens: [
          {
            texto: '1 lata de leite condensado',
            icone: '🥫',
            imagem: '',
          },
          {
            texto: '1 caixinha (200 g) de creme de leite',
            icone: '🥛',
            imagem: '',
          },
          {
            texto: '3 colheres (sopa) de chocolate em pó',
            icone: '🍫',
            imagem: '',
          },
          {
            texto: '1 colher (sopa) de manteiga',
            icone: '🧈',
            imagem: '',
          },
        ],
      },
    ],
    utensilios: [
      {
        icone: '🍲',
        nome: 'Panela',
      },
      {
        icone: '🥄',
        nome: 'Colher de pau',
      },
      {
        icone: '🍨',
        nome: 'Copinhos',
      },
    ],
    preparo: [
      'Misture todos os ingredientes em uma panela.',
      'Cozinhe em fogo baixo, mexendo sem parar.',
      'Desligue quando o fundo da panela aparecer ao passar a colher (cerca de 8 a 10 minutos).',
      'Sirva em copinhos, morno ou gelado.',
    ],
    dicaNota:
      'Ex.: o ponto certo veio quando o fundo da panela apareceu (uns 9 minutos). Servi gelado, com granulado.',
  },
  {
    id: 'banana-canela',
    nome: 'Banana com canela',
    categoria: 'sobremesas',
    tempo: 10,
    dificuldade: 'Fácil',
    porcoes: '1 porção',
    desc: 'Banana dourada na frigideira com um toque de canela.',
    fotos: ['assets/images/banana-canela.jpg'],
    video: '',
    grupos: [
      {
        titulo: '',
        itens: [
          {
            texto: '1 banana madura',
            icone: '🍌',
            imagem: '',
          },
          {
            texto: '1 colher (chá) de manteiga',
            icone: '🧈',
            imagem: '',
          },
          {
            texto: '1 colher (chá) de açúcar ou mel',
            icone: '🍬',
            imagem: '',
          },
          {
            texto: '1 pitada de canela',
            icone: '🍂',
            imagem: '',
          },
        ],
      },
    ],
    utensilios: [
      {
        icone: '🍳',
        nome: 'Frigideira',
      },
      {
        icone: '🔪',
        nome: 'Faca',
      },
      {
        icone: '🥢',
        nome: 'Espátula',
      },
    ],
    preparo: [
      'Corte a banana ao meio, no comprimento.',
      'Derreta a manteiga em fogo médio.',
      'Coloque a banana com o lado cortado para baixo e doure por 2 minutos.',
      'Vire, polvilhe o açúcar e a canela e deixe mais 1 minuto.',
    ],
    dicaNota:
      'Ex.: banana bem madura caramelizou melhor. Troquei o açúcar por mel e pus uma pitada de sal.',
  },
];
