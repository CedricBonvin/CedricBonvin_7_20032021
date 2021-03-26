<template>
    <div>
        <div class="userPseudo">  {{ $store.state.userPseudo}} </div>
    </div>
</template>

<script>
export default {
    name : "headerBox",
    data(){
        return{
            pseudo : "",
        }
    },
 
}
</script>

<style  scoped>
  .userPseudo{
      color: red;
  }
</style>






