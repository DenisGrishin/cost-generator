export function editPositionPriceList(event) {
  const target = event.target;
  const tr = target.closest("tr");
  const editItem = tr.querySelectorAll("._edit");

  const arrData = Array.from(editItem).map((item) => {
    return item.innerText;
  });

  const modal = document.querySelector("#modal-edit-position");
  modal.dataset.modalId = tr.id;

  const itemEdit = modal.querySelectorAll(".user-info > div");

  itemEdit.forEach((element, indx) => {
    const input = element.querySelector("._edit-input");
    if (indx === 0) {
      $("[name='Категория']").val(arrData[indx]).trigger("change");
    } else if (indx === 2) {
      $("[name='Единица измерения']").val(arrData[indx]).trigger("change");
    } else {
      input.classList.remove("_error");
      input.value = arrData[indx];
    }
  });
}
const obgСategoryClass = {
  Мат: "_mat-category",
  Раб: "_rab-category",
  Мех: "_meh-category",
  Док: "_doc-category",
};

export function saveEditPositionPriceList(event) {
  const target = event.target;
  const modalId = target.closest("[data-modal-id]").dataset.modalId;
  const modal = target.closest("[data-modal-id]");
  const itemPriceList = document.querySelectorAll(".price-list tbody tr");
  const itemEdit = modal.querySelectorAll(".user-info > div");

  const arrData = collectInputData(itemEdit);
  let isError = validateEmpty(itemEdit);

  if (isError) {
    itemPriceList.forEach((item) => {
      if (item.id === modalId) {
        item.querySelectorAll("._edit").forEach((item, indx) => {
          if (indx === 0) {
            item.innerHTML = `<span class='${
              obgСategoryClass[arrData[indx]]
            }'>${arrData[indx]}</span>`;
          } else {
            item.innerText = arrData[indx];
          }
        });
      }
    });

    $("#modal-edit-position").modal("hide");
  }
}

export function validateEmpty(list) {
  let isError = false;

  for (let i = 0; i < list.length; i++) {
    const element = list[i];
    const input = element.querySelector("._edit-input");

    if (input.className.includes("_error") && input.value) {
      input.classList.remove("_error");
      isError = true;
      continue;
    }

    if (!input.className.includes("_error")) {
      isError = true;
      break;
    }

    if (input.className.includes("_error")) {
      isError = false;
      break;
    }
  }

  return isError;
}

export function collectInputData(list) {
  return Array.from(list).map((element) => {
    const input = element.querySelector("._edit-input");

    if (!input.value) {
      input.classList.add("_error");
    }
    return input.value;
  });
}
