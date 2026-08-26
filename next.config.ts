import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
    ],
  },
};

export default nextConfig;
