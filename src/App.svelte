
<script lang="ts">
import routes from "./routes"
import router from "page"
let params, page
routes.forEach(route => {
  router(
    route.path,
    (ctx, next) => {
      params = ctx.params
      next()
    },
    () => {
      page = route.component
    }
    )
  })
router.start()
  
let checked

import "./assets/global.scss"

import Sidebar from "./pages/components/Sidebar.svelte";
</script>
<svelte:window on:click={() => checked = false}/>



<svelte:component this={page} {params}/>
<input type="checkbox" style=display:none; id=sbToggle bind:checked>
<label class="svgContainer float-left" for="sbToggle">
  <img src="/src/assets/Hamburger_icon.svg" class=svg alt="hamburger">
</label>
{#if checked}<Sidebar/>{/if}

<style lang="scss">
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
    box-shadow: 0 1rem 1rem rgba(black, .2);
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 2rem 2rem rgba(black, .3);
    }
  }
}
</style>