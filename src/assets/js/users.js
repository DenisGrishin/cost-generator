// события выбра роли, onchange
export function changeRole(event) {
  let target = event.target;

  const parentSelectorRole = target.closest("[data-role]");
  const currentNameRole = parentSelectorRole.querySelector(
    ".accordion__header-content"
  );
  const selectedRole = target.value;

  currentNameRole.innerText = selectedRole;
}
