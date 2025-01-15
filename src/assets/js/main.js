import "../scss/index.scss";

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
function generateRandomId() {
  return (
    "id-" + Math.random().toString(36).substr(2, 9) + Date.now().toString(36)
  );
}
function creatingSmeta() {
  const listSmeta = document.querySelector("[data-smeta]");

  let idSmeta = generateRandomId();
  if (listSmeta) {
    listSmeta.insertAdjacentHTML(
      "beforeend",
      `  <li class="todo-list__item   d-flex" data-item-id="${idSmeta}">
  <div class="todo-list__wrapper">
    <div class="todo-list__contetn">
      <span class="handle  _icon-darag">
      </span>
      <div class="todo-list__accordion accordion  card ">
        <div class="text-left  accordion__header collapsed middle-title">
          <button type="button" class="accordion__btn" data-card-widget="collapse"></button>
          <label class="accordion__checkbox checkbox">
            <input hidden type="checkbox" class="checkbox__input" name="checkbox-smeta">
          </label>
          <div class="accordion__header-content">
            <div class="accordion__name"> </div>
            <div class="accordion__select ">
                <label class="accordion__name-select">Статус</label>
              <div class="select-status">
                <select class="select2  select2-hidden-accessible" name="Статус" style="width: 100%;"
                  data-select2-id="select-status-" tabindex="-1" aria-hidden="true">
                  <option value="Выполнено" class="select-status__completed">Выполнено</option>
                  <option selected value="В работе" class="select-status__in-progress">В работе</option>
                  <option value="Отменено" class="select-status__cancelled">Отменено</option>
                  <option value="Отложено" class="select-status__postponed">Отложено</option>
                </select>
              </div>
            </div>
            <div class="accordion__del-btn" >
                  <button type="button" onclick="deleteItem('${idSmeta}')" class="btn-del-big"><span>Удалить</span></button>
            </div>
          </div>
        </div>



        <div class="accordion__body card-body">
          <!-- Этапы работы -->
          <ul class="todo-list  overflow-hidden mt-3" data-stages data-widget="todo-list">

          </ul>
  
          <!-- Конец Этапы работы -->
        </div>


      </div>
    </div>
    <div class="todo-list__footer footer-list">
      <button type="button" class="footer-list__btn-add-item" onclick="creatingStages('${idSmeta}')" data-create-stage><span
          class="add-btn"></span><span>Этап
          работ</span></button>
      <span class="footer-list__sum">Итого по смете: 0 р.</span>
    </div>
    <div class="mt-3">
      <label class="very-small-title"> Комментарий</label>
      <input type="text" class="input-default" name="комментарий">
    </div>

  </div>
</li>`
    );
    // Инициализируем D&D
    $(".todo-list").sortable({
      placeholder: "stage-highlight",
      handle: ".handle",
    });

    // Инициализируем Select2 на новом элементе <select>
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
  showTooltipSmeta();
}

function creatingStages(idSmeta) {
  const parentSmeta = document.querySelector(`[data-item-id='${idSmeta}']`);

  const listStages = parentSmeta.querySelector(`[data-stages]`);

  const idStage = generateRandomId();

  listStages.insertAdjacentHTML(
    "beforeend",
    `    <li class="todo-list__item p-0 " data-item-id='${idStage}'>
                      <div class="todo-list__contetn">
                        <span class="handle  _icon-darag">
                        </span>
                        <div class="todo-list__accordion accordion card collapsed-card">
                          <!-- Начала Позиций  -->

                          <div class=" text-left accordion__header middle-title">
                            <button type="button" class="accordion__btn" data-card-widget="collapse"></button>

                            <div class="accordion__header-content">
                              <div class="accordion__name very-small-title accordion__name_small-text"></div>
                              <div class="accordion__del-btn accordion__del-btn_small"><button onclick="deleteItem('${idStage}')" type="button" 
                                  class=" btn-del-small"></button></div>
                            </div>
                          </div>
                          <div class="accordion__body card-body ">
                            <ul class=" accordion__list list-accordion">
                              <li class=" list-accordion__head">
                                <div></div>
                                <div><label class="checkbox">
                                    <input hidden="" type="checkbox" class="checkbox__input" name="checkbox-smeta">
                                  </label></div>
                                <div>№</div>
                                <div>Арт.</div>
                                <div>Наименование работ</div>
                                <div>Ед.
                                  изм.</div><span>Кол-во.</span><span>Цена р.</span>
                                <div>Сумма р.</div>
                                <div></div>
                              </li>
                              <li class="list-accordion__body">
                                <ul class="todo-list" data-position data-widget="todo-list">
                               
                                </ul>
                              </li>
                              <li class="list-accordion__footer footer-list">
                                <button type="button" class="footer-list__btn-add-item " onclick="creatingPosition('${idStage}')"
                                  data-create-position><span class="add-btn"></span><span>Позиция</span></button>
                                <span class="footer-list__sum">Итого: 0 р.</span>
                              </li>
                            </ul>
                          </div>
                          <!-- Конец Позиций -->
                        </div>
                      </div>
                    </li>
      `
  );

  // Инициализируем D&D
  $(".todo-list").sortable({
    placeholder: "position-highlight",
    handle: ".handle",
  });
}

function creatingPosition(idStage) {
  const parentSmeta = document.querySelector(`[data-item-id='${idStage}']`);

  const listPosition = parentSmeta.querySelector("[data-position]");

  const idPosition = generateRandomId();
  listPosition.insertAdjacentHTML(
    "beforeend",
    `<li class="list-accordion__item" data-item-id='${idPosition}'>
    <div class="handle _icon-darag"></div>
    <div><label class="checkbox">
        <input hidden="" type="checkbox" class="checkbox__input" name="checkbox-smeta">
      </label></div>
    <div>__</div>
    <div>__</div>
    <div class="list-accordion__name">__</div>
    <div>__</div>
    <div>__</div>
    <div>__</div>
    <div>__</div>
    <div><button type="button" class="btn-del-small" onclick="deleteItem('${idPosition}')" ></button></div>
  </li>`
  );
}

function deleteSelectedItems() {
  const checkboxes = document.querySelectorAll('input[name="checkbox-smeta"]');

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked && checkbox.closest("[data-item-id]")) {
      checkbox.closest("[data-item-id]").remove();
    }
  });

  showTooltipSmeta();
}

function deleteItem(id) {
  document.querySelector(`[data-item-id='${id}']`).remove();

  showTooltipSmeta();
}

function showTooltipSmeta() {
  const listSmeta = document.querySelector("[data-smeta]");
  const tooltipSmeta = document.querySelector(".tooltip-smeta");

  if (listSmeta.children.length !== 0) {
    tooltipSmeta.classList.add("_show-tooltipSmeta");
  } else {
    tooltipSmeta.classList.remove("_show-tooltipSmeta");
  }
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

// создать
window.creatingSmeta = creatingSmeta;
window.creatingStages = creatingStages;
window.creatingPosition = creatingPosition;

// удалить
window.deleteSelectedItems = deleteSelectedItems;
window.deleteItem = deleteItem;

window.searchItems = searchItems;
