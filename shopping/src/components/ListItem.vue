<template>
    <div id="item">
        <h1 :class="{'bought': isBought}">{{ item.name }}</h1>
        <div id="icons">
            <img v-on:click="$emit('deleteItem', item.id)" src="../assets/delete.svg" />
            <img v-if="!isBought" v-on:click="$emit('buyItem', item.id)" src="../assets/shopping_cart.svg" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'ListItem',
    props: {
        item: Object
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
}

.bought {
    text-decoration: line-through;
    color: #2c3e50b2;
}
</style>
