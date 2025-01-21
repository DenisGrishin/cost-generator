export function editPositionPriceList(event) {
  const target = event.target;
  const tr = target.closest("tr");
  const editItem = tr.querySelectorAll("._edit");

  const arrData = Array.from(editItem).map((item) => {
    return item.innerText;
  });

  const modal = document.querySelector("#modal-edit-position");
  modal.dataset.modalId = tr.id;

  const itemEdit = modal.querySelectorAll(".block-item > div");

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
  const itemEdit = modal.querySelectorAll(".block-item > div");

  const arrData = collectInputData(itemEdit);
  let isValidate = validateEmpty(itemEdit);

  if (isValidate) {
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
  let isValidate = false;

  list.forEach((element) => {
    const input = element.querySelector("._edit-input");
    if (!input.value) {
      input.classList.add("_error");
    } else {
      input.classList.remove("_error");
    }
  });

  for (let i = 0; i < list.length; i++) {
    const element = list[i];
    const input = element.querySelector("._edit-input");

    if (!input.value) {
      isValidate = false;
      break;
    }

    isValidate = true;
  }

  return isValidate;
}

export function collectInputData(list) {
  debugger;
  return Array.from(list).map((element) => {
    const input = element.querySelector("._edit-input");
    return input.value;
  });
}
