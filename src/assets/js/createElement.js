import { generateRandomId, searchItems } from "./main";
// создание сметы, события onclick
export function creatingSmeta() {
  const listSmeta = document.querySelector("[data-smeta]");

  if (listSmeta) {
    listSmeta.insertAdjacentHTML(
      "beforeend",
      `  <li class="todo-list__item   d-flex" data-smeta-item>
  <div class="todo-list__wrapper">
    <div class="todo-list__contetn">
      <span class="handle  _icon-darag">
      </span>
      <div class="todo-list__accordion accordion  card ">
        <div class="text-left  accordion__header collapsed middle-title">
          <button type="button" class="accordion__btn" data-animation-speed="0" data-card-widget="collapse"></button>
          <label class="accordion__checkbox checkbox">
            <input hidden data-chkc-smeta type="checkbox" class="checkbox__input" name="checkbox-smeta" onchange="toggleBulkActionBar()">
          </label>
          <div class="accordion__header-content">
            <div class="accordion__name" onclick='editTextInput(event)' data-name='Наименование сметы'><input type="text" data-edit-input onblur="saveTextInput(event)"  class="input-default"></div>
            <div class="accordion__select ">
                <label class="accordion__name-select">Печать</label>
              <div class="select-stamp">
                <select class="select2 select2-stamp  select2-hidden-accessible" name="Печать" style="width: 100%;"
                  data-select2-id="select-status-" tabindex="-1" aria-hidden="true">
                  <option value="Без печати" class="select-status__completed" selected >Без печати</option>
                  <option  value="С печатью" class="select-status__in-progress">С печатью</option>
                
                </select>
              </div>
            </div>
            <div class="accordion__del-btn" >
                  <button type="button" onclick="deleteItem(event,'data-smeta-item')"  class="btn-del-big"><span>Удалить</span></button>
            </div>
          </div>
        </div>



        <div class="accordion__body card-body">
          <!-- Этапы работы -->
          <ul class="todo-list   mt-3" data-stages data-widget="todo-list">

          </ul>
  
          <!-- Конец Этапы работы -->
        </div>


      </div>
    </div>
    <div class="todo-list__footer footer-list">
      <button type="button" class="butt-plus" onclick="creatingStages(event)" data-create-stage><span>Этап
          работ</span></button>
      <span class="footer-list__sum">Итого по смете: <span data-sum data-name='Итого по смете'>0</span> р.</span>
    </div>
    <div class="mt-3">
      <label class="very-small-title"> Комментарий</label>
    	<textarea ame="комментарий" id="" class="textarea-default"></textarea>
    </div>

  </div>
</li>`
    );
    // Инициализируем D&D
    $(".todo-list").sortable({
      placeholder: "stage-highlight",
      handle: ".handle",

      revert: 100, // Плавная анимация возврата
      start: function (event, ui) {
        // setTimeout(() => {
        //   let target = event.target;
        //   const accordions = target.querySelectorAll(".card");
        //   accordions.forEach((element) => {
        //     if (!element.matches(".collapsed-card")) {
        //       element.classList.add("collapsed-card", "_opened");
        //     }
        //   });
        // }, 100);
      },
      stop: function (event, ui) {
        // setTimeout(() => {
        //   let target = event.target;
        //   const accordions = target.querySelectorAll(".card");
        //   accordions.forEach((element) => {
        //     if (element.matches("._opened")) {
        //       element.classList.remove("collapsed-card", "_opened");
        //     }
        //   });
        // }, 100);
      },
    });
  }
  // Инициализируем Select2 на новом элементе <select>
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
  // autoFocusInput(idItem);
  initHandelKeyDown();
}
// создание этапа, события onclick
export function creatingStages(event) {
  const smeta = event.target.closest("[data-smeta-item]");
  const listStage = smeta.querySelector("[data-stages]");

  listStage.insertAdjacentHTML(
    "beforeend",
    `    <li class="todo-list__item p-0 " data-stage-item>
                      <div class="todo-list__contetn">
                        <span class="handle  _icon-darag">
                        </span>
                        <div class="todo-list__accordion accordion card ">
                          <!-- Начала Позиций  -->

                          <div class=" text-left accordion__header middle-title">
                            <button type="button" class="accordion__btn" data-animation-speed="0" data-card-widget="collapse"></button>

                            <div class="accordion__header-content">
                              <div class="accordion__name very-small-title accordion__name_small-text" onclick='editTextInput(event)' data-name='Наименование этапа'><input  type="text" data-edit-input onblur="saveTextInput(event)"  class="input-default"></div>
                              <div class="accordion__del-btn accordion__del-btn_small"><button onclick="deleteItem(event,'data-stage-item')" type="button" 
                                  class=" btn-del-small"></button></div>
                            </div>
                          </div>
                          <div class="accordion__body card-body ">
                            <ul class=" accordion__list list-accordion">
                              <li class=" list-accordion__head">
                                <div></div>
                                <div><label class="checkbox">
                                    	<input hidden="" onchange="chooseAllCheckbox(event)"
																			type="checkbox" class="checkbox__input">
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
                                <button type="button" class="butt-plus" onclick="creatingPosition(event)"
                                  data-create-position><span>Позиция</span></button>
                                <span class="footer-list__sum">Итого:<span
																		data-sum data-name='Итого по этапа'>0</span> р.</span>
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
    placeholder: "position-highlight", // Класс для подсветки
    handle: ".handle", // Перетаскивание только за этот элемент
    revert: 100,
  });

  initHandelKeyDown();
}
// создание позиции, события onclick
export function creatingPosition(event) {
  const stage = event.target.closest("[data-stage-item]");

  const listPosition = stage.querySelector("[data-position]");

  let numerItem = findMaxNumber(listPosition);

  let id = generateRandomId();
  listPosition.insertAdjacentHTML(
    "beforeend",
    `<li class="list-accordion__item" data-position-item>
    <div class="handle _icon-darag"></div>
    <div><label class="checkbox">
        <input  hidden data-chkc-position type="checkbox" class="checkbox__input" name="checkbox-smeta" onchange="toggleBulkActionBar()">
      </label></div>
    <div onclick='editTextInput(event)' data-name='№'>${numerItem}</div>
    <div></div>
    <div data-name='Наименование работ' class="list-accordion__name" onclick='editTextInput(event)' data-search-items>
    <input type="text"  onblur="saveTextInput(event)"   onkeyup="showDropDown(event)"  data-edit-input  class="input-default">
      <ul class="list-accordion__search search-position">
      <li onclick="saveTextSearchList(event)">Скважины</li>
      <li onclick="saveTextSearchList(event)">Септики</li>
      <li onclick="saveTextSearchList(event)">Баратеон</li>
      <li onclick="saveTextSearchList(event)">Николаев</li>
      <li onclick="saveTextSearchList(event)">Единица</li>
			<li onclick="saveTextSearchList(event)">Скважины</li>
			<li onclick="saveTextSearchList(event)">Септики</li>
			<li onclick="saveTextSearchList(event)">Баратеон</li>
			<li onclick="saveTextSearchList(event)">Николаев</li>
			<li onclick="saveTextSearchList(event)">Единица</li>
    	</ul>
    </div>
    <div onclick='editTextSelect(event)' data-name='Ед. изм.'>
                <select onblur="saveTextInput(event)" class="select2 select2-unit  _edit-input" data-select='${id}' name="Единица измерения">
                <option value="-">-</option>
                  <option value="сотка">сотка</option>
                  <option value="м²">м²</option>
                  <option value="м³">м³</option>
                  <option value="м.">м.</option>
                  <option value="усл.">усл.</option>
                  <option value="ед.">ед.</option>
                  <option value="п.м.">п.м.</option>
                  <option value="шт.">шт.</option>
                </select>
                </div>
    <div onclick='editTextInput(event)'data-qty-position data-name='Кол-во.'><input data-number   type="text" data-edit-input onblur="saveTextInput(event)"  class="input-default"></div>
    <div onclick='editTextInput(event)' data-price-position data-name='Цена р.'><input data-number   type="text" data-edit-input onblur="saveTextInput(event)"  class="input-default"></div>
    <div data-sum-position data-name='Сумма р.'>0</div>
    <div><button type="button" class="btn-del-small" onclick="deleteItem(event,'data-position-item')" ></button></div>
  </li>`
  );

  inintSelect2(id);
  initHandelKeyDown();
}
// удаления выбранных элементов через чекбокс, события onclick
export function deleteSelectedItems() {
  const checkboxes = document.querySelectorAll('input[name="checkbox-smeta"]');

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const dataCheck = checkbox.dataset;

      if (Object.keys(dataCheck)[0] === "chkcSmeta") {
        checkbox.closest("[data-smeta-item]").remove();
      }

      if (Object.keys(dataCheck)[0] === "chkcPosition") {
        selectSubtractPosition(checkbox.closest("[data-position-item]"));
        const check = checkbox.closest("[data-position]");
        createIterationNumber(check, () =>
          checkbox.closest("[data-position-item]").remove()
        );
      }
    }
  });
  toggleBulkActionBar();
}
// вычитает сумму при удалении выбранных позиций
function selectSubtractPosition(positionItem) {
  const dataPositionItem = positionItem;
  const stageSum = positionItem
    .closest("[data-stage-item]")
    .querySelector("[data-sum]");

  const smetaSum = positionItem
    .closest("[data-smeta-item]")
    .querySelector(".todo-list__wrapper > .footer-list  [data-sum]");

  stageSum.innerText = formatterIntl(
    Number(stageSum.innerText.replace(/\s+/g, "")) -
      Number(
        dataPositionItem
          .querySelector("[data-sum-position]")
          .innerText.replace(/\s+/g, "")
      )
  );

  smetaSum.innerText = formatterIntl(
    Number(smetaSum.innerText.replace(/\s+/g, "")) -
      Number(
        dataPositionItem
          .querySelector("[data-sum-position]")
          .innerText.replace(/\s+/g, "")
      )
  );
}
// удаления сметы,этапа и позиции, события onclick
export function deleteItem(event, dataSelector) {
  if (dataSelector === "data-smeta-item") {
    event.currentTarget.closest(`[${dataSelector}]`).remove();
  }
  if (dataSelector === "data-stage-item") {
    event.currentTarget.closest(`[${dataSelector}]`).remove();
    subtractStageSum(event.currentTarget.closest(`[${dataSelector}]`));
  }
  if (dataSelector === "data-position-item") {
    subtractPositionSum(event.currentTarget.closest(`[${dataSelector}]`));
    createIterationNumber(event.currentTarget.closest(`[data-position]`), () =>
      event.currentTarget.closest(`[${dataSelector}]`).remove()
    );
  }
  toggleBulkActionBar();
}
// вычитание сумму этапа при удалении одной позиции
function subtractPositionSum(selector) {
  const sumPosition = selector.querySelector("[data-sum-position]");
  const parentStage = selector.closest("[data-stage-item]");
  const sumStage = parentStage.querySelector(".footer-list  [data-sum]");

  subtractSmetaSum(selector, sumPosition.innerText);

  sumStage.innerText = formatterIntl(
    Number(sumStage.innerText.replace(/\s+/g, "")) -
      Number(sumPosition.innerText.replace(/\s+/g, ""))
  );
}
// вычитание сумму сметы при удалении одной позиции
function subtractSmetaSum(selector, currentSum) {
  const smetaItem = selector.closest("[data-smeta-item]");
  const sumSmeta = smetaItem.querySelector(
    ".todo-list__wrapper > .footer-list  [data-sum]"
  );

  let sum = Number(sumSmeta.innerText.replace(/\s+/g, ""));
  sum = sum - Number(currentSum.replace(/\s+/g, ""));
  sumSmeta.innerText = formatterIntl(sum);
}
// вычитание сумму из сметы при удалении одного этапа
function subtractStageSum(selector) {
  const smetaItem = selector.closest("[data-smeta-item]");
  const sumStages = selector.querySelectorAll("[data-sum]");
  const sumSmeta = smetaItem.querySelector(
    ".todo-list__wrapper > .footer-list  [data-sum]"
  );

  const listSumStage = Array.from(sumStages).map((el) => {
    return Number(el.innerText.replace(/\s+/g, ""));
  });

  let sum = Number(sumSmeta.innerText.replace(/\s+/g, ""));

  listSumStage.forEach((el) => {
    sum -= el;
  });

  sumSmeta.innerText = formatterIntl(sum);
}

// События на onblur, чтобы схранить данные с инпута в текст
export function saveTextInput(event) {
  setTimeout(() => {
    let target = event.target;
    let value = target.value;
    const parent = target.parentElement;
    if (target.closest("[data-search-items]") && value) {
      parent.innerText =
        String(Number(value)) === value ? formatterIntl(value) : value;
      createingHiddentInput(value, parent);
      return;
    }

    if (value) {
      parent.innerText =
        String(Number(value)) === value ? formatterIntl(value) : value;
      createingHiddentInput(value, parent);
    }
  }, 100);
}
// События на onclick, чтобы создать input
export function editTextInput(event) {
  let target = event.currentTarget;

  if (target.querySelector("[data-edit-input]")) {
    sumItemPosition(target);
    return;
  }

  createInputEdit(target);
  sumItemPosition(target);
}
// создание инпута в смете, этапе и позции на события onclick
function createInputEdit(parent) {
  const parentText = parent.innerText;
  parent.innerText = "";
  const IsNumber =
    parent.matches("[data-qty-position]") ||
    parent.matches("[data-price-position]");

  if (parent.matches(".list-accordion__name")) {
    parent.insertAdjacentHTML(
      "beforeend",
      `<input type="text" onblur="saveTextInput(event)"   onkeyup="showDropDown(event)"  data-edit-input value="${parentText}"  class="input-default">
      <ul class="list-accordion__search search-position">
      <li onclick="saveTextSearchList(event)">Скважины</li>
      <li onclick="saveTextSearchList(event)">Септики</li>
      <li onclick="saveTextSearchList(event)">Баратеон</li>
      <li onclick="saveTextSearchList(event)">Николаев</li>
      <li onclick="saveTextSearchList(event)">Единица</li>
			<li onclick="saveTextSearchList(event)">Скважины</li>
			<li onclick="saveTextSearchList(event)">Септики</li>
			<li onclick="saveTextSearchList(event)">Баратеон</li>
			<li onclick="saveTextSearchList(event)">Николаев</li>
			<li onclick="saveTextSearchList(event)">Единица</li>
    	</ul>`
    );
  } else {
    parent.insertAdjacentHTML(
      "beforeend",
      `<input type="text" onblur="saveTextInput(event)" ${
        IsNumber ? "data-number" : ""
      }   data-edit-input value="${parentText}"  class="input-default">`
    );
  }
  if (parent.querySelector("[data-edit-input]")) {
    parent.querySelector("[data-edit-input]").focus();
  }

  initHandelKeyDown();
}
// показать скрыть экшн бар, где кнопки "экспортировать", "обновить цену" и "удалить выбранное"
export function toggleBulkActionBar() {
  const checkboxs = document.querySelectorAll('[name="checkbox-smeta"]');
  const tooltipSmeta = document.querySelector(".bulkActionBar");
  const selectedCount = document.querySelector("[data-selected-count]");

  let count = 0;

  let isChecked = false;
  checkboxs.forEach((checkbox) => {
    if (checkbox.checked) {
      ++count;
    }

    if (!isChecked) {
      isChecked = checkbox.checked;
    }
  });

  selectedCount.innerText = count;
  if (isChecked) {
    tooltipSmeta.classList.add("_show-tooltipSmeta");
    document
      .querySelector(".content-wrapper")
      .classList.add("bulkActionBar-bottom");
  } else {
    tooltipSmeta.classList.remove("_show-tooltipSmeta");
    document
      .querySelector(".content-wrapper")
      .classList.remove("bulkActionBar-bottom");
  }
}

// инизацлицаии события onkeydown, чтоб инпут сохранять на нажатия enter
function initHandelKeyDown() {
  const inputs = document.querySelectorAll("[data-edit-input]");
  inputs.forEach((input) => {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        saveTextInput(e);
      }
    });
  });
}
// находит максимальное большое число в списке
function findMaxNumber(parentSmeta) {
  const li = parentSmeta.querySelectorAll(`[data-position]  > li`);
  let max = 0;

  // если путсая таблица
  if (li.length === 0) {
    return 1;
  }

  li.forEach((element) => {
    if (max <= Number(element.children[2].innerText)) {
      max = Number(element.children[2].innerText) + 1;
    }
  });

  return max;
}
//  ставит числа по возрастанию при удаление
function createIterationNumber(selector, callBackDelet) {
  const parentPosition = selector.closest("[data-position]");

  callBackDelet();

  const list = parentPosition.querySelectorAll("[data-position-item]");
  let numberItem = 0;
  for (let i = 0; i < list.length; i++) {
    const element = list[i];
    element.children[2].innerText = ++numberItem;
  }
}

//  Считает сумму в этапе от позиции
function sumItemPosition(selectorDiv) {
  const positionLi = selectorDiv.parentElement;

  const stageLi = selectorDiv.parentElement.closest(".todo-list__item");

  const qty = positionLi.querySelector("[data-qty-position] input");
  const price = positionLi.querySelector("[data-price-position] input");
  const sum = positionLi.querySelector("[data-sum-position]");
  const input = selectorDiv.querySelector("input[data-edit-input]");

  if (input && typeof input.dataset.number !== "undefined") {
    input.addEventListener("blur", (e) => {
      if (qty.value === "" || price.value === "") {
        sum.innerText = 0;
        sumStage(stageLi);
        return;
      }

      if (qty.value && price.value) {
        sum.innerText = formatterIntl(
          (
            Number(qty.value.replace(/\s+/g, "")) *
            Number(price.value.replace(/\s+/g, ""))
          ).toFixed(2)
        );

        createingHiddentInput(sum.innerText, sum);
        sumStage(stageLi);
      }
    });

    input.addEventListener("input", (e) => {
      input.value = input.value.replace(/[^0-9.]/g, "");
    });
  }
}
// пробеллы в числах '1 000 000'
function formatterIntl(number) {
  const formatted = new Intl.NumberFormat("ru").format(number);

  return formatted.replace(",", ".");
}

// считает сумму этапа
function sumStage(stageLi) {
  const selectorSumStage = stageLi.querySelector("[data-sum]");
  let sum = 0;

  const sumlistPosition = stageLi.querySelectorAll(
    `[data-position] > li [data-sum-position]`
  );

  sumlistPosition.forEach((element) => {
    sum = sum + Number(element.innerText.replace(/\s+/g, ""));
  });

  selectorSumStage.innerText = formatterIntl(sum);
  createingHiddentInput(sum, selectorSumStage);
  sumSmeta(stageLi);
}
// считает сумму cметы
function sumSmeta(stageLi) {
  const listSelectorSmeta = stageLi.closest("[data-smeta]");

  const selectorLiSmeta =
    listSelectorSmeta.querySelectorAll("[data-smeta] > li");

  selectorLiSmeta.forEach((smeta) => {
    const sumStage = smeta.querySelectorAll("[data-stages] > li [data-sum]");

    let sum = 0;
    sumStage.forEach((element) => {
      sum += Number(element.innerText.replace(/\s+/g, ""));
    });

    smeta.querySelector(".todo-list__footer [data-sum]").innerText =
      formatterIntl(sum);

    createingHiddentInput(
      sum,
      smeta.querySelector(".todo-list__footer [data-sum]")
    );
  });
}
// выбрать все чекбоксы в позициях onchange
export function chooseAllCheckbox(event) {
  const target = event.target;
  const isChecked = event.currentTarget.checked;

  const stageItem = target.closest(".list-accordion");
  const checkboxs = stageItem.querySelectorAll("[data-chkc-position]");

  checkboxs.forEach((element) => {
    element.checked = isChecked;
  });

  toggleBulkActionBar();
}
// смена ед.изм на на селект в позициях, события на onclick
export function editTextSelect(event) {
  let target = event.currentTarget;

  if (target.querySelector("[data-select]")) {
    return;
  }

  createSelectEdit(target);
}

// созадния селекта в позициях
function createSelectEdit(parent) {
  const parentText = parent.innerText;

  parent.innerText = "";
  const id = generateRandomId();
  parent.insertAdjacentHTML(
    "beforeend",
    `<select onblur="saveTextInput(event)" value='сотка'  class="  select2 select2-unit  _edit-input" data-select='${id}' name="Единица измерения">
                <option value="-">-</option>
                  <option value="сотка">сотка</option>
                  <option value="м²">м²</option>
                  <option value="м³">м³</option>
                  <option value="м.">м.</option>
                  <option value="усл.">усл.</option>
                  <option value="ед.">ед.</option>
                  <option value="п.м.">п.м.</option>
                  <option value="шт.">шт.</option>
                </select>`
  );
  inintSelect2(id);
  changeSelected(parent.children[0].name);
  $(`[data-select='${id}']`).val(parentText).trigger("change");
  $(`[data-select='${id}']`).select2("open");
  parent.dataset.selectId = parent.children[0].name;
}
// сохранение выбранного в секте ед.изм в позиции, события срабатывают на закрытие списка элементов селекта
function changeSelected(id) {
  // Событие при изменении значения
  $(`[data-select='${id}']`).on("select2:close", function (e) {
    saveTextInput(e);
  });
}
if (document.querySelector("[data-smeta-item]")) {
  changeSelected();
}

function inintSelect2(id) {
  $(".select2-unit").select2({
    placeholder: "",
    allowClear: true,
    dropdownCssClass: "select-unit__drop-down",
    width: "resolve",
    minimumResultsForSearch: Infinity,
    language: {
      noResults: function () {
        return "Ничего не найдено";
      },
    },
  });
  // Событие при изменении значения
  changeSelected(id);
}
// показать выпадающий список поиска, события onkeyup
export function showDropDown(event) {
  const target = event.target;
  const dropDown = target
    .closest("[data-search-items]")
    .querySelector(".search-position");

  if (target.value.length == 0) {
    dropDown.classList.remove("_show");
    return;
  }

  searchItems(event);
  dropDown.classList.add("_show");
}
// в позиции сохранить текст в ячейку, при клике на элемент котрый в списке поиска, соыбтия onclick
export function saveTextSearchList(event) {
  let target = event.target;
  const textDropDownItem = target.innerText;

  const parent = target.closest(".list-accordion__name");

  parent.innerText = textDropDownItem;
  createingHiddentInput(textDropDownItem, parent);
  event.stopPropagation();
}

/* Функция которая создает скрытый input */
function createingHiddentInput(value, parent) {
  const name = parent.dataset.name;
  const inputHidden = document.createElement("input");
  inputHidden.setAttribute("type", "hidden");
  inputHidden.value = value;
  inputHidden.name = name;
  parent.append(inputHidden);
}

// при потери фокуса выпадающие меню поиска скрывается, события onblur
export function hiddenDropDown(event) {
  const target = event.target;
  const dropDown = target
    .closest("[data-search-items]")
    .querySelector(".search-position");

  dropDown.classList.remove("_show");
}
