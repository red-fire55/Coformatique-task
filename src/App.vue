<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
<style>
.text-center{
  text-align: center !important;
}
.w-100{
  width: 100% !important;
}
</style>
