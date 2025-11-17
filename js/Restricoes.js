// js/Restricoes.js

document.addEventListener("DOMContentLoaded", () => {
  const pagina = document.body.dataset.pagina;

  if (pagina === "restricoes1") {
    prepararSelecaoRestricoes();
  } else if (pagina === "restricoes2") {
    montarReceitasPorRestricoes();
  }
});

function prepararSelecaoRestricoes() {
  const botaoProximo = document.querySelector(".fab");
  if (!botaoProximo) return;

  botaoProximo.addEventListener("click", () => {
    const selecionadas = Array.from(
      document.querySelectorAll('input[name="restricoes"]:checked')
    ).map(i => i.value);

    localStorage.setItem("smp_restricoesSelecionadas", JSON.stringify(selecionadas));
  });
}

function montarReceitasPorRestricoes() {
  const lista = document.querySelector(".card-list");
  const titulo = document.querySelector(".site-title");
  if (!lista || typeof filtrarPorRestricoes !== "function") return;

  let restricoes = [];
  try {
    restricoes = JSON.parse(localStorage.getItem("smp_restricoesSelecionadas")) || [];
  } catch (e) {
    restricoes = [];
  }

  if (titulo) {
    if (restricoes.length) {
      titulo.textContent = "Receitas compatíveis com as suas restrições";
    } else {
      titulo.textContent = "Receitas sem filtro de restrições";
    }
  }

  lista.innerHTML = "";

  const receitas = filtrarPorRestricoes(restricoes);

  if (!receitas.length) {
    const p = document.createElement("p");
    p.textContent = "Nenhuma receita encontrada para essas restrições.";
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

    const spanCase = document.createElement("span");
    spanCase.className = "chip";
    spanCase.textContent = "Por restrições";

    text.appendChild(spanTitulo);
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
