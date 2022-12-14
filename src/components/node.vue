<template>
    <g
        ref="node_view"
    >
        <rect
            :x='node.x + "px"'
            :y='node.y + "px"'
            width="100"
            height="40"
            rx="5px"
            fill='#ddd'
            stroke="black"
            stroke-width=2
            transform="translate(0, 0)"
        />
    </g>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

let node_view = ref(null);
let node = reactive({
    id: Math.random(),
    x: Math.random() * 500,
    y: Math.random() * 500,

})
let print = ()=>{
    console.log(node.id);
    console.log(node_view.value);    
}

defineExpose({
    node,
    node_view
})
</script>