<script lang="ts">
    import { createEventDispatcher, onMount } from 'svelte';
    export let id;
    export let x;
    export let y;
    export let fill;
    // export let view;
    // const dispatch = createEventDispatcher();
    // export let func;
    // export let activeItem;
    onMount(()=>{
        console.log(fill);
        
    })
    
    let onClick = ()=>{
        console.log(id);
    }

</script>


<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- bind:this={view} -->
<g
    on:click
>
    <rect
        x={x + "px"}
        y={y + "px"}
        width="100"
        height="40"
        rx="5px"
        fill={fill}
        stroke="black"
        stroke-width=2
        transform="translate(0, 0)"
    />
</g>
