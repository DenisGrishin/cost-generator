import "../scss/index.scss";

import { getCurrentDataClient, saveEditClient } from "./clients";
import {
  toggleBulkActionBar,
  creatingPosition,
  creatingSmeta,
  creatingStages,
  deleteItem,
  deleteSelectedItems,
  editTextInput,
  saveTextInput,
  chooseAllCheckbox,
  editTextSelect,
  showDropDown,
  saveTextSearchList,
  hiddenDropDown,
} from "./createElement";
import {
  collectInputData,
  editPositionPriceList,
  hiddenErrorMessage,
  saveEditPositionPriceList,
  validateEmpty,
} from "./priceList";
import { changeRole } from "./users";

/*!  инициализация select2 */
if (document.querySelector(".select2")) {
  $(".select2").select2({
    placeholder: "",
    allowClear: true,
    width: "resolve",
    language: {
      noResults: function () {
        return "Ничего не найдено";
      },
    },
  });
}
/*! инициализация select2 defualt */
if (document.querySelector(".select2-defualt")) {
  $(".select2-defualt").select2({
    minimumResultsForSearch: Infinity, // Отключаем поиск
    placeholder: "",
    allowClear: true,
    width: "resolve",
    language: {
      noResults: function () {
        return "Ничего не найдено";
      },
    },
  });
}
if (document.querySelector(".select2-stamp")) {
  $(".select2-stamp").select2({
    minimumResultsForSearch: Infinity,
    placeholder: "",
    dropdownCssClass: "select-stamp__drop-down",

    allowClear: true,
    width: "resolve",
    language: {
      noResults: function () {
        return "Ничего не найдено";
      },
    },
  });
}
/*!  инициализация daterangepicker */
if (document.querySelector("#reservation")) {
  $("#reservation").daterangepicker({
    singleDatePicker: true,
    autoApply: true,

    minYear: 1901,
    maxYear: parseInt(moment().format("YYYY"), 10),
    locale: {
      format: "DD.MM.YYYY",
      separator: " - ",
      daysOfWeek: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
      monthNames: [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
      ],
      firstDay: 1,
    },
  });
}
/*! генератор рандомного id */
export function generateRandomId() {
  return (
    "id-" + Math.random().toString(36).substr(2, 9) + Date.now().toString(36)
  );
}
/*! инициализация таблицы "пользователей" */
if (document.querySelector("#tableUser")) {
  if (!$.fn.DataTable.isDataTable("#tableUser")) {
    $("#tableUser").DataTable({
      dom: "f",
      paging: true,
      pageLength: 25,
      searching: true,
      ordering: true,
      info: false,
      autoWidth: false,
      responsive: true,
      rowId: function (a) {
        return generateRandomId();
      },
      columnDefs: [
        { className: "_edit", targets: 0 },
        { className: "_edit", targets: 2 },
        { className: "_edit", targets: 3 },
      ],
      language: {
        search: "",
        zeroRecords: "Совпадений не найдено",
        emptyTable: "Таблица пустая",
        searchPlaceholder: "Поиск",
        paginate: {
          first: "Первая",
          previous: " ",
          next: " ",
          last: "Последняя",
        },
      },
    });
  }
}
/*! инициализация таблицы "прайс лист" */
if (document.querySelector("#tablePriceList")) {
  var tabel;
  if (!$.fn.DataTable.isDataTable("#tablePriceList")) {
    tabel = $("#tablePriceList").DataTable({
      dom: "ftp",
      paging: false,
      pageLength: 25,
      searching: true,
      ordering: true,
      info: false,
      autoWidth: false,
      responsive: true,
      language: {
        search: "",
        zeroRecords: "Совпадений не найдено",
        emptyTable: "Таблица пустая",
        searchPlaceholder: "Поиск",
        paginate: {
          first: "Первая",
          previous: " ",
          next: " ",
          last: "Последняя",
        },
      },
      // columnDefs: [{ orderable: false, targets: [6, 7] }],
      rowId: function (a) {
        return generateRandomId();
      },
      columnDefs: [
        { orderable: false, targets: [6, 7] },
        {
          targets: 0, // Первый столбец для нумерации
          orderable: true, // Отключаем сортировку для этого столбца
          searchable: false, // Отключаем поиск для этого столбца
          render: function (data, type, row, meta) {
            return meta.row + 1; // Номер строки (индекс + 1)
          },
        },
        { className: "_edit", targets: 1 },
        { className: "_edit", targets: 3 },
        { className: "_edit", targets: 4 },
        { className: "_edit", targets: 5 },
      ],
    });
    /*! созданте элемента в таблице "прайс лист" */
    function creatingItemPL() {
      const createModal = document.getElementById("modal-create-position");

      const itemEdit = createModal.querySelectorAll("._edit-input");

      const arrData = collectInputData(itemEdit);

      const obgСategoryClass = {
        Мат: "_mat-category",
        Раб: "_rab-category",
        Мех: "_meh-category",
        Док: "_doc-category",
      };
      let isValidate = validateEmpty(itemEdit);
      if (isValidate) {
        tabel.row
          .add([
            "",
            `<span class='${obgСategoryClass[arrData[0]]}'>${
              arrData[0]
            }</span>`,
            "",
            `${arrData[1]}`,
            `${arrData[2]}`,
            `${arrData[3]}`,
            `${arrData[4]}`,
            "<td><button type='button' onclick='editPositionPriceList(event)' data-toggle='modal' data-target='#modal-edit-position' class='btn-edit'></button></td>",
            "<button type='button' onclick='deleteItemPL(event)' class='btn-del-small'>",
          ])
          .draw();

        $("#modal-create-position").modal("hide");
      }
    }

    function deleteItemPL(event) {
      let target = event.target;
      tabel.row($(target).parents(target)).remove().draw();
    }

    // создание элементов в прайс-листе */
    window.creatingItemPL = creatingItemPL;
    // удаления в прайс-листе
    window.deleteItemPL = deleteItemPL;
  }
}
/*! учитсь все поля от ошибок и текста*/
function clearInputPL() {
  // const createModal = document.getElementById("modal-create-position");
  const createModal = document.querySelector(".modal");
  debugger;
  const itemEdit = createModal.querySelectorAll(".block-item > div");

  itemEdit.forEach((el, indx) => {
    const input = el.querySelector("._edit-input");
    if (indx === 0) {
      $("[name='Категория']").val("").trigger("change");
      hiddenErrorMessage(input);
      input.classList.remove("_error");
    } else if (indx === 2) {
      $("[name='Единица измерения']").val("-").trigger("change");
      hiddenErrorMessage(input);
      input.classList.remove("_error");
    } else {
      input.classList.remove("_error");
      hiddenErrorMessage(input);
      input.value = "";
    }
  });
}

/*! поиск по списку, события onkeyup */
export function searchItems(event) {
  let target = event.target;
  const parentSearchSelector = target.closest("[data-search-items]");

  const input = target;
  const ul = parentSearchSelector.querySelector("[data-search-items] > ul");
  const li = ul.querySelectorAll("li");
  const filter = input.value.toLowerCase();
  if (filter === "") {
    li.forEach((it) => {
      if (it.matches("._not-found")) {
        it.remove();
      }

      it.style.display = "";
    });
  }
  if (input && input.value) {
    li.forEach((item) => {
      if (item.textContent.toLowerCase().includes(filter)) {
        item.style.display = "";

        if (document.querySelector("._not-found")) {
          document.querySelector("._not-found").remove();
        }
      } else if (item.matches("._not-found")) {
      } else {
        item.style.display = "none";
      }
    });

    const IsNotFoundLi = Array.from(li).every((li) => {
      if (li.style.display === "none") return true;
    });

    if (IsNotFoundLi) {
      const li = document.createElement("li");
      li.classList.add("_not-found");
      li.innerText = "Ничего не найдено";
      ul.append(li);
    }
  }
}
/*! создание папки */
function createFolder(event) {
  const modal = document.querySelector("#modal-create-folder");
  const input = modal.querySelector("._edit-input");

  const block = document.querySelector("[data-search-items]");
  const ul = block.querySelector("ul");

  const IsValidate = validateEmpty([input]);

  if (IsValidate) {
    /*! сокращено data-name-il --- data-name-item-list */
    ul.insertAdjacentHTML(
      "afterbegin",
      `<li class="_icon-folder ">
							<a href="./template-page.html" class="flex-fill "  data-name-il> ${input.value}</a>
              <span>12.12.2024</span>
							<div class="search-items__btn-dropdown dropdown-search">
								<button type="button" class="dropdown-search__btn" data-toggle="dropdown" aria-expanded="true">
								</button>
								<div class="dropdown-menu " x-placement="bottom-start">
						    <button type="button" class="dropdown-item" data-toggle="modal"
										data-target="#modal-edit-folder" onclick='getNameItemList(event)'>Редактировать</button>
									<button type="button" class="dropdown-item" onclick="deleteItemList(event)">Удалить</button>
								</div>
							</div>
						</li>`
    );

    $("#modal-create-folder").modal("hide");
  }
}
/*! удаления папки */
function deleteItemList(event) {
  let target = event.target;
  const li = target.closest("li");
  li.remove();
}

function getNameItemList(event) {
  let target = event.target;
  const li = target.closest("li");
  li.dataset.edit = "acitive";

  const nameFolder = li.querySelector("[data-name-il]");

  const modal = document.querySelector("#modal-edit-folder");
  const input = modal.querySelector("._edit-input");

  input.value = nameFolder.innerText;
}
function saveEditFolder(event) {
  // сохрнаить редкатируемую папку
  /*! сохрнаить редкатируемую папку */
  const modal = document.querySelector("#modal-edit-folder");
  const input = modal.querySelector("._edit-input");
  const block = document.querySelector("[data-search-items]");
  const ul = block.querySelector("ul");
  const editLi = ul.querySelector("[data-edit]");

  const IsValidate = validateEmpty([input]);
  if (IsValidate) {
    editLi.querySelector("[data-name-il]").innerText = input.value;
    editLi.removeAttribute("data-edit");
    $("#modal-edit-folder").modal("hide");
  }
}
/*! создание элементов сметы */
window.creatingSmeta = creatingSmeta;
window.creatingStages = creatingStages;
window.creatingPosition = creatingPosition;
window.editTextSelect = editTextSelect;
window.showDropDown = showDropDown;
window.saveTextSearchList = saveTextSearchList;
/*! чекбоксы */
window.toggleBulkActionBar = toggleBulkActionBar;
window.chooseAllCheckbox = chooseAllCheckbox;

/*! удаление элементов сметы */
window.deleteSelectedItems = deleteSelectedItems;
window.deleteItem = deleteItem;
/*! поиск */
window.searchItems = searchItems;
window.hiddenDropDown = hiddenDropDown;

window.saveTextInput = saveTextInput;
window.editTextInput = editTextInput;

/*! прайс лист */
window.editPositionPriceList = editPositionPriceList;
window.saveEditPositionPriceList = saveEditPositionPriceList;
window.clearInputPL = clearInputPL;
/*! клиент */
window.getCurrentDataClient = getCurrentDataClient;
window.saveEditClient = saveEditClient;
/*! юезеры */
window.changeRole = changeRole;
/*!  папки */
window.createFolder = createFolder;
window.deleteItemList = deleteItemList;
window.getNameItemList = getNameItemList;
window.saveEditFolder = saveEditFolder;
