import { Bot } from "https://deno.land/x/grammy@v1.21.1/mod.ts";
// Polyfilling Temporal API until it becomes stable in Deno.
// Otherwise Deno Deploy won't work.
import { Temporal } from "npm:@js-temporal/polyfill@0.4.4";

import {
  autoReplyIfEnoughTimeHasPassed,
  constructReplyMessage,
  denoKvTopLevelKey,
  telegramBotToken,
  whitelistedUsers,
} from "./config.ts";

const bot = new Bot(telegramBotToken);
const kv = await Deno.openKv();

interface IUser {
  lastSeen: number; // UNIX timestamp
}

async function shouldReply(chatId: number, userId: number): Promise<boolean> {
  if (whitelistedUsers.includes(userId)) {
    return false;
  }

  const user = await kv.get<IUser>([denoKvTopLevelKey, chatId, userId]);
  if (!user.value) {
    return true;
  }

  const lastSeen = Temporal.Instant.fromEpochSeconds(user.value.lastSeen);
  const currentTime = Temporal.Now.instant();

  const duration = lastSeen.until(currentTime);
  return autoReplyIfEnoughTimeHasPassed(duration);
}

async function updateLastMessageDate(chatId: number, userId: number) {
  const timestamp = Temporal.Now.instant().epochSeconds;
  await kv.set([denoKvTopLevelKey, chatId, userId], {
    lastSeen: timestamp,
  } as IUser);
}

// Handle incoming Telegram messages
bot.on("message:text", async (ctx) => {
  if (ctx.chat.type === "group" || ctx.chat.type === "supergroup") {
    const chatId = ctx.chat.id;
    const userId = ctx.from.id;
    const username = ctx.from.username;
    const firstName = ctx.from.first_name;

    if (await shouldReply(chatId, userId)) {
      console.log(`Replying to ${username ?? "Unknown"} (${userId}).`);
      await ctx.reply(
        constructReplyMessage(username ?? "Anonymous", firstName),
        {
          reply_to_message_id: ctx.msg.message_id,
        },
      );
    }
    await updateLastMessageDate(chatId, userId);
  } else if (ctx.chat.type === "private") {
    ctx.reply(
      "I only work in group chats. Add me to a group chat to get started",
    );
  }
});

// If this file is the main entry point for Deno, start the long-polling.
// Otherwise we assume webhook is being used (`webhook.ts`),
if (import.meta.main) {
  bot.start();
  console.log("Bot started.");
}

export default bot;
