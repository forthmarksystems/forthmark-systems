/* Business operations system concept demo.
   Sample data only. State is stored in localStorage on this browser. */

const STORAGE_KEY = "forthmark.ops.demo.v1";

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard" },
  { id: "customers", label: "Customers", icon: "customers" },
  { id: "products", label: "Inventory", icon: "inventory" },
  { id: "orders", label: "Orders", icon: "orders" },
  { id: "tasks", label: "Tasks", icon: "tasks" },
  { id: "reports", label: "Reports", icon: "reports" },
  { id: "settings", label: "Settings", icon: "settings" },
];

const VIEW_META = {
  dashboard: {
    title: "Dashboard",
    subtitle: "Sales, stock and work in progress.",
  },
  customers: {
    title: "Customers",
    subtitle: "Contact records and account history.",
  },
  products: {
    title: "Inventory",
    subtitle: "Products, pricing and stock levels.",
  },
  orders: {
    title: "Orders",
    subtitle: "Sales records and fulfilment status.",
  },
  tasks: {
    title: "Tasks",
    subtitle: "Work assigned to the team, with due dates.",
  },
  reports: {
    title: "Reports",
    subtitle: "Simple operational reporting from the same records.",
  },
  settings: {
    title: "Settings",
    subtitle: "Demo workspace preferences.",
  },
};

const SEGMENTS = ["Retail", "Wholesale", "Events", "Other"];
const CATEGORIES = ["Furniture", "Lighting", "Electrical", "Accessories", "Office"];
const OWNERS = ["Demo Manager", "Sales", "Store", "Ops", "Finance"];
const ORDER_STATUSES = ["Pending", "Processing", "Fulfilled", "Cancelled"];
const PRIORITIES = ["High", "Medium", "Low"];
const CURRENCIES = { NGN: "₦", USD: "$", GBP: "£", EUR: "€" };

const icons = {
  dashboard:
    '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  customers:
    '<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M16 5.5a3 3 0 0 1 0 5.8"/><path d="M18.5 20a5 5 0 0 0-2-3.9"/>',
  inventory:
    '<path d="M21 8 12 3 3 8v8l9 5 9-5Z"/><path d="M3 8l9 5 9-5"/><path d="M12 13v8"/>',
  orders:
    '<circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h3l2.5 12h11L21 7H6"/>',
  tasks:
    '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="m8 12 2.5 2.5L16 9"/>',
  reports:
    '<path d="M4 20V10"/><path d="M10 20V4"/><path d="M16 20v-7"/><path d="M22 20H2"/>',
  settings:
    '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
};

const pad = (n) => String(n).padStart(2, "0");
const isoDate = (d) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

function rel(days) {
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  d.setDate(d.getDate() + days);
  return isoDate(d);
}

function monthsAgo(months, day) {
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  d.setDate(1);
  d.setMonth(d.getMonth() - months);
  const lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  d.setDate(Math.min(day, lastDay));
  return isoDate(d);
}

function seedData() {
  return {
    settings: {
      business: "Northline Supply Co.",
      operationsEmail: "ops@northline.example",
      currency: "NGN",
    },
    customers: [
      {
        id: "c1",
        name: "Adaeze Okafor",
        company: "Halcyon Interiors",
        email: "adaeze@example.com",
        phone: "0800 000 1001",
        segment: "Wholesale",
        since: monthsAgo(14, 8),
      },
      {
        id: "c2",
        name: "Tunde Bello",
        company: "Bello and Co.",
        email: "tunde@example.com",
        phone: "0800 000 1002",
        segment: "Retail",
        since: monthsAgo(9, 19),
      },
      {
        id: "c3",
        name: "Grace Nwosu",
        company: "Nwosu Events",
        email: "grace@example.com",
        phone: "0800 000 1003",
        segment: "Events",
        since: monthsAgo(6, 3),
      },
      {
        id: "c4",
        name: "Musa Ibrahim",
        company: "Northgate Pharmacy",
        email: "musa@example.com",
        phone: "0800 000 1004",
        segment: "Retail",
        since: monthsAgo(18, 21),
      },
      {
        id: "c5",
        name: "Chioma Eze",
        company: "Eze Studios",
        email: "chioma@example.com",
        phone: "0800 000 1005",
        segment: "Wholesale",
        since: monthsAgo(4, 11),
      },
      {
        id: "c6",
        name: "Daniel Adeyemi",
        company: "Adeyemi Logistics",
        email: "daniel@example.com",
        phone: "0800 000 1006",
        segment: "Wholesale",
        since: monthsAgo(22, 5),
      },
      {
        id: "c7",
        name: "Zainab Yusuf",
        company: "ZY Foods",
        email: "zainab@example.com",
        phone: "0800 000 1007",
        segment: "Retail",
        since: monthsAgo(2, 27),
      },
      {
        id: "c8",
        name: "Emeka Obi",
        company: "Obi Electricals",
        email: "emeka@example.com",
        phone: "0800 000 1008",
        segment: "Retail",
        since: monthsAgo(7, 14),
      },
    ],
    products: [
      {
        id: "p1",
        name: "LED Desk Lamp",
        sku: "LGT-101",
        category: "Lighting",
        price: 18500,
        stock: 42,
        reorder: 15,
      },
      {
        id: "p2",
        name: "Ergonomic Chair",
        sku: "FRN-204",
        category: "Furniture",
        price: 95000,
        stock: 8,
        reorder: 10,
      },
      {
        id: "p3",
        name: "Standing Desk",
        sku: "FRN-310",
        category: "Furniture",
        price: 210000,
        stock: 5,
        reorder: 6,
      },
      {
        id: "p4",
        name: "Storage Cabinet",
        sku: "FRN-118",
        category: "Furniture",
        price: 74000,
        stock: 19,
        reorder: 8,
      },
      {
        id: "p5",
        name: "Power Strip",
        sku: "ELC-045",
        category: "Electrical",
        price: 12500,
        stock: 64,
        reorder: 20,
      },
      {
        id: "p6",
        name: "Surge Protector",
        sku: "ELC-052",
        category: "Electrical",
        price: 24500,
        stock: 12,
        reorder: 15,
      },
      {
        id: "p7",
        name: "Cable Organiser",
        sku: "LGT-140",
        category: "Accessories",
        price: 6500,
        stock: 120,
        reorder: 30,
      },
      {
        id: "p8",
        name: "Whiteboard Set",
        sku: "OFF-022",
        category: "Office",
        price: 32000,
        stock: 0,
        reorder: 5,
      },
    ],
    orders: [
      {
        id: "o1",
        number: "ORD-1041",
        customerId: "c1",
        date: rel(-2),
        status: "Processing",
        items: [
          { productId: "p1", qty: 4 },
          { productId: "p5", qty: 2 },
        ],
      },
      {
        id: "o2",
        number: "ORD-1042",
        customerId: "c6",
        date: rel(-4),
        status: "Fulfilled",
        items: [
          { productId: "p2", qty: 2 },
          { productId: "p7", qty: 10 },
        ],
      },
      {
        id: "o3",
        number: "ORD-1043",
        customerId: "c3",
        date: rel(-6),
        status: "Pending",
        items: [
          { productId: "p1", qty: 6 },
          { productId: "p8", qty: 2 },
        ],
      },
      {
        id: "o4",
        number: "ORD-1044",
        customerId: "c2",
        date: rel(-9),
        status: "Fulfilled",
        items: [
          { productId: "p4", qty: 2 },
          { productId: "p6", qty: 3 },
        ],
      },
      {
        id: "o5",
        number: "ORD-1045",
        customerId: "c4",
        date: monthsAgo(1, 18),
        status: "Fulfilled",
        items: [
          { productId: "p5", qty: 8 },
          { productId: "p7", qty: 6 },
        ],
      },
      {
        id: "o6",
        number: "ORD-1046",
        customerId: "c5",
        date: monthsAgo(1, 9),
        status: "Cancelled",
        items: [
          { productId: "p2", qty: 1 },
          { productId: "p3", qty: 1 },
        ],
      },
      {
        id: "o7",
        number: "ORD-1047",
        customerId: "c7",
        date: monthsAgo(2, 22),
        status: "Fulfilled",
        items: [
          { productId: "p1", qty: 10 },
          { productId: "p8", qty: 1 },
        ],
      },
      {
        id: "o8",
        number: "ORD-1048",
        customerId: "c8",
        date: monthsAgo(3, 14),
        status: "Fulfilled",
        items: [
          { productId: "p6", qty: 4 },
          { productId: "p5", qty: 4 },
        ],
      },
      {
        id: "o9",
        number: "ORD-1049",
        customerId: "c2",
        date: monthsAgo(4, 20),
        status: "Cancelled",
        items: [
          { productId: "p4", qty: 1 },
          { productId: "p1", qty: 2 },
        ],
      },
      {
        id: "o10",
        number: "ORD-1050",
        customerId: "c1",
        date: monthsAgo(5, 11),
        status: "Fulfilled",
        items: [
          { productId: "p2", qty: 3 },
          { productId: "p7", qty: 8 },
        ],
      },
    ],
    tasks: [
      {
        id: "t1",
        title: "Follow up on the Halcyon Interiors quote",
        owner: "Demo Manager",
        due: rel(1),
        priority: "High",
        done: false,
      },
      {
        id: "t2",
        title: "Restock surge protectors before the next dispatch",
        owner: "Store",
        due: rel(2),
        priority: "High",
        done: false,
      },
      {
        id: "t3",
        title: "Confirm delivery slot for ORD-1042",
        owner: "Ops",
        due: rel(0),
        priority: "Medium",
        done: false,
      },
      {
        id: "t4",
        title: "Update the wholesale price list",
        owner: "Demo Manager",
        due: rel(5),
        priority: "Low",
        done: false,
      },
      {
        id: "t5",
        title: "Call ZY Foods about a repeat order",
        owner: "Sales",
        due: rel(3),
        priority: "Medium",
        done: false,
      },
      {
        id: "t6",
        title: "Reconcile cancelled order ORD-1037",
        owner: "Finance",
        due: rel(-1),
        priority: "High",
        done: false,
      },
      {
        id: "t7",
        title: "Prepare the weekly stock summary",
        owner: "Ops",
        due: rel(6),
        priority: "Low",
        done: true,
      },
    ],
  };
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.customers) && parsed.settings) {
        return parsed;
      }
    }
  } catch (error) {
    /* Storage can be unavailable. The demo will still run in memory. */
  }
  const fresh = seedData();
  store(fresh);
  return fresh;
}

function store(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    /* Ignore storage failures. */
  }
}

let state = load();
let ui = {
  view: "dashboard",
  customerQuery: "",
  customerSegment: "all",
  productQuery: "",
  productCategory: "all",
  orderQuery: "",
  orderStatus: "all",
  taskOwner: "all",
  taskStatus: "open",
};

const $ = (selector, root = document) => root.querySelector(selector);

function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function money(value) {
  const symbol = CURRENCIES[state.settings.currency] || "₦";
  return symbol + Number(value || 0).toLocaleString("en-NG");
}

function shortMoney(value) {
  if (value >= 1000000) return (value / 1000000).toFixed(1) + "m";
  if (value >= 1000) return Math.round(value / 1000) + "k";
  return String(Math.round(value));
}

function formatDate(value) {
  if (!value) return "Not set";
  const date = new Date(value + "T12:00:00");
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function daysUntil(value) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = new Date(value + "T00:00:00");
  return Math.round((date - today) / 86400000);
}

function dueLabel(value) {
  const diff = daysUntil(value);
  if (diff === 0) return "Due today";
  if (diff === 1) return "Due tomorrow";
  if (diff < 0) {
    const n = Math.abs(diff);
    return `Overdue by ${n} day${n === 1 ? "" : "s"}`;
  }
  if (diff <= 7) return `Due in ${diff} days`;
  return `Due ${formatDate(value)}`;
}

function currentMonthKey() {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
}

function orderTotal(order) {
  return order.items.reduce((total, item) => {
    const product = state.products.find((p) => p.id === item.productId);
    return total + (product ? product.price * item.qty : 0);
  }, 0);
}

function orderUnits(order) {
  return order.items.reduce((total, item) => total + item.qty, 0);
}

function customerName(id) {
  const customer = state.customers.find((c) => c.id === id);
  return customer ? customer.name : "Unknown customer";
}

function customerCompany(id) {
  const customer = state.customers.find((c) => c.id === id);
  return customer ? customer.company : "";
}

const STATUS_CLASS = {
  Pending: "amber",
  Processing: "blue",
  Fulfilled: "green",
  Cancelled: "red",
  High: "red",
  Medium: "amber",
  Low: "gray",
};

function badge(label, tone) {
  return `<span class="d-badge d-badge--${tone}">${esc(label)}</span>`;
}

function statusBadge(status) {
  return badge(status, STATUS_CLASS[status] || "gray");
}

function productStatus(product) {
  if (product.stock <= 0) return badge("Out of stock", "red");
  if (product.stock <= product.reorder) return badge("Low stock", "amber");
  return badge("In stock", "green");
}

function icon(name) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || ""}</svg>`;
}

let toastTimer;

function toast(message) {
  const el = $("#toast");
  if (!el) return;
  el.textContent = message;
  el.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("is-visible"), 2400);
}

function updateBrand() {
  const el = $("#brand-name");
  if (el) {
    el.innerHTML = `${esc(state.settings.business)}<small>Demo workspace</small>`;
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

/* Views */

function dashboardView() {
  const monthKey = currentMonthKey();
  const monthOrders = state.orders.filter(
    (order) => order.date.startsWith(monthKey) && order.status !== "Cancelled",
  );
  const revenue = monthOrders.reduce((sum, order) => sum + orderTotal(order), 0);
  const openOrders = state.orders.filter(
    (order) => order.status === "Pending" || order.status === "Processing",
  );
  const pending = state.orders.filter((o) => o.status === "Pending").length;
  const processing = state.orders.filter((o) => o.status === "Processing").length;
  const lowStock = state.products
    .filter((product) => product.stock <= product.reorder)
    .sort((a, b) => a.stock / Math.max(a.reorder, 1) - b.stock / Math.max(b.reorder, 1));
  const dueTasks = state.tasks
    .filter((task) => !task.done && daysUntil(task.due) <= 7)
    .sort((a, b) => a.due.localeCompare(b.due));
  const overdue = dueTasks.filter((task) => daysUntil(task.due) < 0).length;
  const recent = [...state.orders]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);
  const monthLabel = new Date().toLocaleDateString("en-GB", { month: "long" });

  const chart = revenueChart();

  return `
    <div class="d-grid d-grid--4">
      <div class="d-kpi">
        <p class="d-kpi__label">Revenue, ${esc(monthLabel)}</p>
        <div class="d-kpi__value">${money(revenue)}</div>
        <p class="d-kpi__sub">${monthOrders.length} orders this month</p>
      </div>
      <div class="d-kpi">
        <p class="d-kpi__label">Open orders</p>
        <div class="d-kpi__value">${openOrders.length}</div>
        <p class="d-kpi__sub">${pending} pending, ${processing} processing</p>
      </div>
      <div class="d-kpi">
        <p class="d-kpi__label">Low stock</p>
        <div class="d-kpi__value">${lowStock.length}</div>
        <p class="d-kpi__sub">At or below reorder level</p>
      </div>
      <div class="d-kpi">
        <p class="d-kpi__label">Tasks due</p>
        <div class="d-kpi__value">${dueTasks.length}</div>
        <p class="d-kpi__sub">${overdue} overdue, next 7 days</p>
      </div>
    </div>

    <div class="d-grid d-grid--2">
      <div class="d-card">
        <div class="d-card__head">
          <h2>Revenue, last 6 months</h2>
          <span class="d-mono d-muted">${state.settings.currency}</span>
        </div>
        ${chart}
      </div>

      <div class="d-card">
        <div class="d-card__head">
          <h2>Recent orders</h2>
          <button class="d-card__link" data-action="nav" data-view="orders">View all</button>
        </div>
        <div class="d-table-wrap">
          <table class="d-table">
            <caption class="d-sr-only">Five most recent orders</caption>
            <thead>
              <tr><th scope="col">Order</th><th scope="col">Customer</th><th scope="col" class="d-right">Total</th><th scope="col">Status</th></tr>
            </thead>
            <tbody>
              ${recent
                .map(
                  (order) => `
                <tr>
                  <td class="d-strong d-nowrap">${esc(order.number)}</td>
                  <td>${esc(customerName(order.customerId))}</td>
                  <td class="d-right d-nowrap">${money(orderTotal(order))}</td>
                  <td>${statusBadge(order.status)}</td>
                </tr>`,
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="d-grid d-grid--2">
      <div class="d-card">
        <div class="d-card__head">
          <h2>Stock attention</h2>
          <button class="d-card__link" data-action="nav" data-view="products">Inventory</button>
        </div>
        <div class="d-list">
          ${
            lowStock.length
              ? lowStock
                  .slice(0, 4)
                  .map(
                    (product) => `
                <div class="d-list__row">
                  <div class="d-list__main">
                    <strong>${esc(product.name)}</strong>
                    <span>${product.stock} in stock, reorder at ${product.reorder}</span>
                  </div>
                  ${productStatus(product)}
                </div>`,
                  )
                  .join("")
              : '<p class="d-empty">Everything is above reorder level.</p>'
          }
        </div>
      </div>

      <div class="d-card">
        <div class="d-card__head">
          <h2>Tasks due soon</h2>
          <button class="d-card__link" data-action="nav" data-view="tasks">All tasks</button>
        </div>
        <div class="d-list">
          ${
            dueTasks.length
              ? dueTasks
                  .slice(0, 4)
                  .map(
                    (task) => `
                <div class="d-list__row">
                  <label class="d-check">
                    <input type="checkbox" data-task-toggle="${task.id}" aria-label="Mark ${esc(task.title)} complete" />
                  </label>
                  <div class="d-list__main">
                    <strong>${esc(task.title)}</strong>
                    <span>${esc(task.owner)} &middot; ${dueLabel(task.due)}</span>
                  </div>
                  ${badge(task.priority, STATUS_CLASS[task.priority])}
                </div>`,
                  )
                  .join("")
              : '<p class="d-empty">No tasks due in the next seven days.</p>'
          }
        </div>
      </div>
    </div>
  `;
}

function revenueChart() {
  const months = [];
  const now = new Date();
  now.setDate(1);
  for (let i = 5; i >= 0; i -= 1) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      key: `${d.getFullYear()}-${pad(d.getMonth() + 1)}`,
      label: d.toLocaleDateString("en-GB", { month: "short" }),
      value: 0,
    });
  }
  state.orders.forEach((order) => {
    if (order.status === "Cancelled") return;
    const month = months.find((m) => order.date.startsWith(m.key));
    if (month) month.value += orderTotal(order);
  });
  const max = Math.max(...months.map((m) => m.value), 1);
  return `<div class="d-chart" role="img" aria-label="Revenue for the last six months: ${months
    .map((m) => `${m.label} ${money(m.value)}`)
    .join(", ")}">
    ${months
      .map(
        (m) => `
      <div class="d-chart__col" title="${m.label}: ${money(m.value)}">
        <span class="d-chart__value">${shortMoney(m.value)}</span>
        <span class="d-chart__bar" style="height:${Math.max(
          Math.round((m.value / max) * 100),
          m.value ? 4 : 1,
        )}%"></span>
        <span class="d-chart__label">${m.label}</span>
      </div>`,
      )
      .join("")}
  </div>`;
}

function customerRows() {
  const query = ui.customerQuery.trim().toLowerCase();
  const rows = state.customers.filter((customer) => {
    const matchesQuery =
      !query ||
      [customer.name, customer.company, customer.email, customer.phone]
        .join(" ")
        .toLowerCase()
        .includes(query);
    const matchesSegment =
      ui.customerSegment === "all" || customer.segment === ui.customerSegment;
    return matchesQuery && matchesSegment;
  });

  if (!rows.length) {
    return '<p class="d-empty">No customers match these filters.</p>';
  }

  return `
    <div class="d-table-wrap">
      <table class="d-table">
        <caption class="d-sr-only">Customer records</caption>
        <thead>
          <tr>
            <th scope="col">Customer</th>
            <th scope="col">Contact</th>
            <th scope="col">Segment</th>
            <th scope="col" class="d-right">Orders</th>
            <th scope="col">Since</th>
            <th scope="col"><span class="d-sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody>
          ${rows
            .map((customer) => {
              const orders = state.orders.filter(
                (order) => order.customerId === customer.id,
              ).length;
              return `
              <tr>
                <td>
                  <div class="d-strong">${esc(customer.name)}</div>
                  <div class="d-sub">${esc(customer.company)}</div>
                </td>
                <td>
                  <div>${esc(customer.email)}</div>
                  <div class="d-sub">${esc(customer.phone)}</div>
                </td>
                <td>${badge(customer.segment, "gray")}</td>
                <td class="d-right">${orders}</td>
                <td class="d-nowrap">${formatDate(customer.since)}</td>
                <td class="d-right">
                  <button class="d-btn d-btn--sm" data-action="customer-view" data-id="${customer.id}">View</button>
                </td>
              </tr>`;
            })
            .join("")}
        </tbody>
      </table>
    </div>`;
}

function customersView() {
  return `
    <div class="d-toolbar">
      <div class="d-search">
        ${icon("search")}
        <input class="d-input" type="search" data-filter="customerQuery" value="${esc(ui.customerQuery)}" placeholder="Search customers or companies" aria-label="Search customers or companies" />
      </div>
      <select class="d-select" data-filter="customerSegment" aria-label="Filter customers by segment">
        <option value="all">All segments</option>
        ${SEGMENTS.map(
          (segment) =>
            `<option value="${segment}" ${ui.customerSegment === segment ? "selected" : ""}>${segment}</option>`,
        ).join("")}
      </select>
      <span class="d-toolbar__spacer"></span>
      <button class="d-btn d-btn--primary" data-action="customer-add">Add customer</button>
    </div>
    <div id="customers-body">${customerRows()}</div>
  `;
}

function productRows() {
  const query = ui.productQuery.trim().toLowerCase();
  const rows = state.products.filter((product) => {
    const matchesQuery =
      !query ||
      [product.name, product.sku, product.category]
        .join(" ")
        .toLowerCase()
        .includes(query);
    const matchesCategory =
      ui.productCategory === "all" || product.category === ui.productCategory;
    return matchesQuery && matchesCategory;
  });

  if (!rows.length) {
    return '<p class="d-empty">No products match these filters.</p>';
  }

  return `
    <div class="d-table-wrap">
      <table class="d-table">
        <caption class="d-sr-only">Product and stock records</caption>
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Category</th>
            <th scope="col" class="d-right">Price</th>
            <th scope="col" class="d-right">Stock</th>
            <th scope="col">Status</th>
            <th scope="col"><span class="d-sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody>
          ${rows
            .map(
              (product) => `
              <tr>
                <td>
                  <div class="d-strong">${esc(product.name)}</div>
                  <div class="d-sub">${esc(product.sku)}</div>
                </td>
                <td>${esc(product.category)}</td>
                <td class="d-right d-nowrap">${money(product.price)}</td>
                <td class="d-right">
                  <div class="d-strong">${product.stock}</div>
                  <div class="d-sub">reorder ${product.reorder}</div>
                </td>
                <td>${productStatus(product)}</td>
                <td class="d-right d-nowrap">
                  <button class="d-btn d-btn--icon" data-action="stock" data-id="${product.id}" data-delta="-1" aria-label="Reduce stock for ${esc(product.name)}">&minus;</button>
                  <button class="d-btn d-btn--icon" data-action="stock" data-id="${product.id}" data-delta="1" aria-label="Increase stock for ${esc(product.name)}">+</button>
                  <button class="d-btn d-btn--sm" data-action="product-edit" data-id="${product.id}">Edit</button>
                </td>
              </tr>`,
            )
            .join("")}
        </tbody>
      </table>
    </div>`;
}

function productsView() {
  return `
    <div class="d-toolbar">
      <div class="d-search">
        ${icon("search")}
        <input class="d-input" type="search" data-filter="productQuery" value="${esc(ui.productQuery)}" placeholder="Search products or SKU" aria-label="Search products or SKU" />
      </div>
      <select class="d-select" data-filter="productCategory" aria-label="Filter products by category">
        <option value="all">All categories</option>
        ${CATEGORIES.map(
          (category) =>
            `<option value="${category}" ${ui.productCategory === category ? "selected" : ""}>${category}</option>`,
        ).join("")}
      </select>
      <span class="d-toolbar__spacer"></span>
      <button class="d-btn d-btn--primary" data-action="product-add">Add product</button>
    </div>
    <div id="products-body">${productRows()}</div>
  `;
}

function orderRows() {
  const query = ui.orderQuery.trim().toLowerCase();
  const rows = state.orders
    .filter((order) => {
      const matchesQuery =
        !query ||
        [order.number, customerName(order.customerId), customerCompany(order.customerId)]
          .join(" ")
          .toLowerCase()
          .includes(query);
      const matchesStatus =
        ui.orderStatus === "all" || order.status === ui.orderStatus;
      return matchesQuery && matchesStatus;
    })
    .sort((a, b) => b.date.localeCompare(a.date));

  if (!rows.length) {
    return '<p class="d-empty">No orders match these filters.</p>';
  }

  return `
    <div class="d-table-wrap">
      <table class="d-table">
        <caption class="d-sr-only">Order records</caption>
        <thead>
          <tr>
            <th scope="col">Order</th>
            <th scope="col">Customer</th>
            <th scope="col">Date</th>
            <th scope="col" class="d-right">Items</th>
            <th scope="col" class="d-right">Total</th>
            <th scope="col">Status</th>
            <th scope="col"><span class="d-sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody>
          ${rows
            .map(
              (order) => `
              <tr>
                <td class="d-strong d-nowrap">${esc(order.number)}</td>
                <td>
                  <div>${esc(customerName(order.customerId))}</div>
                  <div class="d-sub">${esc(customerCompany(order.customerId))}</div>
                </td>
                <td class="d-nowrap">${formatDate(order.date)}</td>
                <td class="d-right">${orderUnits(order)}</td>
                <td class="d-right d-nowrap">${money(orderTotal(order))}</td>
                <td>
                  <select class="d-status" data-order-status="${order.id}" aria-label="Status for ${esc(order.number)}">
                    ${ORDER_STATUSES.map(
                      (status) =>
                        `<option value="${status}" ${order.status === status ? "selected" : ""}>${status}</option>`,
                    ).join("")}
                  </select>
                </td>
                <td class="d-right">
                  <button class="d-btn d-btn--sm" data-action="order-view" data-id="${order.id}">View</button>
                </td>
              </tr>`,
            )
            .join("")}
        </tbody>
      </table>
    </div>`;
}

function ordersView() {
  return `
    <div class="d-toolbar">
      <div class="d-search">
        ${icon("search")}
        <input class="d-input" type="search" data-filter="orderQuery" value="${esc(ui.orderQuery)}" placeholder="Search order or customer" aria-label="Search orders or customers" />
      </div>
      <select class="d-select" data-filter="orderStatus" aria-label="Filter orders by status">
        <option value="all">All statuses</option>
        ${ORDER_STATUSES.map(
          (status) =>
            `<option value="${status}" ${ui.orderStatus === status ? "selected" : ""}>${status}</option>`,
        ).join("")}
      </select>
      <span class="d-toolbar__spacer"></span>
      <button class="d-btn" data-action="export-orders">Export CSV</button>
    </div>
    <div id="orders-body">${orderRows()}</div>
  `;
}

function taskRows() {
  const rows = state.tasks
    .filter((task) => {
      const matchesOwner = ui.taskOwner === "all" || task.owner === ui.taskOwner;
      const matchesStatus =
        ui.taskStatus === "all" ||
        (ui.taskStatus === "open" && !task.done) ||
        (ui.taskStatus === "done" && task.done);
      return matchesOwner && matchesStatus;
    })
    .sort((a, b) => {
      if (a.done !== b.done) return a.done ? 1 : -1;
      return a.due.localeCompare(b.due);
    });

  if (!rows.length) {
    return '<p class="d-empty">No tasks match these filters.</p>';
  }

  return `
    <div class="d-stack">
      ${rows
        .map(
          (task) => `
        <div class="d-task ${task.done ? "is-done" : ""}">
          <label class="d-check">
            <input type="checkbox" data-task-toggle="${task.id}" ${task.done ? "checked" : ""} aria-label="Mark ${esc(task.title)} ${task.done ? "incomplete" : "complete"}" />
          </label>
          <div class="d-list__main">
            <div class="d-task__title">${esc(task.title)}</div>
            <div class="d-task__meta">
              <span>${esc(task.owner)}</span>
              <span class="${!task.done && daysUntil(task.due) < 0 ? "d-badge d-badge--red" : ""}">${dueLabel(task.due)}</span>
              ${badge(task.priority, STATUS_CLASS[task.priority])}
            </div>
          </div>
        </div>`,
        )
        .join("")}
    </div>`;
}

function tasksView() {
  return `
    <div class="d-toolbar">
      <select class="d-select" data-filter="taskOwner" aria-label="Filter tasks by owner">
        <option value="all">All owners</option>
        ${OWNERS.map(
          (owner) =>
            `<option value="${owner}" ${ui.taskOwner === owner ? "selected" : ""}>${owner}</option>`,
        ).join("")}
      </select>
      <select class="d-select" data-filter="taskStatus" aria-label="Filter tasks by status">
        <option value="open" ${ui.taskStatus === "open" ? "selected" : ""}>Open tasks</option>
        <option value="all" ${ui.taskStatus === "all" ? "selected" : ""}>All tasks</option>
        <option value="done" ${ui.taskStatus === "done" ? "selected" : ""}>Completed</option>
      </select>
      <span class="d-toolbar__spacer"></span>
      <button class="d-btn d-btn--primary" data-action="task-add">Add task</button>
    </div>
    <div id="tasks-body">${taskRows()}</div>
  `;
}

function reportsView() {
  const statusCounts = ORDER_STATUSES.map((status) => ({
    status,
    count: state.orders.filter((order) => order.status === status).length,
  }));
  const totalOrders = state.orders.length || 1;

  const productStats = state.products
    .map((product) => {
      let units = 0;
      let revenue = 0;
      state.orders.forEach((order) => {
        if (order.status === "Cancelled") return;
        order.items.forEach((item) => {
          if (item.productId === product.id) {
            units += item.qty;
            revenue += item.qty * product.price;
          }
        });
      });
      return { product, units, revenue };
    })
    .filter((row) => row.units > 0)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  const segmentCounts = SEGMENTS.map((segment) => ({
    segment,
    count: state.customers.filter((customer) => customer.segment === segment).length,
  }));

  const revenue = state.orders
    .filter((order) => order.status !== "Cancelled")
    .reduce((sum, order) => sum + orderTotal(order), 0);
  const average = state.orders.length ? revenue / state.orders.length : 0;

  return `
    <div class="d-grid d-grid--2">
      <div class="d-card">
        <div class="d-card__head">
          <h2>Revenue, last 6 months</h2>
          <span class="d-mono d-muted">${state.settings.currency}</span>
        </div>
        ${revenueChart()}
      </div>
      <div class="d-card">
        <div class="d-card__head"><h2>Summary</h2></div>
        <div class="d-grid d-grid--2">
          <div class="d-kpi">
            <p class="d-kpi__label">Recorded revenue</p>
            <div class="d-kpi__value">${money(revenue)}</div>
            <p class="d-kpi__sub">Excludes cancelled orders</p>
          </div>
          <div class="d-kpi">
            <p class="d-kpi__label">Average order</p>
            <div class="d-kpi__value">${money(average)}</div>
            <p class="d-kpi__sub">${state.orders.length} orders on record</p>
          </div>
        </div>
        <div class="d-card__head" style="margin-top:1rem;margin-bottom:0.5rem"><h2>Order status</h2></div>
        ${statusCounts
          .map(
            (row) => `
          <div style="margin-top:0.5rem">
            <div style="display:flex;justify-content:space-between;font-size:0.72rem;margin-bottom:0.24rem">
              <span>${row.status}</span><span class="d-muted">${row.count}</span>
            </div>
            <div class="d-meter"><span style="width:${Math.round(
              (row.count / totalOrders) * 100,
            )}%"></span></div>
          </div>`,
          )
          .join("")}
      </div>
    </div>

    <div class="d-grid d-grid--2">
      <div class="d-card">
        <div class="d-card__head">
          <h2>Top products by revenue</h2>
          <span class="d-mono d-muted">Excludes cancelled</span>
        </div>
        <div class="d-table-wrap">
          <table class="d-table">
            <caption class="d-sr-only">Top products by revenue</caption>
            <thead><tr><th scope="col">Product</th><th scope="col" class="d-right">Units</th><th scope="col" class="d-right">Revenue</th></tr></thead>
            <tbody>
              ${productStats
                .map(
                  (row) => `
                <tr>
                  <td class="d-strong">${esc(row.product.name)}</td>
                  <td class="d-right">${row.units}</td>
                  <td class="d-right d-nowrap">${money(row.revenue)}</td>
                </tr>`,
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </div>

      <div class="d-card">
        <div class="d-card__head"><h2>Customer segments</h2></div>
        <div class="d-list">
          ${segmentCounts
            .map(
              (row) => `
            <div class="d-list__row">
              <div class="d-list__main"><strong>${row.segment}</strong></div>
              <span class="d-mono d-muted">${row.count}</span>
            </div>`,
            )
            .join("")}
        </div>
        <div class="d-card__head" style="margin-top:1rem;margin-bottom:0.5rem"><h2>Export</h2></div>
        <p class="d-muted" style="font-size:0.78rem;margin:0 0 0.6rem">Download the current order records as a CSV file. Sample data only.</p>
        <button class="d-btn" data-action="export-orders">Export orders CSV</button>
      </div>
    </div>
  `;
}

function settingsView() {
  return `
    <div class="d-grid d-grid--2">
      <form class="d-card d-form" data-form="settings">
        <div class="d-card__head"><h2>Workspace</h2></div>
        <label class="d-label">Business name
          <input class="d-input" name="business" value="${esc(state.settings.business)}" required maxlength="60" />
        </label>
        <label class="d-label">Operations email
          <input class="d-input" type="email" name="operationsEmail" value="${esc(state.settings.operationsEmail)}" required />
        </label>
        <label class="d-label">Currency label
          <select class="d-select" name="currency">
            ${Object.keys(CURRENCIES)
              .map(
                (code) =>
                  `<option value="${code}" ${state.settings.currency === code ? "selected" : ""}>${code} (${CURRENCIES[code]})</option>`,
              )
              .join("")}
          </select>
        </label>
        <p class="d-muted" style="font-size:0.72rem;margin:0">The currency label changes symbols only. Values are not converted.</p>
        <div>
          <button class="d-btn d-btn--primary" type="submit">Save settings</button>
        </div>
      </form>

      <div class="d-card">
        <div class="d-card__head"><h2>About this demo</h2></div>
        <p class="d-muted" style="font-size:0.82rem">
          This is a concept demonstration built by Forthmark Systems. It is not a
          client deployment and it is not connected to a live database, payment
          provider or email service.
        </p>
        <p class="d-muted" style="font-size:0.82rem;margin-top:0.6rem">
          Changes are saved in this browser only. Resetting replaces them with the
          original sample data.
        </p>
        <div class="d-card__head" style="margin-top:1rem;margin-bottom:0.5rem"><h2>Demo data</h2></div>
        <p class="d-muted" style="font-size:0.78rem;margin-bottom:0.6rem">
          ${state.customers.length} customers, ${state.products.length} products,
          ${state.orders.length} orders and ${state.tasks.length} tasks.
        </p>
        <button class="d-btn d-btn--danger" data-action="reset">Reset demo data</button>
      </div>
    </div>
  `;
}

const views = {
  dashboard: dashboardView,
  customers: customersView,
  products: productsView,
  orders: ordersView,
  tasks: tasksView,
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
  const map = {
    customers: () => {
      const el = $("#customers-body");
      if (el) el.innerHTML = customerRows();
    },
    products: () => {
      const el = $("#products-body");
      if (el) el.innerHTML = productRows();
    },
    orders: () => {
      const el = $("#orders-body");
      if (el) el.innerHTML = orderRows();
    },
    tasks: () => {
      const el = $("#tasks-body");
      if (el) el.innerHTML = taskRows();
    },
  };
  return map;
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

function customerModal(customer) {
  const orders = state.orders
    .filter((order) => order.customerId === customer.id)
    .sort((a, b) => b.date.localeCompare(a.date));
  return `
    <div class="d-modal__head">
      <div>
        <h2 id="modal-title">${esc(customer.name)}</h2>
        <p>${esc(customer.company)} &middot; ${esc(customer.segment)}</p>
      </div>
      <button class="d-modal__close" type="button" data-action="close-modal" aria-label="Close">&times;</button>
    </div>
    <div class="d-modal__body">
      <dl class="d-detail">
        <dt>Email</dt><dd>${esc(customer.email)}</dd>
        <dt>Phone</dt><dd>${esc(customer.phone)}</dd>
        <dt>Customer since</dt><dd>${formatDate(customer.since)}</dd>
        <dt>Orders</dt><dd>${orders.length}</dd>
      </dl>
      <div class="d-card__head" style="margin-top:1.1rem;margin-bottom:0.4rem"><h2>Recent orders</h2></div>
      <div class="d-list">
        ${
          orders.length
            ? orders
                .slice(0, 4)
                .map(
                  (order) => `
              <div class="d-list__row">
                <div class="d-list__main">
                  <strong>${esc(order.number)}</strong>
                  <span>${formatDate(order.date)} &middot; ${money(orderTotal(order))}</span>
                </div>
                ${statusBadge(order.status)}
              </div>`,
                )
                .join("")
            : '<p class="d-empty">No orders recorded for this customer.</p>'
        }
      </div>
    </div>
    <div class="d-modal__foot">
      <button class="d-btn" type="button" data-action="close-modal">Close</button>
    </div>`;
}

function orderModal(order) {
  return `
    <div class="d-modal__head">
      <div>
        <h2 id="modal-title">${esc(order.number)}</h2>
        <p>${esc(customerName(order.customerId))} &middot; ${formatDate(order.date)}</p>
      </div>
      <button class="d-modal__close" type="button" data-action="close-modal" aria-label="Close">&times;</button>
    </div>
    <div class="d-modal__body">
      <div style="margin-bottom:0.8rem">${statusBadge(order.status)}</div>
      <div class="d-table-wrap">
        <table class="d-table">
          <caption class="d-sr-only">Items in order ${esc(order.number)}</caption>
          <thead><tr><th scope="col">Item</th><th scope="col" class="d-right">Qty</th><th scope="col" class="d-right">Unit</th><th scope="col" class="d-right">Total</th></tr></thead>
          <tbody>
            ${order.items
              .map((item) => {
                const product = state.products.find((p) => p.id === item.productId);
                if (!product) return "";
                return `<tr>
                  <td>${esc(product.name)}</td>
                  <td class="d-right">${item.qty}</td>
                  <td class="d-right d-nowrap">${money(product.price)}</td>
                  <td class="d-right d-nowrap">${money(product.price * item.qty)}</td>
                </tr>`;
              })
              .join("")}
          </tbody>
        </table>
      </div>
      <div style="display:flex;justify-content:space-between;margin-top:1rem;font-weight:600">
        <span>Order total</span><span>${money(orderTotal(order))}</span>
      </div>
    </div>
    <div class="d-modal__foot">
      <button class="d-btn" type="button" data-action="close-modal">Close</button>
    </div>`;
}

function customerForm() {
  return `
    <div class="d-modal__head">
      <div><h2 id="modal-title">Add customer</h2><p>Sample record for this demo.</p></div>
      <button class="d-modal__close" type="button" data-action="close-modal" aria-label="Close">&times;</button>
    </div>
    <form data-form="customer">
      <div class="d-modal__body">
        <div class="d-form__fields">
          <div class="d-form__row">
            <label class="d-label">Full name<input class="d-input" name="name" required maxlength="70" /></label>
            <label class="d-label">Company<input class="d-input" name="company" required maxlength="70" /></label>
          </div>
          <div class="d-form__row">
            <label class="d-label">Email<input class="d-input" type="email" name="email" required /></label>
            <label class="d-label">Phone<input class="d-input" name="phone" required maxlength="30" /></label>
          </div>
          <label class="d-label">Segment
            <select class="d-select" name="segment">${SEGMENTS.map((s) => `<option>${s}</option>`).join("")}</select>
          </label>
        </div>
      </div>
      <div class="d-modal__foot">
        <button class="d-btn" type="button" data-action="close-modal">Cancel</button>
        <button class="d-btn d-btn--primary" type="submit">Add customer</button>
      </div>
    </form>`;
}

function productForm(product) {
  const editing = Boolean(product);
  const value = product || {
    name: "",
    sku: "",
    category: "Furniture",
    price: "",
    stock: 0,
    reorder: 5,
  };
  return `
    <div class="d-modal__head">
      <div><h2 id="modal-title">${editing ? "Edit product" : "Add product"}</h2><p>Inventory records update immediately in this demo.</p></div>
      <button class="d-modal__close" type="button" data-action="close-modal" aria-label="Close">&times;</button>
    </div>
    <form data-form="product">
      <div class="d-modal__body">
        <div class="d-form__fields">
          <input type="hidden" name="id" value="${editing ? product.id : ""}" />
          <div class="d-form__row">
            <label class="d-label">Product name<input class="d-input" name="name" value="${esc(value.name)}" required maxlength="70" /></label>
            <label class="d-label">SKU<input class="d-input" name="sku" value="${esc(value.sku)}" required maxlength="20" /></label>
          </div>
          <div class="d-form__row">
            <label class="d-label">Category
              <select class="d-select" name="category">${CATEGORIES.map(
                (c) =>
                  `<option ${value.category === c ? "selected" : ""}>${c}</option>`,
              ).join("")}</select>
            </label>
            <label class="d-label">Unit price (${state.settings.currency})<input class="d-input" type="number" name="price" min="0" step="100" value="${value.price}" required /></label>
          </div>
          <div class="d-form__row">
            <label class="d-label">Stock on hand<input class="d-input" type="number" name="stock" min="0" step="1" value="${value.stock}" required /></label>
            <label class="d-label">Reorder level<input class="d-input" type="number" name="reorder" min="0" step="1" value="${value.reorder}" required /></label>
          </div>
        </div>
      </div>
      <div class="d-modal__foot">
        <button class="d-btn" type="button" data-action="close-modal">Cancel</button>
        <button class="d-btn d-btn--primary" type="submit">${editing ? "Save product" : "Add product"}</button>
      </div>
    </form>`;
}

function taskForm() {
  return `
    <div class="d-modal__head">
      <div><h2 id="modal-title">Add task</h2><p>Assign work and set a due date.</p></div>
      <button class="d-modal__close" type="button" data-action="close-modal" aria-label="Close">&times;</button>
    </div>
    <form data-form="task">
      <div class="d-modal__body">
        <div class="d-form__fields">
          <label class="d-label">Task title<input class="d-input" name="title" required maxlength="100" /></label>
          <div class="d-form__row">
            <label class="d-label">Owner
              <select class="d-select" name="owner">${OWNERS.map((o) => `<option>${o}</option>`).join("")}</select>
            </label>
            <label class="d-label">Due date<input class="d-input" type="date" name="due" value="${rel(3)}" required /></label>
          </div>
          <label class="d-label">Priority
            <select class="d-select" name="priority">${PRIORITIES.map((p) => `<option ${p === "Medium" ? "selected" : ""}>${p}</option>`).join("")}</select>
          </label>
        </div>
      </div>
      <div class="d-modal__foot">
        <button class="d-btn" type="button" data-action="close-modal">Cancel</button>
        <button class="d-btn d-btn--primary" type="submit">Add task</button>
      </div>
    </form>`;
}

/* Actions */

function handleClick(event) {
  const trigger = event.target.closest("[data-action]");
  if (!trigger) return;
  const action = trigger.dataset.action;

  if (action === "nav") {
    ui.view = trigger.dataset.view;
    render();
    window.scrollTo({ top: 0, behavior: "auto" });
    return;
  }

  if (action === "close-modal") {
    closeModal();
    return;
  }

  if (action === "customer-add") {
    openModal(customerForm());
    return;
  }

  if (action === "customer-view") {
    const customer = state.customers.find((c) => c.id === trigger.dataset.id);
    if (customer) openModal(customerModal(customer));
    return;
  }

  if (action === "product-add") {
    openModal(productForm(null));
    return;
  }

  if (action === "product-edit") {
    const product = state.products.find((p) => p.id === trigger.dataset.id);
    if (product) openModal(productForm(product));
    return;
  }

  if (action === "stock") {
    const product = state.products.find((p) => p.id === trigger.dataset.id);
    if (!product) return;
    const delta = Number(trigger.dataset.delta) || 0;
    product.stock = Math.max(0, product.stock + delta);
    store(state);
    refreshList();
    toast(`${product.name}: ${product.stock} in stock`);
    return;
  }

  if (action === "order-view") {
    const order = state.orders.find((o) => o.id === trigger.dataset.id);
    if (order) openModal(orderModal(order));
    return;
  }

  if (action === "task-add") {
    openModal(taskForm());
    return;
  }

  if (action === "export-orders") {
    exportOrders();
    return;
  }

  if (action === "reset") {
    if (
      window.confirm(
        "Reset the demo? This replaces all changes with the original sample data.",
      )
    ) {
      state = seedData();
      store(state);
      ui = {
        view: "dashboard",
        customerQuery: "",
        customerSegment: "all",
        productQuery: "",
        productCategory: "all",
        orderQuery: "",
        orderStatus: "all",
        taskOwner: "all",
        taskStatus: "open",
      };
      updateBrand();
      render();
      toast("Demo data reset");
    }
  }
}

function handleInput(event) {
  const field = event.target.closest("[data-filter]");
  if (!field) return;
  const key = field.dataset.filter;
  if (!(key in ui)) return;
  ui[key] = field.value;
  refreshList();
}

function handleChange(event) {
  const statusSelect = event.target.closest("[data-order-status]");
  if (statusSelect) {
    const order = state.orders.find((o) => o.id === statusSelect.dataset.orderStatus);
    if (!order) return;
    order.status = statusSelect.value;
    store(state);
    toast(`${order.number} marked ${order.status.toLowerCase()}`);
    return;
  }

  const taskToggle = event.target.closest("[data-task-toggle]");
  if (taskToggle) {
    const task = state.tasks.find((t) => t.id === taskToggle.dataset.taskToggle);
    if (!task) return;
    task.done = taskToggle.checked;
    store(state);
    refreshList();
    toast(task.done ? "Task completed" : "Task reopened");
    return;
  }

  const filter = event.target.closest("[data-filter]");
  if (filter) {
    const key = filter.dataset.filter;
    if (key in ui) {
      ui[key] = filter.value;
      refreshList();
    }
  }
}

function handleSubmit(event) {
  const form = event.target.closest("form[data-form]");
  if (!form) return;
  event.preventDefault();
  const data = new FormData(form);
  const kind = form.dataset.form;

  if (kind === "customer") {
    state.customers.unshift({
      id: `c-${Date.now()}`,
      name: String(data.get("name") || "").trim(),
      company: String(data.get("company") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      segment: String(data.get("segment") || "Retail"),
      since: rel(0),
    });
    store(state);
    closeModal();
    render();
    toast("Customer added");
    return;
  }

  if (kind === "product") {
    const id = String(data.get("id") || "");
    const record = {
      name: String(data.get("name") || "").trim(),
      sku: String(data.get("sku") || "").trim(),
      category: String(data.get("category") || "Furniture"),
      price: Number(data.get("price")) || 0,
      stock: Number(data.get("stock")) || 0,
      reorder: Number(data.get("reorder")) || 0,
    };
    if (id) {
      const product = state.products.find((p) => p.id === id);
      if (product) Object.assign(product, record);
    } else {
      state.products.unshift({ id: `p-${Date.now()}`, ...record });
    }
    store(state);
    closeModal();
    render();
    toast(id ? "Product updated" : "Product added");
    return;
  }

  if (kind === "task") {
    state.tasks.unshift({
      id: `t-${Date.now()}`,
      title: String(data.get("title") || "").trim(),
      owner: String(data.get("owner") || "Demo Manager"),
      due: String(data.get("due") || rel(3)),
      priority: String(data.get("priority") || "Medium"),
      done: false,
    });
    store(state);
    closeModal();
    if (ui.view === "tasks") render();
    toast("Task added");
    return;
  }

  if (kind === "settings") {
    state.settings.business = String(data.get("business") || "").trim();
    state.settings.operationsEmail = String(data.get("operationsEmail") || "").trim();
    state.settings.currency = String(data.get("currency") || "NGN");
    store(state);
    updateBrand();
    render();
    toast("Settings saved");
  }
}

function exportOrders() {
  const rows = [
    ["Order", "Date", "Customer", "Company", "Status", "Items", "Total", "Currency"],
    ...state.orders.map((order) => [
      order.number,
      order.date,
      customerName(order.customerId),
      customerCompany(order.customerId),
      order.status,
      orderUnits(order),
      orderTotal(order),
      state.settings.currency,
    ]),
  ];
  const csv = rows
    .map((row) =>
      row
        .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
        .join(","),
    )
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "northline-orders-demo.csv";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  toast("Orders CSV downloaded");
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
render();
