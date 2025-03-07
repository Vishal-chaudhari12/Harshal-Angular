import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {

  images = [
    '',
    'assets/images/image1.jpg',
    'assets/images/phone3.jpg',
    'assets/images/phone4.jpg'
  ];

  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    dots: false
  };
slickModal: any;

}
