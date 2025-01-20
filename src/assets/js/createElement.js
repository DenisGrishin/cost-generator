function generateRandomId() {
  return (
    "id-" + Math.random().toString(36).substr(2, 9) + Date.now().toString(36)
  );
}
export function creatingSmeta() {
  const listSmeta = document.querySelector("[data-smeta]");

  let idItem = generateRandomId();
  if (listSmeta) {
    listSmeta.insertAdjacentHTML(
      "beforeend",
      `  <li class="todo-list__item   d-flex" data-item-id="${idItem}">
  <div class="todo-list__wrapper">
    <div class="todo-list__contetn">
      <span class="handle  _icon-darag">
      </span>
      <div class="todo-list__accordion accordion  card ">
        <div class="text-left  accordion__header collapsed middle-title">
          <button type="button" class="accordion__btn" data-animation-speed="0" data-card-widget="collapse"></button>
          <label class="accordion__checkbox checkbox">
            <input hidden type="checkbox" class="checkbox__input" name="checkbox-smeta" onchange="showBulkActionBar()">
          </label>
          <div class="accordion__header-content">
            <div class="accordion__name" onclick='editTextInput(event)'><input type="text" data-edit-input onblur="saveTextInput(event)"  class="input-default"></div>
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
                  <button type="button" onclick="deleteItem('${idItem}')"  class="btn-del-big"><span>Удалить</span></button>
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
      <button type="button" class="butt-plus" onclick="creatingStages('${idItem}')" data-create-stage><span>Этап
          работ</span></button>
      <span class="footer-list__sum">Итого по смете: <span data-sum-id="${idItem}">0</span> р.</span>
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

  autoFocusInput(idItem);
  handelKeyDown();
}

export function creatingStages(idSmeta) {
  const parentSmeta = document.querySelector(`[data-item-id='${idSmeta}']`);

  const listStages = parentSmeta.querySelector(`[data-stages]`);

  const idItem = generateRandomId();

  listStages.insertAdjacentHTML(
    "beforeend",
    `    <li class="todo-list__item p-0 " data-item-id='${idItem}'>
                      <div class="todo-list__contetn">
                        <span class="handle  _icon-darag">
                        </span>
                        <div class="todo-list__accordion accordion card ">
                          <!-- Начала Позиций  -->

                          <div class=" text-left accordion__header middle-title">
                            <button type="button" class="accordion__btn" data-animation-speed="0" data-card-widget="collapse"></button>

                            <div class="accordion__header-content">
                              <div class="accordion__name very-small-title accordion__name_small-text" onclick='editTextInput(event)'><input  type="text" data-edit-input onblur="saveTextInput(event)"  class="input-default"></div>
                              <div class="accordion__del-btn accordion__del-btn_small"><button onclick="deleteItem('${idItem}')" type="button" 
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
                                <button type="button" class="butt-plus" onclick="creatingPosition('${idItem}')"
                                  data-create-position><span>Позиция</span></button>
                                <span class="footer-list__sum">Итого:<span
																		data-sum-id="${idItem}">0</span> р.</span>
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

  autoFocusInput(idItem);
  handelKeyDown();
}

export function creatingPosition(idStage) {
  const parentSmeta = document.querySelector(`[data-item-id='${idStage}']`);

  const listPosition = parentSmeta.querySelector("[data-position]");
  let numerItem = findMaxNumber(parentSmeta);
  const idItem = generateRandomId();

  listPosition.insertAdjacentHTML(
    "beforeend",
    `<li class="list-accordion__item" data-item-id='${idItem}'>
    <div class="handle _icon-darag"></div>
    <div><label class="checkbox">
        <input  hidden="" type="checkbox" class="checkbox__input" name="checkbox-smeta" onchange="showBulkActionBar()">
      </label></div>
    <div>${++numerItem}</div>
    <div></div>
    <div class="list-accordion__name" onclick='editTextInput(event)'><input   type="text" data-edit-input onblur="saveTextInput(event)"  class="input-default"></div>
    <div onclick='editTextInput(event)'><input   type="text" data-edit-input onblur="saveTextInput(event)"  class="input-default"></div>
    <div onclick='editTextInput(event)'data-qty-position><input data-number   type="text" data-edit-input onblur="saveTextInput(event)"  class="input-default"></div>
    <div onclick='editTextInput(event)' data-price-position><input data-number   type="text" data-edit-input onblur="saveTextInput(event)"  class="input-default"></div>
    <div data-sum-position>0</div>
    <div><button type="button" class="btn-del-small" onclick="deleteItem('${idItem}')" ></button></div>
  </li>`
  );

  handelKeyDown();
}

export function deleteSelectedItems() {
  const checkboxes = document.querySelectorAll('input[name="checkbox-smeta"]');

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked && checkbox.closest("[data-item-id]")) {
      checkbox.closest("[data-item-id]").remove();
    }
  });
  showBulkActionBar();
  createIterationNumber();
}

export function deleteItem(id) {
  document.querySelector(`[data-item-id='${id}']`).remove();
  createIterationNumber();
  showBulkActionBar();
}

export function searchItems() {
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

export function saveTextInput(event) {
  let target = event.target;
  let value = target.value;
  const parent = target.parentElement;

  if (value) {
    parent.innerText =
      String(Number(value)) === value ? formatterIntl(value) : value;
    target.remove();
  }
}

export function editTextInput(event) {
  let target = event.currentTarget;

  if (target.children.length !== 0) {
    sumItemPosition(target);
    return;
  }

  createInputEdit(target);
  sumItemPosition(target);
}

function createInputEdit(parent) {
  const parentText = parent.innerText;
  parent.innerText = "";
  const dataNumbers = Object.keys(parent.dataset)[0] ? "data-number" : "";

  parent.insertAdjacentHTML(
    "beforeend",
    `<input type="text" onblur="saveTextInput(event)" ${dataNumbers}   data-edit-input value="${parentText}"  class="input-default">`
  );

  if (document.querySelector(".accordion__name")) {
    parent.children[0].focus();
  }

  handelKeyDown();
}

export function showBulkActionBar() {
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

  isChecked
    ? tooltipSmeta.classList.add("_show-tooltipSmeta")
    : tooltipSmeta.classList.remove("_show-tooltipSmeta");
}

function handelKeyDown() {
  const inputs = document.querySelectorAll("[data-edit-input]");
  inputs.forEach((input) => {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        saveTextInput(e);
      }
    });
  });
}

function autoFocusInput(idItem) {
  if (
    document.querySelector(`[data-item-id='${idItem}'] input[data-edit-input]`)
  ) {
    document
      .querySelector(`[data-item-id='${idItem}'] input[data-edit-input]`)
      .focus();
  }
}
function findMaxNumber(parentSmeta) {
  const li = parentSmeta.querySelectorAll(`.list-accordion__body li`);
  let max = 0;
  // если путсая таблица
  if (li.length === 0) {
    return 0;
  }

  li.forEach((element) => {
    if (0 < Number(element.children[2].innerText)) {
      max = Number(element.children[2].innerText);
    }
  });

  return max;
}

function createIterationNumber() {
  const list = document.querySelectorAll(".list-accordion__body li");
  let numberItem = 0;
  for (let i = 0; i < list.length; i++) {
    const element = list[i];
    element.children[2].innerText = ++numberItem;
  }
}

function sumItemPosition(selectorDiv) {
  const positionLi = selectorDiv.parentElement;

  const stageLi = selectorDiv.parentElement.closest(".todo-list__item");

  const qty = positionLi.querySelector("[data-qty-position]");
  const price = positionLi.querySelector("[data-price-position]");
  const sum = positionLi.querySelector("[data-sum-position]");
  const input = selectorDiv.querySelector("input[data-edit-input]");

  if (input && typeof input.dataset.number !== "undefined") {
    input.addEventListener("blur", (e) => {
      if (qty.innerText === "" || price.innerText === "") {
        sum.innerText = 0;
        sumStage(stageLi);
        return;
      }

      if (qty.innerText && price.innerText) {
        sum.innerText = formatterIntl(
          (
            Number(qty.innerText.replace(/\s+/g, "")) *
            Number(price.innerText.replace(/\s+/g, ""))
          ).toFixed(2)
        );

        sumStage(stageLi);
      }
    });

    input.addEventListener("input", (e) => {
      input.value = input.value.replace(/[^0-9.]/g, "");
    });
  }
}

function formatterIntl(number) {
  const formatted = new Intl.NumberFormat("ru").format(number);

  return formatted.replace(",", ".");
}

function sumStage(stageLi) {
  const selectorSumStage = stageLi.querySelector("[data-sum-id]");
  let sum = 0;

  if (selectorSumStage.dataset.sumId) {
    const sumPositions = document.querySelectorAll(
      `[data-item-id="${selectorSumStage.dataset.sumId}"] .list-accordion__item [data-sum-position]`
    );

    sumPositions.forEach((element) => {
      sum = sum + Number(element.innerText.replace(/\s+/g, ""));
    });

    selectorSumStage.innerText = formatterIntl(sum);
    sumSmeta(stageLi);
  }
}

function sumSmeta(stageLi) {
  const listSelectorSmeta = stageLi.closest("[data-smeta]");

  const selectorLiSmeta =
    listSelectorSmeta.querySelectorAll("[data-smeta] > li");

  selectorLiSmeta.forEach((smeta) => {
    const sumStage = smeta.querySelectorAll("[data-stages] > li [data-sum-id]");

    let sum = 0;
    sumStage.forEach((element) => {
      sum += Number(element.innerText.replace(/\s+/g, ""));
    });

    smeta.querySelector(".todo-list__footer [data-sum-id]").innerText =
      formatterIntl(sum);
  });
}
