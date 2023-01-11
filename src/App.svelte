<script lang="ts">
    import { onMount } from "svelte";
    import Node from "./lib/node";
    import NodeView from "./lib/NodeView.svelte";
    import Context from "./lib/Context.svelte";

    let nodes: any = [];    // @todo -> map
    let links: any = [];
    let active_item_view = null;
    let enable_context = false;
    let is_link = false;
    let global_start_item = {x:0,y:0};
    let global_end_item = {x:0,y:0};

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
    let sceneAddLink = (end_item)=>{
        let link = {
            start_item: global_start_item,
            end_item: end_item,
        }
        links = [...links,link]
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
        console.log(e.target);
        
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
        if(e.which == '1' && e.target.localName ==='rect'){
            active_item_view = e.target.parentNode;
        }
        // 点击socket 进入连线模式
        if(e.which == '1' && e.target.localName ==='circle'){
            // socket相对偏移
            let offsetx = e.target.cx.baseVal.value;
            let offsety = e.target.cy.baseVal.value;
            
            let transform = e.target.parentNode.style.transform;
            let x = /translate\((.*)\px,/.exec(transform)[1].trim()
            let y = /\,(.*)px/.exec(transform)[1].trim()

            global_start_item = {
                x:Number(x) + offsetx, 
                y:Number(y) + offsety
            };
            is_link = true;
        }

    }
    let sceneMouseUp = (e)=>{
        if(is_link){
            let offsetx = e.target.cx.baseVal.value;
            let offsety = e.target.cy.baseVal.value;
            
            let transform = e.target.parentNode.style.transform;
            let x = /translate\((.*)\px,/.exec(transform)[1].trim()
            let y = /\,(.*)px/.exec(transform)[1].trim()
            let end_item = {
                x:Number(x) + offsetx, 
                y:Number(y) + offsety
            };
            sceneAddLink(end_item)
        }
        // console.log(e.target);
        active_item_view = null;
        is_link = false;
    }
    let sceneMouseMove = (e)=>{
        global_end_item.x = e.clientX;
        global_end_item.y = e.clientY;
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
        {#if is_link}
            <line 
                x1={global_start_item.x} 
                y1={global_start_item.y} 
                x2={global_end_item.x} 
                y2={global_end_item.y} 
                stroke='black' stroke-width=2/>
        {/if}

        {#each nodes as node}
            {#if node.enable}
                <NodeView 
                    id={node.id}
                    x={node.x} 
                    y={node.y} 
                    bind:view={node.view}
                    on:click={()=>{print()}}
                />
            {/if}
        {/each}
        {#each links as link}
            <line 
            x1={link.start_item.x} 
            y1={link.start_item.y} 
            x2={link.end_item.x} 
            y2={link.end_item.y} 
            stroke='black' stroke-width=2/>
        {/each}

        <!-- <foreignObject x="100" y="25" 
            width="160" height="160"> 
            <div> 
                I love Hsh
                <button>button</button>
            </div> 
        </foreignObject> -->
    </svg>
</main>

<style>
</style>
