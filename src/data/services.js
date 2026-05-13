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
        services: [
            // ── Domiciliary Care ──────────────────────────────────────────────────
            {
                slug: "domiciliary-care",
                // "(visiting care)" rendered in regular weight in the hero
                title: "Domiciliary Care",
                titleNote: "(visiting care)",
                tagline: "Scheduled visits to support daily living and wellbeing at home.",
                figmaDescription: "Our domiciliary care service provides dedicated care in the comfort of your home. Care is tailored to individual routines and preferences and may be provided on a short-term or long-term basis. This service is suitable for adults and older people who wish to remain living independently at home with the right level of support, and is also ideal for anyone requiring frequent, shorter visits for care.",
                description: "Our domiciliary care service provides tailored support for individuals who need help with day-to-day tasks at home.",
                points: [],
                heroPhoto: "/Domiciliary.png",
                sections: [{
                        heading: "What We Support With",
                        layout: "grid3",
                        circleImg: CC_CIRCLE_208,
                        itemTitleColor: "#4a0c57",
                        items: [
                            { icon: "/Personal care icon.png", title: "Personal care" },
                            { icon: "/Medication icon.png", title: "Medication support" },
                            { icon: "/Meal icon.png", title: "Meal preparation and nutrition support", subtitle: null },
                            { icon: "/Mobility icon.png", title: "Mobility support and falls prevention", subtitle: null },
                            { icon: "/Companionship icon.png", title: "Companionship and emotional support", subtitle: null },
                            { icon: "/Hospital discharge icon.png", title: "Hospital discharge support and short-term reablement-focused routines", subtitle: null },
                        ],
                    },
                    {
                        heading: "How We Keep Quality High",
                        layout: "grid4",
                        circleImg: CC_CIRCLE_208,
                        itemTitleColor: "#4a0c57",
                        items: [
                            { icon: "/Care plans icon.png", title: "Care plans agreed at the start and reviewed regularly", subtitle: null },
                            { icon: "/Consistency of staff icon.png", title: "Consistency of staff wherever possible", subtitle: null },
                            { icon: "/Clear safeguarding icon.png", title: "Clear safeguarding culture and escalation routes", subtitle: null },
                            { icon: "/Accurate record-keeping icon.png", title: "Accurate record-keeping and communication with families/professionals", subtitle: null },
                        ],
                    },
                ],
            },

            // ── Live-in Care ───────────────────────────────────────────────────────
            {
                slug: "live-in-care",
                title: "Live-In Care",
                tagline: "Round-the-clock dedicated support without leaving home.",
                description: "Live-in care provides continuous support from a dedicated carer who lives within the individual's home. Ideal for those who need constant assistance but wish to remain in familiar surroundings, this service offers the reassurance of 24-hour presence with the comfort of staying at home.",
                points: [
                    "24-hour support from a consistent, dedicated carer",
                    "Full personal care and daily living assistance",
                    "Medication management and health monitoring",
                    "Emotional support and meaningful companionship",
                    "Household management and meal preparation",
                    "Support maintaining family and social connections",
                ],
                heroPhoto: "/Live-in Care.png",
                sections: [{
                        heading: "Who Live-In Care Can Support",
                        layout: "grid3",
                        circleImg: CC_CIRCLE_208,
                        itemTitleColor: "#4a0c57",
                        items: [
                            { icon: "/Older adults icon.png", title: "Older adults who want to stay at home", subtitle: null },
                            { icon: "/Dementia icon.png", title: "Individuals living with dementia", subtitle: null },
                            { icon: "/Physical disabilities icon.png", title: "Physical disability and long-term conditions", subtitle: null },
                            { icon: "/Returning from hospital icon.png", title: "Those returning home after hospital", subtitle: null },
                            { icon: "/Families needing overnight icon.png", title: "Families needing overnight or short-term cover", subtitle: null },
                        ],
                    },
                    {
                        heading: "What Typically Includes",
                        layout: "grid3",
                        circleImg: CC_CIRCLE_208,
                        itemTitleColor: "#4a0c57",
                        items: [
                            { icon: "/Personal care icon.png", title: "Personal care", subtitle: null },
                            { icon: "/Medication icon.png", title: "Medication management", subtitle: null },
                            { icon: "/Meal icon.png", title: "Meal planning and preparation", subtitle: null },
                            { icon: "/Mobility icon.png", title: "Mobility and falls prevention", subtitle: null },
                            { icon: "/Night-time reassurance icon.png", title: "Night-time support and checks", subtitle: null },
                            { icon: "/Companionship icon.png", title: "Emotional and social support", subtitle: null },
                        ],
                    },
                ],
            },

            // ── Complex Care ───────────────────────────────────────────────────────
            {
                slug: "complex-care",
                title: "Complex Care",
                tagline: "Support for higher needs delivered with clear care planning and professional coordination.",
                figmaDescription: "Our complex care services is designed to support individuals with intensive personal care needs and high medical dependency. It's ideal for individuals with long term conditions, injuries and health challenges. Our complex care service enables individuals with significant health needs to live fulfilling lives, safely, comfortably with the right level of support.",
                description: "Our complex care service supports individuals with advanced health conditions, physical disabilities, or multi-faceted support requirements. Staff receive specialist training to manage clinical and non-clinical needs safely and effectively, working in close coordination with healthcare professionals.",
                points: [
                    "Support for acquired brain injuries and neurological conditions",
                    "Spinal cord injury and physical disability care",
                    "Tracheostomy and ventilator support (trained staff)",
                    "PEG feeding and catheter management",
                    "Coordination with healthcare professionals and therapists",
                    "Personalised care plans reviewed regularly with all stakeholders",
                ],
                heroPhoto: "/Complex Care.png",
                sections: [{
                    heading: "Our complex care services includes",
                    layout: "grid3",
                    circleImg: CC_CIRCLE_208,
                    itemTitleColor: "#4a0c57",
                    items: [
                        { icon: "/Clinical support icon.png", title: "Clinical support including management of catheters and stoma", subtitle: null },
                        { icon: "/Medication icon.png", title: "Medication management", subtitle: null },
                        { icon: "/Physical disabilities icon.png", title: "Mobility support", subtitle: null },
                        { icon: "/Palliative care icon.png", title: "Palliative care", subtitle: null },
                        { icon: "/PEG feeding icon.png", title: "PEG feeding", subtitle: null },
                        { icon: "/Tracheostomy care icon.png", title: "Tracheostomy care", subtitle: null },
                    ],
                }, ],
            },

            // ── Home-Based Respite ─────────────────────────────────────────────────
            {
                slug: "home-based-respite",
                title: "Home-Based Respite",
                tagline: "Planned relief for carers, continuity of care for individuals.",
                description: "Home-based respite provides family carers with a planned break while ensuring the person they support continues to receive high-quality care at home. Our staff step in seamlessly, maintaining familiar routines and providing reassurance to both individuals and their families.",
                points: [
                    "Planned short-term and emergency respite cover",
                    "Continuity of existing care routines and preferences",
                    "Support for individuals with dementia or complex needs",
                    "Flexible scheduling: days, evenings, and weekends",
                    "Regular updates and open communication with families",
                    "Hospital discharge and transition support",
                ],
                heroPhoto: "/Respite.png",
                sections: [{
                        heading: "What We Support With",
                        layout: "grid3",
                        circleImg: CC_CIRCLE_208,
                        itemTitleColor: "#4a0c57",
                        items: [
                            { icon: "/Personal care icon.png", title: "Personal care and daily support", subtitle: null },
                            { icon: "/Medication icon.png", title: "Medication prompting", subtitle: null },
                            { icon: "/Companionship icon.png", title: "Companionship and emotional support", subtitle: null },
                            { icon: "/Mobility icon.png", title: "Mobility and safety at home", subtitle: null },
                            { icon: "/Meal icon.png", title: "Meal preparation and nutrition", subtitle: null },
                            { icon: "/Returning from hospital icon.png", title: "Hospital discharge cover", subtitle: null },
                        ],
                    },
                    {
                        heading: "How We Keep Quality High",
                        layout: "grid4",
                        circleImg: CC_CIRCLE_208,
                        itemTitleColor: "#4a0c57",
                        items: [
                            { icon: "/Care plans icon.png", title: "Care plans agreed at the start and reviewed regularly", subtitle: null },
                            { icon: "/Consistency of staff icon.png", title: "Consistency of staff wherever possible", subtitle: null },
                            { icon: "/Clear safeguarding icon.png", title: "Clear safeguarding culture and escalation routes", subtitle: null },
                            { icon: "/Accurate record-keeping icon.png", title: "Accurate record-keeping and communication with families", subtitle: null },
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
                    "Structured support for young people and adults",
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