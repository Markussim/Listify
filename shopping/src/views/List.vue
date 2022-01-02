<template>
    <div class="about">
        <div v-for="(item) in listItems" :key="item">
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
            listItems: [{ name: "Mjölk", id: 1, bought: true }, { name: "Mjöl", id: 2, bought: false }, { name: "Brölk", id: 3, bought: true }, { name: "Red Bull", id: 4, bought: false }, { name: "Tomatsoppa", id: 5, bought: false }, { name: "Köttfri köttfärs", id: 6, bought: false }]
        };
    },
    components: { ListItem },
    methods: {
        deleteItem(id) {
            this.listItems = this.listItems.filter(item => item.id !== id);
        },
        buyItem(id) {
            for (let i = 0; i < this.listItems.length; i++) {
                if (this.listItems[i].id == id) {
                    this.listItems[i].bought = true;
                    break;
                }
            }

            // Why
            let string = JSON.stringify(this.listItems);

            this.listItems = JSON.parse(string);
        }
    }
});
</script>