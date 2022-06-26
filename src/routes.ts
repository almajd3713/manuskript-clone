import Home from "./pages/Home.svelte"
import Alo from "./pages/Alo.svelte";
import Error from "./pages/Error.svelte";

export default [
  {path: "/", component: Home},
  {path: "/alo", component: Alo},
  {path: "*", component: Error}
]

