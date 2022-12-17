<script lang="ts">
    export let id: number;
    export let x: number;
    export let y: number;
    export let view: any;

    let onClick = () => {
        console.log(id);
    };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<g 
    bind:this={view} 
    on:click
>
    <rect
        x={x + "px"}
        y={y + "px"}
        width="100"
        height="40"
        rx="5px"
        fill="#ddd"
        stroke="black"
        stroke-width="2"
        transform="translate(0, 0)"
    />
</g>
