<script>
// @ts-ignore
import { fly } from "svelte/transition"

</script>

<nav class="sidebar" transition:fly={{x: -100, duration: 1000}}>
  <a class="item" href="#">Ayy</a>
  <a class="item" href="#">alooo</a>
</nav>

<style lang=scss>
  .sidebar {
    width: 20rem;
    height: 100vh;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    padding-top: 4rem;
    background-color: #ddd;
  }
  .item {
    color: black;
    height: 100%;
    height: 4rem;
    line-height: 4rem;
    font-size: 1.75rem;
    padding: 0 3rem;
    text-decoration: none;
    transition: all .3s;
    text-align: center;
    &:not(:last-child) {
      border-bottom: 1px solid #444;
    }
    &:hover {
      transform: translateY(-4px);
      background-color: #444;
      color: #ddd
    }
  }
</style>