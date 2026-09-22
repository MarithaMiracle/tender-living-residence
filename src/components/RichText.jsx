import { Link } from "react-router-dom";
import { Fragment } from "react";

const LINK_STYLE = {
  color: "#b33874",
  fontWeight: 600,
  textDecoration: "underline",
  textUnderlineOffset: "3px",
};

/** Longer phrases first so they match before shorter overlaps. */
const INTERNAL_LINKS = [
  { pattern: /live[-\s]?in care/gi, to: "/services/home-based-care/live-in-care" },
  { pattern: /domiciliary care/gi, to: "/services/home-based-care/domiciliary-care" },
  { pattern: /companionship care/gi, to: "/services/home-based-care/companionship-care" },
  { pattern: /home[-\s]?based respite/gi, to: "/services/home-based-care/home-based-respite" },
  { pattern: /respite care/gi, to: "/services/home-based-care/home-based-respite" },
  { pattern: /complex care/gi, to: "/services/home-based-care/complex-care" },
  { pattern: /supported accommodation/gi, to: "/services/accommodation-based-support/supported-accommodation" },
  { pattern: /supported living/gi, to: "/services/accommodation-based-support/supported-living" },
  { pattern: /emergency(?:\s*\/\s*|\s+)crisis placements?/gi, to: "/services/crisis-and-urgent-support/emergency-crisis-placements" },
  { pattern: /emergency placements?/gi, to: "/services/crisis-and-urgent-support/emergency-crisis-placements" },
  { pattern: /rapid response/gi, to: "/services/crisis-and-urgent-support/rapid-response" },
  { pattern: /care needs assessment/gi, to: "/assessment" },
  { pattern: /CQC[-\s]?regulated/gi, to: "/cqc-regulated" },
  { pattern: /Care Quality Commission/gi, to: "/cqc-regulated" },
  { pattern: /\bCQC\b/g, to: "/cqc-regulated" },
  { pattern: /contact page/gi, to: "/contact" },
  { pattern: /get in touch/gi, to: "/contact" },
  { pattern: /contact us/gi, to: "/contact" },
  { pattern: /our services/gi, to: "/services" },
  { pattern: /home ?page/gi, to: "/" },
];

/**
 * Turns known service/page phrases in plain text into internal <Link>s.
 * Skips the current page path so we don't self-link every mention.
 */
export function linkifyText(text, { currentPath = "", linkStyle = LINK_STYLE } = {}) {
  if (!text) return null;

  const matches = [];
  for (const { pattern, to } of INTERNAL_LINKS) {
    if (to === currentPath) continue;
    const re = new RegExp(pattern.source, pattern.flags);
    let m;
    while ((m = re.exec(text)) !== null) {
      matches.push({ start: m.index, end: m.index + m[0].length, text: m[0], to });
    }
  }

  if (!matches.length) return text;

  matches.sort((a, b) => a.start - b.start || b.end - a.end);

  const picked = [];
  let cursor = 0;
  for (const match of matches) {
    if (match.start < cursor) continue;
    picked.push(match);
    cursor = match.end;
  }

  const nodes = [];
  let last = 0;
  picked.forEach((match, i) => {
    if (match.start > last) nodes.push(text.slice(last, match.start));
    nodes.push(
      <Link key={`${match.to}-${match.start}-${i}`} to={match.to} style={linkStyle}>
        {match.text}
      </Link>,
    );
    last = match.end;
  });
  if (last < text.length) nodes.push(text.slice(last));

  return nodes.map((node, i) => <Fragment key={i}>{node}</Fragment>);
}

export function RichParagraphs({ text, currentPath, style, firstMargin = 0 }) {
  if (!text) return null;
  return text.split("\n\n").map((para, i) => (
    <p key={i} style={{ ...style, margin: i === 0 ? firstMargin : "20px 0 0" }}>
      {linkifyText(para, { currentPath })}
    </p>
  ));
}
