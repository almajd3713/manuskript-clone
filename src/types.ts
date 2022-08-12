
export interface ProjectInterface {
  name: string
  id: string
  metadata: Metadata
  description: Description
  characters: Character[]
  scenes: Scene[] 
}

interface Description {
  sentence?: string
  paragraph?: string
  page?: string
  full?: string
}
interface Character {
  name ?: string
  motive ?: string
}
interface Scene {
  name: string
  description?: string
  content?: string
}
interface Metadata {
  author?: string
  volume?: string
  genres?: string[]
}
export interface Params {
  id: string
}