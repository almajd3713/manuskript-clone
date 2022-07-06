import { v4 as uuid } from "uuid" 
import type { ProjectInterface } from "./types"
import { writable, readable, Writable, Subscriber, Unsubscriber } from "svelte/store";


export let projects = (() => {
  let storeType: ProjectInterface[] = []
  let store = writable(storeType) 
  let add = (obj: ProjectInterface) => store.update(arr => [...arr, obj])
  let remove = (id: string) => store.update(arr => arr.filter(proj => proj.id !== id))
  let subscribe = store.subscribe
  let set = store.set
  return {add, remove, subscribe, set}
})()

