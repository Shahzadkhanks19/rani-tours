export type GalleryImage = { url: string; publicId?: string; alt: string };

const text = (value: unknown, max = 2000) => typeof value === "string" ? value.trim().slice(0, max) : "";
const bool = (value: unknown, fallback = false) => typeof value === "boolean" ? value : fallback;
const id = (value: unknown) => { const v = text(value, 50); return /^[a-f\d]{24}$/i.test(v) ? v : null; };
function image(value: unknown): GalleryImage | null {
  if (!value || typeof value !== "object") return null;
  const raw = value as Record<string, unknown>;
  const url = text(raw.url, 1500);
  const alt = text(raw.alt, 250);
  if (!/^https?:\/\//i.test(url) || !alt) return null;
  return { url, publicId: text(raw.publicId, 500), alt };
}

export function normalizeGalleryItemInput(raw: unknown) {
  const input = raw && typeof raw === "object" ? raw as Record<string, unknown> : {};
  const allowed = new Set(["Destinations", "Vehicles", "Happy Travelers", "Travel Moments", "Events"]);
  const category = text(input.category, 80);
  return {
    title: text(input.title, 180),
    category: allowed.has(category) ? category : "Travel Moments",
    image: image(input.image),
    caption: text(input.caption, 1000),
    location: text(input.location, 180),
    destinationId: id(input.destinationId),
    fleetId: id(input.fleetId),
    featured: bool(input.featured),
    status: input.status === "published" ? "published" as const : "draft" as const,
    sortOrder: Math.round(Number(input.sortOrder) || 0),
  };
}

export function validateGalleryItem(input: ReturnType<typeof normalizeGalleryItemInput>) {
  const errors: string[] = [];
  if (!input.image) errors.push("Gallery image and alt text are required.");
  if (!input.category) errors.push("Category is required.");
  return errors;
}
