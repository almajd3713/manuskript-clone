
<script lang="ts">
// import all server data
import util from "./util";
util.getData()
import routes from "./routes"
import router from "page"
let params, page
routes.forEach(route => {
  router(
    route.path,
    (ctx, next) => {
      params = ctx.params
      next()
    },
    () => {
      page = route.component
    }
    )
  })
router.start()
  

import "./assets/global.scss"


</script>

<svelte:component this={page} {params}/>