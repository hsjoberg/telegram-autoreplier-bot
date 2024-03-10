import type { Temporal } from "npm:@js-temporal/polyfill@0.4.4";

export const telegramBotToken: string = Deno.env.get("TELEGRAM_TOKEN") ?? "";

export function constructReplyMessage(username: string, firstName: string) {
  return Deno.env.get("AUTOREPLY_MESSAGE")?.replace("%USERNAME%", username)
    .replace("%FIRSTNAME%", firstName) ??
    `Hi ${username}.

Beware of scammers impersonating devs.
Devs will NOT immediately start talking with you in DMs.

Please keep support inquires in the chat group.`;
}

// These Telegram User IDs will not receive a reply
export const whitelistedUsers =
  Deno.env.get("WHITELISTED_USERS")?.split(",").map((i) =>
    Number.parseInt(i.trim())
  ) ?? [];

// Auto-reply to infrequent users. Return false here to deactivate.
export function autoReplyIfEnoughTimeHasPassed(duration: Temporal.Duration) {
  return duration.months >= 3;
}

// Changing this to another value will reset state.
export const denoKvTopLevelKey = Deno.env.get("DENOKV_TOPLEVEL_KEY") ??
  "autoreply";
