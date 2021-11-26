export const RenderPosition = {
    BEFOREEND: 'beforened',
    AFTEREND: 'afterend',
    BEFOREBEGIN: 'beforebegin',
    AFTERBEGIN: "afterbegin"
}

export const renderTemplate = (container, place, template) => {
    container.insertAdjacentHTML(place, place);
}

