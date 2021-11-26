export const RenderPosition = {
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
};

export const renderTemplate = (container, place, template) => {
  container.insertAdjacentHTML(place, template);
};

