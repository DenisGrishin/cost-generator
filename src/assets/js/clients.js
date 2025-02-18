import { validateEmpty } from "./priceList";

// взять данные клиента, и добавить их в инпты в модальное окно
export function getCurrentDataClient() {
  const currentClientData = document.querySelectorAll(
    ".block-item__item .block-item__contetn"
  );
  const modal = document.querySelector("#modal-client");
  const editClientInput = modal.querySelectorAll("._edit-input");

  editClientInput.forEach((element) => {
    element.classList.remove("_error");
  });

  const collectClient = Array.from(currentClientData).map((el) => {
    if (el.querySelector(".block-item__list")) {
      return el.innerText.split("\n");
    }

    return el.innerText;
  });

  editClientInput.forEach((element, indx) => {
    if (element.matches(".select2")) {
      const nameSelect = element.name;
      $(`[name='${nameSelect}']`).val(collectClient[indx]).trigger("change");
    } else {
      element.value = collectClient[indx];
    }
  });
}
// сохранить редактируемых данных о клиенте
export function saveEditClient() {
  const modal = document.querySelector("#modal-client");
  const editClientData = modal.querySelectorAll("._edit-input");
  const currentClientData = document.querySelectorAll(
    "#static .block-item__item .block-item__contetn"
  );

  const collectClient = Array.from(editClientData).map((el) => {
    if (el.matches(".select2")) {
      const nameSelect = el.name;
      return $(`[name='${nameSelect}']`).val();
    }

    return el.value;
  });

  let isValidate = validateEmpty(editClientData);

  if (isValidate) {
    currentClientData.forEach((element, indx) => {
      if (element.querySelector(".block-item__list")) {
        element.querySelector(".block-item__list").remove();
        сreatingList(element, collectClient[indx]);
      } else {
        element.innerText = collectClient[indx];
      }
    });

    $("#modal-client").modal("hide");
  }
}

function сreatingList(element, data) {
  const ul = document.createElement("ul");
  ul.classList.add("block-item__list");
  data.forEach((element) => {
    const li = document.createElement("li");
    li.innerText = element;
    ul.append(li);
  });

  element.append(ul);
}
