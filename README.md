# Telegram auto-replier bot

This bot will automatically reply to any new or infrequent user on Telegram.
This can be helpful to prevent scammers from scamming users.

## Prerequisites

You need [Deno](https://deno.com) installed.

## Run

### Locally or on your own server:

Set up your configuration in `config.ts`. Use Telegram's `BotFather` to create a
bot, then add the bot to your chat group.

`deno task start`.

### Deno Deploy and other serverless solutions supporting Deno

To deploy using Deno Deploy, create a bot and set up a
[webhook URL with using Telegram's bot API](https://core.telegram.org/bots/webhooks#how-do-i-set-a-webhook-for-either-type).
In the end of the webhook URL, make sure that it is the Telegram bot token (i.e
`https://my-bot.deno.dev/<bot token>`). Inside Deno Deploy's interface, select
`webhook.ts` as the entry point.

Set up these environment variables. See [config.ts](./config.ts) for more info.

```
TELEGRAM_TOKEN
The bot token you get from GodFather.

AUTOREPLY_MESSAGE (optional)
The message the bot should automatically reply with.
You can use the macros %USERNAME% and %FIRSTNAME% for the user's username and
first name.

WHITELISTED_USERS (optional)
Comma-separated list of whitelisted user's IDs.

DENOKV_TOPLEVEL_KEY (optional)
You can set or change this environment variable to reset the state.
```

## Contributions

The project uses `deno fmt`. Run it before committing.

For Visual Studio Code you can install the Deno extension which includes the
formatter.

## License

Public domain via [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0).
