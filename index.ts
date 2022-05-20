import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const router = new Router();

app.use(router.routes());
app.use(router.allowedMethods());


router.get("/auth/authorize",  (ctx) => {

    const client_id = ctx.request.url.searchParams.get("client_id");
    const response_type = ctx.request.url.searchParams.get("response_type");
    const state = ctx.request.url.searchParams.get("state");
    const scope = ctx.request.url.searchParams.get("scope");
    const redirect_uri = ctx.request.url.searchParams.get("redirect_uri");

    ctx.response.body = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='utf-8'>
        <meta http-equiv='X-UA-Compatible' content='IE=edge'>
        <title>Unicontrol</title>
        <meta name='viewport' content='width=device-width, initial-scale=1'>
    </head>
    <body>
        <h1>Unicontrol</h1>
        <input>
        <button>Login</button>
        <script>
            const $input = document.querySelector("input");
            const $button = document.querySelector("button");

            $button.addEventListener("click", () => {
                window.location.href = String($input.value + '/auth/authorize?client_id=${client_id}&response_type=${response_type}&state=${state}&scope=${scope}&redirect_uri=${redirect_uri}').replaceAll(" ", '');
            })
        </script>
    </body>
    </html>
    
    `;
});



router.post("/auth/token", async (ctx) => {
    console.log("/auth/token")
    console.log(await ctx.request.body({type: "json"}).value
    
    //const client_id = ctx.request.url.searchParams.get("client_id");
    //const code = ctx.request.url.searchParams.get("code");
    //const grant_type = ctx.request.url.searchParams.get("grant_type");

    //ctx.response.redirect(``)

    //access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjZjIxNjBhZmViOTk0OTkyYTkxODM5NGU1YmQ4YzU2YSIsImlhdCI6MTY0MzcwMzk5MCwiZXhwIjoxNjQzNzA1NzkwfQ.b1lfnu4Q8E_jagQE_6vioqxKUMTzyeqxFIsgKdoFEUA"
    //expires_in: 1800
    //refresh_token: "fb01a2514da8013f899e05befaeafa90ac5fb2628a99f6d3bd1591baf2b4ae07f4876816cd08bcafce6e30f7092ebcfbd1ad04898013359d5e6bbee9c6aaf3cf"
    //token_type: "Bearer"

});

router.post("/logs", async (ctx) => {
        console.log(await ctx.request.body().value)
        ctx.response.status = 200
});

app.addEventListener( "listen", () => console.log("Listening on http://localhost:8080"));
await app.listen({ port: 8080 })