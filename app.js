const data = window.siteData;

const qs = (selector) => document.querySelector(selector);

function link(label, url, className = "") {
  const a = document.createElement("a");
  a.textContent = label;
  a.href = url;
  if (className) a.className = className;
  if (url.startsWith("http")) {
    a.target = "_blank";
    a.rel = "noreferrer";
  }
  return a;
}

function renderProfile() {
  qs("#profile-kicker").textContent = data.profile.kicker;
  qs("#hero-title").textContent = data.profile.title;
  qs("#hero-summary").textContent = data.profile.summary;

  const actions = qs("#hero-actions");
  data.profile.links.forEach((item, index) => {
    actions.append(link(item.label, item.url, index === 0 ? "button primary" : "button"));
  });
}

function renderAbout() {
  const about = qs("#about-copy");
  data.about.forEach((paragraph) => {
    const p = document.createElement("p");
    p.textContent = paragraph;
    about.append(p);
  });

  const expertise = qs("#expertise-grid");
  data.expertise.forEach((item) => {
    const article = document.createElement("article");
    article.className = "expertise-card";
    article.innerHTML = `<h3>${item.title}</h3><p>${item.text}</p>`;
    expertise.append(article);
  });
}

function renderPublications() {
  const groups = qs("#publication-groups");
  data.publicationGroups.forEach((group) => {
    const section = document.createElement("article");
    section.className = "publication-group";

    const list = document.createElement("ol");
    group.items.forEach((item) => {
      const li = document.createElement("li");
      const cite = document.createElement("p");
      cite.textContent = item.citation;
      li.append(cite);
      if (item.url) {
        li.append(link("DOI", item.url, "doi-link"));
      }
      list.append(li);
    });

    section.innerHTML = `
      <div class="publication-heading">
        <h3>${group.interest}</h3>
        <p>${group.description}</p>
      </div>
    `;
    section.append(list);
    groups.append(section);
  });
}

function renderTeaching() {
  const philosophy = qs("#teaching-philosophy");
  data.teaching.philosophy.forEach((paragraph) => {
    const p = document.createElement("p");
    p.textContent = paragraph;
    philosophy.append(p);
  });

  qs("#rating-card").innerHTML = `
    <span>Teaching note</span>
    <strong>${data.teaching.rating.value}</strong>
    <p>${data.teaching.rating.label}</p>
    <small>${data.teaching.rating.details}</small>
  `;

  const feedback = qs("#feedback-list");
  data.teaching.feedback.forEach((quote) => {
    const blockquote = document.createElement("blockquote");
    blockquote.textContent = quote;
    feedback.append(blockquote);
  });
}

function renderContact() {
  const contact = qs("#contact-card");
  const interests = data.contact.interests.map((item) => `<span>${item}</span>`).join("");
  contact.innerHTML = `
    <a class="email-link" href="mailto:${data.contact.email}">${data.contact.email}</a>
    <div class="tag-row">${interests}</div>
    <small>${data.contact.note}</small>
  `;

  qs("#footer-note").textContent = `Copyright ${new Date().getFullYear()} ${data.profile.name}. Built for GitHub Pages.`;
}

function loadGiscus() {
  if (!data.comments || !data.comments.giscusEnabled) return;
  const script = document.createElement("script");
  script.src = "https://giscus.app/client.js";
  script.async = true;
  script.crossOrigin = "anonymous";
  script.setAttribute("data-repo", data.comments.giscus.repo);
  script.setAttribute("data-repo-id", data.comments.giscus.repoId);
  script.setAttribute("data-category", data.comments.giscus.category);
  script.setAttribute("data-category-id", data.comments.giscus.categoryId);
  script.setAttribute("data-mapping", "pathname");
  script.setAttribute("data-strict", "0");
  script.setAttribute("data-reactions-enabled", "1");
  script.setAttribute("data-emit-metadata", "0");
  script.setAttribute("data-input-position", "bottom");
  script.setAttribute("data-theme", "light");
  script.setAttribute("data-lang", "en");
  document.body.append(script);
}

renderProfile();
renderAbout();
renderPublications();
renderTeaching();
renderContact();
loadGiscus();
