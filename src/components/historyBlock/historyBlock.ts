import { createElement } from 'utils/createElement';
import { historyInfo } from 'data/historyData';
import { Years } from 'components/years/years';
import { CircleNav } from 'components/circleNav/circleNav';
import { Pagination } from 'components/pagination/pagination';
import { Slider } from 'components/slider/slider';
import { HistoryData } from 'types';

export class HistoryBlock {
  private historyBlock = createElement('div', ['history-block']);
  private subTitle = createElement('h3', ['history-block__sub-title']);
  private currentItem = 0;
  private years = new Years();
  private circleNav = new CircleNav(historyInfo);
  private pagination = new Pagination(historyInfo.length);
  private slider = new Slider();

  constructor() {
    this.createBlock();
    this.setContent();
    this.addBlockHandler();
  }

  private createBlock(): void {
    const blockContainer = createElement('div', ['history-block__container']);
    const blockTitle = createElement('h1', ['history-block__title'], 'Исторические даты');
    blockContainer.append(
      blockTitle,
      this.years.years,
      this.circleNav.circleNav,
      this.subTitle,
      this.pagination.pagination,
      this.slider.slider
    );
    this.historyBlock.append(blockContainer);
  }

  private setContent(): void {
    const currentInfo = historyInfo[this.currentItem];
    if (currentInfo) {
      this.animateSetContent(currentInfo);
      this.years.setContent(currentInfo.startYear, currentInfo.endYear);
      this.circleNav.setCurrentItem(this.currentItem);
      this.pagination.setContent(this.currentItem);
    }
  }

  private addBlockHandler(): void {
    this.circleNav.circleNav.addEventListener('click', (e) => {
      const target = e.target;
      if (target instanceof HTMLElement && target.classList.contains('circle__item-line')) {
        this.setCurrentItem(+(target.getAttribute('item-id') ?? ''));
      }
    });
    this.pagination.pagination.addEventListener('click', (e) => {
      const target = e.target;
      if (target instanceof HTMLElement) {
        if (target.classList.contains('pagination__bullet')) {
          this.setCurrentItem(+(target.getAttribute('item-id') ?? ''));
        } else if (target.classList.contains('prev-button') && this.currentItem - 1 >= 0) {
          this.setCurrentItem(this.currentItem - 1);
        } else if (target.classList.contains('next-button') && this.currentItem + 1 < historyInfo.length) {
          this.setCurrentItem(this.currentItem + 1);
        }
      }
    });
  }

  private setCurrentItem(currentItemIndex: number): void {
    this.currentItem = currentItemIndex;
    this.setContent();
  }

  private animateSetContent(currentInfo: HistoryData): void {
    this.slider.slider.classList.add('hidden');
    this.subTitle.classList.add('hidden');
    setTimeout(() => {
      this.slider.setContent(currentInfo.events);
      this.subTitle.textContent = currentInfo.title ?? '';
      this.slider.slider.classList.remove('hidden');
      this.subTitle.classList.remove('hidden');
    }, 1000);
  }

  public render(scope: HTMLElement): void {
    scope.append(this.historyBlock);
    this.slider.createSlider();
  }
}
