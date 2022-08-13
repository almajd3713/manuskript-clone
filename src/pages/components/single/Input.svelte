
<script lang="ts">
export let value
export let type: "input" | "textArea"
export let lines: number
</script>

{#if type === "input"}
<input type="text" bind:value>
{:else if type === "textArea"}
<textarea bind:value spellcheck=false style="height: {lines * 2}rem"></textarea>
{/if}

<style>
  * {
    margin-bottom: 1rem;
    width: 85%;
  }
  input {
    height: 3rem;
    border: 1px solid #ddd;
    outline: none;
    border-radius: 1rem;
    font-size: 2rem;
    padding: 0 1rem;
  }
  textarea {
    resize: none;
    border: 1px solid #ddd;
    border-radius: 1rem;
    padding: 1rem;
    font-size: 1.5rem;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    outline: none;
  }
</style>