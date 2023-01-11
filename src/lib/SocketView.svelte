<script lang="ts">
    import { onMount } from "svelte";

    export let id;
    export let index;
    export let type;
    export let view;

    onMount(()=>{
        view.setAttribute('id', id)
    })
</script>

<g
    bind:this={view}
>
    <circle
        cx={type == "input" ? 0 : 100}
        cy={12 * index + 8}
        r="5"
        fill="green"
    />
</g>
