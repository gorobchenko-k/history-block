import { createElement } from 'utils/createElement';

export class Years {
  public years = createElement('div', ['history-block__years', 'years']);
  private startYear: HTMLSpanElement;
  private endYear: HTMLSpanElement;

  constructor() {
    this.startYear = createElement('span', ['years__start-year'], '1900');
    this.endYear = createElement('span', ['years__end-year'], '1900');
    this.years.append(this.startYear, this.endYear);
  }

  public setContent(startYear: number, endYear: number): void {
    this.animateSetContent(startYear, endYear);
  }

  private animateSetContent(newStartYear: number, newEndYear: number): void {
    let startYearNumber = Number(this.startYear.textContent);
    let endYearNumber = Number(this.endYear.textContent);
    const step = startYearNumber < newStartYear ? 1 : -1;
    const numberOfSteps = Math.max(Math.abs(newStartYear - startYearNumber), Math.abs(newEndYear - endYearNumber));
    const time = 1000 / numberOfSteps;

    const intervalId = setInterval(() => {
      if (startYearNumber !== newStartYear) {
        startYearNumber += step;
        this.startYear.textContent = `${startYearNumber}`;
      }
      if (endYearNumber !== newEndYear) {
        endYearNumber += step;
        this.endYear.textContent = `${endYearNumber}`;
      }
      if (startYearNumber === newStartYear && endYearNumber === newEndYear) {
        clearInterval(intervalId);
      }
    }, time);
  }
}
