<script lang="ts">
    import { onMount } from "svelte";
    import Node from "./lib/node";
    import NodeView from "./lib/NodeView.svelte";

    let nodes: any = [];
    let view_stat = false;
    let active_item = null;

    onMount(()=>{
        console.log("init...");
        for(let i=0;i<5;i++){
            nodes.push(new Node());
        }
        sceneUpdateForce();
    })

    let sceneAddNode = ()=>{
        nodes = [...nodes, new Node()];
    }
    let sceneDelNode = (node)=>{
        if(node){
            node.enable = false;
            sceneUpdateForce(); 
        }
    }
    let sceneUpdateForce = ()=>{
        nodes = nodes;
    }

    let sceneMouseDown = (e)=>{
        if(e.which == '1'){
            view_stat = true;
        }
        if(e.which == '2'){
            sceneAddNode();
        }
        if(e.which == '3'){
            sceneDelNode(active_item);
            active_item = null;
        }
    }
    let sceneMouseUp = (e)=>{
        view_stat = false;
    }
    let sceneMouseMove = (e)=>{
        if(view_stat === true && active_item){
            active_item.view.children[0].style.fill = `#${e.clientY}`;
            active_item.onMove(e.clientX,e.clientY)
        }
    }
    let itemClick=(item)=>{
        if(active_item) {
            active_item.onDisActive();
        }
        active_item = item;
        active_item.onActive();
        sceneUpdateForce();
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
            {#if node.enable}
                <NodeView 
                    id={node.id}
                    x={node.x} 
                    y={node.y} 
                    bind:view={node.view}
                    on:click={()=>{itemClick(node)}}
                    
                />
            {/if}
        {/each}

    </svg>
</main>

<style>
</style>
