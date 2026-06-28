export const hospitalPhoneDisplay = "03006409917";
export const hospitalPhoneHref = "tel:+923006409917";

export function whatsappHref(
  message = "Hello Amna Murad Hospital, I would like to book an appointment.",
) {
  return `https://wa.me/923006409917?text=${encodeURIComponent(message)}`;
}
