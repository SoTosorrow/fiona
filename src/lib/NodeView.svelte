<script lang="ts">
    import { afterUpdate, beforeUpdate } from "svelte";


    export let id;
    export let x;
    export let y;
    export let fill;
    
    let onClick = ()=>{
        console.log(id);
    }
    // beforeUpdate(()=>{
    //     console.log(fill);
    // })
    // afterUpdate(()=>{
    //     console.log(fill);
    // })
    

</script>


<!-- svelte-ignore a11y-click-events-have-key-events -->
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
