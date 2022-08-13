<script lang=ts>
import util from "../../../util";

  import { onMount } from "svelte";

  export let selectedColor: string = ""
  let canvas: HTMLCanvasElement, hueCanvas: HTMLCanvasElement
  let selectedColorText: HTMLElement
  $: {
    if(selectedColor) {
      selectedColorText.textContent = selectedColor
      selectedColorText.style.backgroundColor = selectedColor 
      selectedColorText.style.color = util.rgbIsLight(selectedColor) ? "black" : "white"
    }
  }
  let marker: HTMLElement, markerHue: HTMLElement
  let hueColor: string = "rgb(0, 255, 0)"
  let firstHueSelect = false, firstColorSelect = false
  let isMouseDown = false, isMouseDownHue = false

  onMount(() => wheelAssembler())

  let wheelAssembler = () => {
    let ctx = canvas.getContext("2d")
    let height = canvas.height, width = canvas.width
    let draw = () => {
      ctx.clearRect(0, 0, width, height)
      let gradiantH = ctx.createLinearGradient(0, 0, width, 0)
      let gradiantV = ctx.createLinearGradient(0, 0, 0, width)
      gradiantH.addColorStop(0, "white")
      gradiantH.addColorStop(1, hueColor)
      ctx.fillStyle = gradiantH
      ctx.fillRect(0,0,width,height)
      gradiantV.addColorStop(0, "rgba(0,0,0,0)")
      gradiantV.addColorStop(1, "black")
      ctx.fillStyle = gradiantV
      ctx.fillRect(0, 0, width, height)
    }

    canvas.addEventListener("mousedown", e => {
      isMouseDown = true
      if(!firstColorSelect) {
        marker.style.display = "inline-block"
        firstColorSelect = true
      }
    })
    canvas.addEventListener("mousemove", e => {
      if(isMouseDown) colorSelector(e) 
    })
    canvas.addEventListener("mouseup", e => {
      isMouseDown = false
      colorSelector(e)
    })
    let colorSelector = (e: MouseEvent) => {
      let x = e.offsetX, y = e.offsetY
      let pixel = ctx.getImageData(x, y, 1, 1).data
      selectedColor = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`
      marker.style.top = `${y}px`
      marker.style.left = `${x}px`
    }

    let hueCtx = hueCanvas.getContext("2d")
    let hueHeight = canvas.height, hueWidth = canvas.width
    let gradiant = hueCtx.createLinearGradient(0, 0, 0, hueHeight)
    let distance = 1 / 6
    gradiant.addColorStop(distance * 0, "rgb(255, 0, 0)")
    gradiant.addColorStop(distance * 1, "rgb(255, 255, 0)")
    gradiant.addColorStop(distance * 2, "rgb(0, 255, 0)")
    gradiant.addColorStop(distance * 3, "rgb(0, 255, 255)")
    gradiant.addColorStop(distance * 4, "rgb(0, 0, 255)")
    gradiant.addColorStop(distance * 5, "rgb(255, 0, 255)")
    gradiant.addColorStop(distance * 6, "rgb(255, 0, 0)")
    hueCtx.fillStyle = gradiant
    hueCtx.fillRect(0, 0, hueWidth, hueHeight)

    hueCanvas.addEventListener("mousedown", e => {
      isMouseDownHue = true
        if(!firstHueSelect) {
        markerHue.style.display = "inline-block"
        firstHueSelect = true
      }

    })
    hueCanvas.addEventListener("mousemove", e => {
      if(isMouseDownHue) hueSelector(e)
    })
    hueCanvas.addEventListener("mouseup", e => {
      isMouseDownHue = false
      hueSelector(e)
    })
    let hueSelector = (e: MouseEvent) => {
      let y = e.offsetY
      let pixel = hueCtx.getImageData(10, y, 1, 1).data
      hueColor = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`
      draw()
      markerHue.style.top = `${y}px`
      let newColor = ctx.getImageData(marker.offsetTop, marker.offsetLeft, 1, 1).data
      selectedColor = `rgb(${newColor[0]}, ${newColor[1]}, ${newColor[2]})`
    }
    draw()
  }
  
</script>

<svelte:window on:mouseup={() => {
  isMouseDown = false
  isMouseDownHue = false
}}/>
<div class="container">
  <div class="heading">
    Selected Color: <div class="color" bind:this={selectedColorText}></div>
  </div>
  <div class="canvasContainer">
    <canvas bind:this={canvas} width="200" height="200"></canvas>
    <div class="markerColor" bind:this={marker}></div>
  </div>
  <div class="canvasContainer">
    <canvas bind:this={hueCanvas} width="20" height="200" ></canvas>
    <div class="markerHue" bind:this={markerHue}></div>
  </div>
</div>

<style lang=scss>
  .container {
    border: 1px solid black;
    padding: 1rem;
    width: 32rem;
    border-radius: 1rem;
  }
  .heading {
    font-size: 2rem;
    .color {
      display: inline-block;
      padding: .5rem
    }
  }
  .canvasContainer {
    display: inline-block;
    position: relative;
  }
  canvas {
    border: 1px solid black;
    margin-right: 1rem;
  }
  .markerHue {
    border: 2px solid black;
    width: 18px;
    position: absolute;
    left: 0;
    display: none;
  }
  .markerColor {
    border: 2px solid black;
    width: .5rem;
    aspect-ratio: 1;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    display: none;
  }
</style>