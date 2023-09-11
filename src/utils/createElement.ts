export const createElement = <K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  classes?: string[],
  content?: string,
  idName?: string
): HTMLElementTagNameMap[K] => {
  const element = document.createElement(tagName);
  classes && element.classList.add(...classes);
  idName && element.setAttribute('id', idName);
  if (content) {
    element.textContent = content;
  }
  return element;
};
