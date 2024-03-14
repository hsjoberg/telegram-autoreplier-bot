/**
 * Test env variable config behavior
 */

import { assertEquals } from "https://deno.land/std@0.219.0/assert/mod.ts";
import { Temporal } from "npm:@js-temporal/polyfill@0.4.4";

import { autoReplyIfEnoughTimeHasPassed } from "./config.ts";

Deno.test('Should reply on REPLY_ON_DAYS_PASSED is set to "30" and 31 days has passed', () => {
  Deno.env.set("REPLY_ON_DAYS_PASSED", "30");

  const now = Temporal.Now.instant();

  // Calculate the instant 31 days into the future.
  const futureInstant = now.add({
    hours: 24 * 31,
  });

  const duration = now.until(futureInstant, {
    largestUnit: "minute",
  });

  assertEquals(autoReplyIfEnoughTimeHasPassed(duration), true);
});

Deno.test('Should not reply on REPLY_ON_DAYS_PASSED is set to "30" and 29 days has passed', () => {
  Deno.env.set("REPLY_ON_DAYS_PASSED", "30");

  const now = Temporal.Now.instant();

  // Calculate the instant 29 days into the future.
  const futureInstant = now.add({
    hours: 24 * 29,
  });

  const duration = now.until(futureInstant, {
    largestUnit: "minute",
  });

  assertEquals(autoReplyIfEnoughTimeHasPassed(duration), false);
});
