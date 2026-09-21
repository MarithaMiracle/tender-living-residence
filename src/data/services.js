import { homeBasedCareServices } from "./homeBasedCareServices.js";

// ─── Circle assets ────────────────────────────────────────────────────────────
const PINK_CIRCLE = "/Ellipse 36 (pink).png";
const ORANGE_CIRCLE = "/Ellipse 37 (orange).png";

// Home-based care pages use pink circle
const CC_CIRCLE_208 = PINK_CIRCLE;
const EC_CIRCLE_208 = PINK_CIRCLE;
const RR_CIRCLE_208 = PINK_CIRCLE;

// Supported Living and Supported Accommodation use orange circle
const SL_CIRCLE_208 = ORANGE_CIRCLE;
const SL_CIRCLE_153 = ORANGE_CIRCLE;
const SA_CIRCLE_208 = ORANGE_CIRCLE;
const SA_CIRCLE_153 = ORANGE_CIRCLE;

const QUALITY_ITEMS = [
    { icon: "/Care plans icon.png", title: "Care plans agreed at the start and reviewed regularly" },
    { icon: "/Consistency of staff icon.png", title: "Consistency of staff wherever possible" },
    { icon: "/Clear safeguarding icon.png", title: "Clear safeguarding culture and escalation routes" },
    { icon: "/Accurate record-keeping icon.png", title: "Accurate record-keeping and communication with families and professionals" },
];

export const serviceGroups = [
    // ═════════════════════════════════════════════════════════════════════════════
    {
        slug: "home-based-care",
        title: "Home-Based Care",
        tagline: "Professional care delivered in the comfort of your own home",
        intro: "Our home-based services support individuals to live independently and safely in familiar surroundings. From daily assistance to complex clinical support, our trained staff provide compassionate, consistent care built around each person's needs and routines.",
        accentColor: "#490652",
        services: homeBasedCareServices,
    },

    // ════════════════════════════════════════════════════════════════════════════
    {
        slug: "accommodation-based-support",
        title: "Accommodation-Based Support",
        tagline: "Safe, structured environments that foster independence",
        intro: "Our accommodation-based services provide individuals with a stable home and the consistent support they need to develop life skills, maintain wellbeing, and progress toward independence. We offer both supported living and supported accommodation across our network.",
        accentColor: "#b33874",
        services: [
            // ── Supported Living ───────────────────────────────────────────────────
            {
                slug: "supported-living",
                title: "Supported Living",
                tagline: "Longer-term, tenancy-focused support for adults to build independence with structured help.",
                figmaDescription: "Our supported living service helps individuals live as independently as possible while still receiving the right level of support. We focus on building confidence, developing daily living skills, and encouraging active participation in the community. It's about empowering people to live the life they choose, with support that grows with them.",
                description: "Supported living enables individuals to live in their own tenancy while receiving tailored support that promotes independence.",
                points: [
                    "Tenancy rights fully maintained: your home, your terms",
                    "Tailored daily living and life skills support",
                    "Budgeting, cooking, and self-care coaching",
                    "Community integration and social participation",
                    "Regular key worker sessions and care plan reviews",
                    "Transition planning toward greater independence",
                ],
                heroPhoto: "/Supported Living.png",
                sections: [{
                        heading: "What We Support With",
                        layout: "grid3",
                        circleImg: SL_CIRCLE_208,
                        items: [
                            { icon: "/Personal care icon.png", title: "Personal care", subtitle: null },
                            { icon: "/Medication icon.png", title: "Medication support", subtitle: null },
                            { icon: "/Meal icon.png", title: "Meal preparation and nutrition support", subtitle: null },
                            { icon: "/Mobility icon.png", title: "Mobility support and falls prevention", subtitle: null },
                            { icon: "/Companionship icon.png", title: "Companionship and emotional support", subtitle: null },
                            { icon: "/Support with appointments icon.png", title: "Support with appointments, shopping, and community access", subtitle: null },
                        ],
                    },
                    {
                        heading: "How We Keep Quality High",
                        layout: "grid4",
                        circleImg: SL_CIRCLE_153,
                        items: QUALITY_ITEMS,
                    },
                ],
            },

            // ── Supported Accommodation ────────────────────────────────────────────
            {
                slug: "supported-accommodation",
                title: "Supported Accommodation",
                tagline: "Structured placements focused on stabilisation, transition, and progression.",
                figmaDescription: "Our supported accommodation service provides safe, structured environments for individuals who require a higher level of support as part of a transition or stabilisation period. This service focuses on building life skills, confidence, and readiness for longer-term independence.",
                description: "Our supported accommodation service provides a safe, staffed environment where individuals can develop independence, build life skills, and work toward personal goals.",
                points: [
                    "Safe, staffed accommodation with 24-hour cover where required",
                    "Structured support for elderly people",
                    "Life skills development: cooking, budgeting, self-management",
                    "Education, employment, and vocational pathway support",
                    "Robust safeguarding and risk management frameworks",
                    "Close working with local authorities and placing teams",
                ],
                heroPhoto: "/Supported Accommodation.png",
                sections: [{
                        heading: "What We Support With",
                        layout: "grid3",
                        circleImg: SA_CIRCLE_208,
                        items: [
                            { icon: "/Personal care icon.png", title: "Personal care", subtitle: null },
                            { icon: "/Medication icon.png", title: "Medication support", subtitle: null },
                            { icon: "/Meal icon.png", title: "Meal preparation and nutrition support", subtitle: null },
                            { icon: "/Mobility icon.png", title: "Mobility support and falls prevention", subtitle: null },
                            { icon: "/Companionship icon.png", title: "Companionship and emotional support", subtitle: null },
                            { icon: "/Support with appointments icon.png", title: "Support with appointments, shopping, and community access", subtitle: null },
                        ],
                    },
                    {
                        heading: "How We Keep Quality High",
                        layout: "grid4",
                        circleImg: SA_CIRCLE_153,
                        items: QUALITY_ITEMS,
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
        intro: "When circumstances change suddenly, fast and dependable support makes all the difference. Our crisis and urgent support services are built to respond quickly, stabilise situations, and provide the continuity of care that individuals and families need during difficult and unpredictable times.",
        accentColor: "#f06943",
        services: [
            // ── Emergency / Crisis Placements ─────────────────────────────────────
            {
                slug: "emergency-crisis-placements",
                title: "Emergency / Crisis Placements",
                tagline: "Short-notice cover to stabilise urgent situations and maintain safety.",
                figmaDescription: "We recognise that urgent situations require a calm, structured response. Our emergency and crisis placements are designed to provide a safe, stabilising environment while longer-term plans are arranged. All emergency placements are subject to initial assessment, risk review, and clear agreement with referring professionals.",
                description: "We work closely with local authorities, social workers, and families to provide emergency placements at very short notice.",
                points: [
                    "Short-notice and same-day placement capability",
                    "Staff trained in de-escalation and trauma-informed care",
                    "Immediate risk assessment and safeguarding protocols",
                    "Close liaison with placing authorities and professionals",
                    "Transition and move-on planning from day one",
                    "Flexible duration: short-term stabilisation or longer-term support",
                ],
                heroPhoto: "/Emergency.png",
                sections: [{
                    heading: "Our Emergency Placement Approach",
                    layout: "grid2-icon-right",
                    circleImg: CC_CIRCLE_208,
                    items: [
                        { icon: "/Rapid assessment icon.png", title: "Rapid assessment and clear expectations before placement", subtitle: null },
                        { icon: "/Clear safeguarding icon.png", title: "Safeguarding-led risk management from day one", subtitle: null },
                        { icon: "/Structured routines icon.png", title: "Structured routines to stabilise and reduce escalation", subtitle: null },
                        { icon: "/Multi-agency communication icon.png", title: "Multi-agency communication and regular updates to professionals", subtitle: null },
                        { icon: "/Care plans icon.png", title: "Progress planning toward step-down or longer-term provision", subtitle: null },
                    ],
                }, ],
            },

            // ── Rapid Response ────────────────────────────────────────────────────
            {
                slug: "rapid-response",
                title: "Rapid Response",
                tagline: "Fast, flexible deployment to prevent escalation.",
                description: "Our rapid response service provides swift-turnaround care for individuals whose needs have changed suddenly, or where existing support has broken down. We deploy experienced staff quickly to assess, stabilise, and maintain continuity of care until a longer-term solution is in place.",
                points: [
                    "Same-day or next-day service deployment",
                    "Experienced staff available for immediate allocation",
                    "Supports hospital discharge and care package breakdowns",
                    "Flexible hours: short bursts or extended cover",
                    "Clear documentation and handover from the outset",
                    "Coordinated review within 72 hours of deployment",
                ],
                heroPhoto: "/Rapid.webp",
                sections: [{
                    heading: "How We Respond",
                    layout: "grid2-icon-right",
                    circleImg: CC_CIRCLE_208,
                    items: [
                        { icon: "/Rapid assessment icon.png", title: "Short-notice deployment to any location", subtitle: null },
                        { icon: "/Hospital discharge icon.png", title: "Hospital discharge and care package breakdown support", subtitle: null },
                        { icon: "/Companionship icon.png", title: "Emergency respite to prevent family carer burnout", subtitle: null },
                        { icon: "/Consistency of staff icon.png", title: "Prevent escalation to higher-cost or restrictive provision", subtitle: null },
                    ],
                }, ],
            },
        ],
    },
];

export const getGroupBySlug = (slug) => {
    return serviceGroups.find((g) => g.slug === slug);
};

export const getServiceBySlug = (groupSlug, serviceSlug) => {
    const group = getGroupBySlug(groupSlug);
    return group ? group.services.find((s) => s.slug === serviceSlug) : undefined;
};