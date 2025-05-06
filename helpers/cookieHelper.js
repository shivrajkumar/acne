export function getCookieValue(cookieName, cookieArray) {
    const cookie = cookieArray.find(c => c.trim().startsWith(cookieName + '='));
    if (!cookie) return null;
    // Trim and split on the first '='
    const [, ...rest] = cookie.trim().split('=');
    return rest.join('=');
}