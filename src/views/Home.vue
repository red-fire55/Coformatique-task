<template>
  <div class="home">
    <v-row>
      <v-col md="6" lg="5" xl="4" class="mx-auto mt-15">
        <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
          <v-tab> login </v-tab>
          <v-tab> register </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab" class="mt-10">
          <!-- login section -->
          <v-tab-item>
            <v-card color="basil">
              <v-alert>
                <h1 class="text-center">login</h1>
              </v-alert>
              <v-card-text>
                <v-row>
                  <v-col md="12" lg="12" xl="12">
                    <v-text-field
                      outlined
                      rounded
                      dense
                      label="email"
                      v-model="user_data.email"
                    ></v-text-field>
                  </v-col>
                  <v-col md="12" lg="12" xl="12">
                    <v-text-field
                      outlined
                      rounded
                      dense
                      label="password"
                      v-model="user_data.password"
                    ></v-text-field>
                  </v-col>
                  <v-col md="12" lg="12" xl="12">
                    <v-btn color="primary" class="w-100" @click="login()"
                      >login</v-btn
                    >
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <!-- register section -->
          <v-tab-item>
            <v-card color="basil"
              ><v-alert>
                <h1 class="text-center">register</h1>
              </v-alert>
              <v-card-text>
                <v-row>
                  <v-col md="12" lg="12" xl="12">
                    <v-text-field
                      outlined
                      rounded
                      dense
                      label="email"
                      v-model="user_data.email"
                    ></v-text-field>
                  </v-col>
                  <v-col md="12" lg="12" xl="12">
                    <v-text-field
                      outlined
                      rounded
                      dense
                      label="password"
                      v-model="user_data.password"
                    ></v-text-field>
                  </v-col>
                  <v-col md="12" lg="12" xl="12">
                    <v-text-field
                      outlined
                      rounded
                      dense
                      label="confirm-password"
                      v-model="user_data.confirm"
                    ></v-text-field>
                  </v-col>
                  <v-col md="12" lg="12" xl="12">
                    <v-btn color="primary" class="w-100" @click="register()"
                      >register</v-btn
                    >
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src
import db from "../DB/index";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      tab: null,
      user_data: { email: "", password: "", confirm: "" },
    };
  },
  methods: {
    //login method
    login() {
      db.auth
        .signInWithEmailAndPassword(
          this.user_data.email,
          this.user_data.password
        )
        .then((res) => {
          // get user info from the previous saved collection
          db.rt
            .ref("users")
            .child(res.user.uid)
            .get()
            .then((userInfo) => {
              this.$store.state.user = {
                id: res.user.uid,
                info: userInfo.val(),
              };
              this.$router.push("/messaging");
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //register method
    register() {
      db.auth
        .createUserWithEmailAndPassword(
          this.user_data.email,
          this.user_data.password
        )
        .then((res) => {
          //set a collection with the user id to make profile for him later
          db.rt
            .ref("users")
            .child(res.user.uid)
            .set({
              email: this.user_data.email,
            })
            .then(() => {
              this.$store.state.user = {
                id: res.user.uid,
                info: userInfo.val(),
              };
              this.$router.push("/messaging");
            });
        })
        .catch((err) => {
          console.log("regestration error : ", err);
        });
    },
  },
  created() {},
};
</script>
