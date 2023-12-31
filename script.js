$("#carga").mask("000000 h", { reverse: true });

let cra = {};
let count = 0;

const adicionar = () => {
  const nome = $("#nome").val();
  const media = $("#media").val();
  const carga = $("#carga").val();

  if (nome && media && carga) {
    let valor = $("#valores").html();
    count += 1;
    const msg = `
      <tr id="${count}">
        <td>${nome}</td>
        <td>${media}</td>
        <td>${carga}</td>
        <td class="lixo" onclick="deletar('${count}')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="red"
            class="bi bi-trash-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"
            />
          </svg>
        </td>
      </tr>
    `;

    valor += msg;
    $("#valores").html(valor);

    $("#nome").val("");
    $("#media").val("");
    $("#carga").val("");

    cra[count] = [carga.split(" ")[0] * media, parseInt(carga.split(" ")[0])];
    calcular();
  }
};

const deletar = (val) => {
  const valor = $("#valores").html();
  const element = $(`#${val}`).html();
  $("#valores").html(valor.replace(`<tr id="${val}">` + element + "</tr>", ""));
  delete cra[val];
  calcular();
};

const calcular = () => {
  if (!Object.keys(cra).length) {
    $("#cra").text("CRA:");
  } else {
    let cima = 0;
    let baixo = 0;
    for (let i in cra) {
      cima += cra[i][0];
      baixo += cra[i][1];
    }
    $("#cra").text(`CRA: ${(cima / baixo).toFixed(2)}`);
  }
};

$(document).ready(() => {
  $("#adicionar").click(() => adicionar());
  $("#media").on("input", function () {
    $(this).val(
      $(this)
        .val()
        .replace(/[^0-9.]/g, "")
    );
  });
});
