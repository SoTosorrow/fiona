import { onDestroy } from "svelte";
import { writable } from 'svelte/store';

export const active_item_sub = writable(null);

export let active_item;
const unsubscribe = active_item_sub.subscribe(value => {
    active_item = value;
});
// onDestroy(unsubscribe);