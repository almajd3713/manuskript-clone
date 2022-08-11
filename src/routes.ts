import Home from "./pages/Home.svelte"
import Alo from "./pages/Alo.svelte";
import Error from "./pages/Error.svelte";
import Projects from "./pages/Projects.svelte";
import ProjectHome from "./pages/project/ProjectHome.svelte";
import ProjectSummary from "./pages/project/ProjectSummary.svelte";

export default [
  {path: "/", component: Home},
  {path: "/alo", component: Alo},
  {path: "/projects", component: Projects },
  {path: "/projects/id/:id", component: ProjectHome},
  {path: "/projects/id/:id/summary", component: ProjectSummary },
  {path: "*", component: Error}
]

