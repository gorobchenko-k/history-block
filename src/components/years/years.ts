import { createElement } from 'utils/createElement';

export class Years {
  public years = createElement('div', ['history-block__years', 'years']);
  private startYear: HTMLSpanElement;
  private endYear: HTMLSpanElement;

  constructor() {
    this.startYear = createElement('span', ['years__start-year']);
    this.endYear = createElement('span', ['years__end-year']);
    this.years.append(this.startYear, this.endYear);
  }

  public setContent(startYear: number, endYear: number): void {
    this.startYear.textContent = `${startYear}`;
    this.endYear.textContent = `${endYear}`;
  }
}
