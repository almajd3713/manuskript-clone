import { projects } from "./stores"
import type { ProjectInterface } from "./types"


let util = {
  getData: async() => {
    let data = await fetch("http://localhost:3001/get", {
      method: "GET"
    }).then(res => res.json())
    projects.set(data)
  },
  postData: async(newObject: ProjectInterface, callback: () => void) => {
    let data: ProjectInterface[] = await fetch("http://localhost:3001/post", {
      method: "POST",
      body: JSON.stringify(newObject),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
    projects.set(data)
    callback()
  },
  rgbIsLight: (color: string) => {
    var c = color.match(/\d+/g).map(z => ((+z < 16) ? '0' : '') + (+z).toString(16)).join('');
    var rgb = parseInt(c, 16);   // convert rrggbb to decimal
    var r = (rgb >> 16) & 0xff;  // extract red
    var g = (rgb >> 8) & 0xff;  // extract green
    var b = (rgb >> 0) & 0xff;  // extract blue

    var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
   return luma >= 80
  },
  createId: () => {
    return crypto.getRandomValues(new Uint32Array(1))[0]
  }
}
export default util