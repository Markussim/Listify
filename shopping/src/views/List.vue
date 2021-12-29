<template>
    <div class="about">
        <div v-for="(item, index) in listItems" :key="index">
            <ListItem v-bind:item="item" @deleteItem="deleteItem" @buyItem="buyItem" />
        </div>
    </div>
</template>

<script>
import { defineComponent } from "vue";
import ListItem from '@/components/ListItem.vue'

export default defineComponent({
    name: "List",
    data() {
        return {
            message: "Pucko list",
            listItems: [{ name: "Mjölk", id: 1, bought: false }, { name: "Mjöl", id: 2, bought: true }, { name: "Brölk", id: 3, bought: false }, { name: "Red Bull", id: 4, bought: false }, { name: "Tomatsoppa", id: 5, bought: false }, { name: "Köttfri köttfärs", id: 6, bought: false }]
        };
    },
    components: { ListItem },
    methods: {
        deleteItem(id) {
            this.listItems = this.listItems.filter(item => item.id !== id);
        },
        buyItem(id) {
            this.listItems = this.listItems.map(item => {
                if (item.id === id) {
                    item.bought = !item.bought;
                }
                return item;
            });
        }
    }
});
</script>