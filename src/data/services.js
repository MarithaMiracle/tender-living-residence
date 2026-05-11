// ─── Circle assets (fresh URLs from Figma 806:3 fetch) ───────────────────────
// imgEllipse36 = 208px orange circle (used across all home-based + accommodation)
const CIRCLE_208       = "https://www.figma.com/api/mcp/asset/ba3296d8-b604-4833-8dac-2814c769fc50";
// imgEllipse43 = 153px quality circle
const CIRCLE_153       = "https://www.figma.com/api/mcp/asset/56772dc6-4e1e-4918-a6c7-4251286b1d15";
// Complex care / crisis pages use a pink circle variant (imgEllipse35)
const CC_CIRCLE_208    = "https://www.figma.com/api/mcp/asset/d69bcadd-2abf-4b71-9975-fbaa30e1158c";
const EC_CIRCLE_208    = "https://www.figma.com/api/mcp/asset/e03664ca-5d13-49ad-bc01-cdfa542d7b6a";
const RR_CIRCLE_208    = "https://www.figma.com/api/mcp/asset/8ee5e864-10ea-432f-b5bd-d7bc6d653d00";
// Accommodation pages use same orange circle as domiciliary
const SL_CIRCLE_208    = CIRCLE_208;
const SL_CIRCLE_153    = CIRCLE_153;
const SA_CIRCLE_208    = CIRCLE_208;
const SA_CIRCLE_153    = CIRCLE_153;

const QUALITY_ITEMS = [
  "Care plans agreed at the start and reviewed regularly",
  "Consistency of staff wherever possible",
  "Clear safeguarding culture and escalation routes",
  "Accurate record-keeping and communication with families and professionals",
];

export const serviceGroups = [
  // ════════════════════════════════════════════════════════════════════════════
  {
    slug: "home-based-care",
    title: "Home-Based Care",
    tagline: "Professional care delivered in the comfort of your own home",
    intro:
      "Our home-based services support individuals to live independently and safely in familiar surroundings. From daily assistance to complex clinical support, our trained staff provide compassionate, consistent care built around each person's needs and routines.",
    accentColor: "#490652",
    services: [
      // ── Domiciliary Care ──────────────────────────────────────────────────
      {
        slug: "domiciliary-care",
        // "(visiting care)" rendered in regular weight in the hero
        title: "Domiciliary Care",
        titleNote: "(visiting care)",
        tagline: "Scheduled visits to support daily living and wellbeing at home.",
        figmaDescription:
          "Our domiciliary care service provides dedicated care in the comfort of your home. Care is tailored to individual routines and preferences and may be provided on a short-term or long-term basis. This service is suitable for adults and older people who wish to remain living independently at home with the right level of support, and is also ideal for anyone requiring frequent, shorter visits for care.",
        description:
          "Our domiciliary care service provides tailored support for individuals who need help with day-to-day tasks at home.",
        points: [],
        heroPhoto: "https://www.figma.com/api/mcp/asset/d9d4156e-7339-4598-8e15-8d77ef93e152",
        sections: [
          {
            heading: "What We Support With",
            layout: "grid3",
            circleImg: CIRCLE_208,
            circleSize: 208,
            itemTitleColor: "#b33874",
            items: [
              { icon: "https://www.figma.com/api/mcp/asset/6ea33aca-a468-466b-a286-9955c2560a9b", title: "Personal care", subtitle: "Washing, dressing, hygiene and grooming support" },
              { icon: "https://www.figma.com/api/mcp/asset/1e5194b7-b29c-409b-b2d8-1920f46f9234", title: "Medication support", subtitle: "Prompts, administration, or monitoring where required" },
              { icon: "https://www.figma.com/api/mcp/asset/bb6babb4-cc0a-4e53-a00e-c2d924ddf009", title: "Meal preparation and nutrition support", subtitle: null },
              { icon: "https://www.figma.com/api/mcp/asset/08bab135-cf55-419b-b2f2-74864475c865", title: "Mobility support and falls prevention", subtitle: null },
              { icon: "https://www.figma.com/api/mcp/asset/04095f96-5636-47f1-a18f-36abfb255bba", title: "Companionship and emotional support", subtitle: null },
              { icon: "https://www.figma.com/api/mcp/asset/daaa07f6-7103-45e1-b268-56456b547aaa", title: "Hospital discharge support and short-term reablement-focused routines", subtitle: null },
            ],
          },
          {
            heading: "How We Keep Quality High",
            layout: "grid4",
            circleImg: CIRCLE_153,
            circleSize: 153,
            itemTitleColor: "#888",
            items: [
              { icon: "https://www.figma.com/api/mcp/asset/c8836c81-a472-4aac-9015-6794d20ad2a7", title: "Care plans agreed at the start and reviewed regularly", subtitle: null },
              { icon: "https://www.figma.com/api/mcp/asset/2b460a21-7d94-4f9f-842b-d99c27aea523", title: "Consistency of staff wherever possible", subtitle: null },
              { icon: "https://www.figma.com/api/mcp/asset/5c6b3d57-ceba-4dfa-be5c-2b54eac4639e", title: "Clear safeguarding culture and escalation routes", subtitle: null },
              { icon: "https://www.figma.com/api/mcp/asset/f01204ad-2369-4379-822c-fef5fd105513", title: "Accurate record-keeping and communication with families/professionals", subtitle: null },
            ],
          },
        ],
      },

      // ── Live-in Care ───────────────────────────────────────────────────────
      {
        slug: "live-in-care",
        title: "Live-In Care",
        tagline: "Round-the-clock dedicated support without leaving home.",
        description:
          "Live-in care provides continuous support from a dedicated carer who lives within the individual's home. Ideal for those who need constant assistance but wish to remain in familiar surroundings, this service offers the reassurance of 24-hour presence with the comfort of staying at home.",
        points: [
          "24-hour support from a consistent, dedicated carer",
          "Full personal care and daily living assistance",
          "Medication management and health monitoring",
          "Emotional support and meaningful companionship",
          "Household management and meal preparation",
          "Support maintaining family and social connections",
        ],
        heroPhoto: "https://www.figma.com/api/mcp/asset/59d72dc0-7746-4270-9e8e-3a93fc365b20",
        sections: [
          {
            heading: "Who Live-In Care Can Support",
            layout: "grid3",
            circleImg: CIRCLE_208,
            circleSize: 208,
            itemTitleColor: "#b33874",
            items: [
              { icon: "https://www.figma.com/api/mcp/asset/e8d068a1-7e74-4711-9536-0b66bcd3928b", title: "Older adults who want to stay at home", subtitle: null },
              { icon: "https://www.figma.com/api/mcp/asset/66a88013-d9c0-40f8-a8f9-2413ba0c5a6b", title: "Individuals living with dementia", subtitle: null },
              { icon: "https://www.figma.com/api/mcp/asset/e8d60f5f-8c88-4154-b372-f04347812122", title: "Physical disability and long-term conditions", subtitle: null },
              { icon: "https://www.figma.com/api/mcp/asset/aa3937fd-5bc3-451f-8b25-4a49609f3fd7", title: "Those returning home after hospital", subtitle: null },
              { icon: "https://www.figma.com/api/mcp/asset/6f4d79b6-e37c-453b-a060-ed72899337a6", title: "Families needing overnight or short-term cover", subtitle: null },
            ],
          },
          {
            heading: "What Typically Includes",
            layout: "grid3",
            circleImg: CIRCLE_153,
            circleSize: 153,
            itemTitleColor: "#b33874",
            items: [
              { icon: "https://www.figma.com/api/mcp/asset/e6cbecec-f7b3-4a3b-8a8f-685b6a9fe32e", title: "Personal care", subtitle: null },
              { icon: "https://www.figma.com/api/mcp/asset/09230620-5d1b-4a8e-8f07-6cd997ebb6a2", title: "Medication management", subtitle: null },
              { icon: "https://www.figma.com/api/mcp/asset/d85b0b77-25f5-4390-9f21-d35fe738f92a", title: "Meal planning and preparation", subtitle: null },
              { icon: "https://www.figma.com/api/mcp/asset/9a85e07b-8a1d-46bf-a0c2-b6fdb8c82331", title: "Mobility and falls prevention", subtitle: null },
              { icon: "https://www.figma.com/api/mcp/asset/4eecaf03-7afb-41f8-8c36-497d36f8f4ae", title: "Night-time support and checks", subtitle: null },
              { icon: "https://www.figma.com/api/mcp/asset/cadeae3d-2233-4913-a73e-cb95799b4c69", title: "Emotional and social support", subtitle: null },
            ],
          },
        ],
      },

      // ── Complex Care ───────────────────────────────────────────────────────
      {
        slug: "complex-care",
        title: "Complex Care",
        tagline: "Support for higher needs delivered with clear care planning and professional coordination.",
        figmaDescription:
          "Our complex care services is designed to support individuals with intensive personal care needs and high medical dependency. It's ideal for individuals with long term conditions, injuries and health challenges. Our complex care service enables individuals with significant health needs to live fulfilling lives, safely, comfortably with the right level of support.",
        description:
          "Our complex care service supports individuals with advanced health conditions, physical disabilities, or multi-faceted support requirements. Staff receive specialist training to manage clinical and non-clinical needs safely and effectively, working in close coordination with healthcare professionals.",
        points: [
          "Support for acquired brain injuries and neurological conditions",
          "Spinal cord injury and physical disability care",
          "Tracheostomy and ventilator support (trained staff)",
          "PEG feeding and catheter management",
          "Coordination with healthcare professionals and therapists",
          "Personalised care plans reviewed regularly with all stakeholders",
        ],
        heroPhoto: "https://www.figma.com/api/mcp/asset/295195fc-5dfb-4bf8-ac98-17d3e454f1f6",
        sections: [
          {
            heading: "Our complex care services includes",
            layout: "grid3",
            circleImg: CC_CIRCLE_208,
            circleSize: 208,
            itemTitleColor: "#888",
            items: [
              { icon: "https://www.figma.com/api/mcp/asset/7aa78304-d631-4b15-8f9a-c9cf14d0b723", title: "Clinical support including management of catheters and stoma", subtitle: null },
              { icon: "https://www.figma.com/api/mcp/asset/eff5846f-a0b3-4a67-8304-9a9a129a29cc", title: "Medication management", subtitle: null },
              { icon: "https://www.figma.com/api/mcp/asset/0a4e82fd-dec6-4a9f-a294-bcb7425a0556", title: "Mobility support", subtitle: null },
              { icon: "https://www.figma.com/api/mcp/asset/11bf7fc9-0bf4-4d17-b4a5-6a4126ac8ba2", title: "Palliative care", subtitle: null },
              { icon: "https://www.figma.com/api/mcp/asset/0da29415-f567-4337-9f09-2fceb2b9687b", title: "PEG feeding", subtitle: null },
              { icon: "https://www.figma.com/api/mcp/asset/74ef053c-b9f9-4a65-a756-f1fc457920f9", title: "Tracheostomy care", subtitle: null },
            ],
          },
        ],
      },

      // ── Home-Based Respite ─────────────────────────────────────────────────
      {
        slug: "home-based-respite",
        title: "Home-Based Respite",
        tagline: "Planned relief for carers, continuity of care for individuals.",
        description:
          "Home-based respite provides family carers with a planned break while ensuring the person they support continues to receive high-quality care at home. Our staff step in seamlessly, maintaining familiar routines and providing reassurance to both individuals and their families.",
        points: [
          "Planned short-term and emergency respite cover",
          "Continuity of existing care routines and preferences",
          "Support for individuals with dementia or complex needs",
          "Flexible scheduling: days, evenings, and weekends",
          "Regular updates and open communication with families",
          "Hospital discharge and transition support",
        ],
        heroPhoto: "https://www.figma.com/api/mcp/asset/f60cd57f-00ae-4f83-a33b-279a4788b7c3",
        sections: [
          {
            heading: "What We Support With",
            layout: "grid3",
            circleImg: CIRCLE_208,
            circleSize: 208,
            itemTitleColor: "#b33874",
            items: [
              { icon: "https://www.figma.com/api/mcp/asset/bf078cd0-e3ad-494b-88f3-e89fe22ff018", title: "Personal care and daily support", subtitle: null },
              { icon: "https://www.figma.com/api/mcp/asset/1df04707-296c-4ebe-8a63-b5ea141c0253", title: "Medication prompting", subtitle: null },
              { icon: "https://www.figma.com/api/mcp/asset/a4698578-e065-4d38-9fe2-ae4741a79882", title: "Companionship and emotional support", subtitle: null },
              { icon: "https://www.figma.com/api/mcp/asset/27a401e2-bd49-46b3-9021-f798cc5b1396", title: "Mobility and safety at home", subtitle: null },
              { icon: "https://www.figma.com/api/mcp/asset/d7f8a9dd-8014-4b27-9623-5bc6574d3369", title: "Meal preparation and nutrition", subtitle: null },
              { icon: "https://www.figma.com/api/mcp/asset/b28abfb9-daf1-4795-8805-86b5099b6571", title: "Hospital discharge cover", subtitle: null },
            ],
          },
          {
            heading: "How We Keep Quality High",
            layout: "grid4",
            circleImg: CIRCLE_153,
            circleSize: 153,
            itemTitleColor: "#888",
            items: [
              { icon: null, title: "Care plans agreed at the start and reviewed regularly", subtitle: null },
              { icon: null, title: "Consistency of staff wherever possible", subtitle: null },
              { icon: null, title: "Clear safeguarding culture and escalation routes", subtitle: null },
              { icon: null, title: "Accurate record-keeping and communication with families", subtitle: null },
            ],
          },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════════════
  {
    slug: "accommodation-based-support",
    title: "Accommodation-Based Support",
    tagline: "Safe, structured environments that foster independence",
    intro:
      "Our accommodation-based services provide individuals with a stable home and the consistent support they need to develop life skills, maintain wellbeing, and progress toward independence. We offer both supported living and supported accommodation across our network.",
    accentColor: "#b33874",
    services: [
      // ── Supported Living ───────────────────────────────────────────────────
      {
        slug: "supported-living",
        title: "Supported Living",
        tagline: "Longer-term, tenancy-focused support for adults to build independence with structured help.",
        figmaDescription:
          "Our supported living service helps individuals live as independently as possible while still receiving the right level of support. We focus on building confidence, developing daily living skills, and encouraging active participation in the community. It's about empowering people to live the life they choose, with support that grows with them.",
        description:
          "Supported living enables individuals to live in their own tenancy while receiving tailored support that promotes independence.",
        points: [
          "Tenancy rights fully maintained: your home, your terms",
          "Tailored daily living and life skills support",
          "Budgeting, cooking, and self-care coaching",
          "Community integration and social participation",
          "Regular key worker sessions and care plan reviews",
          "Transition planning toward greater independence",
        ],
        heroPhoto: "https://www.figma.com/api/mcp/asset/6bc83289-d277-43cb-8b4e-c672a5ffe2a8",
        sections: [
          {
            heading: "What We Support With",
            layout: "grid3",
            circleImg: SL_CIRCLE_208,
            circleSize: 208,
            items: [
              { icon: null, title: "Personal care", subtitle: "Washing, dressing, hygiene and grooming support" },
              { icon: null, title: "Medication support", subtitle: "Prompts, administration, or monitoring where required" },
              { icon: null, title: "Meal preparation and nutrition support", subtitle: null },
              { icon: null, title: "Mobility support and falls prevention", subtitle: null },
              { icon: null, title: "Companionship and emotional support", subtitle: null },
              { icon: null, title: "Support with appointments, shopping, and community access", subtitle: null },
            ],
          },
          {
            heading: "How We Keep Quality High",
            layout: "grid4",
            circleImg: SL_CIRCLE_153,
            circleSize: 153,
            items: QUALITY_ITEMS.map((t) => ({ icon: null, title: t, subtitle: null })),
          },
        ],
      },

      // ── Supported Accommodation ────────────────────────────────────────────
      {
        slug: "supported-accommodation",
        title: "Supported Accommodation",
        tagline: "Structured placements focused on stabilisation, transition, and progression.",
        figmaDescription:
          "Our supported accommodation service provides safe, structured environments for individuals who require a higher level of support as part of a transition or stabilisation period. This service focuses on building life skills, confidence, and readiness for longer-term independence.",
        description:
          "Our supported accommodation service provides a safe, staffed environment where individuals can develop independence, build life skills, and work toward personal goals.",
        points: [
          "Safe, staffed accommodation with 24-hour cover where required",
          "Structured support for young people and adults",
          "Life skills development: cooking, budgeting, self-management",
          "Education, employment, and vocational pathway support",
          "Robust safeguarding and risk management frameworks",
          "Close working with local authorities and placing teams",
        ],
        heroPhoto: "https://www.figma.com/api/mcp/asset/18911661-259c-4b97-bb83-c957218b5980",
        sections: [
          {
            heading: "What We Support With",
            layout: "grid3",
            circleImg: SA_CIRCLE_208,
            circleSize: 208,
            items: [
              { icon: null, title: "Personal care", subtitle: "Washing, dressing, hygiene and grooming support" },
              { icon: null, title: "Medication support", subtitle: "Prompts, administration, or monitoring where required" },
              { icon: null, title: "Meal preparation and nutrition support", subtitle: null },
              { icon: null, title: "Mobility support and falls prevention", subtitle: null },
              { icon: null, title: "Companionship and emotional support", subtitle: null },
              { icon: null, title: "Support with appointments, shopping, and community access", subtitle: null },
            ],
          },
          {
            heading: "How We Keep Quality High",
            layout: "grid4",
            circleImg: SA_CIRCLE_153,
            circleSize: 153,
            items: QUALITY_ITEMS.map((t) => ({ icon: null, title: t, subtitle: null })),
          },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════════════
  {
    slug: "crisis-and-urgent-support",
    title: "Crisis & Urgent Support",
    tagline: "Responsive, reliable care when it matters most",
    intro:
      "When circumstances change suddenly, fast and dependable support makes all the difference. Our crisis and urgent support services are built to respond quickly, stabilise situations, and provide the continuity of care that individuals and families need during difficult and unpredictable times.",
    accentColor: "#f06943",
    services: [
      // ── Emergency / Crisis Placements ─────────────────────────────────────
      {
        slug: "emergency-crisis-placements",
        title: "Emergency / Crisis Placements",
        tagline: "Short-notice cover to stabilise urgent situations and maintain safety.",
        figmaDescription:
          "We recognise that urgent situations require a calm, structured response. Our emergency and crisis placements are designed to provide a safe, stabilising environment while longer-term plans are arranged. All emergency placements are subject to initial assessment, risk review, and clear agreement with referring professionals.",
        description:
          "We work closely with local authorities, social workers, and families to provide emergency placements at very short notice.",
        points: [
          "Short-notice and same-day placement capability",
          "Staff trained in de-escalation and trauma-informed care",
          "Immediate risk assessment and safeguarding protocols",
          "Close liaison with placing authorities and professionals",
          "Transition and move-on planning from day one",
          "Flexible duration: short-term stabilisation or longer-term support",
        ],
        heroPhoto: "https://www.figma.com/api/mcp/asset/f7481c8c-61fc-4c18-b77f-37a9d0608095",
        sections: [
          {
            heading: "Our Emergency Placement Approach",
            layout: "grid2-icon-right",
            circleImg: EC_CIRCLE_208,
            circleSize: 208,
            items: [
              { icon: "https://www.figma.com/api/mcp/asset/8a62ff32-6dcf-44b9-8f97-b8dc25cf5f78", title: "Rapid assessment and clear expectations before placement", subtitle: null },
              { icon: "https://www.figma.com/api/mcp/asset/fab4699c-c87e-4895-a5f0-39a88732f27f", title: "Safeguarding-led risk management from day one", subtitle: null },
              { icon: "https://www.figma.com/api/mcp/asset/4180d2f3-a024-4efd-82bf-1e0f3e9f3b67", title: "Structured routines to stabilise and reduce escalation", subtitle: null },
              { icon: "https://www.figma.com/api/mcp/asset/d93813b7-fcff-426a-acbd-940fedfe8ad4", title: "Multi-agency communication and regular updates to professionals", subtitle: null },
              { icon: "https://www.figma.com/api/mcp/asset/4180d2f3-a024-4efd-82bf-1e0f3e9f3b67", title: "Progress planning toward step-down or longer-term provision", subtitle: null },
            ],
          },
        ],
      },

      // ── Rapid Response ────────────────────────────────────────────────────
      {
        slug: "rapid-response",
        title: "Rapid Response",
        tagline: "Fast, flexible deployment to prevent escalation.",
        description:
          "Our rapid response service provides swift-turnaround care for individuals whose needs have changed suddenly, or where existing support has broken down. We deploy experienced staff quickly to assess, stabilise, and maintain continuity of care until a longer-term solution is in place.",
        points: [
          "Same-day or next-day service deployment",
          "Experienced staff available for immediate allocation",
          "Supports hospital discharge and care package breakdowns",
          "Flexible hours: short bursts or extended cover",
          "Clear documentation and handover from the outset",
          "Coordinated review within 72 hours of deployment",
        ],
        heroPhoto: "https://www.figma.com/api/mcp/asset/4acc6b77-da7c-4471-953f-c69d0456b06b",
        sections: [
          {
            heading: "How We Respond",
            layout: "grid2-icon-right",
            circleImg: RR_CIRCLE_208,
            circleSize: 208,
            items: [
              { icon: "https://www.figma.com/api/mcp/asset/81f9cf64-043f-4266-a5cf-46e7492c1bb5", title: "Short-notice deployment to any location", subtitle: null },
              { icon: "https://www.figma.com/api/mcp/asset/62e2214f-ef6d-4bcc-84c6-b86a50393e5e", title: "Hospital discharge and care package breakdown support", subtitle: null },
              { icon: "https://www.figma.com/api/mcp/asset/1fee61e3-8090-4d60-a9bc-bf4dcbaf1b13", title: "Emergency respite to prevent family carer burnout", subtitle: null },
              { icon: "https://www.figma.com/api/mcp/asset/21e73276-7091-4bad-9212-89387431c766", title: "Prevent escalation to higher-cost or restrictive provision", subtitle: null },
            ],
          },
        ],
      },
    ],
  },
];

export const getGroupBySlug = (slug) =>
  serviceGroups.find((g) => g.slug === slug);

export const getServiceBySlug = (groupSlug, serviceSlug) => {
  const group = getGroupBySlug(groupSlug);
  return group?.services.find((s) => s.slug === serviceSlug);
};
