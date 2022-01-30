import { serve } from "https://deno.land/std@0.114.0/http/server.ts";

console.log("Listening on http://localhost:8000");
serve((req) => {
  return new Response("Xablau!", {
    headers: { "content-type": "text/plain" },
  });
});