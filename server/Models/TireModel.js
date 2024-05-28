class Tire{
    constructor(id,brand, model, price,size,quantity,description,addedby){
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.price = price;
        this.size = size;
        this.quantity = quantity;
        this.description = description;
        this.addedby = addedby;
    }
}

module.exports = Tire;