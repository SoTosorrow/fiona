import { Component, createSignal, For, onMount } from 'solid-js';
import NodeView from './NodeView'
import Node from './Node'

let test=(node:Node)=>{
    console.dir(node.view);
    node.view.children[0].style.fill = "blue"
}

let active_item_view:any = null;
let sceneMouseUp = (e:any)=>{
    active_item_view = null;
}
let sceneMouseDown = (e:any)=>{
    console.log("testsss",e);
    
    if(e.which == '3' && e.target.parentNode.localName === 'g'){
        e.target.parentNode.style.display = "none";
    }

    // 可以直接定位到点击元素
    if(e.target.nodeName === 'svg'){
        active_item_view = null;
        return;
    }
    // tmp search Node
    if(e.target.parentNode.localName !== 'g'){
        return;
    }
    if(e.which == '1'){
        active_item_view = e.target.parentNode;
    }
}
let sceneMouseMove = (e:any)=>{
    if(active_item_view){
        active_item_view.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        // @test
        active_item_view.children[0].style.fill = `#${e.clientY}`;
    }
}

let Scene:Component =()=>{
    const [nodes, setNodes] = createSignal([
        new Node(),
        new Node(),
    ]);

    return (
    <>
        <svg id="view" 
            width="500" 
            height="400" 
            style="margin:0;background-color:gray;"
            onMouseDown={sceneMouseDown}    
            onMouseUp={sceneMouseUp}    
            onMouseMove={sceneMouseMove}    
        >
            {/* <text class="font" x='200' y='200'>Finoa</text> */}

            <For each={nodes()}>
                {(node, index)=>(
                    <NodeView
                        ref={node.view}
                        onClick={[test,node]}
                        fill="green"
                    />
                )}
            </For>
        </svg>
    </>
    );
}

export default Scene;