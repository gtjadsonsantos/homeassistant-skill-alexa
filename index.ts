import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const router = new Router();

app.use(router.routes());
app.use(router.allowedMethods());

router.get("/auth/authorize", (ctx) => {
  const client_id = ctx.request.url.searchParams.get("client_id"); //"https://smarthome.deno.dev";
  const response_type = ctx.request.url.searchParams.get("response_type");
  const state = ctx.request.url.searchParams.get("state");
  const scope = ctx.request.url.searchParams.get("scope");
  const redirect_uri = ctx.request.url.searchParams.get("redirect_uri"); //"https://smarthome.deno.dev/auth_callback";
  
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


router.get("/auth_callback", (ctx) => {
  const code = ctx.request.url.searchParams.get("code");
  const state = ctx.request.url.searchParams.get("state") as string;
  
  const state_parse: {hassUrl: string,clientId: string} = JSON.parse(atob(state))

  ctx.response.status = 200
  ctx.response.redirect(
    `https://pitangui.amazon.com/api/skill/link/M1S726D3FYBD5K?state=${state}&code=${code}`
  );
});

router.post("/auth/token", async (ctx) => {
    const hass_url = "https://unisec.unicontrol.me";

    const data = await ctx.request.body({type: "form"}).value;
    data.set("client_id","https://pitangui.amazon.com")

    const response = await fetch(`${hass_url}/auth/token`, {
      body: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      method: "POST"
    })

    ctx.response.body = await response.json();
});

router.post("/debug",  async  (ctx) => {

  const data = await ctx.request.body().value

  console.log(data)


  ctx.response.status = 200
});


app.addEventListener("listen", () =>
  console.log("Listening on https://smarthome.unicontrol.me")
);

await app.listen({ port: 8080 });
