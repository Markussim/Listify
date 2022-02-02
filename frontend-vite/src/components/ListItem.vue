<template>
    <div id="item">
        <h1 :class="{'bought': isBought}" v-on:click="$emit('buyItem', {_id: item._id, remove: false})">{{ item.name }}</h1>
        <div id="icons">
            <img v-if="connected" v-on:click="$emit('deleteItem', item._id)" src="../assets/delete.svg" />
            <img v-if="!isBought" v-on:click="$emit('buyItem', {_id: item._id, remove: false})" src="../assets/shopping_cart.svg" />
            <img v-else v-on:click="$emit('buyItem', {_id: item._id, remove: true})" src="../assets/remove_shopping.svg" />
            <img src="../assets/remove_shopping.svg" hidden>
            <img src="../assets/shopping_cart.svg" hidden>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ListItem',
    props: {
        item: Object,
        connected: Boolean,
    },
    data() {
        return {
            isBought: this.item.bought
        };
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
    color: #42b983;
}
#item {
    border: #42b983 solid 1px;
    border-radius: 5px;
    text-align: left;
    display: flex;
    padding: 10px;
    justify-content: space-between;
    align-items: center;
    margin: 10px;
}
img {
    margin: 0;
    height: 24px;
}
h1 {
    margin: 0;
    width: calc(100% - 100px);
}

.bought {
    text-decoration: line-through;
    color: #2c3e50b2;
}

#icons img {
    height: 40px;
    margin: 0;
    margin-right: 10px;
}
</style>
