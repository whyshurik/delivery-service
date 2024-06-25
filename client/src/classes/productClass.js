export class productClass{
    pId;
    name;
    price;
    amount;
    constructor(pId, name, price, amount) {
        this.pId = pId;
        this.name = name;
        this.price = price;
        this.amount = amount;
    }
    totalCalc() {
        return (this.price * this.amount).toFixed(2);
    }
}