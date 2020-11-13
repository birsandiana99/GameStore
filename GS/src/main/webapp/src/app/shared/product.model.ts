export class Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: Uint8Array;

  constructor(id: number, name: string, description: string, price: number, image: Uint8Array) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.image = image;
  }
}
