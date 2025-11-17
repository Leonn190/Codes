// js/ingredientes.js

document.addEventListener("DOMContentLoaded", () => {
  const pagina = document.body.dataset.pagina;

  if (pagina === "ingredientes1") {
    montarListaIngredientes();
  } else if (pagina === "ingredientes2") {
    montarReceitasPorIngrediente();
  }
});

function montarListaIngredientes() {
  const lista = document.querySelector(".card-list");
  if (!lista || typeof obterIngredientesPrincipais !== "function") return;

  lista.innerHTML = "";

  const ingredientes = obterIngredientesPrincipais();

  ingredientes.forEach((ing) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.className = "pill";
    a.href = "Ingredientes2.html";
    a.target = "conteudo";
    a.textContent = ing;

    a.addEventListener("click", () => {
      localStorage.setItem("smp_ingredienteSelecionado", ing);
    });

    li.appendChild(a);
    lista.appendChild(li);
  });
}

function montarReceitasPorIngrediente() {
  const lista = document.querySelector(".card-list");
  const titulo = document.querySelector(".site-title");
  if (!lista || typeof filtrarPorIngrediente !== "function") return;

  const ingrediente = localStorage.getItem("smp_ingredienteSelecionado") || "Ingrediente";

  if (titulo) {
    titulo.textContent = `Receitas com ${ingrediente}`;
  }

  lista.innerHTML = "";

  const receitas = filtrarPorIngrediente(ingrediente);

  if (!receitas.length) {
    const p = document.createElement("p");
    p.textContent = "Nenhuma receita encontrada para esse ingrediente.";
    lista.parentNode.replaceChild(p, lista);
    return;
  }

  receitas.forEach((r) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.className = "card";
    a.href = r.url;
    a.target = "conteudo";
    a.setAttribute("aria-label", r.nome);

    const text = document.createElement("div");
    text.className = "card__text";

    const spanTitulo = document.createElement("span");
    spanTitulo.className = "titulo";
    spanTitulo.textContent = r.nome;

    const timeEl = document.createElement("time");
    timeEl.className = "tempo";
    timeEl.dateTime = `PT${r.tempoMin}M`;
    timeEl.textContent = `⏳ ${r.tempoMin} min`;

    const spanCase = document.createElement("span");
    spanCase.className = "chip";
    spanCase.textContent = "Por ingrediente";

    text.appendChild(spanTitulo);
    text.appendChild(timeEl);
    text.appendChild(spanCase);

    const icon = document.createElement("span");
    icon.className = "icone";
    icon.textContent = "♡";

    a.appendChild(text);
    a.appendChild(icon);
    li.appendChild(a);
    lista.appendChild(li);
  });
}
