
<script lang=ts>
import type { ProjectInterface } from "src/types";
import util from "../../util";


import {projects} from "../../stores"
import Error from "../Error.svelte";
import Sidebar from "../components/Sidebar.svelte";
export let params: {id: string}
let desiredProject: ProjectInterface
$: {
  desiredProject = $projects.find(proj => proj.id === params.id)
}

let genresAdd = e => {
  e.preventDefault()
  let newGenre = new FormData(e.target).get("genre") as string
  if(newGenre.match(/\s/g)) return
  desiredProject.metadata.genres = [...desiredProject.metadata.genres, newGenre]
  e.target.children[0].value = ""
}
let genresDelete = e => {
  let data = e.target.textContent
  desiredProject.metadata.genres = desiredProject.metadata.genres.filter(genre => genre !== data)
}

let deactivateSave = false
</script>
<svelte:window on:keydown={e => {
  if(e.ctrlKey && e.code === "KeyS") {
    if(!deactivateSave) {
      util.postData(desiredProject)
      console.log("page has been saved")
      deactivateSave = true
      setTimeout(() => {
        deactivateSave = false
      }, 2000);
    }
  }
}}/>

{#if desiredProject}
<div class="infoContainer">
  <div class="name">Name: <input bind:value={desiredProject.name} maxlength="15"/></div>
  <div class="author">Author: <input bind:value={desiredProject.metadata.author}/></div>
  <div class="volume">Volume: <input bind:value={desiredProject.metadata.volume}/></div>
  <div class="genres">
    <div class="genreInput">Genres: <form on:submit={genresAdd}><input name="genre" maxlength="15"></form></div>
    {#each desiredProject.metadata.genres as genre, i}
      <span class="genre" on:click={genresDelete}>{genre}</span>
      {#if i > 2 && (i + 1) % 4 === 0}<br/>{/if}
    {/each}
  </div>
</div>
{:else}
<Error/>
{/if}
<Sidebar/>


<style lang="scss">
  .infoContainer {
    margin-top: 5rem;
    padding: 1rem 12rem;
    > * {
      font-size: 2rem;
      margin-bottom: 1rem;
      input {
        height: 3rem;
        border: 1px solid #ddd;
        outline: none;
        border-radius: 1rem;
        font-size: 2rem;
        padding: 0 1rem;
      }
      form {
        display: inline-block;
      }
    }
  }
  .genreInput {
    margin-bottom: 1rem;
  }
  .genre {
    display: inline-block;
    background-color: #ccc;
    padding: 0 1rem;
    font-size: 1.5rem;
    line-height: 3rem;
    border-radius: 1rem;
    margin-bottom: 1rem;
    &:not(:last-of-type) {
      margin-right: 1rem;
    }
  }
</style>