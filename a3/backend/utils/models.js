export class Product {

    constructor(image, title, description, price) {
        this.image = image;
        this.title = title;
        this.description = description;
        this.price = price;
        this.id = `${(Math.random() * 10).toPrecision(1)}`;
    }
}
