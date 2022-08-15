<script lang=ts>
import type { Params, ProjectInterface } from "src/types";
import util from "../../../src/util";
import ProjectManager from "../components/ProjectManager.svelte";
import Sidebar from "../components/Sidebar.svelte";
import ColorPicker from "../components/single/ColorPicker.svelte";
import Input from "../components/single/Input.svelte";
import Error from "../Error.svelte";

export let params: Params
let desiredProject: ProjectInterface
let selectedCharId: number
let selectedChar: ProjectInterface["characters"][0]
$: if(desiredProject) selectedChar = desiredProject.characters.find(char => char.id === selectedCharId)

let colorPicker: HTMLElement
let colorPickerIsToggled = false
$: {
  if(colorPicker) colorPicker.style.backgroundColor = selectedChar.color
}
let createChar = () => {
  let newChar: typeof selectedChar = {
    id: util.createId(),
    name: "New Character",
    color: "rgb(23, 124, 23)"
  }
  desiredProject.characters = [...desiredProject.characters, newChar]
}
</script>

<ProjectManager projectId={params.id} bind:desiredProject callback={() => selectedCharId = selectedCharId}/>
<Sidebar projectId={params.id}/>

<div class="container">
  {#if desiredProject}
  <div class="charList">
    <div class="charListHeading">Character List</div>
    <div class="charListArr">
      {#each desiredProject.characters as char}
        <div class="charBox" style="background-color:{char.color}; color: {util.rgbIsLight(char.color) ? "black" : "white"}"on:click={(e) => selectedCharId = char.id}>{char.name}</div>
      {/each}
    </div>
    <div class="createChar" on:click={createChar}>Create Character</div>
  </div>
  <div class="charDisplay">
    {#if selectedChar}
    <div>
      <div class="line">
        <span>Name: </span> 
        <Input type=input width="65%" bind:value={selectedChar.name}/>
        <span>Color: </span>
        <div class="colorPicker" bind:this={colorPicker} on:click|stopPropagation={() => colorPickerIsToggled = true} onload={() => colorPicker.style.backgroundColor = selectedChar.color}>
          <ColorPicker bind:selectedColor={selectedChar.color} isShown={colorPickerIsToggled}/>
        </div>
      </div>
      <div class="line">
        <span>Description: </span>
        <Input type=textArea bind:value={selectedChar.description} lines=3/>
      </div>
      <div class="line">
        <span>Goal: </span>
        <Input type=textArea bind:value={selectedChar.goal}/>
      </div>
      <div class="line">
        <span>Motive: </span>
        <Input type=textArea bind:value={selectedChar.motive}/>
      </div>
      <div class="line">
        <span>Epiphany: </span>
        <Input type=textArea bind:value={selectedChar.epiphany} lines=3/>
      </div>
      <div class="line">
        <span>Backstory: </span>
        <Input type=textArea bind:value={selectedChar.backstory} lines=3/>
      </div>
    </div>
    {:else}
    <h1>select a character to edit it</h1>
    {/if}
  </div>
  {:else}
  <Error/>
  {/if}
</div>


<svelte:window style="box-sizing: border-box" on:click={e => {
  colorPickerIsToggled = false
}}/>
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
      position: relative;
      overflow: hidden;
      
      .charListHeading {
        margin-bottom: 1rem;
      }
      .charListArr {
        background-color: #ccc;
        border-radius: .5rem;
        max-height: 80%;
        overflow: auto;
        padding: 1rem 0;
        font-size: 1.5rem;
        text-align: left;
        margin-bottom: 1rem;
        &::-webkit-scrollbar {
          width: .5rem;
        }
        &::-webkit-scrollbar-thumb {
          background-color: #999;
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
      &::-webkit-scrollbar {
          width: .5rem;
        }
        &::-webkit-scrollbar-thumb {
          background-color: #999;
        }
      span {
        display: inline-block;
        vertical-align: top;
        width: 5rem;
      }
      .line {
        display: flex;
        justify-content: space-between;
        line-height: 3rem;
      }
    }
  }
  .colorPicker {
    width: 3rem;
    height: 3rem;
    border: 1px solid #aaa;
    border-radius: 1rem;
    position: relative;
  }
  .charBox {
    width: 90%;
    margin: .5rem auto;
    background-color: #555;
    border-radius: .5rem;
    height: 3rem;
    line-height: 3rem;
    color: white;
    padding: 1px 3rem;
    box-sizing: border-box;
  }
  .createChar {
    @extend .charBox;
    position: absolute;
    bottom: 0;
    font-size: 1.3rem;
  }
</style>