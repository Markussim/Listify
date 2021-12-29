<template>
    <div class="about">
        <div v-for="(item, index) in listItems" :key="index">
            <ListItem v-bind:name="item.name" v-bind:id="item.id" />
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
            listItems: [{ name: "Mjölk", id: 1 }, { name: "Mjöl", id: 2 }, { name: "Brölk", id: 3 }, { name: "Red Bull", id: 4 }, { name: "Tomatsoppa", id: 5 }, { name: "Köttfri köttfärs", id: 6 }]
        };
    },
    components: { ListItem },
    methods: {
        deleteItem(id) {
            console.log(id);
            this.listItems = this.listItems.filter(item => item.id !== id);
        }
    }
});
</script>