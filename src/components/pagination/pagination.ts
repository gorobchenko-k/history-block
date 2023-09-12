import { createElement } from 'utils/createElement';

export class Pagination {
  public pagination = createElement('div', ['history-block__pagination', 'pagination']);
  private currentNumber = createElement('span', ['current-item']);
  private prevButton = createElement('button', ['prev-button', 'button', 'circe-button']);
  private nextButton = createElement('button', ['next-button', 'button', 'circe-button']);
  private paginationBullets: HTMLDivElement[] = [];
  private numberOfItems: number;

  constructor(numberOfItems: number) {
    this.numberOfItems = numberOfItems;
    this.createPagination();
  }

  private createPagination(): void {
    const container = createElement('div');
    const numbers = createElement('div', ['pagination__items-number']);
    const buttons = createElement('div', ['pagination__buttons']);
    const paginationBullets = this.createPaginationBullets();
    const numberOfAllItems = createElement('span', ['all-item'], `${this.numberOfItems}`.padStart(2, '0'));
    numbers.append(this.currentNumber, '/', numberOfAllItems);
    buttons.append(this.prevButton, this.nextButton);
    container.append(numbers, buttons);
    this.pagination.append(container, paginationBullets);
  }

  private createPaginationBullets(): HTMLDivElement {
    const pagination = createElement('div', ['pagination__bullets']);
    for (let i = 0; i < this.numberOfItems; i++) {
      const paginationItem = createElement('div', ['pagination__bullet']);
      paginationItem.setAttribute('item-id', `${i}`);
      pagination.append(paginationItem);
      this.paginationBullets.push(paginationItem);
    }

    return pagination;
  }

  public setContent(currentItemIndex: number): void {
    this.currentNumber.textContent = `${currentItemIndex + 1}`.padStart(2, '0');
    this.paginationBullets.forEach((bullet) => bullet.classList.remove('active'));
    this.paginationBullets[currentItemIndex]?.classList.add('active');
    this.prevButton.disabled = currentItemIndex === 0;
    this.nextButton.disabled = currentItemIndex === this.numberOfItems - 1;
  }
}
