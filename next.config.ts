import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lighthouse and search-engine parsers expect dynamic metadata such as
  // descriptions to be present in <head>. Disable streamed metadata so all
  // dynamic public routes emit their metadata there consistently.
  htmlLimitedBots: /.*/,
  images: {
    // The restricted Wikimedia bridge is a same-origin image source with a
    // dynamic `url` query parameter. Allow Next Image to consume that local
    // route on pages that still use the native optimizer around bridged images.
    // The bridge itself validates the upstream host, so this does not broaden
    // which remote origins the application can proxy.
    localPatterns: [{ pathname: "/api/image" }],

    // Use Next.js' native same-origin image optimizer. Remote assets are fetched
    // server-side, resized and re-encoded before reaching the browser, avoiding
    // third-party cookies while reducing oversized CMS/fleet image payloads.
    formats: ["image/avif", "image/webp"],
    qualities: [55, 60, 62, 70, 75],
    minimumCacheTTL: 86400,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "commons.wikimedia.org" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "gostops.com" },
      { protocol: "https", hostname: "www.ranthamborenationalpark.com" },
      { protocol: "https", hostname: "static.toiimg.com" },
      { protocol: "https", hostname: "www.indianrajputs.com" },
      { protocol: "https", hostname: "i.pinimg.com" },
      { protocol: "https", hostname: "r1imghtlak.mmtcdn.com" },
      { protocol: "https", hostname: "www.trawellino.com" },
      { protocol: "https", hostname: "jckolkata.wordpress.com" },
      { protocol: "https", hostname: "www.stayvista.com" },
      { protocol: "https", hostname: "s7ap1.scene7.com" },
      { protocol: "https", hostname: "vishwanthretreat.com" },
      { protocol: "https", hostname: "avathioutdoors.gumlet.io" },
      { protocol: "https", hostname: "www.fabhotels.com" },
      { protocol: "https", hostname: "cms.patrika.com" },
      { protocol: "https", hostname: "www.rajasthandriver.com" },
      { protocol: "https", hostname: "media.assettype.com" },
      { protocol: "https", hostname: "api.welcomerajasthantours.com" },
      { protocol: "https", hostname: "media1.thrillophilia.com" },
      { protocol: "https", hostname: "static2.tripoto.com" },
      { protocol: "https", hostname: "media.traveldepartment.com" },
      { protocol: "https", hostname: "www.sreestours.com" },
      { protocol: "https", hostname: "telugu.nativeplanet.com" },
      { protocol: "https", hostname: "www.transindiatravels.com" },
      { protocol: "https", hostname: "maataxiservice.com" },
      { protocol: "https", hostname: "menworld.pl" },
      { protocol: "https", hostname: "www.motorbeam.com" },
      { protocol: "https", hostname: "assets.cdntoyota.co.za" },
      { protocol: "https", hostname: "images10.gaadi.com" },
      { protocol: "https", hostname: "www.smtravelhub.com" },
      { protocol: "https", hostname: "www.southtourism.in" },
      { protocol: "https", hostname: "godavarigrand.com" },
      { protocol: "https", hostname: "ncdtempotravellerhire.com" },
      { protocol: "https", hostname: "busesandvans.tatamotors.com" },
      { protocol: "https", hostname: "aaitoursandtravels.com" },
    ],
  },
};

export default nextConfig;
