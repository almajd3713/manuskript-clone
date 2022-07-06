<script lang=ts>
// @ts-ignore
import { fly } from "svelte/transition";

let checked: boolean
</script>
<svelte:window 
  on:click={() => checked = false}
  on:keydown={e => {
    if(e.ctrlKey && e.code === "KeyS") {
      e.preventDefault()
    }
  }}  
/>

{#if checked}
<!-- <nav class="sidebar" transition:fly={{x: -100, duration: 1000}}> -->
<nav class="sidebar">
  <a class="item" href="/">Home</a>
  <a class="item" href="/scene">scene</a>
  <a class="item" href="/timeline">timeline</a>
</nav>
{/if}

<input type="checkbox" style=display:none; id=sbToggle bind:checked>
<label class="svgContainer float-left" for="sbToggle">
  <img src="/src/assets/Hamburger_icon.svg" class=svg alt="hamburger">
</label>

<style lang=scss>
  .sidebar {
    width: 20rem;
    height: 100vh;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    padding-top: 4rem;
    background-color: #333;
  }
  .item {
    color: #eee;
    height: 100%;
    height: 4rem;
    line-height: 4rem;
    font-size: 1.75rem;
    padding: 0 3rem;
    text-decoration: none;
    transition: all .3s;
    text-align: center;
    &:not(:last-child) {
      border-bottom: 1px solid #888;
    }
    &:hover {
      transform: translateY(-4px);
      background-color: #ddd;
      color: #444;
    }
  }

  .svg {
  &Container {
    padding: 1rem;
    background-color: white;
    border-radius: 50%;
    position: fixed;
    display: inline-block;
    top: 1rem;
    left: 1rem;
    cursor: pointer;
    transition: all .3s;
    box-shadow: 0 .5rem 1rem rgba(black, .2);
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 1rem 2rem rgba(black, .3);
    }
  }
}
</style>