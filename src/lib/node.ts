export default class Node {
    id:number;
    x:number;
    y:number;
    fill:string;
    // view:any;

    constructor(){
        // this.id = _id;
        this.id= Math.random();
        this.x = Math.random() * 600;
        this.y = Math.random() * 600;
        this.fill = '#ddd'
    }

    onClick(){
        console.log(this.id);
    }
    // onActive(){

    // }
}

