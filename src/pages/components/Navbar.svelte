
<script lang="ts">
  $: loc = window.location.href
  import {createEventDispatcher} from "svelte"
  const dispatch = createEventDispatcher()
</script>


<nav class:hidden={new URL(loc).pathname !== "/"}>
  <a class="navBrand float-right" href="/alo">ManuKript</a>
  <a href="/bruh" class="navItem">Bruh</a>
  <a href="/galunga" class="navItem">galunga</a>
  <a href="/pro" class="navItem">Pro !</a>
  <a class="navBrand float-left" style="opacity: 0; pointer-events: none;" href="/alo">ManuKript</a>
</nav>

<style lang="scss">
  nav {
    height: 5rem;
    background-color: #eee;
    line-height: 5rem;
    text-align: center;
    transition: all .3s;
  }

  .navBrand, .navItem {
    display: inline-block;
    text-decoration: none;
    transition: all .15s;
    &:hover {
      background-color: #444;
      color: #eee;
    }
  }.navBrand {
    color: #222;
    font-size: 2rem;
    padding: 0 2rem;
  }.navItem {
    color: #444;
    font-size: 1.4rem;
    padding: 0 1rem;
  }

  .float {
    &-right {float: right;}
    &-left  {float: left;}
  }
</style>