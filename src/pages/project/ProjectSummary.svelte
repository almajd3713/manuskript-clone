<script lang=ts>
  import Sidebar from "../components/Sidebar.svelte";
  import type { ProjectInterface } from "src/types";
  import ProjectManager from "../components/ProjectManager.svelte";
  export let params: { id: string };
  const options = ["Sentence", "Paragraph", "Page", "Full"];
  let textAreaCondition = {
    sentence: [false, false],
    paragraph: [false, false],
    page: [false, false],
    full: [false, false],
  };
  let selectedDescType: string;
  let desiredProject: ProjectInterface;

  $: {
    if (desiredProject) {
      switch (selectedDescType) {
        case "Sentence":
          textAreaCondition.sentence = [true, true];
          textAreaCondition.paragraph = [false, false];
          textAreaCondition.page = [false, false];
          textAreaCondition.full = [false, false];
          break;
        case "Paragraph":
          textAreaCondition.sentence = [true, false];
          textAreaCondition.paragraph = [true, true];
          textAreaCondition.page = [false, false];
          textAreaCondition.full = [false, false];
          break;
        case "Page":
          textAreaCondition.sentence = [false, false];
          textAreaCondition.paragraph = [true, false];
          textAreaCondition.page = [true, true];
          textAreaCondition.full = [false, false];
          break;
        case "Full":
          textAreaCondition.sentence = [false, false];
          textAreaCondition.paragraph = [false, false];
          textAreaCondition.page = [true, false];
          textAreaCondition.full = [true, true];
          break;
      }
    }
  }
</script>

<ProjectManager projectId={params.id} bind:desiredProject />
<Sidebar projectId={params.id} />
<div class="pageContainer">
  <select bind:value={selectedDescType}>
    {#each options as value} <option {value}>{value}</option>{/each}
  </select>

  <div class="textAreaContainer">
    {#if desiredProject}
    <textarea
      class="textArea"
      data-displayed={textAreaCondition.sentence[0]}
      disabled={!textAreaCondition.sentence[1]}
      bind:value={desiredProject.description.sentence}
      rows=2
    />
    <textarea
      class="textArea"
      data-displayed={textAreaCondition.paragraph[0]}
      disabled={!textAreaCondition.paragraph[1]}
      bind:value={desiredProject.description.paragraph}
      rows=15
    />
    <textarea
      class="textArea"
      data-displayed={textAreaCondition.page[0]}
      disabled={!textAreaCondition.page[1]}
      bind:value={desiredProject.description.page}
      rows=35
    />
    <textarea
      class="textArea"
      data-displayed={textAreaCondition.full[0]}
      disabled={!textAreaCondition.full[1]}
      bind:value={desiredProject.description.full}
      rows=35
    />
    {/if}
  </div>
</div>

<style lang="scss">
  .pageContainer {
    padding: 1rem;
    text-align: center;
  }

  select {
    width: 70%;
    padding: 1rem 2rem;
    outline: none;
    border-radius: 0.5rem;
    margin: 2rem auto;
  }
  .textAreaContainer {
    width: 100%;
    display: flex;
    max-height: 40rem;
    justify-content: center;
    gap: 1rem;
    & * {
      resize: none;
      width: 100%;
    }
  }
  .textArea {
    display: none;
  }
  [data-displayed="true"] {
    display: block;
  }
</style>
