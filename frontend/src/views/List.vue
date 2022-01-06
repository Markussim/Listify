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
            listItems: null
        };
    },
    components: { ListItem },
    methods: {
        deleteItem(_id) {
            let sendObj = {
                list: "familj",
                id: _id
            };
            this.$socket.emit('remove', sendObj);
        },
        buyItem(obj) {
            // Find the item in the list
            let item = this.listItems.find(item => item._id === obj._id);

             let sendObj = {
                list: "familj",
                id: obj._id
            };
            if(item.bought) {
                this.$socket.emit('unbuy', sendObj);
            } else {
                this.$socket.emit('buy', sendObj);
            }
        },
        addItem() {
            if (this.newItem.length > 0) {
                let sendObj = {
                    list: "familj",
                    name: this.newItem
                };
                this.$socket.emit('add', sendObj);
                this.newItem = "";
                console.log(this.newItem);
            }
        }
    },
    sockets: {
        connect: function () {
            console.log('socket connected')
        },

        syncBack: function (data) {
            this.listItems = data;
        }
    },
    created() {
        console.log("Request sync");
        let sendObj = {
            list: "familj",
            data: {
                listItems: this.listItems
            }
        };
        this.$socket.emit('sync', sendObj);
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