/**
 * Single source of truth for the FAQ.
 *
 * The FAQ section renders these, and the same array is serialised into
 * FAQPage JSON-LD — so what Google and LLM crawlers read can never drift
 * from what a visitor actually sees on the page.
 */
export interface FaqEntry {
  question: string;
  answer: string;
}

export const faqs: FaqEntry[] = [
  {
    question: 'What does Reach My Ads cost?',
    answer:
      'Your ad budget goes straight to Google, Instagram and the rest. That money never passes through us, and you keep paying it exactly as you do now. For what Reach My Ads itself costs, tell us your budget and what you sell and we will quote you before anything goes live. No contract either way, so you can stop whenever you like.',
  },
  {
    question: 'Do I need to know anything about advertising?',
    answer:
      'No, and you do not need anyone on your team who does either. Tell us what you sell and what you want more of, whether that is calls, bookings or people walking in, and we do the rest. There are no keywords to research and no settings for you to learn.',
  },
  {
    question: 'What if I already run my own ads?',
    answer:
      'We connect to the ad accounts you already have, so your history and billing stay exactly where they are. You keep full ownership of the account and the data. Before we connect one we check it is not already attached to another business on our side, so your spend and your reporting stay yours alone.',
  },
  {
    question: 'Where do my enquiries go?',
    answer:
      'Into the CRM that comes built in. Phone calls, WhatsApp messages, website forms and Shopify buyers all land together, each one labelled with the ad that brought it in. If somebody has been waiting for a reply, we flag them for you.',
  },
  {
    question: 'Do I still need a separate CRM?',
    answer:
      'No. A CRM comes with Reach My Ads, already joined to your ads, your WhatsApp and your Shopify store. You set up your own pipeline stages, give every deal an owner, a task and a due date, and new leads can be shared out to your team automatically. When a deal moves to the next stage, the right WhatsApp message can go out by itself. Because the CRM shares its records with the ads, every won deal is joined back to the campaign that found it, and people who already bought from you are left out of ads meant for new customers. If you keep your customers in a spreadsheet today, you can import it.',
  },
  {
    question: 'Does it work with my Shopify store?',
    answer:
      'Yes. If you sell online through Shopify, you connect your store once and your products, customers and the last 12 months of orders come across. From then on every order is traced back to the ad that brought the buyer, so you can see sales against spend for each campaign and each product. When a product sells out, the ads selling it pause, and they start again when it is back in stock. Your products can be kept in a Meta catalogue for product ads, and purchases are reported to Meta and Google so they find more people who buy. On WhatsApp, cash-on-delivery orders are confirmed before you ship, and cart reminders, shipping updates, review requests and win-back messages go out on their own. Every buyer lands in the CRM, and a paid order closes their deal.',
  },
  {
    question: 'Do you track what people actually buy?',
    answer:
      'Yes, that is the point of it. An enquiry does not stop at the inbox: it moves from new, to contacted, to worth chasing, to bought. When you mark it bought you record the amount, so we keep the whole chain joined up. So you can see which ad brought a customer, what they bought, what they spent, and which of your products your best customers keep coming back for. Most advertising tools stop at the click and can only tell you what a click cost.',
  },
  {
    question: 'Which advertising platforms do you support?',
    answer:
      'Three ad networks: Google Ads, Meta Ads and LinkedIn Ads. Between them that covers Google Search, Google Maps, YouTube and Shopping; Instagram Reels, Feed and Stories; Facebook Feed and Marketplace; click-to-WhatsApp ads; and LinkedIn. You fill in one form and the same campaign is set up correctly on each. TikTok, Amazon Ads, X and Snapchat are on the roadmap and are not live yet.',
  },
  {
    question: 'Who writes and designs the ads?',
    answer:
      'We do, on a fixed production line: a brief, research into your audience and competitors, a strategy, the copy, then the design in Canva or Figma. Before anything can be published it is scored on four things: does it match your goal, is it relevant to the people who will see it, is the copy any good, and does it meet the platform rules. Only ads that pass get used.',
  },
  {
    question: 'Can I ask for a campaign over WhatsApp?',
    answer:
      'Yes, if you are set up for it. Message us what you want and roughly what you want to spend, we confirm it is you, and we come back with a draft. You approve it on WhatsApp, pay, and it goes live. You get a message at each step. No login, no form.',
  },
  {
    question: 'How does paying work?',
    answer:
      'Four ways, depending on what suits you: pay per campaign as you launch it, draw against a credit balance we have agreed, pay up front for planned work, or set up automatic payment so nothing stalls. Visa, UPI, bank transfer and debit card are all accepted. We check the money is there before a campaign can launch, so nothing goes live half-funded.',
  },
  {
    question: 'Do you work for small businesses in India?',
    answer:
      'Yes. Reach My Ads is built for Indian small businesses and priced in rupees. We follow the Indian festival calendar (Onam, Diwali, Durga Puja, Akshaya Tritiya and Dhanteras) and support WhatsApp-first enquiries, because that is how most local customers actually get in touch.',
  },
  {
    question: 'Which types of business is it built for?',
    answer:
      'We have dedicated setups for clothing and textile shops, restaurants and catering, coaching centres, clinics, real estate, home services and repairs, jewellers, and salons and gyms. Each gets its own seasonal timing, its own enquiry questions and its own definition of a sale.',
  },
  {
    question: 'Can I stop whenever I want?',
    answer:
      'Yes. There is no contract and no notice period. If you leave, we take your ads down properly so nothing keeps spending your money, and delete everything we hold about you.',
  },
];
