<template>
  <div class="about">
    <div v-for="item in listItems" :key="item">
      <ListItem
        :item="item"
        :connected="connected"
        @deleteItem="deleteItem"
        @buyItem="buyItem"
      />
    </div>
    <form
      @submit="addItem"
      id="add"
      v-if="this.listItems != null && this.connected"
    >
      <input
        id="newItem"
        type="text"
        v-model="newItem"
        placeholder="New item"
      />
      <img @click="addItem" src="../assets/add.svg" />
      <input type="submit" hidden />
    </form>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import ListItem from "../components/ListItem.vue";

export default defineComponent({
  name: "List",
  data() {
    return {
      listItems: localStorage.getItem("list")
        ? JSON.parse(localStorage.getItem("list"))
        : null,
      connected: false,
    };
  },
  components: { ListItem },
  methods: {
    deleteItem(_id) {
      let sendObj = {
        list: "familj",
        id: _id,
      };
      this.$socket.emit("remove", sendObj);
    },
    buyItem(obj) {
      // Find the item in the list
      let item = this.listItems.find((item) => item._id === obj._id);

      let sendObj = {
        list: "familj",
        id: obj._id,
      };

      if (this.connected) {
        if (item.bought) {
          this.$socket.emit("unbuy", sendObj);
        } else {
          this.$socket.emit("buy", sendObj);
        }
      }

      // Change the bought status of the item
      this.listItems.find((item) => item._id === obj._id).bought = !item.bought;

      // Why
      let string = JSON.stringify(this.listItems);
      this.listItems = JSON.parse(string);
    },
    addItem(e) {
      e.preventDefault();
      if (this.newItem.length > 0) {
        let sendObj = {
          list: "familj",
          name: this.newItem,
        };
        this.$socket.emit("add", sendObj);
        this.newItem = "";
        // Unfocus the input field
        document.getElementById("newItem").blur();

        // Remove and then add fadeClass to the form
        let form = document.getElementById("add");
        form.classList.remove("fadeClass");
        form.classList.add("fadeClass");
      }
    },
  },
  sockets: {
    connect: function () {
      console.log("socket connected");
      console.log(this.connected);
      if (this.connected == false) {
        this.connected = true;
        let sendObj = {
          list: "familj",
          data: {
            listItems: this.listItems,
          },
        };
        this.$socket.emit("sync", sendObj);
      }
    },

    disconnect: function () {
      console.log("socket disconnected");
      this.connected = false;
    },

    syncBack: function (data) {
      this.listItems = data;
      localStorage.setItem("list", JSON.stringify(this.listItems));
    },
  },
  created() {
    console.log("Request sync");
    console.log(localStorage.getItem("list"));
    this.connected = this.$socket.connected;
    let sendObj = {
      list: "familj",
      data: {
        listItems: this.listItems,
      },
    };
    if (this.connected) {
      this.$socket.emit("sync", sendObj);
    }
  },
});
</script>

<style scoped>
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
  transition: border 0.25s;
}
#newItem:focus {
  border-bottom: 3px solid #42b983;
}

.fadeClass {
  animation: fadeReplace 0.5s ease-in-out;
}

img {
  margin-right: 10px;
  height: 40px;
}
@keyframes fadeReplace {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
