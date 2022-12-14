<script setup lang="ts">
import { reactive, ref, nextTick, Ref  } from 'vue'
import Node from './components/node.vue'

let nodes    :any = reactive([1,2,3,4]);
let node_refs:any = reactive([]);

let active_item:Ref = ref(null);
let view_stat  :Ref = ref(false)

let onActiveItem = (index:any)=>{
    console.log(node_refs[index].node.id);
    
    if(active_item.value){
        active_item.value.node_view.children[0].style.fill = '#ddd';
    }
    active_item.value = node_refs[index];
    active_item.value.node_view.children[0].style.fill = 'red';
}

let pushNode = (node:any)=>{
    node_refs.push(node)
}

let onMouseDown = (e:any)=>{
    view_stat.value = true;
    
    if(e.which=='2'){
        // v-for ref 不会动态增加
        node_refs.length = 0;
        nodes.push(5)
    }
    if(e.which=='3'){
        // v-for ref 不会动态增加
        node_refs.length = 0;
        nodes.pop();
    }
}
let onMouseUp = (e:any)=>{
    view_stat.value = false;
}
let onMouseMove = (e:any)=>{
    if(view_stat.value === true && active_item.value){
        active_item.value.node_view.children[0].style.fill = `#${e.clientY}`;
        active_item.value.node_view.children[0].style.transform =`translate(${e.clientX}px, ${e.clientY}px)`;
        active_item.value.node_view.children[0].style.x = '0'
        active_item.value.node_view.children[0].style.y = '0'
    }
}

</script>

<template>
    <div style="margin:0;height:100vh;background-color:gray">
        <svg id="view" width="1000" height="900" style="margin:0;background-color:gray;"
            @mousedown="onMouseDown"
            @mouseup="onMouseUp"
            @mousemove="onMouseMove"
        >
            <text class="font" x='100' y='100'>Fiona</text>

            <Node 
                v-for="(node,index) in nodes" 
                :key="node" 
                :ref="pushNode"
                @click="onActiveItem(index)"
            />
        </svg>
    </div>
</template>

<style scoped>

</style>
