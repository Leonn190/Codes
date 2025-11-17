const RECIPES = [
  {
    id: "frango-crocante",
    nome: "Frango crocante na Air Fryer",
    tempoMin: 30,
    ingredientePrincipal: "Frango",
    url: "Receitas/Frango.html",
    contemRestricoes: ["gluten", "ovo", "derivados-animais"], // contém ovo + farinha
    tags: ["🍗 PRO", "🌀 AF", "🧂 BS"]
  },
  {
    id: "pure-mandioquinha",
    nome: "Purê de mandioquinha cremoso",
    tempoMin: 30,
    ingredientePrincipal: "Mandioquinha",
    url: "Receitas/PureMandioquinha.html",
    contemRestricoes: ["lactose", "derivados-animais"], // leite + manteiga
    tags: ["🥔", "👨‍🍳 Fácil"]
  },
  {
    id: "bolo-laranja",
    nome: "Bolo de laranja simples",
    tempoMin: 45,
    ingredientePrincipal: "Farinha de trigo",
    url: "Receitas/BoloLaranja.html",
    contemRestricoes: ["gluten", "lactose", "ovo", "derivados-animais"],
    tags: ["🍰", "☕ Café da tarde"]
  },
  {
    id: "carne-panela",
    nome: "Carne de panela caseira",
    tempoMin: 30,
    ingredientePrincipal: "Carne bovina",
    url: "Receitas/CarnePanela.html",
    contemRestricoes: ["derivados-animais"], // carne
    tags: ["🍖", "🍚 Almoço rápido"]
  },
  {
    id: "salada-frutas",
    nome: "Salada de frutas fresca",
    tempoMin: 15,
    ingredientePrincipal: "Frutas variadas",
    url: "Receitas/SaladaFrutas.html",
    contemRestricoes: [], // sem lactose, sem glúten etc. (básico)
    tags: ["🍓", "🥗 Leve"]
  },
  {
    id: "mousse-maracuja",
    nome: "Mousse de maracujá",
    tempoMin: 60,
    ingredientePrincipal: "Maracujá",
    url: "Receitas/MousseMaracuja.html",
    contemRestricoes: ["lactose", "derivados-animais"], // creme de leite/leite condensado
    tags: ["🍮", "🍽 Sobremesa"]
  },
  {
    id: "arroz-brocolis",
    nome: "Arroz com brócolis",
    tempoMin: 30,
    ingredientePrincipal: "Arroz",
    url: "Receitas/ArrozBrocolis.html",
    contemRestricoes: [], // versão vegana com óleo
    tags: ["🥦 VG", "🍚 Acompanhamento"]
  }
];

function obterIngredientesPrincipais() {
  const set = new Set(RECIPES.map(r => r.ingredientePrincipal));
  return Array.from(set).sort();
}

function filtrarPorIngrediente(ingrediente) {
  return RECIPES.filter(r => r.ingredientePrincipal === ingrediente);
}

function filtrarPorTempo(temposSelecionados) {
  if (!temposSelecionados || !temposSelecionados.length) return [];
  const numeros = temposSelecionados
    .filter(v => v !== "+120")
    .map(v => parseInt(v, 10))
    .filter(n => !Number.isNaN(n));
  const incluiMaisDe2h = temposSelecionados.includes("+120");

  return RECIPES.filter(r => {
    if (incluiMaisDe2h && r.tempoMin > 120) return true;
    if (numeros.length && numeros.includes(r.tempoMin)) return true;
    return false;
  });
}

function filtrarPorRestricoes(restricoesSelecionadas) {
  if (!restricoesSelecionadas || !restricoesSelecionadas.length) {
    // se nada marcado, não filtra
    return RECIPES.slice();
  }
  return RECIPES.filter(r =>
    !restricoesSelecionadas.some(res => r.contemRestricoes.includes(res))
  );
}