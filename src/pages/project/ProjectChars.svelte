<script lang=ts>
import type { Params, ProjectInterface } from "src/types";
import ProjectManager from "../components/ProjectManager.svelte";
import Sidebar from "../components/Sidebar.svelte";
import ColorPicker from "../components/single/ColorPicker.svelte";
import Input from "../components/single/Input.svelte";
import Error from "../Error.svelte";

export let params: Params
let selectedColor: string
let desiredProject: ProjectInterface
</script>

<ProjectManager projectId={params.id} bind:desiredProject/>
<Sidebar projectId={params.id}/>

<div class="container">
  {#if desiredProject}
  <div class="charList">
    <div class="charListHeading">Character List</div>
    <div class="charListArr">
      <div class="charBox">Galunga</div>
      <div class="charBox"></div>
      <div class="charBox"></div>
    </div>
  </div>
  <div class="charDisplay">
    <div>
        <span>Name: </span> 
        <Input type=input/>
        <span>Goal: </span>
        <Input type=textArea/>
        
    <div>
    </div>
    </div>
  </div>
  {:else}
  <Error/>
  {/if}
</div>

<ColorPicker bind:selectedColor/>

<svelte:window style="box-sizing: border-box"/>
<style lang=scss>
  .container {
    background-color: #eee;
    width: 80%;
    height: 90vh;
    margin: 2rem auto;
    padding: 2rem;
    box-sizing: border-box;
    text-align: center;
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 1rem;

    .charList {
      font-size: 2rem;
      
      .charListHeading {
        margin-bottom: 1rem;
      }
      .charListArr {
        background-color: #ccc;
        border-radius: .5rem;
        height: 90%;
        padding: 1rem 0;
        font-size: 1.5rem;
        text-align: left;
        .charBox {
          width: 90%;
          margin: .5rem auto;
          background-color: green;
          border-radius: .5rem;
          height: 3rem;
          line-height: 3rem;
          color: white;
          padding: 1px 3rem;
          box-sizing: border-box;
        }
      }
    }
    .charDisplay {
      box-sizing: border-box;
      height: 100%;
      background-color: #ccc;
      border-radius: .5rem;
      padding: 1rem;
      font-size: 1.5rem;
      gap: 1rem;
      span {
        display: inline-block;
        vertical-align: top;
        width: 5rem;
      }
    }
  }
</style>