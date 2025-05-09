export async function logGtmEvent(data) {
  try {
    window.dataLayer = window.dataLayer || [];
    await window.dataLayer.push(data);
  } catch (error) {
    console.info(error.toString());
  }
}
