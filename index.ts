import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import instances from "./instances.ts" 

const app = new Application();
const router = new Router();

app.use(router.routes());
app.use(router.allowedMethods());




router.get("/auth/authorize", async (ctx) => {

    const client_id = ctx.request.url.searchParams.get("client_id");
    const redirect_uri = ctx.request.url.searchParams.get("redirect_uri");
    const state = ctx.request.url.searchParams.get("state");
    const response_type = ctx.request.url.searchParams.get("response_type");
    const scope = ctx.request.url.searchParams.get("scope");
    
    if (ctx.request.hasBody) {
        const form_data = await ctx.request.body({type: "form-data"}).value.read()

       const instanceFound =  instances.find(instance => instance.email == form_data.fields.exampleInputEmail1 && instance.password == form_data.fields.exampleInputPassword1)

        if (instanceFound){
            ctx.response.redirect(`${instanceFound.protocol}://${instanceFound.host}:${instanceFound.port}/auth/authorize?client_id=${client_id}&response_type=${response_type}&state=${state}&scope=${scope}&redirect_uri=${redirect_uri}`);
        } else {
            ctx.response.status = 404;
            ctx.response.body = "Account Not Found :("
        }
    }

    ctx.response.body = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='utf-8'>
        <meta http-equiv='X-UA-Compatible' content='IE=edge'>
        <title>Unicontrol Alexa</title>
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <style>
            h1 {
                text-align: center;
            }
            body {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
            form {
                max-width: 400px;
                width: 100%;
                display: flex;
                flex-direction: column;
                margin-top: 20px;
            }
            
        </style>
    </head>
    <body>
        <h1>Unicontrol Alexa</h1>
        <form action="/auth/authorize?client_id=${client_id}&response_type=${response_type}&state=${state}&scope=${scope}&redirect_uri=${redirect_uri}">
        <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
        </div>
        <button type="submit" class="btn btn-primary">Log in</button>
        </form>
    </body>
    </html>
    
    `;
});



router.post("/auth/token", (ctx) => {

    
    const client_id = ctx.request.url.searchParams.get("client_id");
    const code = ctx.request.url.searchParams.get("code");
    const grant_type = ctx.request.url.searchParams.get("grant_type");

    //ctx.response.redirect(``)

    //access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjZjIxNjBhZmViOTk0OTkyYTkxODM5NGU1YmQ4YzU2YSIsImlhdCI6MTY0MzcwMzk5MCwiZXhwIjoxNjQzNzA1NzkwfQ.b1lfnu4Q8E_jagQE_6vioqxKUMTzyeqxFIsgKdoFEUA"
    //expires_in: 1800
    //refresh_token: "fb01a2514da8013f899e05befaeafa90ac5fb2628a99f6d3bd1591baf2b4ae07f4876816cd08bcafce6e30f7092ebcfbd1ad04898013359d5e6bbee9c6aaf3cf"
    //token_type: "Bearer"

});
  

app.addEventListener( "listen", () => console.log("Listening on http://localhost:8080"));
await app.listen({ port: 8080 })