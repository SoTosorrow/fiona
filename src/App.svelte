<script lang="ts">
    import { onMount } from "svelte";
    import Node from "./lib/node";
    import NodeView from "./lib/NodeView.svelte";
    import { active_item, active_item_sub } from "./lib/stores";



    let nodes: any = [];

    onMount(()=>{
        console.log("init...");
        for(let i=0;i<5;i++){
            nodes.push(new Node());
        }
        nodes = nodes
    })

    let current_active_item = null;
    let addItem = ()=>{
        nodes = [...nodes, new Node()];

    }
    let activeItem=(item)=>{
        console.log(item);
    }

    let view_stat = false;
    let sceneMouseDown = (e)=>{
        // console.log('down');
        if(e.which == '1'){
            view_stat = true;
        }
        if(e.which == '2'){
            addItem();
            console.log(active_item);
            
        }
    }
    let sceneMouseUp = (e)=>{
        // console.log('up');
        view_stat = false;
    }
    let sceneMouseMove = (e)=>{
        if(view_stat === true && current_active_item){
            current_active_item.view.children[0].style.fill = `#${e.clientY}`;
            current_active_item.view.children[0].style.transform =`translate(${e.clientX}px, ${e.clientY}px)`;
            current_active_item.view.children[0].style.x = '0'
            current_active_item.view.children[0].style.y = '0'
        }
    }
    let itemClick=(item)=>{
        console.log(item.style);
        active_item_sub.set(item)
        item.fill = 'blue'
        nodes = nodes;
    }

    

</script>

<main style="height:100vh;width:100vw;">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <svg id="view" width="1000" height="900" style="margin:0;background-color:gray;"
        on:mousedown={sceneMouseDown}
        on:mouseup={sceneMouseUp}
        on:mousemove={sceneMouseMove}
    >
        {#each nodes as node}
            <NodeView 
                x={node.x} 
                y={node.y} 
                id={node.id} 
                fill={node.fill}
                on:click={()=>{itemClick(node)}}
            />
        {/each}

    </svg>
</main>

<style>
</style>
