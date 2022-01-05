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
import ListItem from '@/components/ListItem.vue';

export default defineComponent({
    name: "List",
    data() {
        return {
            message: "Pucko list",
            listItems: null
        };
    },
    components: { ListItem },
    methods: {
        deleteItem(_id) {
            this.listItems = this.listItems.filter(item => item._id !== _id);

            // Why
            let string = JSON.stringify(this.listItems);

            this.listItems = JSON.parse(string);
        },
        buyItem(obj) {
            let _id = obj._id;
            let remove = obj.remove;
            let changeId = this.listItems.findIndex(item => item._id === _id);

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
                this.listItems.push({ name: this.newItem, _id: this.listItems.length + 1, bought: false });
                this.newItem = "";
            }
        }
    },
    created() {
        // Get items from http://localhost:3000/api/getList/familj

        fetch("http://localhost:3000/api/getList/familj")
            .then(response => response.json())
            .then(data => {
                this.listItems = data;
            });
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