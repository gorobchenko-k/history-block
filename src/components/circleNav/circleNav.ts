import { createElement } from 'utils/createElement';
import { HistoryData } from 'types';

const CIRCLE_WIDTH = 530;
const ITEM_WIDTH = 56;
const CIRCLE_NAV_ROTATE_ANGLE = 45;

export class CircleNav {
  public circleNav = createElement('div', ['history-block__circle-nav', 'circle']);
  private circleNavItem: HTMLDivElement[] = [];
  private currentIndex = 0;
  private angleRotation = 0;

  constructor(historyInfo: HistoryData[]) {
    this.createCircleNav(historyInfo);
  }

  private createCircleNav(historyInfo: HistoryData[]): void {
    const circleLine = createElement('div', ['circle__line']);
    const circleRadius = CIRCLE_WIDTH / 2;
    const itemRadius = ITEM_WIDTH / 2;

    this.circleNav.append(circleLine);

    this.angleRotation = 360 / historyInfo.length;

    historyInfo.forEach((item, index) => {
      // x = x0 + r * cos angle; y = y0 + r * sin angle;
      const angle = this.getAngleInRadians(this.angleRotation * index);
      const x = circleRadius * (1 + Math.cos(-angle)) - itemRadius;
      const y = circleRadius * (1 + Math.sin(-angle)) - itemRadius;
      const navItem = this.createCircleNavItem(index, item.title);

      navItem.style.bottom = y + 'px';
      navItem.style.left = x + 'px';

      this.circleNavItem.push(navItem);
      this.circleNav.append(navItem);
    });
  }

  private createCircleNavItem(itemIndex: number, itemText: string | undefined): HTMLDivElement {
    const navItem = createElement('div', ['circle__item']);
    const navItemLine = createElement('div', ['circle__item-line'], `${itemIndex + 1}`);
    const navItemText = createElement('div', ['circle__item-text'], itemText ?? '');
    navItemLine.setAttribute('item-id', `${itemIndex}`);
    navItem.append(navItemLine, navItemText);
    return navItem;
  }

  public setCurrentItem(newCurrentIndex: number): void {
    this.rotateCircleNav(newCurrentIndex);
    this.circleNavItem.forEach((item) => item.classList.remove('active'));
    this.circleNavItem[newCurrentIndex]?.classList.add('active');
    this.currentIndex = newCurrentIndex;
  }

  private rotateCircleNav(newCurrentIndex: number): void {
    const currentAngle = this.currentIndex * this.angleRotation;
    const rotationAngleToItem = (newCurrentIndex - this.currentIndex) * this.angleRotation;
    const newRotationAngle = currentAngle + rotationAngleToItem + CIRCLE_NAV_ROTATE_ANGLE;
    this.circleNav.style.transform = `translate(-50%, -50%) rotate(${-newRotationAngle}deg)`;
    this.circleNavItem.forEach((item) => {
      item.style.transform = `rotate(${newRotationAngle}deg)`;
    });
  }

  private getAngleInRadians(angleInDegrees: number): number {
    // 1 рад = 1° * π / 180
    return (angleInDegrees * Math.PI) / 180;
  }
}
