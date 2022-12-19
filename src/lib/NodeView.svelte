<script lang="ts">
    import { onMount } from 'svelte';
    import Socket from './socket';

    export let id: number;
    export let x: number;
    export let y: number;
    export let view: any;
    // export let enable: true;

    // let input_sockets: Map<number,Socket>;
    // let ouput_sockets: Map<number,Socket>;
    let input_sockets= [];
    let ouput_sockets= [];
    let input_socket_nums = 2;
    let ouput_socket_nums = 1;

    let onClick = () => {
        console.log(id);
    };
    onMount(()=>{
        for (let i = 0; i < input_socket_nums; i++) {
            input_sockets = [...input_sockets, new Socket];
        }
        for (let i = 0; i < ouput_socket_nums; i++) {
            ouput_sockets = [...ouput_sockets, new Socket];
        }
        view.style.transform = `translate(${x}px, ${y}px)`;
    })
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<g 
    bind:this={view} 
    on:click
>
    <rect
        width="100"
        height="40"
        rx="5px"
        fill="#ddd"
        stroke="black"
        stroke-width="2"
        transform="translate(0, 0)"
    />
        <!-- display={enable?'block':'none'} -->
    {#each input_sockets as socket, index(index)}
        <circle 
            cy={12*index+8}
            r='5' 
            fill='green'
        />
    {/each}
    {#each ouput_sockets as socket, index(index)}
        <circle 
            cy={12*index+8}
            cx=100 
            r='5' 
            fill='red'
            on:click={onClick}
        />
    {/each}
    <!-- <g style="pointer-event:none"></g> -->
</g>
