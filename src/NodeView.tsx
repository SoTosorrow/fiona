import type { Component } from "solid-js";
import {createSignal} from "solid-js"

interface NodeViewProps {
    ref:any;    // 转发ref
    onClick: any;   // ()=>void
    fill?: string;
}

let NodeView:Component<NodeViewProps> =(props) =>{
    console.log(props);
    const [pos, setPos] = createSignal<number>(0);
    
    return (
        <g 
            onClick={props.onClick}
            ref={props.ref}
        >
            <rect
                width="100"
                height="40"
                rx="5px"
                fill={props.fill || "#ddd"}
                stroke="black"
                stroke-width="2"
                transform="translate(0, 0)"
            />
        </g>
    );
}

export default NodeView;