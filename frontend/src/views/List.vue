<template>
    <div class="about">
        <div v-for="(item) in listItems" :key="item">
            <ListItem v-bind:item="item" @deleteItem="deleteItem" @buyItem="buyItem" />
        </div>
        <div id="add">
            <input type="text" v-model="newItem" />
            <button v-on:click="addItem">Add</button>
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
        buyItem(obj) {
            let id = obj.id;
            let remove = obj.remove;
            let changeId = this.listItems.findIndex(item => item.id === id);

            if (remove) {
                this.listItems[changeId].bought = false;
            } else {
                this.listItems[changeId].bought = true;
            }

            // Why
            let string = JSON.stringify(this.listItems);

            this.listItems = JSON.parse(string);
        },
        addItem() {
            if (this.newItem.length > 0) {
                this.listItems.push({ name: this.newItem, id: this.listItems.length + 1, bought: false });
                this.newItem = "";
            }
        }
    }
});
</script>

<style>
#add {
    border: #42b983 solid 1px;
    border-radius: 5px;
    text-align: left;
    display: flex;
    padding: 10px;
    justify-content: space-between;
    align-items: center;
    margin: 10px;
}
</style>