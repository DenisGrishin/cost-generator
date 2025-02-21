/* ! взять данные с ряда таблицы, и добавить их в инпты в модальное окно */
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

    if (input.tagName === "SELECT" && indx === 0) {
      $("[name='Категория']").val(arrData[indx]).trigger("change");
    } else if (input.tagName === "SELECT" && indx === 2) {
      $("[name='Единица измерения']").val(arrData[indx]).trigger("change");
    } else {
      hiddenErrorMessage(input);
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
/* ! сохранить редактируемых в модальном окне данных */
export function saveEditPositionPriceList(event) {
  const target = event.target;
  const modalId = target.closest("[data-modal-id]").dataset.modalId;
  const modal = target.closest("[data-modal-id]");
  const itemPriceList = document.querySelectorAll(".price-list tbody tr");
  const itemEdit = modal.querySelectorAll("._edit-input");

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
/*! валидация почты */
export function validateMail() {
  const inputs = document.querySelectorAll("input[type='email']");
  const regExtEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,8})+$/;
  inputs.forEach((input) => {
    if (regExtEmail.test(input.value)) {
      input.classList.remove("_error");
      hiddenErrorMessage(input);
      return true;
    } else {
      input.classList.add("_error");
      showErrorMessage(input, "Введите корректный email");
      return false;
    }
  });
}

/*! валидация в модальном окне на пустой инпут */
export function validateEmpty(list) {
  let isValidate = false;

  list.forEach((element) => {
    if (!element.value && element.matches("._validate")) {
      element.classList.add("_error");
      showErrorMessage(element, "Это поле обязательно для заполнения.");
    }

    if (element.value && element.matches("._validate")) {
      hiddenErrorMessage(element);
      element.classList.remove("_error");
    }
  });

  for (let i = 0; i < list.length; i++) {
    const element = list[i];

    if (!element.value && element.matches("._validate")) {
      isValidate = false;
      break;
    }

    isValidate = true;
  }

  return isValidate;
}
/*! создает поле для ошибки */
function showErrorMessage(input, textError) {
  const parent = input.parentElement;
  if (parent.querySelector("._error-message")) return;

  const div = document.createElement("div");
  div.classList.add("_error-message");
  div.innerText = textError;
  parent.appendChild(div);
}
/*! удаляет поле для ошибки */
export function hiddenErrorMessage(input) {
  const parent = input.parentElement;
  if (!parent.querySelector("._error-message")) return;

  const blockErrorMessage = parent.querySelector("._error-message");
  blockErrorMessage.remove();
}

/*! собрать данные в коллекцию */
export function collectInputData(list) {
  return Array.from(list).map((element) => {
    return element.value;
  });
}
