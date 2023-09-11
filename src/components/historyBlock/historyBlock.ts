import { createElement } from 'utils/createElement';
import { historyInfo } from 'data/historyData';
import { Years } from 'components/years/years';

export class HistoryBlock {
  private historyBlock = createElement('div', ['history-block']);
  private subTitle = createElement('h3', ['history-block__sub-title']);
  private currentItem = 0;
  private years = new Years();

  constructor() {
    this.createBlock();
    this.setContent();
  }

  private createBlock(): void {
    const blockContainer = createElement('div', ['history-block__container']);
    const blockTitle = createElement('h1', ['history-block__title'], 'Исторические даты');
    blockContainer.append(blockTitle, this.years.years, this.subTitle);
    this.historyBlock.append(blockContainer);
  }

  private setContent(): void {
    const currentInfo = historyInfo[this.currentItem];
    if (currentInfo) {
      this.subTitle.textContent = currentInfo.title ?? '';
      this.years.setContent(currentInfo.startYear, currentInfo.endYear);
    }
  }

  public render(scope: HTMLElement): void {
    scope.append(this.historyBlock);
  }
}
