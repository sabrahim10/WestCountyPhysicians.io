const navItems = [
  { href: "index.html", label: "Home", key: "home" },
  { href: "about.html", label: "About", key: "about" },
  { href: "services.html", label: "Services", key: "services" },
  { href: "contact.html", label: "Contact", key: "contact" }
];

const serviceItems = [
  {
    title: "Comprehensive Psychiatric Evaluation",
    description:
      "A full diagnostic assessment that reviews symptoms, history, medical factors, and treatment goals."
  },
  {
    title: "Medication Management",
    description:
      "Targeted pharmacologic care with ongoing follow-up visits, dose optimization, and side-effect monitoring."
  },
  {
    title: "Anxiety & Mood Disorder Treatment",
    description:
      "Care plans for depression, bipolar spectrum conditions, generalized anxiety, panic, and related concerns."
  },
  {
    title: "Second Opinions",
    description:
      "Independent clinical review for patients seeking additional guidance on diagnosis or treatment direction."
  },
  {
    title: "Continuity of Care",
    description:
      "Coordination with therapists, PCPs, and specialists to keep treatment aligned across providers."
  }
];

function renderSharedLayout() {
  const pageKey = document.body.dataset.page || "";
  const headerContainer = document.getElementById("site-header");
  const footerContainer = document.getElementById("site-footer");

  if (headerContainer) {
    const links = navItems
      .map((item) => {
        const active = item.key === pageKey ? " class=\"active\"" : "";
        return `<a href="${item.href}"${active}>${item.label}</a>`;
      })
      .join("");

    headerContainer.innerHTML = `
      <header class="site-header">
        <div class="shell nav-shell">
          <a class="brand" href="index.html">
            <span class="brand-mark">WCP</span>
            <span class="brand-text">West County Physicians</span>
          </a>
          <button id="menu-toggle" class="menu-toggle" aria-expanded="false" aria-label="Open navigation">
            Menu
          </button>
          <nav id="site-nav" class="site-nav">
            ${links}
          </nav>
        </div>
      </header>
    `;
  }

  if (footerContainer) {
    const year = new Date().getFullYear();
    footerContainer.innerHTML = `
      <footer class="site-footer">
        <div class="shell footer-grid">
          <div>
            <h3>West County Physicians</h3>
            <p>Outpatient psychiatry for adults.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>777 Craig Rd, Suite 101<br>Creve Coeur, MO 63141</p>
            <p>(314) 872-7792</p>
          </div>
          <div>
            <h4>Navigate</h4>
            <p><a href="about.html">About</a></p>
            <p><a href="services.html">Services</a></p>
            <p><a href="contact.html">Contact</a></p>
          </div>
        </div>
        <div class="shell footer-bar">
          <p>Copyright ${year} West County Physicians. All rights reserved.</p>
        </div>
      </footer>
    `;
  }
}

function bindMenuToggle() {
  const button = document.getElementById("menu-toggle");
  const nav = document.getElementById("site-nav");

  if (!button || !nav) {
    return;
  }

  button.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));
  });
}

function renderServices() {
  const servicesList = document.getElementById("services-list");
  if (!servicesList) {
    return;
  }

  servicesList.innerHTML = serviceItems
    .map(
      (item) => `
      <article class="service-card reveal">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </article>
    `
    )
    .join("");
}

function setupReveals() {
  const revealItems = document.querySelectorAll(".reveal");
  if (!revealItems.length) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

renderSharedLayout();
bindMenuToggle();
renderServices();
setupReveals();
