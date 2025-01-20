export function editPositionPriceList(event) {
  const target = event.target;
  const tr = target.closest("tr");
  const editItem = tr.querySelectorAll("._edit");
  const arrData = [];

  editItem.forEach((item) => {
    arrData.push(item.innerText);
  });

  const modal = document.querySelector("#modal-lg");
  modal.dataset.modalId = tr.id;

  const itemEdit = document.querySelectorAll(".user-info > div");

  itemEdit.forEach((element, indx) => {
    const input = element.querySelector("input");
    input.value = arrData[indx];
  });
}

export function saveEditPositionPriceList(event) {
  const target = event.target;
  const modalId = target.closest("[data-modal-id]").dataset.modalId;
  const modal = target.closest("[data-modal-id]");
  const itemPriceList = document.querySelectorAll(".price-list tbody tr");
  const itemEdit = modal.querySelectorAll(".user-info > div");

  const arrData = [];

  itemEdit.forEach((element, indx) => {
    const input = element.querySelector("input");

    arrData.push(input.value);
  });
  itemPriceList.forEach((item) => {
    if (item.id === modalId) {
      item.querySelectorAll("._edit").forEach((item, indx) => {
        item.innerText = arrData[indx];
      });
    }
  });
}
