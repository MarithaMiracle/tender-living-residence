import { WEST_MIDLANDS_AREAS } from "./serviceAreas.js";

const PINK_CIRCLE = "/Ellipse 36 (pink).png";

const areaOutro =
  "If your location isn't listed above, get in touch anyway — we can confirm whether we're able to support your area.";

const contactItems = [
  "Phone: 0121 798 9039",
  "Email: info@tlrs.co.uk",
  "Opening Hours: Monday–Sunday, 9:00 AM–5:00 PM",
];

export const homeBasedCareServices = [
  {
    slug: "domiciliary-care",
    title: "Domiciliary Care",
    heroTitle: "Domiciliary Care in Birmingham",
    titleNote: "(visiting care)",
    tagline: "Compassionate home care in Birmingham, tailored to individual needs so loved ones can live safely and independently.",
    metaTitle: "Domiciliary Care in Birmingham | Trusted Home Care",
    metaDescription:
      "Looking for reliable domiciliary care in Birmingham? Get compassionate home care tailored to individual needs, helping loved ones live safely and independently.",
    figmaDescription:
      "Staying in familiar surroundings, close to family, neighbours and everyday routines, makes a real difference to how comfortable and confident someone feels day to day. Tender Living Residence provides domiciliary care in Birmingham for people who need support at home, whether that's help with a few daily tasks or a more structured package of regular visits.\n\nOur approach is built around the person, not a fixed routine. We take time to understand how someone likes to do things, what matters to them, and where support will make the biggest difference, so that care fits around their life rather than the other way round.",
    description:
      "Our domiciliary care service provides tailored support for individuals who need help with day-to-day tasks at home.",
    points: [],
    heroPhoto: "/Domiciliary.png",
    sections: [
      {
        heading: "What Is Domiciliary Care?",
        layout: "text",
        text: "Domiciliary care, sometimes called home care, is support provided in a person's own home rather than in a residential or nursing setting. It covers a wide range of needs, from short daily visits to help with washing and dressing, through to more involved support for people managing long-term health conditions, reduced mobility, dementia or sensory impairments.\n\nA domiciliary care visit is typically arranged around specific times of day, such as mornings, lunchtimes or evenings, and the level of support is agreed in advance based on what the person actually needs. Because care is delivered in the person's own home, domiciliary care allows people to keep their usual routines, stay near family and friends, and retain a level of independence that can be harder to maintain elsewhere.",
      },
      {
        heading: "What Support Can Include",
        layout: "grid3",
        circleImg: PINK_CIRCLE,
        itemTitleColor: "#4a0c57",
        items: [
          { icon: "/Personal care icon.png", title: "Personal care, washing, dressing and continence support" },
          { icon: "/Medication icon.png", title: "Medication prompts and administration where required" },
          { icon: "/Meal icon.png", title: "Meal preparation and support with eating and drinking" },
          { icon: "/Mobility icon.png", title: "Mobility support and moving safely around the home" },
          { icon: "/Companionship icon.png", title: "Companionship and general wellbeing checks" },
          { icon: "/Hospital discharge icon.png", title: "Light domestic tasks connected to daily living" },
        ],
      },
      {
        heading: "When Do You Need Domiciliary Care?",
        layout: "bullets",
        intro: "Families in Birmingham often start looking into domiciliary care after a change in circumstances, rather than as something planned well in advance. Common situations include:",
        items: [
          "Recovery after a hospital stay, when someone needs extra support to manage safely at home",
          "A gradual decline in mobility or general health that makes daily tasks harder",
          "A diagnosis such as dementia, where consistent, familiar support helps reduce confusion and anxiety",
          "A family carer needing regular, reliable support rather than trying to manage everything alone",
          "Someone living with a physical disability or sensory impairment who wants to remain independent at home",
        ],
        outro:
          "There isn't a single \"right time\" to arrange care. Some people need a short daily visit to feel safe and supported, while others need several visits a day. Part of our role is helping you work out what level of support actually fits the situation.",
      },
      {
        heading: "Our Domiciliary Care Process",
        layout: "process",
        steps: [
          {
            title: "Initial Assessment",
            body: "Before any care begins, we carry out an assessment with the person and, where appropriate, their family. This looks at daily routines, any health conditions, mobility, medication needs and personal preferences.",
          },
          {
            title: "Planning and Preparation",
            body: "Based on the assessment, we put together a care plan that sets out what support is needed, when visits will happen, and how tasks should be carried out. This plan is shared with the person and their family, and reviewed as needs change.",
          },
          {
            title: "Carrying Out the Support",
            body: "Visits are carried out in line with the agreed care plan, with a focus on dignity and respect. Consistency matters — familiar faces and routines make a real difference, particularly for people living with dementia or anxiety around change.",
          },
          {
            title: "Ongoing Review",
            body: "Care needs rarely stay exactly the same. We keep communication open with the person and their family, and care plans are reviewed so support can be adjusted over time.",
          },
        ],
      },
      {
        heading: "Why Choose Tender Living Residence?",
        layout: "text",
        text: "Tender Living Residence is a CQC-regulated care provider, registered with and accountable to the Care Quality Commission — the independent regulator for health and social care in England. Being CQC-registered means we're required to meet defined standards around safety, dignity and the quality of care provided.\n\nAlongside domiciliary care, we also support people through live-in care, companionship care and other care services, which means we're able to have an honest conversation about which type of support genuinely fits your situation.\n\nGood domiciliary care depends on more than turning up on time. It's about understanding the small, practical details of someone's daily life. We take a person-centred approach throughout — listening carefully during assessment, communicating clearly with families, and adjusting support as circumstances change.",
      },
      {
        heading: "Areas We Cover",
        layout: "areas",
        intro: "We provide domiciliary care across Birmingham and the surrounding areas, including:",
        items: WEST_MIDLANDS_AREAS,
        outro: areaOutro,
      },
      {
        heading: "Frequently Asked Questions",
        layout: "faq",
        items: [
          {
            question: "What does domiciliary care include?",
            answer:
              "It can include personal care, medication support, meal preparation, light domestic tasks, mobility assistance and companionship. The exact mix depends on what's agreed during your care assessment.",
          },
          {
            question: "How much does domiciliary care cost?",
            answer:
              "Costs depend on the level of support needed, including how many visits are required each day or week. Contact us directly for a conversation about your specific circumstances.",
          },
          {
            question: "How long does each visit take?",
            answer:
              "Visit length varies depending on the tasks involved, from short check-in visits to longer sessions where more personal care or support is needed. This is agreed as part of your care plan.",
          },
          {
            question: "When should I arrange domiciliary care?",
            answer:
              "There's no fixed point at which care becomes necessary — many families arrange support after a hospital discharge, a change in health, or when daily tasks start becoming difficult to manage safely.",
          },
          {
            question: "Do you cover my area?",
            answer:
              "We cover Birmingham and the wider West Midlands and Warwickshire areas listed above. If you're unsure whether we cover your location, contact us and we'll confirm.",
          },
          {
            question: "Why use a professional domiciliary care service rather than relying on family?",
            answer:
              "Family support is valuable, but professional care adds consistency, trained support with personal and medical needs, and can relieve pressure on family carers. Many families use a combination of both.",
          },
        ],
      },
      {
        heading: "Contact Tender Living Residence",
        layout: "cta",
        intro: "If you'd like to talk through domiciliary care options in Birmingham, get in touch with our team:",
        items: contactItems,
        outro:
          "Choosing domiciliary care is often about finding the right balance between independence and support. Whether you need a short daily visit or a more comprehensive care package, Tender Living Residence provides domiciliary care across Birmingham and the surrounding areas, built around what actually works for the person receiving it.",
      },
    ],
  },

  {
    slug: "live-in-care",
    title: "Live-In Care",
    heroTitle: "Live-In Care in Birmingham",
    tagline: "Round-the-clock support at home in Birmingham — stay in familiar surroundings with consistent, dedicated care.",
    metaTitle: "Live In Care in Birmingham | Trusted Care at Home",
    metaDescription:
      "Find trusted live in care in Birmingham with personalised support at home. Get compassionate, reliable care tailored to your needs and daily routine.",
    figmaDescription:
      "For many families, the idea of moving a loved one into residential care feels like the only option once daily life becomes harder to manage safely. Live-in care offers another route — round-the-clock support delivered at home, so someone can stay in familiar surroundings while still getting the level of care they need. Tender Living Residence provides live-in care in Birmingham for people who want to remain independent at home with consistent, dedicated support.",
    description:
      "Live-in care provides continuous support from a dedicated carer who lives within the individual's home.",
    points: [],
    heroPhoto: "/Live-in Care.png",
    sections: [
      {
        heading: "What Is Live-In Care?",
        layout: "text",
        text: "Live-in care means a carer stays in the person's home, providing support throughout the day and being on hand overnight if needed. Unlike scheduled home visits, live-in care offers continuous presence, which suits people who need more regular support, reassurance, or supervision than a series of short daily visits can provide.\n\nBecause the carer is based in the home, live-in care also allows for a level of flexibility that visit-based care can't always offer — routines can shift day to day depending on how someone is feeling, rather than being fixed around set appointment times.",
      },
      {
        heading: "What Live-In Care Can Include",
        layout: "grid3",
        circleImg: PINK_CIRCLE,
        itemTitleColor: "#4a0c57",
        items: [
          { icon: "/Personal care icon.png", title: "Personal care, washing, dressing and continence support" },
          { icon: "/Medication icon.png", title: "Medication support and prompts" },
          { icon: "/Meal icon.png", title: "Meal planning and preparation" },
          { icon: "/Mobility icon.png", title: "Mobility support around the home" },
          { icon: "/Dementia icon.png", title: "Support for dementia or memory-related conditions" },
          { icon: "/Companionship icon.png", title: "Companionship, wellbeing checks and daily routine support" },
        ],
      },
      {
        heading: "When Do You Need Live-In Care?",
        layout: "bullets",
        intro: "Live-in care tends to come up as an option in a few common situations:",
        items: [
          "When someone's needs have increased beyond what several short visits a day can cover",
          "After a hospital discharge, where consistent support at home reduces the risk of readmission",
          "For people living with dementia, where familiar surroundings and routine can help reduce confusion and distress",
          "When a family carer needs a sustainable, long-term solution rather than trying to manage alone",
          "For couples who want to stay together at home rather than one partner moving into residential care",
        ],
        outro:
          "There's no single point at which live-in care becomes the right choice — it depends on the level of support someone needs and how much reassurance they and their family want day to day.",
      },
      {
        heading: "Our Live-In Care Process",
        layout: "process",
        steps: [
          {
            title: "Initial Assessment",
            body: "We start with an assessment of the person's care needs, home environment, daily routine and any specific health conditions, so a live-in carer can fit into their life rather than disrupt it.",
          },
          {
            title: "Planning and Preparation",
            body: "From the assessment, we put together a care plan covering daily routines, personal care needs, medication, and preferences. This is shared with the person and their family so expectations are clear from the outset.",
          },
          {
            title: "Carrying Out the Support",
            body: "The live-in carer follows the agreed care plan, providing consistent, familiar support throughout the day. Continuity matters — the same face and routine make a genuine difference for people who find change unsettling.",
          },
          {
            title: "Ongoing Review",
            body: "Needs change over time, so care plans are reviewed regularly with the person and their family. Support can be adjusted as health, mobility or preferences evolve.",
          },
        ],
      },
      {
        heading: "Why Choose Tender Living Residence?",
        layout: "text",
        text: "Tender Living Residence is a CQC-regulated care provider, registered with and accountable to the Care Quality Commission. This means our service is required to meet defined standards around safety, dignity and quality of care.\n\nWe also provide domiciliary care and complex care, so if live-in care turns out not to be the right fit, we can talk through what would suit better.\n\nLive-in care works best when it's built around the individual rather than delivered as a standard package. Our approach centres on listening carefully during assessment, keeping communication open with families, and adjusting support as needs change.",
      },
      {
        heading: "Areas We Cover",
        layout: "areas",
        intro: "We provide live-in care across Birmingham and the surrounding areas, including:",
        items: WEST_MIDLANDS_AREAS,
        outro: areaOutro,
      },
      {
        heading: "Frequently Asked Questions",
        layout: "faq",
        items: [
          {
            question: "What does live-in care include?",
            answer:
              "It typically includes personal care, medication support, meal preparation, mobility assistance, companionship and general support with daily routines. The exact arrangement is agreed as part of your care plan.",
          },
          {
            question: "How much does live-in care cost?",
            answer:
              "Cost depends on the level of support needed and the specifics of your situation. Contact us directly for a conversation about your circumstances.",
          },
          {
            question: "How is live-in care different from a care home?",
            answer:
              "Live-in care allows someone to stay in their own home with a dedicated carer, rather than moving into a residential setting. It suits people who want to remain in familiar surroundings while still receiving consistent, ongoing support.",
          },
          {
            question: "When should I consider live-in care?",
            answer:
              "It's worth considering when daily support needs have increased beyond what scheduled visits can cover, after a hospital stay, or when a family carer needs a sustainable long-term solution.",
          },
          {
            question: "Do you cover my area?",
            answer:
              "We cover Birmingham and the wider West Midlands and Warwickshire areas listed above. If you're unsure, contact us and we'll confirm.",
          },
          {
            question: "Why choose professional live-in care over informal family support?",
            answer:
              "Professional live-in care provides consistent, trained support and can relieve pressure on family members balancing caring with work and home life. Many families use live-in care alongside their own involvement.",
          },
        ],
      },
      {
        heading: "Contact Tender Living Residence",
        layout: "cta",
        intro: "If you'd like to talk through live-in care options in Birmingham, get in touch with our team:",
        items: contactItems,
        outro:
          "Live-in care offers a way to stay at home with consistent, dedicated support, rather than moving into a residential setting. Tender Living Residence provides live-in care across Birmingham and the surrounding areas, built around the person's routine and preferences.",
      },
    ],
  },

  {
    slug: "companionship-care",
    title: "Companionship Care",
    heroTitle: "Companionship Care in Birmingham",
    tagline: "Trusted companionship care in Birmingham for daily routines, social activities and meaningful connection at home.",
    metaTitle: "Companionship Care in Birmingham | Trusted Support",
    metaDescription:
      "Find compassionate companionship care in Birmingham with trusted support for daily routines, social activities and meaningful connection at home.",
    figmaDescription:
      "Not every care need is physical. For many older people or those living alone, isolation and loneliness can have just as much impact on wellbeing as any health condition. Companionship care focuses on that side of support — regular visits from a familiar face, someone to talk to, and help staying engaged with daily life. Tender Living Residence provides companionship care in Birmingham for people who would benefit from social contact and practical support alongside it.",
    description:
      "Companionship care provides friendly, reassuring support focused on emotional wellbeing and connection.",
    points: [],
    heroPhoto: "/social-worker-taking-care-old-woman.jpg",
    sections: [
      {
        heading: "What Is Companionship Care?",
        layout: "text",
        text: "Companionship care is a flexible form of home support centred on social interaction and general wellbeing, rather than intensive personal or medical care. It's often chosen by people who are largely independent but would benefit from regular company, help with everyday tasks, and someone keeping an eye on how they're doing.\n\nCompanionship care can be arranged on its own, or alongside other services if someone's needs are broader than social support alone. Because it's less about hands-on personal care, visits often feel more relaxed and less clinical.",
      },
      {
        heading: "What A Visit Might Include",
        layout: "grid3",
        circleImg: PINK_CIRCLE,
        itemTitleColor: "#4a0c57",
        items: [
          { icon: "/Companionship icon.png", title: "Conversation and social interaction" },
          { icon: "/Support with appointments icon.png", title: "Accompanying walks, appointments or outings" },
          { icon: "/Companionship icon.png", title: "Support with hobbies, reading or activities" },
          { icon: "/Meal icon.png", title: "Light help with meal preparation" },
          { icon: "/Medication icon.png", title: "Prompts and reminders for medication or daily tasks" },
          { icon: "/Care plans icon.png", title: "General wellbeing checks so changes are noticed early" },
        ],
      },
      {
        heading: "When Do You Need Companionship Care?",
        layout: "bullets",
        intro: "Companionship care tends to be considered in situations such as:",
        items: [
          "Someone living alone who has become more isolated, particularly after the loss of a partner or close friend",
          "A person who is generally independent but whose family notices they're less active or engaged than before",
          "Recovery periods where regular company and encouragement help someone stay motivated",
          "Family members who live at a distance and want reassurance that their relative has regular contact and support",
          "Early-stage support before more involved care, such as domiciliary or live-in care, becomes necessary",
        ],
        outro:
          "It's a useful option for families who are concerned about a loved one's wellbeing but aren't sure whether more intensive care is needed yet.",
      },
      {
        heading: "Our Companionship Care Process",
        layout: "process",
        steps: [
          {
            title: "Initial Assessment",
            body: "We begin by getting to know the person — their interests, daily routine, social preferences and any support needs alongside companionship.",
          },
          {
            title: "Planning and Preparation",
            body: "We put together a support plan covering visit frequency, typical activities, and any additional tasks such as meal support or medication prompts.",
          },
          {
            title: "Carrying Out the Support",
            body: "Visits focus on building a genuine, familiar relationship over time rather than treating each visit as a checklist. Consistency in who visits matters here.",
          },
          {
            title: "Ongoing Review",
            body: "We keep in touch with the person and their family to review how things are going, and adjust the support plan if needs change.",
          },
        ],
      },
      {
        heading: "Why Choose Tender Living Residence?",
        layout: "text",
        text: "Tender Living Residence is a CQC-regulated care provider, registered with and accountable to the Care Quality Commission. That means our service is required to meet defined standards around safety, dignity and quality of care, even for support that's primarily social rather than medical in nature.\n\nWe also provide complex care for people with more involved health needs, so if a loved one's situation changes over time, we can talk through what additional support might look like.\n\nGood companionship care depends on understanding people as individuals. We take time during assessment to understand interests and preferences, and we keep communication open with families.",
      },
      {
        heading: "Areas We Cover",
        layout: "areas",
        intro: "We provide companionship care across Birmingham and the surrounding areas, including:",
        items: WEST_MIDLANDS_AREAS,
        outro: areaOutro,
      },
      {
        heading: "Frequently Asked Questions",
        layout: "faq",
        items: [
          {
            question: "What does companionship care include?",
            answer:
              "It typically includes social interaction, accompanying someone on outings or appointments, light support with daily tasks, and general wellbeing checks. The exact mix depends on what's agreed for your situation.",
          },
          {
            question: "How much does companionship care cost?",
            answer:
              "Costs depend on visit frequency and the level of support needed. Contact us directly for a conversation about your circumstances.",
          },
          {
            question: "How is companionship care different from domiciliary care?",
            answer:
              "Companionship care focuses on social contact, activities and general wellbeing, while domiciliary care typically includes more hands-on personal care. Some people need one or the other, and some benefit from a combination of both.",
          },
          {
            question: "When should I consider companionship care?",
            answer:
              "It's worth considering if a loved one seems more isolated than before, lives alone without much regular social contact, or if family members want reassurance that someone is checking in regularly.",
          },
          {
            question: "Do you cover my area?",
            answer:
              "We cover Birmingham and the wider West Midlands and Warwickshire areas listed above. If you're unsure, contact us and we'll confirm.",
          },
          {
            question: "Why use a professional companionship care service rather than relying on family and friends?",
            answer:
              "Family and friends are valuable, but they aren't always available regularly. Professional companionship care offers consistency alongside a trained awareness of wellbeing changes.",
          },
        ],
      },
      {
        heading: "Contact Tender Living Residence",
        layout: "cta",
        intro: "If you'd like to talk through companionship care options in Birmingham, get in touch with our team:",
        items: contactItems,
        outro:
          "Companionship care offers a simple but meaningful way to support someone's wellbeing, combining regular social contact with practical help where it's needed. Tender Living Residence provides companionship care across Birmingham and the surrounding areas.",
      },
    ],
  },

  {
    slug: "home-based-respite",
    title: "Respite Care",
    heroTitle: "Respite Care in Birmingham",
    tagline: "Short-term cover for family carers in Birmingham — rest knowing your loved one is safely supported at home.",
    metaTitle: "Respite Care in Birmingham | Trusted Carer Support",
    metaDescription:
      "Find reliable respite care in Birmingham. Short-term cover for family carers with consistent support at home from Tender Living Residence.",
    figmaDescription:
      "Caring for a family member is rewarding, but it's also demanding, and taking a break isn't always straightforward when someone depends on you every day. Respite care gives family carers the chance to rest, deal with other commitments, or simply take some time for themselves, knowing their loved one is safely supported. Tender Living Residence provides respite care in Birmingham for families who need short-term cover without disrupting the person's usual routine.",
    description:
      "Home-based respite provides family carers with a planned break while ensuring continuity of care.",
    points: [],
    heroPhoto: "/Respite.png",
    sections: [
      {
        heading: "What Is Respite Care?",
        layout: "text",
        text: "Respite care is short-term, temporary support that gives a regular family carer a break, whether that's for a few hours, a few days, or longer. It's delivered in the person's own home, so their routine, surroundings and sense of familiarity stay the same, even while their usual carer steps back for a while.\n\nBecause it's arranged around the family's needs as much as the person's, respite care can be booked as a one-off, used occasionally, or built into a regular pattern — for example, a set day each week so the carer has consistent time to themselves.",
      },
      {
        heading: "What Respite Care Can Cover",
        layout: "grid3",
        circleImg: PINK_CIRCLE,
        itemTitleColor: "#4a0c57",
        items: [
          { icon: "/Personal care icon.png", title: "Personal care, washing, dressing and continence support" },
          { icon: "/Medication icon.png", title: "Medication prompts and support" },
          { icon: "/Meal icon.png", title: "Meal preparation" },
          { icon: "/Mobility icon.png", title: "Mobility assistance" },
          { icon: "/Companionship icon.png", title: "Companionship and general wellbeing checks" },
          { icon: "/Dementia icon.png", title: "Support for dementia or long-term conditions" },
        ],
      },
      {
        heading: "When Do You Need Respite Care?",
        layout: "bullets",
        intro: "Families in Birmingham tend to look into respite care for a range of reasons, including:",
        items: [
          "A family carer needing rest, or time to deal with their own health, work or other responsibilities",
          "A planned event, holiday or appointment that the usual carer needs to attend",
          "Recognising early signs of carer burnout and wanting to build in regular breaks before it becomes unsustainable",
          "A short-term gap, such as when a usual carer is unwell or unavailable",
          "Wanting a trial period of professional support before considering something more ongoing, such as domiciliary or live-in care",
        ],
        outro:
          "There's no need to wait until you're at breaking point to arrange respite care. Many families use it regularly as a planned part of how they manage caring responsibilities long-term.",
      },
      {
        heading: "Our Respite Care Process",
        layout: "process",
        steps: [
          {
            title: "Initial Assessment",
            body: "We start by understanding the person's usual routine, care needs and preferences, along with what the family carer needs from the respite period.",
          },
          {
            title: "Planning and Preparation",
            body: "We put together a plan covering the tasks involved, timing, and any specific instructions the regular carer wants followed, so the transition is as smooth as possible.",
          },
          {
            title: "Carrying Out the Support",
            body: "During the respite period, care is delivered in line with the agreed plan, maintaining the person's usual routine as closely as possible.",
          },
          {
            title: "Handover and Review",
            body: "At the end of the respite period, we make sure the regular carer is fully briefed on how things went. If respite is used regularly, we review the arrangement over time.",
          },
        ],
      },
      {
        heading: "Why Choose Tender Living Residence?",
        layout: "text",
        text: "Tender Living Residence is a CQC-regulated care provider, registered with and accountable to the Care Quality Commission. That means our respite care is delivered to the same standards of safety, dignity and quality expected of any of our regulated services.\n\nWe also provide complex care for people with more involved health needs, so if respite cover reveals that ongoing support would help, we can talk through the options honestly.\n\nRespite care works best when the person receiving support barely notices a change in their routine, and when the returning family carer feels genuinely reassured. Clear communication before, during and after the respite period is central to how we work.",
      },
      {
        heading: "Areas We Cover",
        layout: "areas",
        intro: "We provide respite care across Birmingham and the surrounding areas, including:",
        items: WEST_MIDLANDS_AREAS,
        outro: areaOutro,
      },
      {
        heading: "Frequently Asked Questions",
        layout: "faq",
        items: [
          {
            question: "What does respite care include?",
            answer:
              "It can include personal care, medication support, meal preparation, mobility assistance and companionship, matched to what the person normally receives from their regular carer.",
          },
          {
            question: "How much does respite care cost?",
            answer:
              "Cost depends on the length and level of support needed. Contact us directly for a conversation about your specific circumstances.",
          },
          {
            question: "How long can respite care last?",
            answer:
              "It can be arranged for a few hours, several days, or longer, depending on what the family carer needs. Some families use it occasionally, others build it into a regular pattern.",
          },
          {
            question: "When should I book respite care?",
            answer:
              "It's worth arranging as far in advance as possible, particularly for planned breaks or events, though we understand short-notice needs also come up.",
          },
          {
            question: "Do you cover my area?",
            answer:
              "We cover Birmingham and the wider West Midlands and Warwickshire areas listed above. If you're unsure, contact us and we'll confirm.",
          },
          {
            question: "Why use professional respite care instead of asking another family member?",
            answer:
              "Other family members aren't always available or able to provide the same level of care. Professional respite care means the person continues to receive consistent, trained support.",
          },
        ],
      },
      {
        heading: "Contact Tender Living Residence",
        layout: "cta",
        intro: "If you'd like to talk through respite care options in Birmingham, get in touch with our team:",
        items: contactItems,
        outro:
          "Taking a break as a family carer isn't a luxury — it's part of being able to keep providing good care over the long term. Tender Living Residence provides respite care across Birmingham and the surrounding areas.",
      },
    ],
  },

  {
    slug: "complex-care",
    title: "Complex Care",
    heroTitle: "Complex Care in Birmingham",
    tagline: "Professional complex care in Birmingham for higher needs, with clear planning and experienced specialist support.",
    metaTitle: "Complex Care in Birmingham | Trusted Care Services",
    metaDescription:
      "Find reliable complex care in Birmingham tailored to individual needs. Get compassionate, professional support from experienced care specialists today.",
    figmaDescription:
      "Some care needs go beyond what standard home visits or personal care can cover. When someone is managing a long-term health condition, a disability, or needs that require a more involved level of support, complex care provides a more structured, closely managed approach at home. Tender Living Residence provides complex care in Birmingham for people whose needs call for a higher level of support than general domiciliary care.",
    description:
      "Our complex care service supports individuals with advanced health conditions and multi-faceted support requirements.",
    points: [],
    heroPhoto: "/Complex Care.png",
    sections: [
      {
        heading: "What Is Complex Care?",
        layout: "text",
        text: "Complex care refers to support for people with more involved, ongoing health or care needs — often connected to a long-term condition, disability, or a combination of physical and health-related support requirements. Unlike more general home care, complex care services are built around a more detailed care plan, with closer attention to specific conditions, routines and any support that needs to be delivered consistently and carefully.\n\nBecause everyone's situation is different, complex care is never delivered as a one-size-fits-all package. It's built around the specific needs identified during assessment, and reviewed regularly as circumstances change.",
      },
      {
        heading: "What Complex Care Can Cover",
        layout: "grid3",
        circleImg: PINK_CIRCLE,
        itemTitleColor: "#4a0c57",
        items: [
          { icon: "/Clinical support icon.png", title: "Personal care alongside support for specific health conditions" },
          { icon: "/Medication icon.png", title: "Medication management" },
          { icon: "/Physical disabilities icon.png", title: "Support with mobility and physical disabilities" },
          { icon: "/Palliative care icon.png", title: "Support for people with sensory impairments" },
          { icon: "/PEG feeding icon.png", title: "Close monitoring and consistent condition routines" },
          { icon: "/Tracheostomy care icon.png", title: "Coordination with wider care plans and family involvement" },
        ],
      },
      {
        heading: "When Do You Need Complex Care?",
        layout: "bullets",
        intro: "Complex care tends to be considered when:",
        items: [
          "Someone's needs go beyond what general domiciliary care visits can safely and effectively cover",
          "A person is managing a long-term health condition that requires a consistent, closely managed routine",
          "Mobility, physical disability or sensory impairment mean support needs to be more detailed and carefully planned",
          "A family has been managing care independently but the level of need has increased",
          "A step down from hospital or another care setting requires ongoing support at home",
        ],
        outro:
          "If you're unsure whether a loved one's needs fall into general home care or complex care, it's worth having a conversation with us.",
      },
      {
        heading: "Our Complex Care Process",
        layout: "process",
        steps: [
          {
            title: "Initial Assessment",
            body: "We begin with a thorough assessment of the person's health conditions, daily needs, mobility, and any specific requirements. This is more detailed than a general care assessment.",
          },
          {
            title: "Planning and Preparation",
            body: "We put together a detailed care plan setting out exactly what support is needed, how it should be delivered, and any specific considerations. Where relevant, this is coordinated with other professionals.",
          },
          {
            title: "Carrying Out the Support",
            body: "Care is delivered in line with the agreed plan, with close attention to consistency and accuracy, particularly where health conditions require a specific routine.",
          },
          {
            title: "Ongoing Review",
            body: "Complex care needs can change, sometimes significantly, so care plans are reviewed regularly and adjusted as circumstances evolve.",
          },
        ],
      },
      {
        heading: "Why Choose Tender Living Residence?",
        layout: "text",
        text: "Tender Living Residence is a CQC-regulated care provider, registered with and accountable to the Care Quality Commission. This means our complex care services are delivered to defined standards around safety, dignity and quality.\n\nWe also provide domiciliary care for people whose needs are less involved, so we're able to have an honest conversation about which level of support genuinely fits your situation.\n\nComplex care depends on getting the details right consistently. Our approach starts with a detailed assessment, then consistency and clear communication throughout.",
      },
      {
        heading: "Areas We Cover",
        layout: "areas",
        intro: "We provide complex care across Birmingham and the surrounding areas, including:",
        items: WEST_MIDLANDS_AREAS,
        outro: areaOutro,
      },
      {
        heading: "Frequently Asked Questions",
        layout: "faq",
        items: [
          {
            question: "What do complex care services include?",
            answer:
              "They can include personal care, medication management, mobility support, and consistent routines built around a specific health condition or disability. The exact support is set out in a detailed care plan.",
          },
          {
            question: "How much does complex care cost?",
            answer:
              "Cost depends on the level and complexity of support needed. Contact us directly for a conversation about your specific circumstances.",
          },
          {
            question: "How is complex care different from domiciliary care?",
            answer:
              "Complex care is built around more involved, ongoing health or care needs, with a more detailed care plan and closer attention to consistency. Domiciliary care generally covers more general daily support needs.",
          },
          {
            question: "When should I consider complex care?",
            answer:
              "It's worth considering when a loved one's needs go beyond what general home visits can safely cover, particularly where a long-term health condition, disability or sensory impairment requires a carefully managed routine.",
          },
          {
            question: "Do you cover my area?",
            answer:
              "We cover Birmingham and the wider West Midlands and Warwickshire areas listed above. If you're unsure, contact us and we'll confirm.",
          },
          {
            question: "Why use professional complex care rather than managing it within the family?",
            answer:
              "Complex care often involves detailed, ongoing routines connected to specific health needs. Professional support provides consistency and reduces pressure on family members.",
          },
        ],
      },
      {
        heading: "Contact Tender Living Residence",
        layout: "cta",
        intro: "If you'd like to talk through complex care services in Birmingham, get in touch with our team:",
        items: contactItems,
        outro:
          "When care needs become more involved, having a carefully planned, consistent approach makes a real difference. Tender Living Residence provides complex care across Birmingham and the surrounding areas.",
      },
    ],
  },
];
