<template>
    <div id="item">
        <h1>{{ name }}</h1>
        <div id="icons">
            <img v-on:click="$emit('deleteItem', id)" src="../assets/delete.svg" />
            <img src="../assets/shopping_cart.svg" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'ListItem',
    props: {
        name: String,
        id: String
    }
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
</style>
