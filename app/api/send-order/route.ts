import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const cart = Array.isArray(data.cart) ? data.cart : [];

    const cartText =
      cart.length > 0
        ? cart
            .map(
              (item: any) =>
                `- ${item.boxName} | ilość: ${item.quantity} | cena: ${item.price} zł | razem: ${item.total} zł`
            )
            .join("\n")
        : "Brak produktów";

    await resend.emails.send({
      from: "BOXLOVE <onboarding@resend.dev>",
      to: ["radwanbartlomiej@gmail.com"],
      subject: "Nowe zamówienie BOXLOVE",
      text: `
Nowe zamówienie BOXLOVE

ZAMÓWIENIE:
${cartText}

SUMA PRODUKTÓW:
${data.totalAmount || 0} zł

DOSTAWA:
Data dostawy: ${data.delivery?.date || "Brak danych"}
Przedział godzinowy: ${data.delivery?.slot || "Brak danych"}

DANE KLIENTA:
Imię i nazwisko: ${data.name}
Telefon: ${data.phone}
E-mail: ${data.email}

ADRES DOSTAWY:
Ulica i numer: ${data.street}
Kod pocztowy: ${data.postalCode}
Miasto: ${data.city}

UWAGI:
${data.notes || "Brak"}

---
Wysłane z aplikacji BOXLOVE
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false }, { status: 500 });
  }
}