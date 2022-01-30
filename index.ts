import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

router.get("/auth/authorize", (ctx) => {
  ctx.response.body = "authorize";
});

router.get("/token", (ctx) => {
    ctx.response.body = "token";
});
  
const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener( "listen", () => console.log("Listening on http://localhost:8080"));
await app.listen({ port: 8080 })