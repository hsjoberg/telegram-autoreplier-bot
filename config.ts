/**
 * You can either just change the code here to set your configuration, or use environment variables.
 * See README.md for more info for the supported environment variables.
 *
 * If you want to deploy the bot on Deno Deploy or other serverless solutions, you probably have to
 * use environment variables method.
 */
import type { Temporal } from "npm:@js-temporal/polyfill@0.4.4";
import { parseEnvAutoReply } from "./config-helpers.ts";
import { parseEnvWhitelistedUsers } from "./config-helpers.ts";

export const telegramBotToken: string = Deno.env.get("TELEGRAM_TOKEN") ?? "";

export function constructReplyMessage(username: string, firstName: string) {
  return parseEnvAutoReply(username, firstName) ??
    `Hi ${username}.

Beware of scammers impersonating devs.
Devs will NOT immediately start talking with you in DMs.

Please keep support inquires in the chat group.`;
}

// These Telegram User IDs will not receive a reply.
export const whitelistedUsers = parseEnvWhitelistedUsers() ?? [];

// Auto-reply to infrequent users. Return false here to deactivate.
export function autoReplyIfEnoughTimeHasPassed(duration: Temporal.Duration) {
  return duration.months >= 3;
}

// Changing this to another value will reset state.
export const denoKvTopLevelKey = Deno.env.get("DENOKV_TOPLEVEL_KEY") ??
  "autoreply";
