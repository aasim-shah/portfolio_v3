export type ProjectContent = {
  tagline: string;
  overview: string[];
  capabilities: string[];
  stack: string[];
  stats: { value: string; label: string }[];
  role: string;
};

/**
 * Expanded, per-project detail content for /projects/[slug]. Facts here are
 * paraphrases of what's already established in data/index.tsx and
 * components/ProjectsCasebook.tsx — nothing invented.
 */
export const projectContent: Record<string, ProjectContent> = {
  fyreway: {
    tagline: "Infrastructure",
    overview: [
      "FyreWay is a self-serve infrastructure platform that provisions production-ready VPN servers across 20+ global locations. It replaces manual server setup with automated lifecycle management, so a server can be requested, configured, and monitored without hands-on operations work for each one.",
      "The platform exposes SDKs for programmatic provisioning and includes reliability controls and monitoring so operators can trust the fleet without manually checking every node.",
    ],
    capabilities: [
      "Automated server provisioning",
      "Multi-cloud lifecycle management",
      "SDKs and fleet monitoring",
    ],
    stack: ["Node.js", "Bash", "WireGuard"],
    stats: [
      { value: "20+", label: "Global locations" },
      { value: "3", label: "Deployment stages: API → cloud provisioner → WireGuard node" },
    ],
    role:
      "I designed and built the provisioning API, the cloud-provisioner integration, and the WireGuard configuration automation that together turn a server request into a running, monitored node.",
  },
  "eeagle-vpn": {
    tagline: "VPN Platform",
    overview: [
      "eEagle VPN is a consumer VPN product serving approximately 2M mobile users. I designed and operate the backend and infrastructure behind it: a fleet of 45+ WireGuard servers across 20+ regions, with automated provisioning and fleet-wide observability.",
      "At this scale, the engineering problem isn't any single server — it's keeping dozens of geographically distributed nodes consistently configured, monitored, and quickly recoverable when one fails.",
    ],
    capabilities: [
      "45+ server production fleet",
      "20+ global regions",
      "Fleet-wide observability",
    ],
    stack: ["Node.js", "WireGuard", "Grafana"],
    stats: [
      { value: "~2M", label: "Mobile users" },
      { value: "45+", label: "Servers across 20+ regions" },
    ],
    role:
      "I own the backend architecture and infrastructure operations: server provisioning automation, WireGuard fleet management, and the Grafana-based observability stack that surfaces fleet health before users notice a problem.",
  },
  fyremaps: {
    tagline: "Location Infrastructure",
    overview: [
      "FyreMaps combines maps, routing, search, navigation, geofencing, and geocoding behind a single production-ready integration, so a product team doesn't need to stitch together multiple mapping vendors to cover a standard location feature set.",
    ],
    capabilities: [
      "Search and geocoding",
      "Routing and navigation",
      "Geofencing APIs",
    ],
    stack: ["PostGIS", "MapLibre GL", "AWS"],
    stats: [
      { value: "4", label: "Capabilities in one stack: search, route, navigate, geofence" },
    ],
    role:
      "I designed the PostGIS-backed data layer and the API surface that unifies search, routing, navigation, and geofencing, and integrated MapLibre GL for the client-side rendering layer.",
  },
  getrestro: {
    tagline: "Restaurant SaaS",
    overview: [
      "GetRestro is a multi-tenant restaurant management SaaS combining point of sale, kitchen display, staff workflows, inventory, online ordering, and real-time analytics for operators running multiple locations.",
      "Multi-location operators need tenant isolation without duplicating infrastructure per restaurant — that constraint shaped the data model and access control from the start.",
    ],
    capabilities: [
      "POS and kitchen display",
      "Inventory and staff workflows",
      "Multi-tenant analytics",
    ],
    stack: ["Next.js", "Node.js", "Real-time"],
    stats: [
      { value: "4", label: "Order lifecycle stages: ordered → kitchen → ready → served" },
    ],
    role:
      "I built the multi-tenant backend, the real-time order pipeline connecting POS to kitchen display, and the reporting layer operators use across locations.",
  },
  runmypharmacy: {
    tagline: "Pharmacy SaaS",
    overview: [
      "RunMyPharmacy is a web-based pharmacy POS and inventory platform used by 30+ businesses. It handles checkout, batch and expiry tracking, reporting, and real-time synchronization across a pharmacy's operations.",
      "Expiry and batch tracking are compliance-relevant for pharmacies, which made accurate, real-time inventory state a core requirement rather than a reporting afterthought.",
    ],
    capabilities: [
      "Barcode-speed checkout",
      "Batch and expiry tracking",
      "Real-time reporting",
    ],
    stack: ["POS", "Inventory", "Real-time"],
    stats: [{ value: "30+", label: "Production pharmacy operators" }],
    role:
      "I built the checkout flow, the batch/expiry inventory model, and the real-time sync layer that keeps stock counts and reporting accurate across a pharmacy's terminals.",
  },
  feedwink: {
    tagline: "AI Healthtech",
    overview: [
      "FeedWink is a private baby-care app for tracking feeds, sleep, growth, vaccines, and milestones, with AI-assisted health insights and real-time sharing between caregivers.",
      "Caregiver sharing needs to feel instantaneous — a feed logged by one parent should show up for the other without a manual refresh — which drove the real-time data layer.",
    ],
    capabilities: [
      "Feed and sleep tracking",
      "Shared caregiver access",
      "AI-assisted insights",
    ],
    stack: ["AI Insights", "Mobile", "Real-time"],
    stats: [
      { value: "4", label: "Tracked categories: feeds, sleep, growth, milestones" },
    ],
    role:
      "I built the real-time caregiver-sharing layer and the backend that powers the AI-assisted insights surfaced from a family's logged care data.",
  },
  fyrebot: {
    tagline: "AI SaaS",
    overview: [
      "FyreBot is a multi-tenant AI chatbot platform trained on each business's own knowledge base, giving retrieval-scoped answers rather than generic model output. It ships as embeddable widgets for React, Vue, and plain JavaScript sites.",
      "Retrieval-scoped answers matter because a support chatbot that confidently makes things up is worse than no chatbot — grounding responses in the business's actual documents keeps answers accurate to what's true for that tenant.",
    ],
    capabilities: [
      "Private knowledge grounding",
      "Multi-tenant APIs",
      "Embeddable web SDK",
    ],
    stack: ["RAG", "OpenAI", "Embeddable SDKs"],
    stats: [
      { value: "3", label: "RAG pipeline stages: private data → vector context → grounded answer" },
    ],
    role:
      "I built the multi-tenant RAG pipeline — ingestion, vector retrieval, and grounded response generation — and the embeddable SDKs that let a business drop the widget into their own site.",
  },
};
