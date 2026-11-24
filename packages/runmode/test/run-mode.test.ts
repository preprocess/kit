import { env } from "cloudflare:workers";
import { describe, expect, it } from "vitest";

import { runMode } from "../src/index.ts";

describe("runMode", () => {
  it("reads the region from the Worker's bindings", () => {
    expect(runMode(env)).toEqual({ kind: "cloud", region: "test-region" });
  });

  it("treats an unset or empty region as a self-hosted install", () => {
    expect(runMode({})).toEqual({ kind: "self-hosted" });
    expect(runMode({ PREPROCESS_REGION: "" })).toEqual({ kind: "self-hosted" });
  });
});
