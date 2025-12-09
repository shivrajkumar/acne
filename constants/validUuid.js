export function validateUUID(caseId) {
  const uuidRegex =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  const validId = uuidRegex.test(caseId);
  if (validId) {
    return true;
  } else {
    return false;
  }
}
