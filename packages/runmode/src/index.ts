// The one module that reads the run mode (spec 16). PREPROCESS_REGION is unset
// on a self-hosted install and set to a region on our cloud. It turns on only
// what our hosted service does (billing and metering, open sign-up, our model
// access); switches turn features on or off and never select a different
// implementation.

export const RUN_MODE_VARIABLE = "PREPROCESS_REGION";

export type RunMode =
  | { readonly kind: "cloud"; readonly region: string }
  | { readonly kind: "self-hosted" };

export const runMode = (env: {
  readonly [RUN_MODE_VARIABLE]?: string;
}): RunMode => {
  const region = env[RUN_MODE_VARIABLE];
  if (region) {
    return { kind: "cloud", region };
  }
  return { kind: "self-hosted" };
};
