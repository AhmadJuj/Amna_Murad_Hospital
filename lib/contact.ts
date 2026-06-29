export const hospitalPhoneDisplay = "03006409917";
export const hospitalPhoneHref = "tel:+923006409917";
export const emergencyPhoneDisplay = "0553734141";
export const emergencyPhoneHref = "tel:+92553734141";

export function whatsappHref(
  message = "Hello Amna Murad Hospital, I would like to book an appointment.",
) {
  return `https://wa.me/923006409917?text=${encodeURIComponent(message)}`;
}
