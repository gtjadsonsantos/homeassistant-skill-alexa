import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

router.get("/auth/authorize", (ctx) => {

    const client_id = ctx.request.url.searchParams.get("client_id");
    const redirect_url = ctx.request.url.searchParams.get("redirect_uri");
    const state = ctx.request.url.searchParams.get("state");

    console.log( ctx.request.url.searchParams.keys())
    ctx.response.body = ctx.request.url.searchParams.keys()
});

router.get("/token", (ctx) => {
    ctx.response.body = "token";
});
  
const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener( "listen", () => console.log("Listening on http://localhost:8080"));
await app.listen({ port: 8080 })