import "../scss/index.scss";
import { getCurrentDataClient, saveEditClient } from "./clients";
import {
  showBulkActionBar,
  creatingPosition,
  creatingSmeta,
  creatingStages,
  deleteItem,
  deleteSelectedItems,
  editTextInput,
  saveTextInput,
  chooseAllCheckbox,
  editTextSelect,
} from "./createElement";
import {
  collectInputData,
  editPositionPriceList,
  saveEditPositionPriceList,
  validateEmpty,
} from "./priceList";
import { changeRole } from "./users";

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
$(document).ready(function () {
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
});

$("#addColumn").on("click", function () {
  // Динамическое добавление нового столбца
});

//Date range picker
if (document.querySelector("#reservation")) {
}

function searchItems() {
  const blcok = document.querySelectorAll("[data-search-items]");

  blcok.forEach((element) => {
    const input = element.querySelector("[data-search-items] input");

    const ul = element.querySelector(".search-items__list");
    const li = ul.querySelectorAll("li");

    const filter = input.value.toLowerCase();

    li.forEach((item) => {
      if (item.textContent.toLowerCase().includes(filter)) {
        item.style.display = "";
      } else {
        item.style.display = "none";
      }
    });
  });
}
export function generateRandomId() {
  return (
    "id-" + Math.random().toString(36).substr(2, 9) + Date.now().toString(36)
  );
}
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
if (document.querySelector("#tablePriceList")) {
  var tabel;
  if (!$.fn.DataTable.isDataTable("#tablePriceList")) {
    tabel = $("#tablePriceList").DataTable({
      dom: "ftp",
      paging: true,
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
  }
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
          `<span class='${obgСategoryClass[arrData[0]]}'>${arrData[0]}</span>`,
          "",
          `${arrData[1]}`,
          `${arrData[2]}`,
          `${arrData[3]}`,
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

  function clearInputPL() {
    const createModal = document.getElementById("modal-create-position");

    const itemEdit = createModal.querySelectorAll(".block-item > div");

    itemEdit.forEach((el, indx) => {
      const input = el.querySelector("._edit-input");
      if (indx === 0) {
        $("[name='Категория']").val("").trigger("change");
      } else if (indx === 2) {
        $("[name='Единица измерения']").val("-").trigger("change");
      } else {
        input.classList.remove("_error");

        input.value = "";
      }
    });
  }
  // создание элементов в прайс-листе
  window.creatingItemPL = creatingItemPL;
  // удаления в прайс-листе
  window.deleteItemPL = deleteItemPL;
  window.clearInputPL = clearInputPL;
}

// создание элементов сметы
window.creatingSmeta = creatingSmeta;
window.creatingStages = creatingStages;
window.creatingPosition = creatingPosition;
window.editTextSelect = editTextSelect;

// чекбоксы
window.showBulkActionBar = showBulkActionBar;
window.chooseAllCheckbox = chooseAllCheckbox;

// удаление элементов сметы
window.deleteSelectedItems = deleteSelectedItems;
window.deleteItem = deleteItem;
// поиск
window.searchItems = searchItems;

window.saveTextInput = saveTextInput;
window.editTextInput = editTextInput;

// прайс лист
window.editPositionPriceList = editPositionPriceList;
window.saveEditPositionPriceList = saveEditPositionPriceList;
// клиент
window.getCurrentDataClient = getCurrentDataClient;
window.saveEditClient = saveEditClient;
// юезеры
window.changeRole = changeRole;
