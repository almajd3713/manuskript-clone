<script lang=ts>
  import type {ProjectInterface} from "src/types"
  import { projects } from "../../stores";
  import util from "../../util";

  export let projectId: string
  export let desiredProject: ProjectInterface
  export let callback: () => void = () => {}
  let warningDiv: HTMLElement
  $: {
    desiredProject = $projects.find(proj => proj.id === projectId)
  }
  let deactivateSave = false;
  $: if(warningDiv) {
    warningDiv.style.visibility = deactivateSave ? "visible" : "hidden"
    warningDiv.style.opacity = deactivateSave ? "1" : "0"
  }
</script>

<svelte:window on:keydown={e => {
  if(e.ctrlKey && e.code === "KeyS") {
    if(!deactivateSave) {
      util.postData(desiredProject, callback)
      deactivateSave = true
      warningDiv.style.opacity = "1"
      setTimeout(() => {
        deactivateSave = false
      }, 2000);
    }
  }
}}/>

<div class="warning" bind:this={warningDiv}>Project has been saved !</div>
<style lang=scss>
  .warning {
    width: 80%;
    padding: 1rem 2rem;
    background-color: #64f27e;
    border-radius: 1rem;
    transition: all .3s;
    visibility: hidden;
    opacity: 0;
    margin: 0 auto;
    font-size: 2rem;
    position: absolute;
    bottom: 10%;
    left: 0;
    right: 0;
    z-index: 100;
  }
</style>