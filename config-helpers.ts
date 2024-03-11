export function parseEnvAutoReply(username: string, firstName: string) {
  return Deno.env.get("AUTOREPLY_MESSAGE")?.replace("%USERNAME%", username)
    .replace("%FIRSTNAME%", firstName);
}

export function parseEnvWhitelistedUsers() {
  return Deno.env.get("WHITELISTED_USERS")?.split(",").map((i) =>
    Number.parseInt(i.trim())
  );
}
