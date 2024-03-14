import type { Temporal } from "npm:@js-temporal/polyfill@0.4.4";

export function parseEnvAutoReply(username: string, firstName: string) {
  return Deno.env.get("AUTOREPLY_MESSAGE")?.replace("%USERNAME%", username)
    .replace("%FIRSTNAME%", firstName);
}

export function parseEnvWhitelistedUsers() {
  return Deno.env.get("WHITELISTED_USERS")?.split(",").map((i) =>
    Number.parseInt(i.trim())
  );
}

export function evaluateDaysPassedEnv(
  duration: Temporal.Duration,
): boolean | null {
  const daysPassedEnvStr = Deno.env.get("REPLY_ON_DAYS_PASSED");
  if (daysPassedEnvStr === undefined) {
    return null;
  }

  const daysPassedEnv = Number.parseInt(daysPassedEnvStr);
  if (daysPassedEnv === 0) {
    return false;
  }
  // Temporal does not give us day diff, so we convert days to minutes.
  return duration.minutes >= (daysPassedEnv * 24 * 60);
}
