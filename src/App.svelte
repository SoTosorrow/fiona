<script lang="ts">
    import { onMount } from "svelte";
    import Node from "./lib/node";
    import NodeView from "./lib/NodeView.svelte";
    import Context from "./lib/Context.svelte";

    let nodes: any = [];    // @todo -> map
    let active_item_view = null;
    let enable_context = false;

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
        // 删除后排序混乱
        // nodes = nodes.filter((i)=>{
        //     return i !== node;
        // });
    }
    let sceneUpdateForce = ()=>{
        nodes = nodes;
    }

    let sceneMouseDown = (e)=>{
        if(e.which == '2'){
            sceneAddNode();
        }
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
    let sceneMouseUp = (e)=>{
        active_item_view = null;
    }
    let sceneMouseMove = (e)=>{
        if(active_item_view){
            active_item_view.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            // @test
            active_item_view.children[0].style.fill = `#${e.clientY}`;
        }
    }
    let enableContext=()=>{
        enable_context = !enable_context;
    }
    let activeItem =(item)=>{
        active_item_view = item.view
        console.log(active_item_view);
    }
    let print=()=>{
        return;
    }
    

</script>

<!-- @todo svg-viewBox -->

<main style="height:100vh;width:100vw;"
    on:contextmenu|preventDefault="{enableContext}"
>
    {#if enable_context}
        <Context/>
    {/if}

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <svg id="view" width="1000" height="900" style="margin:0;background-color:gray;"
        on:mousedown={sceneMouseDown}
        on:mouseup={sceneMouseUp}
        on:mousemove={sceneMouseMove}
        on:mouseleave={print}
    >
        <text class="font" x='100' y='100'>Finoa</text>

        {#each nodes as node}
            {#if node.enable}
                <NodeView 
                    id={node.id}
                    x={node.x} 
                    y={node.y} 
                    bind:view={node.view}
                    on:click={()=>{activeItem(node)}}
                />
            {/if}
        {/each}

    </svg>
</main>

<style>
</style>
