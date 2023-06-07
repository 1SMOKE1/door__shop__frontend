import { ICarouselImageResponse } from "../interfaces/carousel-image-response.interface";
import { ICarouselImage } from "../interfaces/carousel-image.interface";
import { CarouselImageModel } from "../models/update-carousel-image.model";

export class ConvertingOurWorksClass{

  protected initFormData(image: File | null): FormData{
    const formData = new FormData();
    formData.append('imgAlt', 'no image')
    if(image){
      formData.append('image', image, image.name);
    }

    return formData
  }

  protected convertCarouselImage({
    img_src,
    img_alt,
    id
  }: ICarouselImageResponse): ICarouselImage {
    return new CarouselImageModel(
      img_src,
      img_alt,
      id
    )
  }
}