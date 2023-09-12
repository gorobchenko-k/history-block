import 'swiper/scss';
import 'swiper/scss/navigation';
import { createElement } from 'utils/createElement';
import { Swiper } from 'swiper';
import { Navigation } from 'swiper/modules';
import { Swiper as SwiperType, SwiperOptions } from 'swiper/types';
import { HistoryData } from 'types';

export class Slider {
  public slider = createElement('div', ['history-block__slider', 'slider', 'swiper']);
  private sliderWrapper = createElement('div', ['swiper-wrapper']);
  private swiper: SwiperType | undefined;

  constructor() {
    this.createSliderContent();
  }

  private createSliderContent(): void {
    const nextButton = createElement('div', ['swiper-button-next', 'button']);
    const prevButton = createElement('div', ['swiper-button-prev', 'button']);
    this.slider.append(this.sliderWrapper, nextButton, prevButton);
  }

  private createSlide(year: string, description: string): HTMLDivElement {
    const sliderItem = createElement('div', ['slider__item', 'swiper-slide']);
    const itemTitle = createElement('h5', ['slider__item-title'], year);
    const itemContent = createElement('h5', ['slider__item-content'], description);
    sliderItem.append(itemTitle, itemContent);
    return sliderItem;
  }

  public setContent(data: HistoryData['events']): void {
    this.sliderWrapper.innerHTML = '';
    Object.entries(data).forEach(([year, description]) => {
      const slide = this.createSlide(year, description);
      this.sliderWrapper.append(slide);
    });
    this.swiper?.update();
  }

  public createSlider(): void {
    const swiperParams: SwiperOptions = {
      slidesPerView: 1,
      spaceBetween: 25,
      width: 190,
      breakpoints: {
        768: {
          slidesPerView: 3,
          spaceBetween: 80,
          width: 1280,
        },
      },
      grabCursor: true,
      modules: [Navigation],
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    };

    this.swiper = new Swiper('.history-block__slider', swiperParams);
  }
}
