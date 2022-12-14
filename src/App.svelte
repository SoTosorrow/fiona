<script lang="ts">
    import Node from "./lib/node";

    let nodes: any = [];

    let init = () => {
        console.log("init...");

        nodes.push(new Node());
        nodes.push(new Node());
        nodes.push(new Node());
        console.log(nodes);
    };

    let current_active_item = null;
    let activeItem=(item)=>{
        if(current_active_item){
            current_active_item.view.children[0].style.fill = '#ddd';
        }
        current_active_item = item;
        item.view.children[0].style.fill = 'red';
    }

    let view_stat = false;
    let sceneMouseDown = (e)=>{
        console.log('down');
        view_stat = true;
    }
    let sceneMouseUp = (e)=>{
        console.log('up');
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


    init();
</script>

<main style="background-color:gray">
    <div class="font" style="padding: 2vw 0 0 5vw">Fiona</div>
    <svg id="view" width="100vw" height="100vh" style="margin:0;"
        on:mousedown={sceneMouseDown}
        on:mouseup={sceneMouseUp}
        on:mousemove={sceneMouseMove}
    >
        {#each nodes as node}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <g 
                bind:this={node.view}
                on:click={ ()=>{ activeItem(node) } }>
                
                <rect
                    x={node.x + "px"}
                    y={node.y + "px"}
                    rx="5px"
                    width="100"
                    height="40"
                    fill="#ddd"
                    stroke="black"
                    stroke-width=2
                    transform="translate(0, 0)"
                />
            </g>
        {/each}
    </svg>
</main>

<style>
</style>
