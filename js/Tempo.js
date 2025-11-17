// js/receitas.js

document.addEventListener("DOMContentLoaded", () => {
  const pagina = document.body.dataset.pagina;

  if (pagina === "tempo1") {
    prepararSelecaoTempo();
  } else if (pagina === "tempo2") {
    montarReceitasPorTempo();
  } else if (pagina === "receitas-lista") {
    montarListaGeralReceitas();
  }
});

function prepararSelecaoTempo() {
  const botaoProximo = document.querySelector(".fab");
  if (!botaoProximo) return;

  botaoProximo.addEventListener("click", () => {
    const selecionados = Array.from(
      document.querySelectorAll('input[name="tempo"]:checked')
    ).map(i => i.value);

    localStorage.setItem("smp_temposSelecionados", JSON.stringify(selecionados));
  });
}

function montarReceitasPorTempo() {
  const lista = document.querySelector(".card-list");
  if (!lista || typeof filtrarPorTempo !== "function") return;

  let tempos = [];
  try {
    tempos = JSON.parse(localStorage.getItem("smp_temposSelecionados")) || [];
  } catch (e) {
    tempos = [];
  }

  lista.innerHTML = "";

  const receitas = filtrarPorTempo(tempos);

  if (!receitas.length) {
    const p = document.createElement("p");
    p.textContent = "Nenhuma receita encontrada para o tempo selecionado.";
    lista.parentNode.replaceChild(p, lista);
    return;
  }

  receitas.forEach((r) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.className = "card";
    a.href = r.url;
    a.target = "conteudo";
    a.setAttribute("aria-label", `${r.nome}, ${r.tempoMin} minutos`);

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
    spanCase.textContent = "Por tempo";

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