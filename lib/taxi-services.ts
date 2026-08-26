export type CmsImage = { url: string; publicId?: string; alt?: string };

function text(value: unknown, max = 5000) { return typeof value === "string" ? value.trim().slice(0, max) : ""; }
function num(value: unknown, fallback = 0) { const n = Number(value); return Number.isFinite(n) ? n : fallback; }
function bool(value: unknown, fallback = false) { return typeof value === "boolean" ? value : fallback; }
function image(value: unknown): CmsImage | null { if (!value || typeof value !== "object") return null; const v = value as Record<string, unknown>; const url = text(v.url, 1500); if (!/^https?:\/\//i.test(url)) return null; return { url, publicId: text(v.publicId, 500), alt: text(v.alt, 250) }; }
function strings(value: unknown, maxItems = 50) { return Array.isArray(value) ? value.map((x)=>text(x,500)).filter(Boolean).slice(0,maxItems) : []; }
function slugify(value: string) { return value.toLowerCase().trim().replace(/['’]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0,120); }
function features(value: unknown) { return Array.isArray(value) ? value.slice(0,30).map((x)=>{ const v=x&&typeof x==="object"?x as Record<string,unknown>:{}; return { title:text(v.title,160), description:text(v.description,1000), icon:text(v.icon,80) }; }).filter((x)=>x.title) : []; }
function cards(value: unknown) { return Array.isArray(value) ? value.slice(0,30).map((x)=>{ const v=x&&typeof x==="object"?x as Record<string,unknown>:{}; return { title:text(v.title,160), description:text(v.description,1200), image:image(v.image) }; }).filter((x)=>x.title) : []; }
function routes(value: unknown) { return Array.isArray(value) ? value.slice(0,40).map((x)=>{ const v=x&&typeof x==="object"?x as Record<string,unknown>:{}; return { title:text(v.title,180), from:text(v.from,120), to:text(v.to,120), durationLabel:text(v.durationLabel,120), startingPrice:Math.max(0,num(v.startingPrice)), priceUnit:text(v.priceUnit,80), image:image(v.image) }; }).filter((x)=>x.title) : []; }
function faqs(value: unknown) { return Array.isArray(value) ? value.slice(0,30).map((x)=>{ const v=x&&typeof x==="object"?x as Record<string,unknown>:{}; return { question:text(v.question,300), answer:text(v.answer,3000) }; }).filter((x)=>x.question&&x.answer) : []; }

export function normalizeTaxiServiceInput(raw: unknown) {
  const input = raw && typeof raw === "object" ? raw as Record<string,unknown> : {};
  const title = text(input.title,180);
  const allowedTemplates = new Set(["generic","route","airport","round_trip","local","corporate","wedding"]);
  const template = text(input.pageTemplate,30);
  const bookingRaw = input.bookingForm && typeof input.bookingForm === "object" ? input.bookingForm as Record<string,unknown> : {};
  const seoRaw = input.seo && typeof input.seo === "object" ? input.seo as Record<string,unknown> : {};
  return {
    title,
    slug: slugify(text(input.slug,180) || title),
    serviceType: text(input.serviceType,120),
    pageTemplate: allowedTemplates.has(template) ? template : "generic",
    tagline: text(input.tagline,220),
    shortDescription: text(input.shortDescription,900),
    overview: text(input.overview,8000),
    heroImage: image(input.heroImage),
    gallery: Array.isArray(input.gallery) ? input.gallery.map(image).filter((x): x is CmsImage=>Boolean(x)).slice(0,20) : [],
    origin: text(input.origin,160), destination: text(input.destination,160),
    distanceKm: Math.max(0,Math.round(num(input.distanceKm))), estimatedDuration:text(input.estimatedDuration,120), tripType:text(input.tripType,100),
    startingPrice:Math.max(0,num(input.startingPrice)), priceUnit:text(input.priceUnit,80), priceNote:text(input.priceNote,600),
    bookingForm: {
      title:text(bookingRaw.title,180)||"Plan Your Ride",
      showReturnDate:bool(bookingRaw.showReturnDate), showTime:bool(bookingRaw.showTime), showTransferType:bool(bookingRaw.showTransferType), showFlightNumber:bool(bookingRaw.showFlightNumber), showVehicleType:bool(bookingRaw.showVehicleType,true), showPassengers:bool(bookingRaw.showPassengers,true),
    },
    heroFeatures:features(input.heroFeatures), whyChooseFeatures:features(input.whyChooseFeatures), serviceCards:cards(input.serviceCards), popularRoutes:routes(input.popularRoutes), useCases:cards(input.useCases), faq:faqs(input.faq),
    featured:bool(input.featured), status:input.status === "published" ? "published" as const : "draft" as const, sortOrder:Math.round(num(input.sortOrder)),
    seo:{ metaTitle:text(seoRaw.metaTitle,180), metaDescription:text(seoRaw.metaDescription,320), keywords:strings(seoRaw.keywords,40), canonicalUrl:text(seoRaw.canonicalUrl,1000), ogImage:image(seoRaw.ogImage) },
  };
}

export function validateTaxiService(input: ReturnType<typeof normalizeTaxiServiceInput>) {
  const errors:string[]=[];
  if(input.title.length<3) errors.push("Title must contain at least 3 characters.");
  if(!input.slug) errors.push("A valid slug is required.");
  if(!input.serviceType) errors.push("Service type is required.");
  if(input.shortDescription.length<20) errors.push("Short description must contain at least 20 characters.");
  if(!input.heroImage) errors.push("Hero image is required.");
  return errors;
}
