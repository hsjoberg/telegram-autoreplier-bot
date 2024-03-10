/**
 * If you're using the bot with Deno Deploy or other serverless solutions, this
 * should be the enrty point.
 */

import { webhookCallback } from "https://deno.land/x/grammy@v1.21.1/mod.ts";

import bot from "./main.ts";

const handleUpdate = webhookCallback(bot, "std/http");

Deno.serve(async (req) => {
  if (req.method === "POST") {
    const url = new URL(req.url);
    if (url.pathname.slice(1) === bot.token) {
      try {
        return await handleUpdate(req);
      } catch (err) {
        console.error(err);
      }
    }
  }
  return new Response();
});
