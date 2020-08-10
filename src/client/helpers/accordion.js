export const handleToggleExpand = e => {
  const button = e.target.closest('button');
  if (button) button.classList.toggle('expanded')
}

export const handleCollapseAll = cls => {
  const accordionItems = document.querySelectorAll(cls);
  for (let accordionItem of accordionItems) {
    accordionItem.classList.remove('expanded')
  }
}

export const handleExpandAll = cls => {
  const accordionItems = document.querySelectorAll(cls);
  for (let accordionItem of accordionItems) {
    accordionItem.classList.add('expanded')
  }
}