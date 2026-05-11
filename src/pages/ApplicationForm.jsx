import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const ROLES = [
  "Support Worker",
  "Senior Support Worker",
  "Night Support Worker",
  "Registered Manager",
  "Other",
];

const emptyEdu = () => ({ school: "", from: "", to: "", qualification: "", grade: "" });
const emptyEmp = () => ({ employer: "", start: "", end: "", position: "", salary: "", reason: "" });

const Wave = () => (
  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: "none" }}>
    <svg viewBox="0 0 1440 80" fill="#fff5f3" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "80px", display: "block" }} preserveAspectRatio="none">
      <path d="M0,80 C320,24 720,72 1080,28 C1260,8 1380,48 1440,30 L1440,80 Z"/>
    </svg>
  </div>
);

function SectionTitle({ children }) {
  return (
    <div style={{ margin: "48px 0 24px" }}>
      <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(17px, 1.8vw, 22px)", color: "#490652", margin: 0 }}>
        {children}
      </h2>
    </div>
  );
}

function Field({ label, required, children, hint }) {
  return (
    <div className="af-field">
      <label className="af-label">
        {label}
        {required && <span style={{ color: "#b33874", marginLeft: 4 }}>*</span>}
      </label>
      {hint && <p className="af-hint">{hint}</p>}
      {children}
    </div>
  );
}

function YesNo({ name, value, onChange }) {
  return (
    <div className="af-radio-group">
      <label><input type="radio" name={name} value="yes" checked={value === "yes"} onChange={() => onChange("yes")} /> Yes</label>
      <label><input type="radio" name={name} value="no" checked={value === "no"} onChange={() => onChange("no")} /> No</label>
    </div>
  );
}

const ApplicationForm = () => {
  const [params] = useSearchParams();
  const preRole = params.get("role") || "";
  const [submitted, setSubmitted] = useState(false);

  const [data, setData] = useState({
    role: preRole,
    heardAbout: "",
    title: "", surname: "", forenames: "", address: "",
    telHome: "", telMobile: "", email: "", niNumber: "", dbsNumber: "",
    fullTime: "", partTime: "", casual: "",
    dayShifts: "", sleepIn: "", nightShifts: "", weekends: "",
    cantWorkDays: "",
    cantWorkDaysYN: "", cantWorkDaysDetails: "",
    hasRelative: "", relativeDetails: "",
    needsSponsorship: "",
    education: [emptyEdu()],
    employment: [emptyEmp()],
    empGaps: "",
    hasDrivingLicence: "",
    hasEndorsements: "", endorsementDetails: "",
    dignityRespect: "", workingCollab: "", commitment: "", learning: "",
    ref1: { company: "", name: "", position: "", address: "", postcode: "", tel: "", email: "", contactPref: "anytime" },
    ref2: { company: "", name: "", position: "", address: "", postcode: "", tel: "", email: "", contactPref: "anytime" },
    declarationSignature: "", declarationDate: "",
    criminalSurname: "", criminalForenames: "", dob: "", pob: "",
    maidenNames: "", criminalAddress: "", criminalRole: "", interviewDate: "",
    convictions: "", investigationSubject: "", offenceDetails: "",
    regulatorySubject: "", disqualified: "", furtherDetails: "",
    criminalSignature: "", criminalDate: "",
  });

  const set = (key, val) => setData(d => ({ ...d, [key]: val }));

  const addEdu = () => setData(d => ({ ...d, education: [...d.education, emptyEdu()] }));
  const removeEdu = (i) => setData(d => ({ ...d, education: d.education.filter((_, idx) => idx !== i) }));
  const setEdu = (i, key, val) => setData(d => ({
    ...d, education: d.education.map((e, idx) => idx === i ? { ...e, [key]: val } : e)
  }));

  const addEmp = () => setData(d => ({ ...d, employment: [...d.employment, emptyEmp()] }));
  const removeEmp = (i) => setData(d => ({ ...d, employment: d.employment.filter((_, idx) => idx !== i) }));
  const setEmp = (i, key, val) => setData(d => ({
    ...d, employment: d.employment.map((e, idx) => idx === i ? { ...e, [key]: val } : e)
  }));

  const setRef = (n, key, val) => set(n, { ...data[n], [key]: val });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    return (
      <section style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#fff5f3", padding: "80px 24px", textAlign: "center" }}>
        <div>
          <div style={{ width: 72, height: 72, borderRadius: "50%", backgroundColor: "#490652", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px" }}>
            <span style={{ color: "white", fontSize: 32, lineHeight: 1 }}>&#10003;</span>
          </div>
          <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(24px, 3vw, 38px)", color: "#490652", margin: "0 0 16px" }}>
            Application Submitted
          </h1>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(15px, 1.3vw, 18px)", color: "#606060", lineHeight: 1.7, maxWidth: 520, margin: "0 auto 36px" }}>
            Thank you for applying to Tender Living Residence. We will carefully review your application and be in touch with you shortly.
          </p>
          <a href="/" style={{ display: "inline-block", backgroundColor: "#490652", color: "white", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "15px", padding: "12px 36px", borderRadius: "30px", textDecoration: "none" }}>
            Back to Home
          </a>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section style={{ backgroundColor: "#490652", padding: "80px 40px 100px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(30px, 5vw, 58px)", color: "#fff5f3", margin: "0 0 16px", lineHeight: 1.1 }}>
          Application Form
        </h1>
        <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "clamp(14px, 1.5vw, 19px)", color: "rgba(255,245,243,0.8)", margin: "0 auto", maxWidth: 580, lineHeight: 1.65 }}>
          Please complete all sections as fully as possible. All information provided will be treated in strict confidence.
        </p>
        <Wave />
      </section>

      {/* Form body */}
      <section style={{ backgroundColor: "#fff5f3", padding: "64px 0 100px" }}>
        <form onSubmit={handleSubmit} className="af-form">

          {/* ── POST ── */}
          <SectionTitle>Post</SectionTitle>
          <div className="af-grid-2">
            <Field label="Post applied for" required>
              <select className="af-input" value={data.role} onChange={e => set("role", e.target.value)} required>
                <option value="">Select a role</option>
                {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </Field>
            <Field label="Where did you hear about this vacancy?">
              <input className="af-input" type="text" value={data.heardAbout} onChange={e => set("heardAbout", e.target.value)} />
            </Field>
          </div>

          {/* ── PERSONAL INFORMATION ── */}
          <SectionTitle>Personal Information</SectionTitle>
          <div className="af-grid-2">
            <Field label="Title">
              <input className="af-input" type="text" value={data.title} onChange={e => set("title", e.target.value)} />
            </Field>
            <Field label="Surname" required>
              <input className="af-input" type="text" value={data.surname} onChange={e => set("surname", e.target.value)} required />
            </Field>
          </div>
          <Field label="Forenames" required>
            <input className="af-input" type="text" value={data.forenames} onChange={e => set("forenames", e.target.value)} required />
          </Field>
          <Field label="Address" required>
            <textarea className="af-input" rows={3} value={data.address} onChange={e => set("address", e.target.value)} required />
          </Field>
          <div className="af-grid-2">
            <Field label="Telephone (Home)">
              <input className="af-input" type="tel" value={data.telHome} onChange={e => set("telHome", e.target.value)} />
            </Field>
            <Field label="Telephone (Mobile)">
              <input className="af-input" type="tel" value={data.telMobile} onChange={e => set("telMobile", e.target.value)} />
            </Field>
          </div>
          <div className="af-grid-2">
            <Field label="Email address" required>
              <input className="af-input" type="email" value={data.email} onChange={e => set("email", e.target.value)} required />
            </Field>
            <Field label="National Insurance Number">
              <input className="af-input" type="text" value={data.niNumber} onChange={e => set("niNumber", e.target.value)} />
            </Field>
          </div>
          <Field label="DBS Certificate Number" hint="For update service subscribers only">
            <input className="af-input" type="text" value={data.dbsNumber} onChange={e => set("dbsNumber", e.target.value)} />
          </Field>

          <p className="af-sub-title">Availability</p>
          <div className="af-avail-table">
            {[
              ["fullTime",   "Full-time"],
              ["partTime",   "Part-time"],
              ["casual",     "Casual (Bank)"],
              ["dayShifts",  "Day shifts (including early mornings and evenings)"],
              ["sleepIn",    "Sleep-in"],
              ["nightShifts","Night shifts"],
              ["weekends",   "Weekends"],
            ].map(([key, label]) => (
              <div key={key} className="af-avail-row">
                <span className="af-avail-label">{label}</span>
                <YesNo name={key} value={data[key]} onChange={val => set(key, val)} />
              </div>
            ))}
          </div>

          <Field label="State any days you cannot work">
            <input className="af-input" type="text" value={data.cantWorkDays} onChange={e => set("cantWorkDays", e.target.value)} />
          </Field>
          <Field label="Are there any particular days or nights you cannot work?">
            <YesNo name="cantWorkDaysYN" value={data.cantWorkDaysYN} onChange={val => set("cantWorkDaysYN", val)} />
          </Field>
          {data.cantWorkDaysYN === "yes" && (
            <Field label="Please provide details">
              <textarea className="af-input" rows={2} value={data.cantWorkDaysDetails} onChange={e => set("cantWorkDaysDetails", e.target.value)} />
            </Field>
          )}
          <Field label="Are you related to anyone currently working for the company?">
            <YesNo name="hasRelative" value={data.hasRelative} onChange={val => set("hasRelative", val)} />
          </Field>
          {data.hasRelative === "yes" && (
            <Field label="Please provide details">
              <textarea className="af-input" rows={2} value={data.relativeDetails} onChange={e => set("relativeDetails", e.target.value)} />
            </Field>
          )}
          <Field label="Do you require sponsorship?">
            <YesNo name="needsSponsorship" value={data.needsSponsorship} onChange={val => set("needsSponsorship", val)} />
          </Field>

          {/* ── EDUCATION / TRAINING ── */}
          <SectionTitle>Education / Training Relevant to Post</SectionTitle>
          {data.education.map((edu, i) => (
            <div key={i} className="af-repeat-block">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span className="af-repeat-label">Qualification {i + 1}</span>
                {i > 0 && <button type="button" className="af-remove-btn" onClick={() => removeEdu(i)}>Remove</button>}
              </div>
              <div className="af-grid-2">
                <Field label="Name of School / College">
                  <input className="af-input" type="text" value={edu.school} onChange={e => setEdu(i, "school", e.target.value)} />
                </Field>
                <Field label="Name of Qualification">
                  <input className="af-input" type="text" value={edu.qualification} onChange={e => setEdu(i, "qualification", e.target.value)} />
                </Field>
              </div>
              <div className="af-grid-3">
                <Field label="From">
                  <input className="af-input" type="text" placeholder="MM/YYYY" value={edu.from} onChange={e => setEdu(i, "from", e.target.value)} />
                </Field>
                <Field label="To">
                  <input className="af-input" type="text" placeholder="MM/YYYY" value={edu.to} onChange={e => setEdu(i, "to", e.target.value)} />
                </Field>
                <Field label="Grade">
                  <input className="af-input" type="text" value={edu.grade} onChange={e => setEdu(i, "grade", e.target.value)} />
                </Field>
              </div>
            </div>
          ))}
          <button type="button" className="af-add-btn" onClick={addEdu}>+ Add another qualification</button>

          {/* ── EMPLOYMENT HISTORY ── */}
          <SectionTitle>Employment History</SectionTitle>
          <p className="af-note">Please list your employment history starting with your most recent employer.</p>
          {data.employment.map((emp, i) => (
            <div key={i} className="af-repeat-block">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span className="af-repeat-label">Employer {i + 1}</span>
                {i > 0 && <button type="button" className="af-remove-btn" onClick={() => removeEmp(i)}>Remove</button>}
              </div>
              <Field label="Name and address of employer">
                <textarea className="af-input" rows={2} value={emp.employer} onChange={e => setEmp(i, "employer", e.target.value)} />
              </Field>
              <div className="af-grid-2">
                <Field label="Start (Month/Year)">
                  <input className="af-input" type="text" placeholder="MM/YYYY" value={emp.start} onChange={e => setEmp(i, "start", e.target.value)} />
                </Field>
                <Field label="End (Month/Year)">
                  <input className="af-input" type="text" placeholder="MM/YYYY" value={emp.end} onChange={e => setEmp(i, "end", e.target.value)} />
                </Field>
              </div>
              <div className="af-grid-2">
                <Field label="Position held">
                  <input className="af-input" type="text" value={emp.position} onChange={e => setEmp(i, "position", e.target.value)} />
                </Field>
                <Field label="Salary / Hourly Rate">
                  <input className="af-input" type="text" value={emp.salary} onChange={e => setEmp(i, "salary", e.target.value)} />
                </Field>
              </div>
              <Field label="Reason for leaving">
                <textarea className="af-input" rows={2} value={emp.reason} onChange={e => setEmp(i, "reason", e.target.value)} />
              </Field>
            </div>
          ))}
          <button type="button" className="af-add-btn" onClick={addEmp}>+ Add another employer</button>

          <Field label="Please detail reasons for any gaps in your employment history">
            <textarea className="af-input" rows={3} value={data.empGaps} onChange={e => set("empGaps", e.target.value)} />
          </Field>

          {/* ── FURTHER INFORMATION ── */}
          <SectionTitle>Further Information</SectionTitle>
          <Field label="Do you hold a current UK driving licence?">
            <YesNo name="hasDrivingLicence" value={data.hasDrivingLicence} onChange={val => set("hasDrivingLicence", val)} />
          </Field>
          <Field label="Have you any driving endorsements or disqualifications?">
            <YesNo name="hasEndorsements" value={data.hasEndorsements} onChange={val => set("hasEndorsements", val)} />
          </Field>
          {data.hasEndorsements === "yes" && (
            <Field label="Please provide further details">
              <textarea className="af-input" rows={2} value={data.endorsementDetails} onChange={e => set("endorsementDetails", e.target.value)} />
            </Field>
          )}

          {/* ── SUPPORTING INFORMATION ── */}
          <SectionTitle>Supporting Information</SectionTitle>
          <p className="af-note">Please provide information demonstrating how you meet each of the following values. Use specific examples where possible.</p>
          {[
            ["dignityRespect", "Dignity & Respect"],
            ["workingCollab",  "Working Collaboratively"],
            ["commitment",     "Commitment to Quality Care & Support"],
            ["learning",       "Learning & Reflection"],
          ].map(([key, label]) => (
            <Field key={key} label={label}>
              <textarea className="af-input" rows={4} value={data[key]} onChange={e => set(key, e.target.value)} />
            </Field>
          ))}

          {/* ── REFEREES ── */}
          <SectionTitle>Referees</SectionTitle>
          <p className="af-note">Please provide details of two referees who can comment on your professional suitability for this role. References will not be taken up without your permission.</p>
          {[["ref1", "Referee 1"], ["ref2", "Referee 2"]].map(([key, title]) => (
            <div key={key} className="af-repeat-block">
              <span className="af-repeat-label" style={{ display: "block", marginBottom: 16 }}>{title}</span>
              <div className="af-grid-2">
                <Field label="Company">
                  <input className="af-input" type="text" value={data[key].company} onChange={e => setRef(key, "company", e.target.value)} />
                </Field>
                <Field label="Name">
                  <input className="af-input" type="text" value={data[key].name} onChange={e => setRef(key, "name", e.target.value)} />
                </Field>
              </div>
              <div className="af-grid-2">
                <Field label="Position Held">
                  <input className="af-input" type="text" value={data[key].position} onChange={e => setRef(key, "position", e.target.value)} />
                </Field>
                <Field label="Postcode">
                  <input className="af-input" type="text" value={data[key].postcode} onChange={e => setRef(key, "postcode", e.target.value)} />
                </Field>
              </div>
              <Field label="Address">
                <textarea className="af-input" rows={2} value={data[key].address} onChange={e => setRef(key, "address", e.target.value)} />
              </Field>
              <div className="af-grid-2">
                <Field label="Telephone">
                  <input className="af-input" type="tel" value={data[key].tel} onChange={e => setRef(key, "tel", e.target.value)} />
                </Field>
                <Field label="Email">
                  <input className="af-input" type="email" value={data[key].email} onChange={e => setRef(key, "email", e.target.value)} />
                </Field>
              </div>
              <Field label="Contact preference">
                <div className="af-radio-col">
                  {[
                    ["anytime",       "Contact at any time"],
                    ["after_interview","Do not contact before interview"],
                    ["after_offer",   "Do not contact prior to acceptance of offer of employment"],
                  ].map(([val, lbl]) => (
                    <label key={val} className="af-radio-opt">
                      <input type="radio" name={`${key}_contact`} value={val} checked={data[key].contactPref === val} onChange={() => setRef(key, "contactPref", val)} />
                      {lbl}
                    </label>
                  ))}
                </div>
              </Field>
            </div>
          ))}

          {/* ── APPLICANT DECLARATION ── */}
          <SectionTitle>Applicant Declaration</SectionTitle>
          <div className="af-declaration-box">
            <p>I confirm that to the best of my knowledge the information given on this form is correct and complete. I understand that providing false or misleading information, or failure to disclose relevant facts, may result in the termination of any employment offered.</p>
            <p style={{ margin: 0 }}>I consent to the processing of my personal data in accordance with the Data Protection Act 2018 and the UK GDPR for the purposes of this application.</p>
          </div>
          <div className="af-grid-2">
            <Field label="Signature (type your full name)" required>
              <input className="af-input" type="text" value={data.declarationSignature} onChange={e => set("declarationSignature", e.target.value)} required />
            </Field>
            <Field label="Date" required>
              <input className="af-input" type="date" value={data.declarationDate} onChange={e => set("declarationDate", e.target.value)} required />
            </Field>
          </div>

          {/* ── CRIMINAL HISTORY ── */}
          <SectionTitle>Candidate Disclosure of Criminal History &amp; Professional Investigation</SectionTitle>
          <div className="af-declaration-box">
            <p>This section must be completed by all applicants. Having a criminal record will not necessarily bar you from working with us — this will depend on the nature of the position and the circumstances of your offences.</p>
            <p style={{ margin: 0 }}>This post is exempt from the Rehabilitation of Offenders Act 1974 and therefore all convictions, cautions, and bind-overs, including those which are spent, must be declared.</p>
          </div>
          <div className="af-grid-2">
            <Field label="Surname">
              <input className="af-input" type="text" value={data.criminalSurname} onChange={e => set("criminalSurname", e.target.value)} />
            </Field>
            <Field label="Forenames">
              <input className="af-input" type="text" value={data.criminalForenames} onChange={e => set("criminalForenames", e.target.value)} />
            </Field>
          </div>
          <div className="af-grid-2">
            <Field label="Date of Birth">
              <input className="af-input" type="date" value={data.dob} onChange={e => set("dob", e.target.value)} />
            </Field>
            <Field label="Place of Birth">
              <input className="af-input" type="text" value={data.pob} onChange={e => set("pob", e.target.value)} />
            </Field>
          </div>
          <div className="af-grid-2">
            <Field label="Maiden and/or previous names">
              <input className="af-input" type="text" value={data.maidenNames} onChange={e => set("maidenNames", e.target.value)} />
            </Field>
            <Field label="Post Applied For">
              <input className="af-input" type="text" value={data.criminalRole || data.role} onChange={e => set("criminalRole", e.target.value)} />
            </Field>
          </div>
          <div className="af-grid-2">
            <Field label="Address">
              <input className="af-input" type="text" value={data.criminalAddress} onChange={e => set("criminalAddress", e.target.value)} />
            </Field>
            <Field label="Date of Interview (if known)">
              <input className="af-input" type="date" value={data.interviewDate} onChange={e => set("interviewDate", e.target.value)} />
            </Field>
          </div>

          <Field label="Have you ever been convicted of any criminal offence, received a police caution in the UK, or a criminal conviction in any other country?">
            <YesNo name="convictions" value={data.convictions} onChange={val => set("convictions", val)} />
          </Field>
          <Field label="Are you currently the subject of any police investigation and/or prosecution in the UK or any other country?">
            <YesNo name="investigationSubject" value={data.investigationSubject} onChange={val => set("investigationSubject", val)} />
          </Field>
          {(data.convictions === "yes" || data.investigationSubject === "yes") && (
            <Field label="Please set out full details of offences / investigation">
              <textarea className="af-input" rows={4} value={data.offenceDetails} onChange={e => set("offenceDetails", e.target.value)} />
            </Field>
          )}

          <Field label="Are you currently the subject of any investigation or proceedings by any body having regulatory functions in relation to health or social care professionals, including in another country?">
            <YesNo name="regulatorySubject" value={data.regulatorySubject} onChange={val => set("regulatorySubject", val)} />
          </Field>
          <Field label="Have you ever been disqualified from the practice of a profession, or required to practise subject to specified limitations, following a fitness to practise investigation by a regulatory body in the UK or another country?">
            <YesNo name="disqualified" value={data.disqualified} onChange={val => set("disqualified", val)} />
          </Field>
          {(data.regulatorySubject === "yes" || data.disqualified === "yes") && (
            <Field label="Please set out full details">
              <textarea className="af-input" rows={4} value={data.furtherDetails} onChange={e => set("furtherDetails", e.target.value)} />
            </Field>
          )}

          <div className="af-grid-2">
            <Field label="Signature (type your full name)" required>
              <input className="af-input" type="text" value={data.criminalSignature} onChange={e => set("criminalSignature", e.target.value)} required />
            </Field>
            <Field label="Date" required>
              <input className="af-input" type="date" value={data.criminalDate} onChange={e => set("criminalDate", e.target.value)} required />
            </Field>
          </div>

          {/* ── SUBMIT ── */}
          <div style={{ textAlign: "center", paddingTop: "48px" }}>
            <button type="submit" className="af-submit-btn">
              Submit Application
            </button>
          </div>

        </form>
      </section>
    </>
  );
};

export default ApplicationForm;
