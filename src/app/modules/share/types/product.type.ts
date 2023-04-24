import { IEntranceDoor } from "../interfaces/common/entrance-door.interface";
import { IFurniture } from "../interfaces/common/furniture.interface";
import { IInteriorDoor } from "../interfaces/common/interior-door.interface";
import { IProduct } from "../interfaces/common/product.interface";
import { IWindow } from "../interfaces/common/window.interface";


export type productMultiType = IInteriorDoor | IEntranceDoor | IWindow | IFurniture | IProduct;