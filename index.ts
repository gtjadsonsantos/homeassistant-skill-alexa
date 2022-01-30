import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

router.get("/auth/authorize", async (ctx) => {

    const client_id = ctx.request.url.searchParams.get("client_id");
    const redirect_url = ctx.request.url.searchParams.get("redirect_uri");
    const state = ctx.request.url.searchParams.get("state");

    console.log("client_id", client_id)
    console.log("redirect_url", redirect_url)
    console.log("state", state)

    await ctx.send({ root: `${Deno.cwd()}/public`,index: "index.html" });

});



router.get("/token", (ctx) => {
    ctx.response.body = "token";
});
  
const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener( "listen", () => console.log("Listening on http://localhost:8080"));
await app.listen({ port: 8080 })