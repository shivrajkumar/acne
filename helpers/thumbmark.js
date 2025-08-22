import { getThumbmark } from "@thumbmarkjs/thumbmarkjs";

export const fetchThumbprint = async () => {
  try {
    const result = await getThumbmark();
    return result?.thumbmark || null;
  } catch (error) {
    console.error("Error generating thumbmark:", error);
    return null;
  }
};
