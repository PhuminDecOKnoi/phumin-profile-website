(function () {
  const data = window.profileData;

  if (!data || !data.translations) {
    return;
  }

  const supportedLanguages = Object.keys(data.translations);
  const savedLanguage = window.localStorage.getItem("site-language");
  const initialLanguage = supportedLanguages.includes(savedLanguage)
    ? savedLanguage
    : data.defaultLanguage || "en";

  const setText = (id, value) => {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = value;
    }
  };

  const getNestedValue = (object, path) =>
    path.split(".").reduce((current, key) => (current ? current[key] : undefined), object);

  const createListItems = (items, className) =>
    items.map((item) => `<li class="${className}">${item}</li>`).join("");

  const renderStaticTranslations = (translation) => {
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      const value = getNestedValue(translation, key);

      if (typeof value === "string") {
        element.textContent = value;
      }
    });
  };

  const renderProfile = (translation) => {
    const profile = translation.profile;

    setText("hero-role", translation.hero.role);
    setText("hero-name", profile.name);
    setText("hero-summary", profile.summary);
    setText("availability-text", translation.hero.availability);
    setText("about-text", profile.about);
    setText("contact-message", profile.contact.message);
    setText("footer-text", translation.footer.text);

    document.documentElement.lang = currentLanguage;
    document.title = translation.pageTitle;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", translation.metaDescription);
    }

    const heroHighlights = document.getElementById("hero-highlights");
    if (heroHighlights) {
      heroHighlights.setAttribute("aria-label", translation.hero.highlightsLabel);
      heroHighlights.innerHTML = createListItems(profile.highlights, "");
    }

    const quickFacts = document.getElementById("quick-facts");
    if (quickFacts) {
      quickFacts.innerHTML = createListItems(profile.quickFacts, "");
    }

    const heroStats = document.getElementById("hero-stats");
    if (heroStats) {
      heroStats.innerHTML = profile.stats
        .map(
          (stat) => `
            <div class="stat-item">
              <span class="stat-value">${stat.value}</span>
              <span class="stat-label">${stat.label}</span>
            </div>
          `
        )
        .join("");
    }

    const skillsGrid = document.getElementById("skills-grid");
    if (skillsGrid) {
      skillsGrid.innerHTML = profile.skillGroups
        .map(
          (group) => `
            <article class="skill-card">
              <h3>${group.title}</h3>
              <p>${group.description}</p>
              <ul class="skill-tags">
                ${createListItems(group.tags, "")}
              </ul>
            </article>
          `
        )
        .join("");
    }

    const experienceList = document.getElementById("experience-list");
    if (experienceList) {
      experienceList.innerHTML = profile.experience
        .map(
          (item) => `
            <article class="timeline-item">
              <div class="timeline-meta">
                ${item.period}
                <span class="timeline-company">${item.company}</span>
              </div>
              <div class="timeline-copy">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
              </div>
            </article>
          `
        )
        .join("");
    }

    const projectsGrid = document.getElementById("projects-grid");
    if (projectsGrid) {
      projectsGrid.innerHTML = profile.projects
        .map(
          (project) => `
            <article class="project-card">
              <div>
                <h3>${project.title}</h3>
                <p>${project.description}</p>
              </div>
              <ul class="project-tags">
                ${createListItems(project.tags, "")}
              </ul>
              <a class="project-link" href="${project.linkHref}">
                ${project.linkLabel}
                <span aria-hidden="true">→</span>
              </a>
            </article>
          `
        )
        .join("");
    }

    const contactLinks = document.getElementById("contact-links");
    if (contactLinks) {
      contactLinks.innerHTML = profile.contact.links
        .map(
          (link) => `
            <a
              class="contact-link"
              href="${link.href}"
              ${link.href.startsWith("http") ? 'target="_blank" rel="noreferrer"' : ""}
            >
              ${link.label}
            </a>
          `
        )
        .join("");
    }
  };

  const updateLanguageButtons = () => {
    document.querySelectorAll(".lang-button").forEach((button) => {
      const isActive = button.dataset.lang === currentLanguage;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  };

  const renderLanguage = (language) => {
    const translation = data.translations[language];

    if (!translation) {
      return;
    }

    currentLanguage = language;
    renderStaticTranslations(translation);
    renderProfile(translation);
    updateLanguageButtons();
    window.localStorage.setItem("site-language", language);
  };

  let currentLanguage = initialLanguage;

  document.querySelectorAll(".lang-button").forEach((button) => {
    button.addEventListener("click", function () {
      renderLanguage(button.dataset.lang);
    });
  });

  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.getElementById("site-nav");

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      const isOpen = siteNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", function () {
        siteNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  renderLanguage(initialLanguage);
})();
