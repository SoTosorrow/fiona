export default class Node {
    id:number;
    x:number;
    y:number;
    view:any;

    constructor(){
        // this.id = _id;
        this.id= Math.random();
        this.x = Math.random() * 200;
        this.y = Math.random() * 200;
    }

    onClick(){
        console.log(this.id);
    }
    // onActive(){

    // }
}