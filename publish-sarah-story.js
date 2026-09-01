import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadEnv() {
  const envPath = path.join(__dirname, '.env');
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim().replace(/^export\s+/, '');
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).split('#')[0].trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnv();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const rawText = `I Didn't See It Happening. 
The One Sunday, I Did. 

**One Daughter's Story About Realising Her Mum Needed Help, and What Families Should Know Before Choosing Home Care**

Sarah called her mum most evenings at six. Usually, it was ten years. She had done it for years. While Sarah stood in the kitchen thinking about dinner and she told her mum what was about the neighbour, something she had seen on television, or why Sarah was still making tea the wrong way after all these years. Nothing unusual. At least, that was what Sarah thought. 

She didn't notice when the calls started getting longer. Or when her mum told her the same story twice. Or when "I'm fine, love" began sounding less reassuring. 

It was a Sunday afternoon that changed things. Sarah let herself into the house with the key she had carried for fifteen years. The post was still on the mat. Not that morning's post. Three weeks of it. She opened the fridge and noticed the milk was out of date. There wasn't much else inside. 

Her mum was sitting in the living room in her dressing gown. It was nearly four in the afternoon. 

> "Mum, are you alright?" 
> "I'm fine, love." 
> "You're still in your dressing gown." 

Her mum shrugged. 

> "Just couldn't find the energy today." 

A few minutes later, she went into the hallway, sat on the stairs and didn't say anything. Sarah had grown up in that house, and cried. 

Nothing terrible had happened. There had been no big moment. That was almost the problem. 

Just little things. And suddenly Sarah could see that the little things had been adding up for quite some time. 

If that feeling sounds familiar, you're probably not imagining it. 

## The Signs Are Usually Quieter Than You Expect 

Sarah started thinking back over the previous few months. She just hadn't recognised them as clues. There had been clues. 

Recently, Sarah noticed cups staying beside the chair for days. Her mum had always kept a tidy house. Whenever she asked what her mum had eaten, the answer was usually: "Oh, just something small." Sometimes something small turned out to be tea and toast. Her mum had a chair for days. Then Sarah found two reminder letters underneath the unopened post. Her mum had never forgotten a bill in her life. 

There were other things too. A bruise her mum couldn't quite remember getting. Appointments being mixed up. The same question asked twice. Friends she seemed to be seeing less often. None of these things meant, on their own, that suddenly Sarah's mum couldn't look after herself. But together, they told Sarah something had changed. 

And that is often how families first notice. Not through one dramatic emergency. Through patterns. 

You may notice things like:
- meals being skipped or becoming very basic
- medication being forgotten
- mail and household tasks beginning to pile up
- a change in personal care or getting dressed
- more forgetfulness or confusion than usual
- less interest in going out or seeing people
- small falls, knocks or unexplained bruises
- a feeling that every phone call leaves you a little more worried

The difficult part is that parents often have an answer for everything individually. 

> "I wasn't hungry." 
> "I'll sort the post tomorrow." 
> "I must have knocked myself somewhere." 
> "I'm just tired." 

What she eventually realised was that Sarah didn't need to prove that anything was wrong. Sarah heard all of those too. 

She only needed to recognise that something might be becoming harder. 

## "Mum, Would You Ever Consider Having Someone Pop In?" 

Sarah didn't call a care company the next morning. For nearly two weeks, she went backwards and forwards in her head. 

Am I overreacting? What if she thinks I'm trying to take over? What if she refuses? 

She searched online. She closed the browser. Then she opened it again. She spoke to her brother. Eventually, she brought it up with her mum. She had rehearsed the conversation in the car. It still came out badly. 

> "Mum... would you ever consider having someone pop in now and again?" 

Her mum looked up. 

> "A carer?" 

Sarah immediately knew she had hit a nerve. 

> "Well, it sounds like you are." 
> "I'm not saying you can't look after yourself." 

There it was. The conversation Sarah had been avoiding. Her mum wasn't really frightened of another person coming into the house. She was frightened of what accepting help might mean. 

Would somebody start telling her when to get up? Would she lose control of her routines? Would people think she couldn't manage anymore? 

Sarah didn't want any of that either. And that was when she began to understand what good home care should actually look like. It shouldn't take over someone's life. It should fit around it. 

For one person, that might mean a little help with shopping and someone company during the week. For another, it might mean support with medication, meals, washing or getting dressed. Someone coming home from hospital may need more support at first and less as they recover. 

Another person may simply need a familiar face checking in regularly. 

There is no single version of home care. 

The question is not: "How much can somebody else do for Mum?" 

The better question is: "What would help Mum keep doing the things that matter to her?" 

## Sarah Opened Six Care Websites. They All Sounded the Same. 

That evening, Sarah started looking properly. By the third website, the words had begun to blur together. Compassionate. Trusted. Person-centred. Quality care. They all sounded reassuring. 

But none of those words answered the questions Sarah actually had. 

What happens if something goes wrong on a Saturday evening? How quickly can support start if we need it? Will anyone tell me how Mum is getting on? Who is going to walk through my mum's front door? Will it be the same person regularly? 

Those are the questions families should ask. Before choosing a provider, find out: 

- **Who will provide the care?** Consistency matters. Familiar carers can make a huge difference, particularly when someone is anxious or experiencing memory difficulties. 
- **How does the provider respond outside normal office hours?** Families need to know who they can contact when something unexpected happens. 
- **How will the care plan be created?** Good care should be built around the person, their routines, preferences and actual needs. 
- **What happens after care begins?** Needs can look different once support is actually in place. Ask how and when the provider reviews the arrangement. 
- **Is the provider properly registered for the regulated care they deliver?** For regulated personal care in England, check the provider's CQC registration. 

Sarah realised she wasn't looking for the company with the nicest website. She was looking for the company that made her feel confident handing them a key to her mum's home. 

That is a very different test. 

## You Don't Need to Have Everything Figured Out Before You Call 

At Tender Living Residence, families often contact us before they know exactly what they need. 

Sometimes they have been quietly worried for months. Sometimes Mum has just come home from hospital. 

Sometimes a son or daughter simply says: "Something has changed, but I don't know what we need yet." 

That is enough to begin a conversation. 

When a family contacts us, we start by listening. During the day, referrals are acknowledged, and we can respond within 30 minutes, with an out-of-hours on-call response available outside those hours. 

A named coordinator is assigned so you are not explaining the same story to a different person every time you call. We assess what support is actually needed and how quickly it needs to begin. 

After care starts, we check in again at 48 hours, because sometimes the questions only appear once care is underway. At around 14 days, we review the care arrangement. 

Our aim is not to take over someone's life. It is to help them keep living it. 

Sarah still calls her mum at six. Her mum still tells her not to fuss. She still makes tea too weak. Sarah doesn't spend the whole conversation listening for clues. The calls feel different now. 

And every now and again, Sarah gets to be her daughter again. 

## If Sarah's Story Feels Familiar 

You do not need to know what type of care you need before speaking to us. You do not need a care plan before speaking to us. You don't even need to be certain that home care is the right answer. Just tell us what you've noticed. 

We'll start there.`;

async function publishSarahsStory() {
    try {
        const excerpt = "One Daughter's Story About Realising Her Mum Needed Help, and What Families Should Know Before Choosing Home Care...";

        // We'll use the 'social-worker-taking-care-old-woman.jpg' which already exists in your public folder 
        // and is highly relevant to this story.
        const postPayload = {
            title: "Sarah's Story",
            slug: "sarahs-story",
            excerpt: excerpt,
            content: rawText,
            category: "Home Care",
            author: "Tender Living Residence",
            cover_url: "/social-worker-taking-care-old-woman.jpg",
            published: true,
            updated_at: new Date().toISOString()
        };

        console.log("🚀 Publishing article to Supabase...");
        const { error } = await supabase.from('posts').insert([postPayload]);

        if (error) {
            console.error("❌ Supabase Error:", error.message);
        } else {
            console.log("✅ Successfully published 'Sarah's Story' to the blog!");
        }
    } catch (err) {
        console.error("❌ Error:", err.message);
    }
}

publishSarahsStory();