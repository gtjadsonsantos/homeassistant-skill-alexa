import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();


router.get("/auth/authorize", (ctx) => {
    const client_id = ctx.request.url.searchParams.get("client_id");
    const redirect_url = ctx.request.url.searchParams.get("redirect_uri");
    const state = ctx.request.url.searchParams.get("state");
    const response_type = ctx.request.url.searchParams.get("response_type");
    const scope = ctx.request.url.searchParams.get("scope");

    ctx.response.redirect(`https://becocastelo.unicontrol.me/auth/authorize?client_id=${client_id}&redirect_uri=${redirect_url}&state=${state}&response_type=${response_type}&scope=${scope}`);
});



router.post("/auth/token", async (ctx) => {

    const homeassistant = ctx.request.url.searchParams.get("homeassistant");

    const {
        client_id,
        code,
        grant_type
    } = await ctx.request.body().value 

    console.log("client_id",client_id)
    console.log("code",code)
    console.log("grant_type",grant_type)
    console.log("homeassistant",homeassistant)

    //ctx.response.redirect(``)

    //access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjZjIxNjBhZmViOTk0OTkyYTkxODM5NGU1YmQ4YzU2YSIsImlhdCI6MTY0MzcwMzk5MCwiZXhwIjoxNjQzNzA1NzkwfQ.b1lfnu4Q8E_jagQE_6vioqxKUMTzyeqxFIsgKdoFEUA"
    //expires_in: 1800
    //refresh_token: "fb01a2514da8013f899e05befaeafa90ac5fb2628a99f6d3bd1591baf2b4ae07f4876816cd08bcafce6e30f7092ebcfbd1ad04898013359d5e6bbee9c6aaf3cf"
    //token_type: "Bearer"

});
  

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener( "listen", () => console.log("Listening on http://localhost:8080"));
await app.listen({ port: 8080 })