<template>
    <div class="about">
        <div v-for="(item) in listItems" :key="item">
            <ListItem v-bind:item="item" @deleteItem="deleteItem" @buyItem="buyItem" />
        </div>
        <div id="add">
            <input id="newItem" type="text" v-model="newItem" placeholder="New item" />
            <img v-on:click="addItem" src="../assets/add.svg" >
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
            listItems: null,
            connected: true,
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
            if (item.bought) {
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
            console.log(this.connected);
            if (this.connected == false) {
                this.connected = true;
                let sendObj = {
                    list: "familj",
                    data: {
                        listItems: this.listItems
                    }
                };
                this.$socket.emit('sync', sendObj);
            }
        },

        disconnect: function () {
            console.log('socket disconnected')
            this.connected = false;
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
#newItem {
    border: none;
    outline: none;
    color: #2c3e50;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: 32px;
    font-weight: bold;
    border-bottom: 3px solid #2c3e50;
    max-width: 256px;
    padding: 0;
    background-color: rgba(245, 222, 179, 0);
}
</style>