export const RenderPosition = {
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
};

export const render = (container, place, template) => {
  switch (place) {
    case RenderPosition.BEFOREBEGIN:
      container.before(template);
      break;
    case RenderPosition.AFTERBEGIN:
      container.prepend(template);
      break;
    case RenderPosition.BEFOREEND:
      container.append(template);
      break;
    case RenderPosition.AFTEREND:
      container.after(template);
      break;
  }
};

// Принцип работы прост:
// 1. создаём пустой div-блок
// 2. берём HTML в виде строки и вкладываем в этот div-блок, превращая в DOM-элемент
// 3. возвращаем этот DOM-элемент
export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};
