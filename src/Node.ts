interface ItemView {
    view: any;
}

interface ItemUse {
    enable: boolean;
    onActive(): void;
    onDisActive(): void;
}

export default class Node implements ItemView, ItemUse {
    id: number;
    x: number;
    y: number;
    view: any;
    enable: boolean = true;

    active_style = { fill: 'blue', stroke: 'red', };
    prime_pos = { x: 0, y: 0 };

    constructor() {
        // this.id = _id;
        this.id = Math.random();
        this.x = Math.random() * 600;
        this.y = Math.random() * 600;
    }

    onClick() {
        console.log(this.id);
    }
    onActive() {
        this.view.children[0].style.fill = 'blue';
    }
    onDisActive() {
        this.view.children[0].style.fill = '#ddd';
    }
    onMove(clientX: number, clientY: number) {
        this.view.style.transform = `translate(${clientX}px, ${clientY}px)`;
    }
}

