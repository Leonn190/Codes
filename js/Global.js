// js/Global.js

const RECIPES = [
  {
    id: "frango-crocante",
    nome: "Frango crocante na Air Fryer",
    tempoMin: 30,
    ingredientePrincipal: "Frango",
    url: "Receitas/Frango.html",
    contemRestricoes: ["gluten", "ovo", "derivados-animais"], // o que NÃO pode
    tags: ["🍗 PRO", "🌀 AF", "🧂 BS"]
  },
]


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
