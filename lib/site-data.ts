export const siteContact = {
  phones: [
    { display: "+91 98280 23217", href: "tel:+919828023217" },
    { display: "+91 98290 23217", href: "tel:+919829023217" },
  ],
  whatsapp: "https://wa.me/919828023217",
  email: "ranitours@rediffmail.com",
  emailHref: "mailto:ranitours@rediffmail.com",
  address: "UIT Shopping Centre, 3, Ajeet Mal Bhandari Rd, Shastri Nagar, Jodhpur, Rajasthan 342003",
  mapsUrl: "https://maps.app.goo.gl/YoiKzXHZ4oipvR36A",
} as const;

export const popularRoutes = [
  ["Jodhpur", "Jaisalmer", "Desert city escape"],
  ["Jodhpur", "Udaipur", "Lakes & palaces"],
  ["Jodhpur", "Jaipur", "The Pink City"],
  ["Jodhpur", "Mount Abu", "Rajasthan's hill retreat"],
] as const;

export const destinations = [
  { name: "Jodhpur", note: "Blue City", accent: "from-[#004c2a] to-[#079455]" },
  { name: "Jaisalmer", note: "Golden City", accent: "from-[#8d5b15] to-[#d59a2d]" },
  { name: "Udaipur", note: "City of Lakes", accent: "from-[#21547c] to-[#4a9ac2]" },
  { name: "Jaipur", note: "Pink City", accent: "from-[#8f4050] to-[#d87885]" },
] as const;
