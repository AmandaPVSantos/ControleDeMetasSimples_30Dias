document.addEventListener("DOMContentLoaded", () => {
  const tabelaBody = document.querySelector("#tabelaMetas tbody");

  const inicio = new Date(2025, 8, 29);
  const fim = new Date(2025, 9, 28);

  let dadosSalvos = JSON.parse(localStorage.getItem("metas")) || {};

  for (let d = new Date(inicio); d <= fim; d.setDate(d.getDate() + 1)) {
    const dataStr = d.toLocaleDateString("pt-BR");
    const tr = document.createElement("tr");

    const tdData = document.createElement("td");
    tdData.textContent = dataStr;
    tr.appendChild(tdData);

    for (let i = 0; i < 14; i++) {
      const td = document.createElement("td");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList.add("meta");

      if (dadosSalvos[dataStr] && dadosSalvos[dataStr][i]) {
        checkbox.checked = true;
      }

      checkbox.addEventListener("change", () => {
        if (!dadosSalvos[dataStr]) dadosSalvos[dataStr] = {};
        dadosSalvos[dataStr][i] = checkbox.checked;
        localStorage.setItem("metas", JSON.stringify(dadosSalvos));
        atualizarTotal(tr, dataStr);
      });

      td.appendChild(checkbox);
      tr.appendChild(td);
    }

    const tdTotal = document.createElement("td");
    tdTotal.classList.add("totalDia");
    tr.appendChild(tdTotal);

    tabelaBody.appendChild(tr);

    atualizarTotal(tr, dataStr);
  }

  atualizarResumo();

  function atualizarTotal(tr, dataStr) {
    const checkboxes = tr.querySelectorAll(".meta");
    let total = 0;
    checkboxes.forEach((cb) => {
      if (cb.checked) total++;
    });
    tr.querySelector(".totalDia").textContent = total;

    atualizarResumo();
  }

  function atualizarResumo() {
    const totais = document.querySelectorAll(".totalDia");
    let soma = 0;
    let max = totais.length * 14;
    totais.forEach((td) => (soma += parseInt(td.textContent)));
    document.getElementById("somaTotal").textContent = soma;
    document.getElementById("mediaFinal").textContent =
      ((soma / max) * 100).toFixed(1) + "%";
  }
});
