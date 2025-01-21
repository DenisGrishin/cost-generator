import "../scss/index.scss";
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
import { editPositionPriceList, saveEditPositionPriceList } from "./priceList";

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
function generateRandomId() {
  return (
    "id-" + Math.random().toString(36).substr(2, 9) + Date.now().toString(36)
  );
}
if (document.querySelector("#example2")) {
  const tabel = $("#example2").DataTable({
    dom: "f",
    paging: false,
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

  function creatingItemPL(idStage) {
    tabel.row
      .add([
        "",
        "",
        "",
        "",
        "",
        "",
        "<td><button type='button' onclick='editPositionPriceList(event)' data-toggle='modal' data-target='#modal-edit-position' class='btn-edit'></button></td>",
        "<button type='button' onclick='deleteItemPL(event)' class='btn-del-small'>",
      ])
      .draw();
  }

  function deleteItemPL(event) {
    let target = event.target;
    tabel.row($(target).parents(target)).remove().draw();
  }

  // создание элементов в прайс-листе
  window.creatingItemPL = creatingItemPL;
  // удаления в прайс-листе
  window.deleteItemPL = deleteItemPL;
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
