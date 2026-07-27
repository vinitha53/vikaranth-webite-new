import "./globals.css";

export const metadata = {
  title: "Vikranth Chemical Corporation | Ingredients That Build Your Business",
  description:
    "Premium food ingredients and specialty chemical distribution across India. Bakery, chocolate, dairy, beverage, nutraceutical and functional solutions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
