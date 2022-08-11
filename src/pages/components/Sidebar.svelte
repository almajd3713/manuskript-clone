<script lang=ts>
// @ts-ignore
// import { fly } from "svelte/transition";

export let projectId: string
let checked: boolean = false
let checkboxClick = (e: MouseEvent) => {
  e.stopPropagation()
}
</script>
<svelte:window 
  on:click={e => checked = false}
  on:keydown={e => {
    if(e.ctrlKey && e.code === "KeyS") {
      e.preventDefault()
    }
  }}  
/>

<nav class="sidebar" data-checked={checked}>
  <a class="item" href="/">Homepage</a>
  <a class="item" href={`./${projectId}`}>Project Home</a>
  <a class="item" href={`./${projectId}/summary`}>Summary</a>
  <a class="item" href={`./${projectId}/scenes`}>Scenes</a>
  <a class="item" href={`./${projectId}/timeline`}>Timeline</a>
</nav>

<input type="checkbox" style=display:none; id=sbToggle bind:checked>
<label class="svgContainer float-left" for="sbToggle" on:click={checkboxClick}>
  <img src="/src/assets/Hamburger_icon.svg" class=svg alt="hamburger">
</label>

<style lang=scss>
  .sidebar {
    width: 0;
    height: 100vh;
    display: flex;
    overflow: hidden;
    transition: all .3s;
    flex-direction: column;
    position: absolute;
    top: 0;
    padding-top: 8rem;
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
#sbToggle:checked {
  & + .svgContainer {
  .svg {
      filter: invert(1);
    }
    background-color: #333;
    box-shadow: none;
  }
}
[data-checked=true] {
  width: 20rem;
}
</style>