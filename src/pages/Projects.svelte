
<script lang=ts>
import { projects } from "../stores";
console.log(!!$projects.length)
import Navbar from "./components/Navbar.svelte";

let redirect = (page: string) => history.replaceState(null, "", page)
</script>

<Navbar/>

<div class="projectContainer">
  {#each $projects as project}
  <a class="project" href={`/projects/id/${project.id}`}>
    <div class="name">{project.name}</div>
    <div class="desc">{project.description.sentence ? project.description.sentence: "Who knows..."}</div>
  </a>
  {/each}
  <a class="addProject" href="/projects/create">
    +
  </a>
</div>

<style lang="scss">
  .projectContainer {
    padding: 0 2rem;
    display: grid;
    > * {
      min-height: 30vh;
      border: 1px solid #ccc;
      border-radius: 1rem;
      transition: all .3s;
      text-decoration: none;
      color: black;
      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 .5rem 1rem rgba(black, .4);
      }
    }
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
  .addProject {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 8rem;
  }
  .project {
    padding: 1rem;
    .name {
      font-size: 4rem;
      margin-bottom: 1rem;
    }
    .desc {
      font-size: 2rem;
    }
  }
</style>