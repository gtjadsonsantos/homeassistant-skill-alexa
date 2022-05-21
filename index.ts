import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import axiod from "https://deno.land/x/axiod/mod.ts";
import { encodeUrl } from "https://deno.land/x/encodeurl/mod.ts";

const app = new Application();
const router = new Router();

app.use(router.routes());
app.use(router.allowedMethods());

router.get("/auth/authorize", (ctx) => {
  const client_id = "https://smarthome.deno.dev"; //ctx.request.url.searchParams.get("client_id");
  const response_type = ctx.request.url.searchParams.get("response_type");
  const state = ctx.request.url.searchParams.get("state");
  const scope = ctx.request.url.searchParams.get("scope");
  const redirect_uri = "https://smarthome.deno.dev/auth_callback"; //ctx.request.url.searchParams.get("redirect_uri");

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

  //console.log(encodeUrl(ctx.request.url.toString()))
  //const state_parse: {hassUrl: string,clientId: string} = JSON.parse(atob(state))

  ctx.response.redirect(
    `https://pitangui.amazon.com/api/skill/link/M1S726D3FYBD5K?state=${state}&code=${code}`
  );
});

router.post("/auth/token", async (ctx) => {
  const hass_url = "https://unisec.unicontrol.me";
  const code = ctx.request.url.searchParams.get("code") as string;
  const state = ctx.request.url.searchParams.get("state") as string;
  const grant_type = ctx.request.url.searchParams.get("grant_type") as string;
  const redirect_uri = ctx.request.url.searchParams.get("redirect_uri") as string;
  const client_id = ctx.request.url.searchParams.get("client_id") as string;

  const { data } = await axiod.post(
    `${hass_url}/auth/token`,
    new URLSearchParams({grant_type,code,client_id}),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  ctx.response.body = data;
});

app.addEventListener("listen", () =>
  console.log("Listening on https://smarthome.unicontrol.me")
);
await app.listen({ port: 8080 });
