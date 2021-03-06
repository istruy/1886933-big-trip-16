import AbstractView from '../view/abstract-view';

export const RenderPosition = {
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
};

export const render = (container, place, template) => {
  const parent = container instanceof AbstractView ? container.element : container;
  const child = template instanceof AbstractView ? template.element : template;

  switch (place) {
    case RenderPosition.BEFOREBEGIN:
      parent.before(child);
      break;
    case RenderPosition.AFTERBEGIN:
      parent.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      parent.append(child);
      break;
    case RenderPosition.AFTEREND:
      parent.after(child);
      break;
  }
};

export const replace = (newElement, oldElement) => {
  if (newElement === null || oldElement === null) {
    throw new Error('Can\'t replace unexisting elements');
  }

  const newChild = newElement instanceof AbstractView ? newElement.element : newElement;
  const oldChild = oldElement instanceof AbstractView ? oldElement.element : oldElement;

  const parent = oldChild.parentElement;

  if (parent === null) {
    throw new Error('Parent element doesn\'t exist');
  }

  parent.replaceChild(newChild, oldChild);
};

export const add = (newElement, oldElement) => {
  if (newElement === null) {
    throw new Error('Can\'t replace unexisting elements');
  }
  const newChild = newElement instanceof AbstractView ? newElement.element : newElement;
  const oldChild = oldElement instanceof AbstractView ? oldElement.element : oldElement;

  const parent = oldChild.parentElement;

  if (parent === null) {
    throw new Error('Parent element doesn\'t exist');
  }

  if (!(parent.firstChild.innerHTML === newChild.innerHTML)) {
    parent.prepend(newChild);
  }

};

export const removeElement = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof AbstractView)) {
    throw new Error('Can remove only components!');
  }

  component.element.remove();
  component.removeElement();
};

// ?????????????? ???????????? ??????????:
// 1. ?????????????? ???????????? div-????????
// 2. ?????????? HTML ?? ???????? ???????????? ?? ???????????????????? ?? ???????? div-????????, ?????????????????? ?? DOM-??????????????
// 3. ???????????????????? ???????? DOM-??????????????
export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};
