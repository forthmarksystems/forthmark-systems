/* Programme and membership platform concept demo.
   Fictional data only. State is stored in localStorage on this browser. */

const STORAGE_KEY = "forthmark.programme.demo.v1";

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard" },
  { id: "applications", label: "Applications", icon: "applications" },
  { id: "participants", label: "Participants", icon: "participants" },
  { id: "cohorts", label: "Cohorts", icon: "cohorts" },
  { id: "attendance", label: "Attendance", icon: "attendance" },
  { id: "certificates", label: "Certificates", icon: "certificates" },
  { id: "reports", label: "Reports", icon: "reports" },
  { id: "settings", label: "Settings", icon: "settings" },
];

const VIEW_META = {
  dashboard: {
    title: "Dashboard",
    subtitle: "Applications, cohorts and progress at a glance.",
  },
  applications: {
    title: "Applications",
    subtitle: "Review, shortlist and accept applicants.",
  },
  participants: {
    title: "Participants",
    subtitle: "People enrolled across cohorts and tracks.",
  },
  cohorts: {
    title: "Cohorts",
    subtitle: "Capacity, schedules and enrolled participants.",
  },
  attendance: {
    title: "Attendance",
    subtitle: "Mark a session register and review rates.",
  },
  certificates: {
    title: "Certificates",
    subtitle: "Check eligibility and record issue dates.",
  },
  reports: {
    title: "Reports",
    subtitle: "Programme summary from the same records.",
  },
  settings: {
    title: "Settings",
    subtitle: "Demo workspace preferences.",
  },
};

const TRACKS = ["Operations", "Data", "Customer Success"];
const APP_STATUSES = ["New", "Shortlisted", "Accepted", "Waitlist", "Declined"];
const PART_STATUSES = ["Onboarding", "Active", "Paused", "Completed", "Withdrawn"];
const ATTENDANCE_STATES = ["Present", "Absent", "Excused"];

const icons = {
  dashboard:
    '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  applications:
    '<path d="M4 4h16v12H4z"/><path d="M4 9h5l1.5 2h3L15 9h5"/><path d="M8 20h8"/>',
  participants:
    '<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M16 5.5a3 3 0 0 1 0 5.8"/><path d="M18.5 20a5 5 0 0 0-2-3.9"/>',
  cohorts:
    '<path d="M12 3 3 8l9 5 9-5Z"/><path d="M3 12l9 5 9-5"/><path d="M3 16l9 5 9-5"/>',
  attendance:
    '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 2v4"/><path d="M16 2v4"/><path d="m8 13 2.5 2.5L16 10"/>',
  certificates:
    '<circle cx="12" cy="9" r="5"/><path d="m8.5 13-1.5 8 5-3 5 3-1.5-8"/>',
  reports:
    '<path d="M4 20V10"/><path d="M10 20V4"/><path d="M16 20v-7"/><path d="M22 20H2"/>',
  settings:
    '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const esc = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ],
  );

const pad = (value) => String(value).padStart(2, "0");
const isoDate = (date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

const today = isoDate(new Date());

function rel(days) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + days);
  return isoDate(date);
}

function monthsAgo(months, day) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(1);
  date.setMonth(date.getMonth() - months);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  date.setDate(Math.min(day, lastDay));
  return isoDate(date);
}

function formatDate(value) {
  if (!value) return "Not set";
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function daysUntil(value) {
  const date = new Date(`${value}T12:00:00`);
  const now = new Date();
  now.setHours(12, 0, 0, 0);
  return Math.round((date - now) / 86400000);
}

let idCounter = 0;
const makeId = (prefix) => `${prefix}${Date.now().toString(36)}${++idCounter}`;

function seedData() {
  const cohorts = [
    {
      id: "co1",
      name: "Cohort 07",
      track: "Operations",
      start: monthsAgo(2, 7),
      end: rel(18),
      capacity: 24,
      sessions: [
        { id: "co1s1", date: rel(-35), topic: "Process mapping" },
        { id: "co1s2", date: rel(-28), topic: "Data and records" },
        { id: "co1s3", date: rel(-21), topic: "Customer handoffs" },
        { id: "co1s4", date: rel(-14), topic: "Reporting basics" },
        { id: "co1s5", date: rel(3), topic: "Automation walkthrough" },
        { id: "co1s6", date: rel(10), topic: "Assessment clinic" },
      ],
    },
    {
      id: "co2",
      name: "Cohort 08",
      track: "Data",
      start: monthsAgo(2, 14),
      end: rel(24),
      capacity: 20,
      sessions: [
        { id: "co2s1", date: rel(-30), topic: "Spreadsheet to database" },
        { id: "co2s2", date: rel(-23), topic: "Cleaning operational data" },
        { id: "co2s3", date: rel(-16), topic: "Dashboards that get used" },
        { id: "co2s4", date: rel(5), topic: "Query practice" },
        { id: "co2s5", date: rel(12), topic: "Assessment clinic" },
      ],
    },
    {
      id: "co3",
      name: "Cohort 09",
      track: "Customer Success",
      start: rel(21),
      end: rel(84),
      capacity: 18,
      sessions: [
        { id: "co3s1", date: rel(21), topic: "Customer journey mapping" },
        { id: "co3s2", date: rel(28), topic: "Service recovery" },
        { id: "co3s3", date: rel(35), topic: "Retention and follow up" },
        { id: "co3s4", date: rel(42), topic: "Assessment clinic" },
      ],
    },
  ];

  const participants = [
    { id: "p1", name: "Adaora Nwankwo", email: "adaora@example.com", phone: "0800 000 2001", track: "Operations", cohortId: "co1", status: "Active", joined: rel(-70) },
    { id: "p2", name: "Ibrahim Sule", email: "ibrahim@example.com", phone: "0800 000 2002", track: "Operations", cohortId: "co1", status: "Active", joined: rel(-68) },
    { id: "p3", name: "Funmi Adebayo", email: "funmi@example.com", phone: "0800 000 2003", track: "Operations", cohortId: "co1", status: "Completed", joined: rel(-72) },
    { id: "p4", name: "Kelvin Etim", email: "kelvin@example.com", phone: "0800 000 2004", track: "Operations", cohortId: "co1", status: "Paused", joined: rel(-66) },
    { id: "p5", name: "Halima Bello", email: "halima@example.com", phone: "0800 000 2005", track: "Operations", cohortId: "co1", status: "Active", joined: rel(-64) },
    { id: "p6", name: "Chinedu Okafor", email: "chinedu@example.com", phone: "0800 000 2006", track: "Data", cohortId: "co2", status: "Active", joined: rel(-58) },
    { id: "p7", name: "Sarah Musa", email: "sarah@example.com", phone: "0800 000 2007", track: "Data", cohortId: "co2", status: "Active", joined: rel(-56) },
    { id: "p8", name: "Peter Ajayi", email: "peter@example.com", phone: "0800 000 2008", track: "Data", cohortId: "co2", status: "Onboarding", joined: rel(-12) },
    { id: "p9", name: "Nneka Umeh", email: "nneka@example.com", phone: "0800 000 2009", track: "Data", cohortId: "co2", status: "Completed", joined: rel(-60) },
    { id: "p10", name: "Yusuf Lawal", email: "yusuf@example.com", phone: "0800 000 2010", track: "Customer Success", cohortId: "co3", status: "Onboarding", joined: rel(-8) },
    { id: "p11", name: "Blessing Ojo", email: "blessing@example.com", phone: "0800 000 2011", track: "Customer Success", cohortId: "co3", status: "Onboarding", joined: rel(-6) },
    { id: "p12", name: "Rita Eze", email: "rita@example.com", phone: "0800 000 2012", track: "Operations", cohortId: null, status: "Onboarding", joined: rel(-3) },
  ];

  const applications = [
    { id: "a1", name: "Amaka Obi", email: "amaka@example.com", phone: "0800 000 3001", track: "Operations", received: rel(-1), source: "Website", status: "New", note: "Runs operations for a small retail chain. Wants to replace spreadsheets." },
    { id: "a2", name: "Segun Adeleke", email: "segun@example.com", phone: "0800 000 3002", track: "Data", received: rel(-2), source: "Referral", status: "New", note: "Analyst in a logistics company, self taught, needs formal reporting practice." },
    { id: "a3", name: "Ifeoma Nnaji", email: "ifeoma@example.com", phone: "0800 000 3003", track: "Customer Success", received: rel(-4), source: "Instagram", status: "Shortlisted", note: "Customer support lead. Available for evening sessions." },
    { id: "a4", name: "Bola Martins", email: "bola@example.com", phone: "0800 000 3004", track: "Operations", received: rel(-9), source: "Website", status: "Accepted", note: "Operations manager at a pharmacy group." },
    { id: "a5", name: "Chika Uzo", email: "chika@example.com", phone: "0800 000 3005", track: "Data", received: rel(-6), source: "Partner", status: "Waitlist", note: "Strong application, but the current cohort is near capacity." },
    { id: "a6", name: "Tobi Adeyemi", email: "tobi@example.com", phone: "0800 000 3006", track: "Customer Success", received: rel(-8), source: "Website", status: "New", note: "Works in a subscription service. Interested in retention." },
    { id: "a7", name: "Maryam Sani", email: "maryam@example.com", phone: "0800 000 3007", track: "Operations", received: rel(-12), source: "Referral", status: "Declined", note: "Timing does not fit. Invited to apply for the next intake." },
    { id: "a8", name: "Uche Nnamdi", email: "uche@example.com", phone: "0800 000 3008", track: "Data", received: rel(-3), source: "Website", status: "Shortlisted", note: "Good SQL basics. Needs dashboard experience." },
    { id: "a9", name: "Zara Ahmed", email: "zara@example.com", phone: "0800 000 3009", track: "Customer Success", received: rel(0), source: "WhatsApp", status: "New", note: "Team lead at a small events business." },
    { id: "a10", name: "Femi Ogun", email: "femi@example.com", phone: "0800 000 3010", track: "Operations", received: rel(-15), source: "Website", status: "Accepted", note: "Joined the waiting list for Cohort 07 and was moved in." },
  ];

  const attendance = {};
  participants.forEach((participant, participantIndex) => {
    if (!participant.cohortId) return;
    const cohort = cohorts.find((item) => item.id === participant.cohortId);
    if (!cohort) return;
    cohort.sessions
      .filter((session) => session.date <= today)
      .forEach((session, sessionIndex) => {
        const pattern = (participantIndex + sessionIndex) % 9;
        const value = pattern === 4 ? "Absent" : pattern === 7 ? "Excused" : "Present";
        attendance[`${participant.id}:${session.id}`] = value;
      });
  });

  return {
    settings: {
      org: "Aster Skills Academy",
      programme: "Digital Operations Programme",
      email: "programmes@aster.example",
      passRate: 80,
    },
    applications,
    participants,
    cohorts,
    attendance,
    certificates: {},
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedData();
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.participants)) return seedData();
    return {
      ...seedData(),
      ...parsed,
      settings: { ...seedData().settings, ...(parsed.settings || {}) },
      attendance: parsed.attendance || {},
      certificates: parsed.certificates || {},
    };
  } catch (error) {
    return seedData();
  }
}

let state = loadState();

function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    /* Storage can be unavailable. The demo still works for this page view. */
  }
}

const ui = {
  view: "dashboard",
  appQuery: "",
  appStatus: "all",
  partQuery: "",
  partStatus: "all",
  partTrack: "all",
  certFilter: "all",
  attCohort: "co1",
  attSession: "",
};

/* Helpers */

const cohortById = (id) => state.cohorts.find((cohort) => cohort.id === id);
const participantById = (id) => state.participants.find((person) => person.id === id);
const applicationById = (id) => state.applications.find((application) => application.id === id);

const attendanceKey = (participantId, sessionId) => `${participantId}:${sessionId}`;

function cohortSessions(cohortId) {
  return cohortById(cohortId)?.sessions || [];
}

function pastSessions(cohort) {
  return (cohort?.sessions || []).filter((session) => session.date <= today);
}

function attendanceRate(participant) {
  if (!participant?.cohortId) return null;
  const cohort = cohortById(participant.cohortId);
  const sessions = pastSessions(cohort);
  if (!sessions.length) return null;
  const present = sessions.filter(
    (session) => state.attendance[attendanceKey(participant.id, session.id)] === "Present",
  ).length;
  return Math.round((present / sessions.length) * 100);
}

function isEligible(participant) {
  const rate = attendanceRate(participant);
  return (
    rate !== null &&
    rate >= Number(state.settings.passRate) &&
    (participant.status === "Active" || participant.status === "Completed")
  );
}

function capacityUsed(cohortId) {
  return state.participants.filter(
    (participant) =>
      participant.cohortId === cohortId && participant.status !== "Withdrawn",
  ).length;
}

function cohortForTrack(track) {
  return state.cohorts.find(
    (cohort) => cohort.track === track && capacityUsed(cohort.id) < cohort.capacity,
  );
}

function overallAttendance() {
  let present = 0;
  let total = 0;
  state.participants.forEach((participant) => {
    if (!participant.cohortId) return;
    const sessions = pastSessions(cohortById(participant.cohortId));
    sessions.forEach((session) => {
      const value = state.attendance[attendanceKey(participant.id, session.id)];
      if (!value) return;
      total += 1;
      if (value === "Present") present += 1;
    });
  });
  return total ? Math.round((present / total) * 100) : null;
}

const APP_TONE = {
  New: "blue",
  Shortlisted: "amber",
  Accepted: "green",
  Waitlist: "clay",
  Declined: "red",
};

const PART_TONE = {
  Onboarding: "blue",
  Active: "green",
  Paused: "amber",
  Completed: "clay",
  Withdrawn: "red",
};

const ATTENDANCE_TONE = {
  Present: "green",
  Absent: "red",
  Excused: "amber",
};

function badge(label, tone = "gray") {
  return `<span class="d-badge d-badge--${tone}">${esc(label)}</span>`;
}

function icon(name) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || ""}</svg>`;
}

function rateCell(rate) {
  if (rate === null) return '<span class="d-muted">No sessions yet</span>';
  return `${rate}% ${rate >= Number(state.settings.passRate) ? badge("On track", "green") : badge("Below threshold", "amber")}`;
}

let toastTimer;

function toast(message) {
  const element = $("#toast");
  if (!element) return;
  element.textContent = message;
  element.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => element.classList.remove("is-visible"), 2600);
}

function updateBrand() {
  const element = $("#brand-name");
  if (element) {
    element.innerHTML = `${esc(state.settings.org)}<small>Demo workspace</small>`;
  }
}

function renderNav() {
  const nav = $("#demo-nav");
  if (!nav) return;
  nav.innerHTML = NAV.map(
    (item) =>
      `<button type="button" data-action="nav" data-view="${item.id}" ${
        ui.view === item.id ? 'aria-current="page"' : ""
      }>${icon(item.icon)}<span>${item.label}</span></button>`,
  ).join("");
}

function selectedCohort() {
  return cohortById(ui.attCohort) || state.cohorts[0];
}

function selectedSession() {
  const cohort = selectedCohort();
  if (!cohort) return null;
  const found = cohort.sessions.find((session) => session.id === ui.attSession);
  if (found) return found;
  return (
    cohort.sessions.find((session) => session.date >= today) ||
    cohort.sessions[cohort.sessions.length - 1] ||
    null
  );
}

/* Views */

function dashboardView() {
  const newApplications = state.applications.filter(
    (application) => application.status === "New",
  ).length;
  const active = state.participants.filter(
    (participant) => participant.status === "Active",
  ).length;
  const rate = overallAttendance();
  const eligible = state.participants.filter(isEligible);
  const ready = eligible.filter((participant) => !state.certificates[participant.id]).length;

  const trackCounts = TRACKS.map((track) => ({
    track,
    count: state.applications.filter((application) => application.track === track).length,
  }));
  const maxTrack = Math.max(...trackCounts.map((item) => item.count), 1);

  const upcoming = state.cohorts
    .flatMap((cohort) =>
      cohort.sessions
        .filter((session) => session.date >= today)
        .map((session) => ({ ...session, cohort })),
    )
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 6);

  const review = state.applications
    .filter((application) => application.status === "New" || application.status === "Shortlisted")
    .sort((a, b) => a.received.localeCompare(b.received))
    .slice(0, 5);

  return `
    <div class="d-grid d-grid--4">
      <div class="d-kpi">
        <p class="d-kpi__label">New applications</p>
        <div class="d-kpi__value">${newApplications}</div>
        <p class="d-kpi__sub">${state.applications.length} received in total</p>
      </div>
      <div class="d-kpi">
        <p class="d-kpi__label">Active participants</p>
        <div class="d-kpi__value">${active}</div>
        <p class="d-kpi__sub">${state.participants.length} people on record</p>
      </div>
      <div class="d-kpi">
        <p class="d-kpi__label">Attendance</p>
        <div class="d-kpi__value">${rate === null ? "No data" : `${rate}%`}</div>
        <p class="d-kpi__sub">Across recorded past sessions</p>
      </div>
      <div class="d-kpi">
        <p class="d-kpi__label">Certificates ready</p>
        <div class="d-kpi__value">${ready}</div>
        <p class="d-kpi__sub">${eligible.length} eligible at ${state.settings.passRate}%</p>
      </div>
    </div>

    <div class="d-grid d-grid--2">
      <div class="d-card">
        <div class="d-card__head">
          <h2>Applications by track</h2>
          <button class="d-card__link" data-action="nav" data-view="applications">View all</button>
        </div>
        <div class="d-list">
          ${trackCounts
            .map(
              (item) => `
            <div class="d-list__row">
              <div class="d-list__main">
                <strong>${esc(item.track)}</strong>
                <span>${item.count} application${item.count === 1 ? "" : "s"}</span>
              </div>
              <div style="width:42%;min-width:110px">
                <div class="d-meter"><span style="width:${Math.round((item.count / maxTrack) * 100)}%"></span></div>
              </div>
            </div>`,
            )
            .join("")}
        </div>
      </div>

      <div class="d-card">
        <div class="d-card__head">
          <h2>Upcoming sessions</h2>
          <button class="d-card__link" data-action="nav" data-view="attendance">Attendance</button>
        </div>
        <div class="d-list">
          ${
            upcoming.length
              ? upcoming
                  .map(
                    (session) => `
              <div class="d-list__row">
                <div class="d-list__main">
                  <strong>${esc(session.topic)}</strong>
                  <span>${esc(session.cohort.name)} &middot; ${esc(session.cohort.track)} &middot; ${formatDate(session.date)}</span>
                </div>
                <span class="d-badge d-badge--${daysUntil(session.date) <= 7 ? "amber" : "gray"}">${daysUntil(session.date)} day${daysUntil(session.date) === 1 ? "" : "s"}</span>
              </div>`,
                  )
                  .join("")
              : '<p class="d-empty">No upcoming sessions are scheduled.</p>'
          }
        </div>
      </div>
    </div>

    <div class="d-card">
      <div class="d-card__head">
        <h2>Applications needing review</h2>
        <button class="d-card__link" data-action="nav" data-view="applications">Review queue</button>
      </div>
      <div class="d-table-wrap">
        <table class="d-table">
          <caption class="d-sr-only">Applications awaiting review</caption>
          <thead>
            <tr>
              <th scope="col">Applicant</th>
              <th scope="col">Track</th>
              <th scope="col">Received</th>
              <th scope="col">Status</th>
              <th scope="col"><span class="d-sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            ${
              review.length
                ? review
                    .map(
                      (application) => `
              <tr>
                <td>
                  <div class="d-strong">${esc(application.name)}</div>
                  <div class="d-sub">${esc(application.email)}</div>
                </td>
                <td>${esc(application.track)}</td>
                <td class="d-nowrap">${formatDate(application.received)}</td>
                <td>${badge(application.status, APP_TONE[application.status])}</td>
                <td class="d-right">
                  <button class="d-btn d-btn--sm" data-action="application-view" data-id="${application.id}">Review</button>
                </td>
              </tr>`,
                    )
                    .join("")
                : '<tr><td colspan="5"><p class="d-empty">No applications are waiting for review.</p></td></tr>'
            }
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function applicationRows() {
  const query = ui.appQuery.trim().toLowerCase();
  const rows = state.applications
    .filter((application) => {
      const matchesQuery =
        !query ||
        [application.name, application.email, application.track, application.source]
          .join(" ")
          .toLowerCase()
          .includes(query);
      const matchesStatus =
        ui.appStatus === "all" || application.status === ui.appStatus;
      return matchesQuery && matchesStatus;
    })
    .sort((a, b) => b.received.localeCompare(a.received));

  if (!rows.length) {
    return '<p class="d-empty">No applications match these filters.</p>';
  }

  return `
    <div class="d-table-wrap">
      <table class="d-table">
        <caption class="d-sr-only">Programme applications</caption>
        <thead>
          <tr>
            <th scope="col">Applicant</th>
            <th scope="col">Track</th>
            <th scope="col">Source</th>
            <th scope="col">Received</th>
            <th scope="col">Status</th>
            <th scope="col"><span class="d-sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody>
          ${rows
            .map(
              (application) => `
            <tr>
              <td>
                <div class="d-strong">${esc(application.name)}</div>
                <div class="d-sub">${esc(application.email)}</div>
              </td>
              <td>${esc(application.track)}</td>
              <td>${esc(application.source)}</td>
              <td class="d-nowrap">${formatDate(application.received)}</td>
              <td>
                <select class="d-status" data-application-status="${application.id}" aria-label="Status for ${esc(application.name)}">
                  ${APP_STATUSES.map(
                    (status) =>
                      `<option value="${status}" ${application.status === status ? "selected" : ""}>${status}</option>`,
                  ).join("")}
                </select>
              </td>
              <td class="d-right">
                <button class="d-btn d-btn--sm" data-action="application-view" data-id="${application.id}">View</button>
              </td>
            </tr>`,
            )
            .join("")}
        </tbody>
      </table>
    </div>`;
}

function applicationsView() {
  return `
    <div class="d-toolbar">
      <div class="d-search">
        ${icon("search")}
        <input class="d-input" type="search" data-filter="appQuery" value="${esc(ui.appQuery)}" placeholder="Search applicant, track or source" aria-label="Search applications" />
      </div>
      <select class="d-select" data-filter="appStatus" aria-label="Filter applications by status">
        <option value="all">All statuses</option>
        ${APP_STATUSES.map(
          (status) =>
            `<option value="${status}" ${ui.appStatus === status ? "selected" : ""}>${status}</option>`,
        ).join("")}
      </select>
      <span class="d-toolbar__spacer"></span>
      <button class="d-btn" data-action="export-applications">Export CSV</button>
      <button class="d-btn d-btn--primary" data-action="application-add">Add application</button>
    </div>
    <div id="applications-body">${applicationRows()}</div>
  `;
}

function participantRows() {
  const query = ui.partQuery.trim().toLowerCase();
  const rows = state.participants
    .filter((participant) => {
      const cohort = participant.cohortId ? cohortById(participant.cohortId) : null;
      const matchesQuery =
        !query ||
        [participant.name, participant.email, participant.track, cohort?.name || ""]
          .join(" ")
          .toLowerCase()
          .includes(query);
      const matchesStatus =
        ui.partStatus === "all" || participant.status === ui.partStatus;
      const matchesTrack =
        ui.partTrack === "all" || participant.track === ui.partTrack;
      return matchesQuery && matchesStatus && matchesTrack;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  if (!rows.length) {
    return '<p class="d-empty">No participants match these filters.</p>';
  }

  return `
    <div class="d-table-wrap">
      <table class="d-table">
        <caption class="d-sr-only">Programme participants</caption>
        <thead>
          <tr>
            <th scope="col">Participant</th>
            <th scope="col">Track</th>
            <th scope="col">Cohort</th>
            <th scope="col">Attendance</th>
            <th scope="col">Status</th>
            <th scope="col"><span class="d-sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody>
          ${rows
            .map((participant) => {
              const cohort = participant.cohortId
                ? cohortById(participant.cohortId)
                : null;
              return `
            <tr>
              <td>
                <div class="d-strong">${esc(participant.name)}</div>
                <div class="d-sub">${esc(participant.email)}</div>
              </td>
              <td>${esc(participant.track)}</td>
              <td>${cohort ? esc(cohort.name) : '<span class="d-muted">Not assigned</span>'}</td>
              <td class="d-nowrap">${rateCell(attendanceRate(participant))}</td>
              <td>
                <select class="d-status" data-participant-status="${participant.id}" aria-label="Status for ${esc(participant.name)}">
                  ${PART_STATUSES.map(
                    (status) =>
                      `<option value="${status}" ${participant.status === status ? "selected" : ""}>${status}</option>`,
                  ).join("")}
                </select>
              </td>
              <td class="d-right">
                <button class="d-btn d-btn--sm" data-action="participant-view" data-id="${participant.id}">View</button>
              </td>
            </tr>`;
            })
            .join("")}
        </tbody>
      </table>
    </div>`;
}

function participantsView() {
  return `
    <div class="d-toolbar">
      <div class="d-search">
        ${icon("search")}
        <input class="d-input" type="search" data-filter="partQuery" value="${esc(ui.partQuery)}" placeholder="Search participant or cohort" aria-label="Search participants" />
      </div>
      <select class="d-select" data-filter="partStatus" aria-label="Filter participants by status">
        <option value="all">All statuses</option>
        ${PART_STATUSES.map(
          (status) =>
            `<option value="${status}" ${ui.partStatus === status ? "selected" : ""}>${status}</option>`,
        ).join("")}
      </select>
      <select class="d-select" data-filter="partTrack" aria-label="Filter participants by track">
        <option value="all">All tracks</option>
        ${TRACKS.map(
          (track) =>
            `<option value="${track}" ${ui.partTrack === track ? "selected" : ""}>${track}</option>`,
        ).join("")}
      </select>
      <span class="d-toolbar__spacer"></span>
      <button class="d-btn" data-action="export-participants">Export CSV</button>
    </div>
    <div id="participants-body">${participantRows()}</div>
  `;
}

function cohortsView() {
  return `
    <div class="d-grid d-grid--2">
      ${state.cohorts
        .map((cohort) => {
          const used = capacityUsed(cohort.id);
          const percent = Math.min(Math.round((used / cohort.capacity) * 100), 100);
          const past = pastSessions(cohort).length;
          return `
          <div class="d-card">
            <div class="d-card__head">
              <div>
                <h2>${esc(cohort.name)}</h2>
                <p class="d-sub">${esc(cohort.track)} &middot; ${formatDate(cohort.start)} to ${formatDate(cohort.end)}</p>
              </div>
              ${badge(`${used} / ${cohort.capacity}`, used >= cohort.capacity ? "amber" : "green")}
            </div>
            <div class="d-meter"><span style="width:${percent}%"></span></div>
            <p class="d-sub" style="margin-top:0.4rem">${used} enrolled, ${Math.max(cohort.capacity - used, 0)} places left. ${past} of ${cohort.sessions.length} sessions completed.</p>
            <div class="d-list" style="margin-top:0.9rem">
              ${cohort.sessions
                .map(
                  (session) => `
                <div class="d-list__row">
                  <div class="d-list__main">
                    <strong>${esc(session.topic)}</strong>
                    <span>${formatDate(session.date)}</span>
                  </div>
                  ${badge(session.date < today ? "Completed" : session.date === today ? "Today" : "Scheduled", session.date < today ? "gray" : session.date === today ? "amber" : "blue")}
                </div>`,
                )
                .join("")}
            </div>
            <div class="d-btn-row" style="display:flex;gap:0.5rem;margin-top:1rem;flex-wrap:wrap">
              <button class="d-btn d-btn--sm" data-action="session-add" data-cohort="${cohort.id}">Add session</button>
              <button class="d-btn d-btn--sm" data-action="cohort-attendance" data-cohort="${cohort.id}">Open attendance</button>
            </div>
          </div>`;
        })
        .join("")}
    </div>
  `;
}

function attendanceView() {
  const cohort = selectedCohort();
  if (!cohort) {
    return '<p class="d-empty">No cohorts exist. Reset the demo to restore the sample data.</p>';
  }
  const session = selectedSession();
  const roster = state.participants
    .filter((participant) => participant.cohortId === cohort.id)
    .sort((a, b) => a.name.localeCompare(b.name));

  return `
    <div class="d-toolbar">
      <select class="d-select" data-filter="attCohort" aria-label="Select cohort">
        ${state.cohorts
          .map(
            (item) =>
              `<option value="${item.id}" ${cohort.id === item.id ? "selected" : ""}>${esc(item.name)} &middot; ${esc(item.track)}</option>`,
          )
          .join("")}
      </select>
      <select class="d-select" data-filter="attSession" aria-label="Select session">
        ${cohort.sessions
          .map(
            (item) =>
              `<option value="${item.id}" ${session?.id === item.id ? "selected" : ""}>${formatDate(item.date)} &middot; ${esc(item.topic)}</option>`,
          )
          .join("")}
      </select>
      <span class="d-toolbar__spacer"></span>
      <button class="d-btn" data-action="export-attendance" data-cohort="${cohort.id}" data-session="${session?.id || ""}">Export register</button>
    </div>

    ${
      !session
        ? '<p class="d-empty">This cohort has no sessions yet. Add one from the Cohorts view.</p>'
        : `
      <div class="d-card">
        <div class="d-card__head">
          <div>
            <h2>${esc(session.topic)}</h2>
            <p class="d-sub">${esc(cohort.name)} &middot; ${formatDate(session.date)} &middot; ${roster.length} enrolled</p>
          </div>
          ${badge(session.date < today ? "Past session" : session.date === today ? "Today" : "Upcoming", session.date < today ? "gray" : session.date === today ? "amber" : "blue")}
        </div>
        <form data-form="attendance" data-session="${session.id}">
          <div class="d-table-wrap">
            <table class="d-table">
              <caption class="d-sr-only">Attendance register for ${esc(session.topic)}</caption>
              <thead>
                <tr>
                  <th scope="col">Participant</th>
                  <th scope="col">Current rate</th>
                  ${ATTENDANCE_STATES.map((value) => `<th scope="col" class="d-right">${value}</th>`).join("")}
                </tr>
              </thead>
              <tbody>
                ${
                  roster.length
                    ? roster
                        .map((participant) => {
                          const current =
                            state.attendance[attendanceKey(participant.id, session.id)] || "";
                          return `
                    <tr>
                      <td>
                        <div class="d-strong">${esc(participant.name)}</div>
                        <div class="d-sub">${esc(participant.track)}</div>
                      </td>
                      <td class="d-nowrap">${rateCell(attendanceRate(participant))}</td>
                      ${ATTENDANCE_STATES.map(
                        (value) => `
                        <td class="d-right">
                          <input type="radio" name="attendance-${participant.id}" value="${value}" ${current === value ? "checked" : ""} aria-label="${esc(participant.name)}: ${value}" />
                        </td>`,
                      ).join("")}
                    </tr>`;
                        })
                        .join("")
                    : '<tr><td colspan="5"><p class="d-empty">No participants are assigned to this cohort.</p></td></tr>'
                }
              </tbody>
            </table>
          </div>
          <div class="d-toolbar" style="margin-top:0.9rem;padding:0;border:0;background:transparent">
            <span class="d-toolbar__spacer"></span>
            <button class="d-btn d-btn--primary" type="submit">Save attendance</button>
          </div>
        </form>
      </div>`
    }
  `;
}

function certificateRows() {
  const rows = state.participants
    .filter((participant) => attendanceRate(participant) !== null)
    .filter((participant) => {
      if (ui.certFilter === "eligible") return isEligible(participant);
      if (ui.certFilter === "issued") return Boolean(state.certificates[participant.id]);
      if (ui.certFilter === "pending")
        return isEligible(participant) && !state.certificates[participant.id];
      return true;
    })
    .sort((a, b) => {
      const rateA = attendanceRate(a) ?? 0;
      const rateB = attendanceRate(b) ?? 0;
      return rateB - rateA || a.name.localeCompare(b.name);
    });

  if (!rows.length) {
    return '<p class="d-empty">No participants match this filter.</p>';
  }

  return `
    <div class="d-table-wrap">
      <table class="d-table">
        <caption class="d-sr-only">Certificate eligibility</caption>
        <thead>
          <tr>
            <th scope="col">Participant</th>
            <th scope="col">Track</th>
            <th scope="col">Cohort</th>
            <th scope="col" class="d-right">Attendance</th>
            <th scope="col">Status</th>
            <th scope="col">Certificate</th>
          </tr>
        </thead>
        <tbody>
          ${rows
            .map((participant) => {
              const cohort = participant.cohortId
                ? cohortById(participant.cohortId)
                : null;
              const eligible = isEligible(participant);
              const issued = state.certificates[participant.id];
              return `
            <tr>
              <td>
                <div class="d-strong">${esc(participant.name)}</div>
                <div class="d-sub">${esc(participant.email)}</div>
              </td>
              <td>${esc(participant.track)}</td>
              <td>${cohort ? esc(cohort.name) : "Not assigned"}</td>
              <td class="d-right d-nowrap">${attendanceRate(participant)}%</td>
              <td>${badge(participant.status, PART_TONE[participant.status])}</td>
              <td>
                ${
                  issued
                    ? `${badge("Issued", "green")} <span class="d-sub">${formatDate(issued)}</span>`
                    : eligible
                      ? '<button class="d-btn d-btn--sm" data-action="certificate-issue" data-id="' +
                        participant.id +
                        '">Issue certificate</button>'
                      : '<span class="d-muted">Not eligible</span>'
                }
              </td>
            </tr>`;
            })
            .join("")}
        </tbody>
      </table>
    </div>`;
}

function certificatesView() {
  const eligible = state.participants.filter(isEligible).length;
  const issued = Object.keys(state.certificates).length;
  return `
    <div class="d-grid d-grid--3">
      <div class="d-kpi">
        <p class="d-kpi__label">Threshold</p>
        <div class="d-kpi__value">${state.settings.passRate}%</div>
        <p class="d-kpi__sub">Attendance required for eligibility</p>
      </div>
      <div class="d-kpi">
        <p class="d-kpi__label">Eligible</p>
        <div class="d-kpi__value">${eligible}</div>
        <p class="d-kpi__sub">Active or completed participants</p>
      </div>
      <div class="d-kpi">
        <p class="d-kpi__label">Issued</p>
        <div class="d-kpi__value">${issued}</div>
        <p class="d-kpi__sub">Recorded in this demo workspace</p>
      </div>
    </div>
    <div class="d-toolbar">
      <select class="d-select" data-filter="certFilter" aria-label="Filter certificates">
        <option value="all" ${ui.certFilter === "all" ? "selected" : ""}>All with attendance</option>
        <option value="pending" ${ui.certFilter === "pending" ? "selected" : ""}>Ready to issue</option>
        <option value="eligible" ${ui.certFilter === "eligible" ? "selected" : ""}>Eligible</option>
        <option value="issued" ${ui.certFilter === "issued" ? "selected" : ""}>Issued</option>
      </select>
      <span class="d-toolbar__spacer"></span>
      <button class="d-btn" data-action="export-certificates">Export CSV</button>
    </div>
    <div id="certificates-body">${certificateRows()}</div>
    <p class="d-sub" style="margin-top:0.9rem">Eligibility is a demo rule based on recorded attendance. A real certificate process would also verify assessment, identity and programme requirements.</p>
  `;
}

function trackReport() {
  return TRACKS.map((track) => {
    const applications = state.applications.filter(
      (application) => application.track === track,
    ).length;
    const participants = state.participants.filter(
      (participant) => participant.track === track,
    );
    const rates = participants
      .map(attendanceRate)
      .filter((rate) => rate !== null);
    const average = rates.length
      ? Math.round(rates.reduce((sum, rate) => sum + rate, 0) / rates.length)
      : null;
    return { track, applications, participants: participants.length, average };
  });
}

function reportsView() {
  const total = state.applications.length;
  const accepted = state.applications.filter(
    (application) => application.status === "Accepted",
  ).length;
  const acceptance = total ? Math.round((accepted / total) * 100) : 0;
  const active = state.participants.filter(
    (participant) => participant.status === "Active",
  ).length;
  const rate = overallAttendance();
  const issued = Object.keys(state.certificates).length;
  const tracks = trackReport();

  return `
    <div class="d-grid d-grid--4">
      <div class="d-kpi">
        <p class="d-kpi__label">Applications</p>
        <div class="d-kpi__value">${total}</div>
        <p class="d-kpi__sub">${accepted} accepted</p>
      </div>
      <div class="d-kpi">
        <p class="d-kpi__label">Acceptance rate</p>
        <div class="d-kpi__value">${acceptance}%</div>
        <p class="d-kpi__sub">Accepted against total applications</p>
      </div>
      <div class="d-kpi">
        <p class="d-kpi__label">Active participants</p>
        <div class="d-kpi__value">${active}</div>
        <p class="d-kpi__sub">${state.participants.length} on record</p>
      </div>
      <div class="d-kpi">
        <p class="d-kpi__label">Attendance</p>
        <div class="d-kpi__value">${rate === null ? "No data" : `${rate}%`}</div>
        <p class="d-kpi__sub">${issued} certificates issued</p>
      </div>
    </div>

    <div class="d-card">
      <div class="d-card__head">
        <h2>By track</h2>
        <button class="d-card__link" data-action="export-report">Export report</button>
      </div>
      <div class="d-table-wrap">
        <table class="d-table">
          <caption class="d-sr-only">Programme summary by track</caption>
          <thead>
            <tr>
              <th scope="col">Track</th>
              <th scope="col" class="d-right">Applications</th>
              <th scope="col" class="d-right">Participants</th>
              <th scope="col" class="d-right">Average attendance</th>
            </tr>
          </thead>
          <tbody>
            ${tracks
              .map(
                (item) => `
              <tr>
                <td class="d-strong">${esc(item.track)}</td>
                <td class="d-right">${item.applications}</td>
                <td class="d-right">${item.participants}</td>
                <td class="d-right">${item.average === null ? "No data" : `${item.average}%`}</td>
              </tr>`,
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </div>

    <div class="d-card">
      <div class="d-card__head">
        <h2>By cohort</h2>
      </div>
      <div class="d-table-wrap">
        <table class="d-table">
          <caption class="d-sr-only">Programme summary by cohort</caption>
          <thead>
            <tr>
              <th scope="col">Cohort</th>
              <th scope="col">Track</th>
              <th scope="col" class="d-right">Enrolled</th>
              <th scope="col" class="d-right">Capacity</th>
              <th scope="col" class="d-right">Sessions done</th>
              <th scope="col" class="d-right">Average attendance</th>
            </tr>
          </thead>
          <tbody>
            ${state.cohorts
              .map((cohort) => {
                const members = state.participants.filter(
                  (participant) => participant.cohortId === cohort.id,
                );
                const rates = members
                  .map(attendanceRate)
                  .filter((value) => value !== null);
                const average = rates.length
                  ? Math.round(rates.reduce((sum, value) => sum + value, 0) / rates.length)
                  : null;
                return `
                <tr>
                  <td class="d-strong">${esc(cohort.name)}</td>
                  <td>${esc(cohort.track)}</td>
                  <td class="d-right">${members.length}</td>
                  <td class="d-right">${cohort.capacity}</td>
                  <td class="d-right">${pastSessions(cohort).length} / ${cohort.sessions.length}</td>
                  <td class="d-right">${average === null ? "No data" : `${average}%`}</td>
                </tr>`;
              })
              .join("")}
          </tbody>
        </table>
      </div>
    </div>

    <p class="d-sub">These figures are calculated from the fictional demo records in this browser. They are not client results or performance claims.</p>
  `;
}

function settingsView() {
  return `
    <div class="d-grid d-grid--2">
      <div class="d-card">
        <div class="d-card__head"><h2>Workspace</h2></div>
        <form class="d-form" data-form="settings">
          <div>
            <label class="d-label" for="settings-org">Organisation name</label>
            <input class="d-input" id="settings-org" name="org" value="${esc(state.settings.org)}" required />
          </div>
          <div>
            <label class="d-label" for="settings-programme">Programme name</label>
            <input class="d-input" id="settings-programme" name="programme" value="${esc(state.settings.programme)}" required />
          </div>
          <div class="d-form__row">
            <div>
              <label class="d-label" for="settings-email">Programme email</label>
              <input class="d-input" id="settings-email" name="email" type="email" value="${esc(state.settings.email)}" />
            </div>
            <div>
              <label class="d-label" for="settings-pass">Certificate threshold (%)</label>
              <input class="d-input" id="settings-pass" name="passRate" type="number" min="0" max="100" value="${state.settings.passRate}" />
            </div>
          </div>
          <div class="d-btn-row" style="display:flex;gap:0.5rem">
            <button class="d-btn d-btn--primary" type="submit">Save settings</button>
            <button class="d-btn d-btn--danger" type="button" data-action="reset">Reset demo data</button>
          </div>
        </form>
      </div>

      <div class="d-card">
        <div class="d-card__head"><h2>About this demo</h2></div>
        <p class="d-body">
          This is a concept demonstration, not a client deployment. The
          organisation, applicants, participants, sessions and certificates are
          fictional. Records are stored in this browser only and no data is sent to
          a server.
        </p>
        <p class="d-sub" style="margin-top:0.7rem">
          A production programme platform would add authentication, role based
          access, email notifications, document uploads, payment or invoicing, and
          an audit trail. Those are deliberately out of scope for this demo.
        </p>
      </div>
    </div>
  `;
}

const views = {
  dashboard: dashboardView,
  applications: applicationsView,
  participants: participantsView,
  cohorts: cohortsView,
  attendance: attendanceView,
  certificates: certificatesView,
  reports: reportsView,
  settings: settingsView,
};

function render() {
  const meta = VIEW_META[ui.view] || VIEW_META.dashboard;
  const title = $("#view-title");
  const subtitle = $("#view-subtitle");
  const view = $("#view");
  if (title) title.textContent = meta.title;
  if (subtitle) subtitle.textContent = meta.subtitle;
  renderNav();
  if (view) view.innerHTML = views[ui.view]();
}

function listRenderers() {
  return {
    applications: () => {
      const element = $("#applications-body");
      if (element) element.innerHTML = applicationRows();
    },
    participants: () => {
      const element = $("#participants-body");
      if (element) element.innerHTML = participantRows();
    },
    certificates: () => {
      const element = $("#certificates-body");
      if (element) element.innerHTML = certificateRows();
    },
  };
}

function refreshList() {
  const renderer = listRenderers()[ui.view];
  if (renderer) renderer();
}

/* Modal */

const modal = $("#modal");

function openModal(html) {
  if (!modal) return;
  modal.innerHTML = html;
  if (typeof modal.showModal === "function") {
    if (!modal.open) modal.showModal();
  } else {
    modal.setAttribute("open", "");
  }
}

function closeModal() {
  if (!modal) return;
  if (typeof modal.close === "function") modal.close();
  else modal.removeAttribute("open");
}

function applicationModal(application) {
  return `
    <div class="d-modal__head">
      <div>
        <h2 id="modal-title">${esc(application.name)}</h2>
        <p>${esc(application.track)} &middot; ${esc(application.source)} &middot; ${formatDate(application.received)}</p>
      </div>
      <button class="d-modal__close" type="button" data-action="close-modal" aria-label="Close">&times;</button>
    </div>
    <div class="d-modal__body">
      <dl class="d-detail">
        <dt>Email</dt><dd>${esc(application.email)}</dd>
        <dt>Phone</dt><dd>${esc(application.phone)}</dd>
        <dt>Status</dt><dd>${badge(application.status, APP_TONE[application.status])}</dd>
        <dt>Note</dt><dd>${esc(application.note)}</dd>
      </dl>
    </div>
    <div class="d-modal__foot">
      <button class="d-btn" type="button" data-action="close-modal">Close</button>
      ${
        application.status !== "Shortlisted" && application.status !== "Accepted"
          ? `<button class="d-btn" type="button" data-action="application-status" data-id="${application.id}" data-status="Shortlisted">Shortlist</button>`
          : ""
      }
      ${
        application.status !== "Accepted"
          ? `<button class="d-btn d-btn--primary" type="button" data-action="application-accept" data-id="${application.id}">Accept and enrol</button>`
          : ""
      }
      ${
        application.status !== "Declined"
          ? `<button class="d-btn d-btn--danger" type="button" data-action="application-status" data-id="${application.id}" data-status="Declined">Decline</button>`
          : ""
      }
    </div>`;
}

function participantModal(participant) {
  const rate = attendanceRate(participant);
  return `
    <div class="d-modal__head">
      <div>
        <h2 id="modal-title">${esc(participant.name)}</h2>
        <p>${esc(participant.track)} &middot; joined ${formatDate(participant.joined)}</p>
      </div>
      <button class="d-modal__close" type="button" data-action="close-modal" aria-label="Close">&times;</button>
    </div>
    <div class="d-modal__body">
      <dl class="d-detail">
        <dt>Email</dt><dd>${esc(participant.email)}</dd>
        <dt>Phone</dt><dd>${esc(participant.phone)}</dd>
        <dt>Attendance</dt><dd>${rate === null ? "No past sessions yet" : `${rate}%`}</dd>
        <dt>Cohort</dt>
        <dd>
          <select class="d-status" data-modal-cohort="${participant.id}" aria-label="Cohort for ${esc(participant.name)}">
            <option value="">Not assigned</option>
            ${state.cohorts
              .map(
                (cohort) =>
                  `<option value="${cohort.id}" ${participant.cohortId === cohort.id ? "selected" : ""}>${esc(cohort.name)} &middot; ${esc(cohort.track)}</option>`,
              )
              .join("")}
          </select>
        </dd>
        <dt>Status</dt>
        <dd>
          <select class="d-status" data-modal-status="${participant.id}" aria-label="Status for ${esc(participant.name)}">
            ${PART_STATUSES.map(
              (status) =>
                `<option value="${status}" ${participant.status === status ? "selected" : ""}>${status}</option>`,
            ).join("")}
          </select>
        </dd>
      </dl>
    </div>
    <div class="d-modal__foot">
      <button class="d-btn" type="button" data-action="close-modal">Cancel</button>
      <button class="d-btn d-btn--primary" type="button" data-action="participant-save" data-id="${participant.id}">Save changes</button>
    </div>`;
}

function applicationForm() {
  return `
    <div class="d-modal__head">
      <div>
        <h2 id="modal-title">Add application</h2>
        <p>Creates a new fictional applicant record in this demo.</p>
      </div>
      <button class="d-modal__close" type="button" data-action="close-modal" aria-label="Close">&times;</button>
    </div>
    <form class="d-form" data-form="application-add">
      <div class="d-modal__body">
        <div class="d-form__row">
          <div>
            <label class="d-label" for="app-name">Full name</label>
            <input class="d-input" id="app-name" name="name" required />
          </div>
          <div>
            <label class="d-label" for="app-email">Email</label>
            <input class="d-input" id="app-email" name="email" type="email" required />
          </div>
        </div>
        <div class="d-form__row">
          <div>
            <label class="d-label" for="app-phone">Phone</label>
            <input class="d-input" id="app-phone" name="phone" />
          </div>
          <div>
            <label class="d-label" for="app-track">Track</label>
            <select class="d-input" id="app-track" name="track">
              ${TRACKS.map((track) => `<option>${track}</option>`).join("")}
            </select>
          </div>
        </div>
        <div>
          <label class="d-label" for="app-note">Review note</label>
          <textarea class="d-input" id="app-note" name="note" rows="3"></textarea>
        </div>
      </div>
      <div class="d-modal__foot">
        <button class="d-btn" type="button" data-action="close-modal">Cancel</button>
        <button class="d-btn d-btn--primary" type="submit">Add application</button>
      </div>
    </form>`;
}

function sessionForm(cohortId) {
  const cohort = cohortById(cohortId);
  return `
    <div class="d-modal__head">
      <div>
        <h2 id="modal-title">Add session</h2>
        <p>${esc(cohort?.name || "Cohort")} &middot; ${esc(cohort?.track || "")}</p>
      </div>
      <button class="d-modal__close" type="button" data-action="close-modal" aria-label="Close">&times;</button>
    </div>
    <form class="d-form" data-form="session-add" data-cohort="${cohortId}">
      <div class="d-modal__body">
        <div>
          <label class="d-label" for="session-topic">Session topic</label>
          <input class="d-input" id="session-topic" name="topic" required placeholder="For example: Stock control clinic" />
        </div>
        <div>
          <label class="d-label" for="session-date">Date</label>
          <input class="d-input" id="session-date" name="date" type="date" value="${rel(7)}" required />
        </div>
      </div>
      <div class="d-modal__foot">
        <button class="d-btn" type="button" data-action="close-modal">Cancel</button>
        <button class="d-btn d-btn--primary" type="submit">Add session</button>
      </div>
    </form>`;
}

/* Actions */

function setView(view) {
  ui.view = view;
  if (view === "attendance") {
    const cohort = selectedCohort();
    const session = selectedSession();
    ui.attCohort = cohort?.id || ui.attCohort;
    ui.attSession = session?.id || "";
  }
  render();
}

function acceptApplication(applicationId) {
  const application = applicationById(applicationId);
  if (!application) return;
  application.status = "Accepted";
  if (!state.participants.some((participant) => participant.name === application.name)) {
    const cohort = cohortForTrack(application.track);
    state.participants.push({
      id: makeId("p"),
      name: application.name,
      email: application.email,
      phone: application.phone,
      track: application.track,
      cohortId: cohort?.id || null,
      status: "Onboarding",
      joined: today,
    });
  }
  save();
  closeModal();
  render();
  toast(`${application.name} accepted and added to participants`);
}

function handleClick(event) {
  const trigger = event.target.closest("[data-action]");
  if (!trigger) return;
  const { action } = trigger.dataset;

  if (action === "nav") {
    setView(trigger.dataset.view);
    return;
  }

  if (action === "close-modal") {
    closeModal();
    return;
  }

  if (action === "reset") {
    state = seedData();
    save();
    ui.attCohort = "co1";
    ui.attSession = "";
    render();
    updateBrand();
    toast("Demo data reset");
    return;
  }

  if (action === "application-view") {
    const application = applicationById(trigger.dataset.id);
    if (application) openModal(applicationModal(application));
    return;
  }

  if (action === "application-add") {
    openModal(applicationForm());
    return;
  }

  if (action === "application-status") {
    const application = applicationById(trigger.dataset.id);
    if (!application) return;
    application.status = trigger.dataset.status;
    save();
    closeModal();
    render();
    toast(`Application marked ${application.status.toLowerCase()}`);
    return;
  }

  if (action === "application-accept") {
    acceptApplication(trigger.dataset.id);
    return;
  }

  if (action === "participant-view") {
    const participant = participantById(trigger.dataset.id);
    if (participant) openModal(participantModal(participant));
    return;
  }

  if (action === "participant-save") {
    const participant = participantById(trigger.dataset.id);
    if (!participant) return;
    const cohortSelect = $(`[data-modal-cohort="${participant.id}"]`);
    const statusSelect = $(`[data-modal-status="${participant.id}"]`);
    if (cohortSelect) participant.cohortId = cohortSelect.value || null;
    if (statusSelect) participant.status = statusSelect.value;
    save();
    closeModal();
    render();
    toast("Participant record updated");
    return;
  }

  if (action === "session-add") {
    openModal(sessionForm(trigger.dataset.cohort));
    return;
  }

  if (action === "cohort-attendance") {
    const cohort = cohortById(trigger.dataset.cohort);
    ui.attCohort = cohort?.id || ui.attCohort;
    ui.attSession =
      cohort?.sessions.find((session) => session.date >= today)?.id ||
      cohort?.sessions[0]?.id ||
      "";
    setView("attendance");
    return;
  }

  if (action === "certificate-issue") {
    const participant = participantById(trigger.dataset.id);
    if (!participant || !isEligible(participant)) return;
    state.certificates[participant.id] = today;
    save();
    refreshList();
    toast(`Certificate recorded for ${participant.name}`);
    return;
  }

  if (action === "export-applications") {
    exportCsv(
      "aster-applications-demo.csv",
      ["Name", "Email", "Phone", "Track", "Source", "Received", "Status", "Note"],
      state.applications.map((application) => [
        application.name,
        application.email,
        application.phone,
        application.track,
        application.source,
        application.received,
        application.status,
        application.note,
      ]),
    );
    return;
  }

  if (action === "export-participants") {
    exportCsv(
      "aster-participants-demo.csv",
      ["Name", "Email", "Phone", "Track", "Cohort", "Status", "Joined", "Attendance"],
      state.participants.map((participant) => [
        participant.name,
        participant.email,
        participant.phone,
        participant.track,
        participant.cohortId ? cohortById(participant.cohortId)?.name || "" : "",
        participant.status,
        participant.joined,
        attendanceRate(participant),
      ]),
    );
    return;
  }

  if (action === "export-certificates") {
    exportCsv(
      "aster-certificates-demo.csv",
      ["Name", "Track", "Cohort", "Attendance", "Status", "Eligible", "Issued"],
      state.participants
        .filter((participant) => attendanceRate(participant) !== null)
        .map((participant) => [
          participant.name,
          participant.track,
          participant.cohortId ? cohortById(participant.cohortId)?.name || "" : "",
          attendanceRate(participant),
          participant.status,
          isEligible(participant) ? "Yes" : "No",
          state.certificates[participant.id] || "",
        ]),
    );
    return;
  }

  if (action === "export-attendance") {
    const cohort = cohortById(trigger.dataset.cohort);
    const session = cohort?.sessions.find((item) => item.id === trigger.dataset.session);
    if (!cohort || !session) return;
    exportCsv(
      "aster-attendance-demo.csv",
      ["Session", "Date", "Participant", "Track", "Attendance"],
      state.participants
        .filter((participant) => participant.cohortId === cohort.id)
        .map((participant) => [
          session.topic,
          session.date,
          participant.name,
          participant.track,
          state.attendance[attendanceKey(participant.id, session.id)] || "Not marked",
        ]),
    );
    return;
  }

  if (action === "export-report") {
    exportCsv(
      "aster-programme-report-demo.csv",
      ["Track", "Applications", "Participants", "Average attendance"],
      trackReport().map((item) => [
        item.track,
        item.applications,
        item.participants,
        item.average === null ? "" : item.average,
      ]),
    );
  }
}

function handleInput(event) {
  const field = event.target.closest("[data-filter]");
  if (!field) return;
  const key = field.dataset.filter;
  if (["appQuery", "partQuery"].includes(key)) {
    ui[key] = field.value;
    refreshList();
  }
}

function handleChange(event) {
  const filter = event.target.closest("[data-filter]");
  if (filter) {
    const key = filter.dataset.filter;
    ui[key] = filter.value;
    if (["attCohort", "attSession"].includes(key)) {
      const cohort = selectedCohort();
      const session = selectedSession();
      ui.attCohort = cohort?.id || ui.attCohort;
      ui.attSession = session?.id || "";
      render();
    } else {
      refreshList();
    }
    return;
  }

  const applicationStatus = event.target.closest("[data-application-status]");
  if (applicationStatus) {
    const application = applicationById(applicationStatus.dataset.applicationStatus);
    if (!application) return;
    application.status = applicationStatus.value;
    save();
    toast(`Application marked ${application.status.toLowerCase()}`);
    return;
  }

  const participantStatus = event.target.closest("[data-participant-status]");
  if (participantStatus) {
    const participant = participantById(participantStatus.dataset.participantStatus);
    if (!participant) return;
    participant.status = participantStatus.value;
    save();
    toast(`${participant.name} marked ${participant.status.toLowerCase()}`);
    return;
  }
}

function handleSubmit(event) {
  const form = event.target.closest("[data-form]");
  if (!form) return;
  event.preventDefault();
  const data = new FormData(form);

  if (form.dataset.form === "attendance") {
    const sessionId = form.dataset.session;
    const inputs = $$("input[type=radio]:checked", form);
    inputs.forEach((input) => {
      const participantId = input.name.replace("attendance-", "");
      state.attendance[attendanceKey(participantId, sessionId)] = input.value;
    });
    save();
    render();
    toast("Attendance saved");
    return;
  }

  if (form.dataset.form === "application-add") {
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    if (!name || !email) return;
    state.applications.push({
      id: makeId("a"),
      name,
      email,
      phone: String(data.get("phone") || "").trim(),
      track: String(data.get("track") || TRACKS[0]),
      received: today,
      source: "Manual entry",
      status: "New",
      note: String(data.get("note") || "").trim() || "No note yet.",
    });
    save();
    closeModal();
    render();
    toast("Application added");
    return;
  }

  if (form.dataset.form === "session-add") {
    const cohort = cohortById(form.dataset.cohort);
    const topic = String(data.get("topic") || "").trim();
    const date = String(data.get("date") || "");
    if (!cohort || !topic || !date) return;
    cohort.sessions.push({ id: makeId("s"), date, topic });
    cohort.sessions.sort((a, b) => a.date.localeCompare(b.date));
    save();
    closeModal();
    ui.attCohort = cohort.id;
    ui.attSession = cohort.sessions.find((session) => session.id)?.id || "";
    render();
    toast("Session added");
    return;
  }

  if (form.dataset.form === "settings") {
    state.settings.org = String(data.get("org") || state.settings.org).trim();
    state.settings.programme = String(
      data.get("programme") || state.settings.programme,
    ).trim();
    state.settings.email = String(data.get("email") || "").trim();
    state.settings.passRate = Math.min(
      Math.max(Number(data.get("passRate") || 80), 0),
      100,
    );
    save();
    updateBrand();
    render();
    toast("Settings saved");
  }
}

function exportCsv(filename, headers, rows) {
  const csv = [headers, ...rows]
    .map((row) =>
      row
        .map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`)
        .join(","),
    )
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  toast("CSV downloaded");
}

/* Boot */

document.addEventListener("click", handleClick);
document.addEventListener("input", handleInput);
document.addEventListener("change", handleChange);
document.addEventListener("submit", handleSubmit);

if (modal) {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
}

updateBrand();
try {
  if (!localStorage.getItem(STORAGE_KEY)) save();
} catch (error) {
  /* Storage can be unavailable. The demo still works for this page view. */
}
render();
