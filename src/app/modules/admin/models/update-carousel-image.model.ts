import { ICarouselImage } from "../interfaces/carousel-image.interface";

export class CarouselImageModel implements ICarouselImage{

  constructor(
    public imgSrc: string,
    public imgAlt: string,
    public id?: number
  ){}
}