export type CmsImage = { url: string; publicId?: string; alt?: string };
export type ItineraryStopInput = { time?: string; title: string };
export type ItineraryDayInput = { day: number; title: string; description?: string; image?: CmsImage | null; stops?: ItineraryStopInput[] };
export type FaqInput = { question: string; answer: string };

export function slugify(value: string) {
  return value.toLowerCase().trim().replace(/['’]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 120);
}

function text(value: unknown, max = 5000) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}
function numberValue(value: unknown, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}
function bool(value: unknown, fallback = false) {
  return typeof value === "boolean" ? value : fallback;
}
function image(value: unknown): CmsImage | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Record<string, unknown>;
  const url = text(item.url, 1500);
  if (!url || !/^https?:\/\//i.test(url)) return null;
  return { url, publicId: text(item.publicId, 500), alt: text(item.alt, 250) };
}
function stringList(value: unknown, maxItems = 80) {
  if (!Array.isArray(value)) return [];
  return value.map((item) => text(item, 500)).filter(Boolean).slice(0, maxItems);
}

export function normalizeTourPackageInput(raw: unknown) {
  const input = raw && typeof raw === "object" ? raw as Record<string, unknown> : {};
  const title = text(input.title, 180);
  const slug = slugify(text(input.slug, 180) || title);
  const heroImage = image(input.heroImage);
  const itinerary = Array.isArray(input.itinerary) ? input.itinerary.slice(0, 30).map((entry, index) => {
    const day = entry && typeof entry === "object" ? entry as Record<string, unknown> : {};
    const stops = Array.isArray(day.stops) ? day.stops.slice(0, 30).map((stop) => {
      const s = stop && typeof stop === "object" ? stop as Record<string, unknown> : {};
      return { time: text(s.time, 30), title: text(s.title, 300) };
    }).filter((stop) => stop.title) : [];
    return { day: Math.max(1, Math.round(numberValue(day.day, index + 1))), title: text(day.title, 180), description: text(day.description, 3000), image: image(day.image), stops };
  }).filter((day) => day.title) : [];
  const faq = Array.isArray(input.faq) ? input.faq.slice(0, 30).map((entry) => {
    const item = entry && typeof entry === "object" ? entry as Record<string, unknown> : {};
    return { question: text(item.question, 300), answer: text(item.answer, 3000) };
  }).filter((item) => item.question && item.answer) : [];
  const gallery = Array.isArray(input.gallery) ? input.gallery.map(image).filter((item): item is CmsImage => Boolean(item)).slice(0, 20) : [];
  const seoRaw = input.seo && typeof input.seo === "object" ? input.seo as Record<string, unknown> : {};

  return {
    title,
    slug,
    category: text(input.category, 120),
    location: text(input.location, 180),
    shortDescription: text(input.shortDescription, 700),
    overview: text(input.overview, 8000),
    heroImage,
    gallery,
    durationDays: Math.max(1, Math.round(numberValue(input.durationDays, 1))),
    durationNights: Math.max(0, Math.round(numberValue(input.durationNights, 0))),
    approximateDistanceKm: Math.max(0, Math.round(numberValue(input.approximateDistanceKm, 0))),
    popularAttractions: Math.max(0, Math.round(numberValue(input.popularAttractions, 0))),
    tourType: text(input.tourType, 100) || "Private Tour",
    flexibleItinerary: bool(input.flexibleItinerary, true),
    customizable: bool(input.customizable, true),
    startingPrice: Math.max(0, numberValue(input.startingPrice, 0)),
    priceUnit: text(input.priceUnit, 80) || "Per Car",
    priceNote: text(input.priceNote, 500),
    highlights: stringList(input.highlights, 40),
    itinerary,
    itineraryNote: text(input.itineraryNote, 1000),
    inclusions: stringList(input.inclusions, 80),
    exclusions: stringList(input.exclusions, 80),
    faq,
    relatedPackageIds: Array.isArray(input.relatedPackageIds) ? input.relatedPackageIds.map((item) => text(item, 50)).filter((item) => /^[a-f\d]{24}$/i.test(item)).slice(0, 12) : [],
    featured: bool(input.featured),
    status: input.status === "published" ? "published" as const : "draft" as const,
    sortOrder: Math.round(numberValue(input.sortOrder, 0)),
    seo: {
      metaTitle: text(seoRaw.metaTitle, 180),
      metaDescription: text(seoRaw.metaDescription, 320),
      keywords: stringList(seoRaw.keywords, 40),
      canonicalUrl: text(seoRaw.canonicalUrl, 1000),
      ogImage: image(seoRaw.ogImage),
    },
  };
}

export function validateTourPackage(input: ReturnType<typeof normalizeTourPackageInput>) {
  const errors: string[] = [];
  if (input.title.length < 3) errors.push("Title must contain at least 3 characters.");
  if (!input.slug) errors.push("A valid slug is required.");
  if (!input.category) errors.push("Category is required.");
  if (!input.location) errors.push("Location is required.");
  if (input.shortDescription.length < 20) errors.push("Short description must contain at least 20 characters.");
  if (!input.heroImage) errors.push("Hero image is required.");
  if (input.startingPrice < 0) errors.push("Starting price cannot be negative.");
  return errors;
}
