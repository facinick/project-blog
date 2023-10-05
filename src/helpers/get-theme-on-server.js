import { cookies, headers } from "next/headers";

function getThemeOnServer() {
  const headersList = headers();
  const cookiesList = cookies();

  if (cookiesList.has("color-scheme")) {
    return cookiesList.get("color-scheme")?.value;
  }

  if (headersList.has("Sec-CH-Prefers-Color-Scheme")) {
    return headersList.get("Sec-CH-Prefers-Color-Scheme");
  }

  return null;
}

export { getThemeOnServer };
