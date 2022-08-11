import { projects } from "./stores"
import type { ProjectInterface } from "./types"


let util = {
  getData: async() => {
    let data = await fetch("http://localhost:3001/get", {
      method: "GET"
    }).then(res => res.json())
    projects.set(data)
  },
  postData: async(newObject: ProjectInterface) => {
    let data: ProjectInterface[] = await fetch("http://localhost:3001/post", {
      method: "POST",
      body: JSON.stringify(newObject),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
    projects.set(data)
  }
}
export default util