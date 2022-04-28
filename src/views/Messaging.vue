<template>
  <v-card height="100vh" max-height="100vh">
    <v-card-subtitle class="primary text--white">
      <h2 class="text-center text--white">chat</h2>
    </v-card-subtitle>
    <v-card-text style="height: 65vh">
      <v-list-item
        label
        :class="
          $store.state.user.id == msg.sender.id
            ? 'green text--white ml-auto mt-2'
            : 'grey text--white mr-auto mt-2'
        "
        v-for="(msg, i) in messages"
        :key="i"
        style="width: 70%; max-width: 70%"
        ><v-row class="pr-2 pl-2"
          ><v-list-item-content>{{ msg.body }}</v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click="editMsg(msg, i)"
              ><v-icon class="ml-auto">mdi-pen</v-icon></v-btn
            >
          </v-list-item-action>
          <v-list-item-action>
            <v-btn icon @click="deleteMsg(msg, i)"
              ><v-icon class="ml-auto">mdi-delete</v-icon></v-btn
            >
          </v-list-item-action>
        </v-row>
      </v-list-item>
    </v-card-text>
    <v-card-actions>
      <v-row>
        <v-col md="12" lg="12" xl="12" class="mx-auto"
          ><v-textarea
            rows="5"
            outlined
            class="w-100"
            v-model="msg"
          ></v-textarea
        ></v-col>
        <v-col md="12" lg="12" xl="12" class="mx-auto"
          ><v-btn
            class="w-100 text-center"
            color="primary"
            dark
            @click="sendMsg()"
            >send</v-btn
          ></v-col
        >
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
import db from "../DB/index";
export default {
  data() {
    return {
      messages: [],
      msg: "",
      editedMsg: {},
      editedIndex: -1,
    };
  },
  methods: {
    //method to get all messages sent by these users
    getMsgs() {
      db.rt
        .ref(`messages/${this.$store.state.user.id}`)
        .get()
        .then((res) => {
          Object.entries(res.val()).forEach((entry) => {
            this.messages.push({
              id: entry[0],
              ...entry[1],
            });
          });
          //   this.messages = res.val();
        });
    },
    //method to send message
    sendMsg() {
      let sent_data = {
        sender: {
          email: this.$store.state.user.info.email,
          id: this.$store.state.user.id,
        },
        body: this.msg,
      };
      // condition to check if it is an update request or add
      if (this.editedIndex > -1) {
        //update request
        db.rt
          .ref(`messages/${this.$store.state.user.id}`)
          .child(this.editedMsg.id)
          .set(sent_data)
          .then(() => {
            Object.assign(this.messages[this.editedIndex], sent_data);
            this.editedMsg = {};
            this.editedIndex = -1;
            this.msg = "";
          });
      } else {
        //add request
        db.rt
          .ref(`messages/${this.$store.state.user.id}`)
          .push()
          .set(sent_data)
          .then(() => {
            this.messages.push(sent_data);
            this.msg = "";
          });
      }
    },
    //method to edit msg
    editMsg(msg, index) {
      this.msg = msg.body;
      this.editedIndex = index;
      this.editedMsg = msg;
    },
    //method to delete msg
    deleteMsg(msg, index) {
      db.rt
        .ref(`messages/${this.$store.state.user.id}`)
        .child(msg.id)
        .remove()
        .then(() => {
          this.messages.splice(index, 1);
        });
    },
  },
  created() {
    this.getMsgs();
  },
};
</script>

<style>
</style>