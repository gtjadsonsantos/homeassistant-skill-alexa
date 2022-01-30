import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

router.get("/auth/authorize", (ctx) => {

    const client_id = ctx.request.url.searchParams.get("client_id");
    const redirect_url = ctx.request.url.searchParams.get("redirect_uri");
    const state = ctx.request.url.searchParams.get("state");

    console.log("client_id", client_id)
    console.log("redirect_url", redirect_url)
    console.log("state", state)

    ctx.response.body = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>HomeAssistant Skill Alexa</title>
            <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
            <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
            <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>

            <style>
                input {
                    margin-top: 10px;
                    margin-bottom: 10px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="card card-container">
                    <form id="form" class="form">
                        <input type="text" id="homeassistant-url" class="form-control" placeholder="Home Assistant Url" required autofocus>
                        <button class="btn btn-lg btn-primary btn-block btn-signin" type="submit">Seguir</button>
                    </form>
                </div>
            </div>

            <script type="text/javascript">
                document.getElementById('form').addEventListener("submit",(event)=> {
                    event.preventDefault()

                    const homeassistantUrl = document.getElementById('homeassistant-url').value
                    const path = "/auth/authorize?client_id=${client_id}&redirect_uri=${redirect_url}&state=${state}"
                    
                    window.location.href= homeassistantUrl + path

                })
            </script>
        </body>
        </html>
    `
});



router.post("/auth/token", (ctx) => {
    for (const key in ctx.request.url.searchParams.keys()) {
       console.log(key)
    }

    console.log("bateu aqui de novo")
});
  

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener( "listen", () => console.log("Listening on http://localhost:8080"));
await app.listen({ port: 8080 })