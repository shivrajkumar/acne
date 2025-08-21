import FingerprintJS from "@fingerprintjs/fingerprintjs";

let fpPromise = null;

// initialize only once (singleton)
export const getFingerprint = async () => {
  if (!fpPromise) {
    fpPromise = FingerprintJS.load();
  }
  const fp = await fpPromise;
  const result = await fp.get();
  return result.visitorId; // unique fingerprint string
};
