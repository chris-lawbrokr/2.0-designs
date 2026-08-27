import type { Page } from "../_components/types";

// Every tree demonstrates the same routing rules: the root question branches,
// branches reconverge on a shared follow-up, and some answers skip the
// remaining steps entirely (nextId: null routes straight to the end of the flow).
export const pages: Page[] = [
  {
    id: "home",
    label: "Home",
    meta: "Edited 2h ago",
    status: "live",
    buildType: "manual",
    visits: 24980,
    conversionRate: 3.2,
    questions: [
      {
        id: "topic",
        prompt: "What can we help you with?",
        answers: [
          { id: "topic-accident", label: "Car accident", nextId: "injury" },
          { id: "topic-family", label: "Family law", nextId: "family" },
          { id: "topic-other", label: "Something else", nextId: null },
        ],
      },
      {
        id: "injury",
        prompt: "Were you injured in the accident?",
        answers: [
          { id: "injury-yes", label: "Yes", nextId: "timeline" },
          { id: "injury-no", label: "No", nextId: null },
        ],
      },
      {
        id: "family",
        prompt: "What does it involve?",
        answers: [
          { id: "family-divorce", label: "Divorce", nextId: "timeline" },
          { id: "family-custody", label: "Custody", nextId: "timeline" },
        ],
      },
      {
        id: "timeline",
        prompt: "When did this happen?",
        answers: [
          { id: "timeline-recent", label: "Within the last year", nextId: null },
          { id: "timeline-older", label: "Over a year ago", nextId: null },
        ],
      },
    ],
  },
  {
    id: "pricing",
    label: "Pricing",
    meta: "Edited yesterday",
    status: "live",
    buildType: "ai",
    visits: 16420,
    conversionRate: 5.6,
    questions: [
      {
        id: "case",
        prompt: "What kind of case is this?",
        answers: [
          { id: "case-injury", label: "Personal injury", nextId: "fee" },
          { id: "case-business", label: "Business dispute", nextId: "budget" },
          { id: "case-unsure", label: "Not sure yet", nextId: null },
        ],
      },
      {
        id: "fee",
        prompt: "Comfortable with a contingency fee?",
        answers: [
          { id: "fee-yes", label: "Yes", nextId: "start" },
          { id: "fee-hourly", label: "Prefer hourly", nextId: "start" },
        ],
      },
      {
        id: "budget",
        prompt: "What budget range works for you?",
        answers: [
          { id: "budget-low", label: "Under $5k", nextId: "start" },
          { id: "budget-high", label: "$5k or more", nextId: "start" },
          { id: "budget-help", label: "Need guidance", nextId: null },
        ],
      },
      {
        id: "start",
        prompt: "How soon do you want to start?",
        answers: [
          { id: "start-now", label: "Right away", nextId: null },
          { id: "start-later", label: "Just exploring", nextId: null },
        ],
      },
    ],
  },
  {
    id: "about",
    label: "About",
    meta: "Edited 3d ago",
    status: "draft",
    buildType: "manual",
    visits: 9130,
    conversionRate: 2.1,
    questions: [
      {
        id: "source",
        prompt: "How did you hear about us?",
        answers: [
          { id: "source-referral", label: "A referral", nextId: "referrer" },
          { id: "source-search", label: "Online search", nextId: "search" },
          { id: "source-browsing", label: "Just browsing", nextId: null },
        ],
      },
      {
        id: "referrer",
        prompt: "Who referred you?",
        answers: [
          { id: "referrer-client", label: "A past client", nextId: "meet" },
          { id: "referrer-attorney", label: "Another attorney", nextId: "meet" },
        ],
      },
      {
        id: "search",
        prompt: "What were you searching for?",
        answers: [
          { id: "search-attorney", label: "An attorney near me", nextId: "meet" },
          { id: "search-info", label: "Legal information", nextId: null },
        ],
      },
      {
        id: "meet",
        prompt: "Want to meet the team?",
        answers: [
          { id: "meet-intro", label: "Yes, book an intro", nextId: null },
          { id: "meet-overview", label: "Send me an overview", nextId: null },
        ],
      },
    ],
  },
  {
    id: "changelog",
    label: "Changelog",
    meta: "Edited last week",
    status: "draft",
    buildType: "ai",
    visits: 7860,
    conversionRate: 1.4,
    questions: [
      {
        id: "interest",
        prompt: "What updates do you care about?",
        answers: [
          { id: "interest-areas", label: "New practice areas", nextId: "role" },
          { id: "interest-wins", label: "Results & wins", nextId: "frequency" },
          { id: "interest-none", label: "Not interested", nextId: null },
        ],
      },
      {
        id: "role",
        prompt: "Which describes you best?",
        answers: [
          { id: "role-client", label: "Potential client", nextId: "channel" },
          { id: "role-attorney", label: "Fellow attorney", nextId: "channel" },
        ],
      },
      {
        id: "frequency",
        prompt: "How often should we reach out?",
        answers: [
          { id: "frequency-monthly", label: "Monthly", nextId: "channel" },
          { id: "frequency-rarely", label: "Only major news", nextId: null },
        ],
      },
      {
        id: "channel",
        prompt: "Where should updates go?",
        answers: [
          { id: "channel-email", label: "Email", nextId: null },
          { id: "channel-text", label: "Text message", nextId: null },
        ],
      },
    ],
  },
];

export function getPages() {
  return pages;
}

export function getPage(pageId: string) {
  return pages.find((page) => page.id === pageId);
}
