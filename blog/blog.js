(() => {
  "use strict";

  const posts = Array.isArray(window.KAIROS_BLOG_POSTS)
    ? window.KAIROS_BLOG_POSTS.filter((post) => post.published === true)
    : [];
  const tagOrder = ["casos-de-uso", "modelos-agenticos", "ia-aplicada", "automatizacion", "kairos-ia", "procesos", "documentos", "datos"];
  const tagLabels = {
    es: {
      "casos-de-uso": "Casos de uso",
      "modelos-agenticos": "Modelos agénticos",
      "ia-aplicada": "IA aplicada",
      automatizacion: "Automatización",
      "kairos-ia": "Kairós IA",
      procesos: "Procesos",
      documentos: "Documentos",
      datos: "Datos"
    },
    en: {
      "casos-de-uso": "Use cases",
      "modelos-agenticos": "Agentic models",
      "ia-aplicada": "Applied AI",
      automatizacion: "Automation",
      "kairos-ia": "Kairós IA",
      procesos: "Processes",
      documentos: "Documents",
      datos: "Data"
    }
  };

  const ui = {
    es: {
      metaTitle: "Blog | Kairós IA",
      metaDescription: "Ideas, casos de uso y análisis sobre Kairós IA, inteligencia artificial aplicada y modelos agénticos para empresas.",
      eyebrow: "Ideas · Casos · Actualidad",
      heroTitle: "IA aplicada al trabajo real de la empresa.",
      heroLead: "Un espacio para compartir casos de uso, novedades de Kairós IA y conocimiento práctico sobre inteligencia artificial, automatización y modelos agénticos.",
      editorialLabel: "Líneas editoriales",
      editorialTopics: ["Casos de uso", "Noticias de Kairós", "IA y modelos agénticos"],
      articlesEyebrow: "Biblioteca",
      articlesTitle: "Explora las publicaciones",
      searchLabel: "Buscar entradas",
      searchPlaceholder: "Buscar por título, tema o contenido…",
      filterLabel: "Filtrar por etiqueta",
      allTags: "Todas",
      clear: "Limpiar filtros",
      resultOne: "1 entrada encontrada",
      resultMany: "{count} entradas encontradas",
      emptyBlogCount: "Aún no hay entradas publicadas",
      emptyBlogTitle: "Próximamente",
      emptyBlogText: "Estamos preparando los primeros contenidos del blog. Muy pronto encontrarás aquí casos de uso, novedades de Kairós IA y artículos sobre inteligencia artificial y modelos agénticos.",
      noResultsTitle: "No hemos encontrado entradas",
      noResultsText: "Prueba con otra palabra o elimina el filtro de etiqueta.",
      readArticle: "Leer artículo",
      featured: "Destacado",
      comingSoon: "Próximamente",
      back: "Volver al blog",
      related: "También te puede interesar",
      notFoundTitle: "La entrada no está disponible",
      notFoundText: "Puede que el enlace haya cambiado o que la publicación todavía no esté publicada.",
      contactEyebrow: "Conversación abierta",
      contactTitle: "¿Tienes un proceso o una idea que te gustaría analizar?",
      contactText: "Cuéntanos el contexto. Te ayudaremos a valorar dónde puede aportar la IA y qué pasos tendría sentido abordar primero.",
      contactButton: "Hablar con Kairós IA"
    },
    en: {
      metaTitle: "Blog | Kairós IA",
      metaDescription: "Ideas, use cases, and analysis about Kairós IA, applied artificial intelligence, and agentic models for business.",
      eyebrow: "Ideas · Cases · News",
      heroTitle: "Applied AI for real business work.",
      heroLead: "A space for use cases, Kairós IA news, and practical knowledge about artificial intelligence, automation, and agentic models.",
      editorialLabel: "Editorial themes",
      editorialTopics: ["Use cases", "Kairós news", "AI and agentic models"],
      articlesEyebrow: "Library",
      articlesTitle: "Explore the publications",
      searchLabel: "Search articles",
      searchPlaceholder: "Search by title, topic, or content…",
      filterLabel: "Filter by tag",
      allTags: "All",
      clear: "Clear filters",
      resultOne: "1 article found",
      resultMany: "{count} articles found",
      emptyBlogCount: "No articles published yet",
      emptyBlogTitle: "Coming soon",
      emptyBlogText: "We are preparing the first blog publications. You will soon find use cases, Kairós IA news, and articles about artificial intelligence and agentic models here.",
      noResultsTitle: "No articles found",
      noResultsText: "Try another term or remove the tag filter.",
      readArticle: "Read article",
      featured: "Featured",
      comingSoon: "Coming soon",
      back: "Back to the blog",
      related: "You may also be interested in",
      notFoundTitle: "This article is not available",
      notFoundText: "The link may have changed or the article may not be published yet.",
      contactEyebrow: "Start a conversation",
      contactTitle: "Do you have a process or idea you would like to explore?",
      contactText: "Tell us about the context. We can help assess where AI may add value and which steps make sense to address first.",
      contactButton: "Talk to Kairós IA"
    }
  };

  const queryParams = new URLSearchParams(window.location.search);
  const state = {
    query: queryParams.get("q") || "",
    tag: queryParams.get("tag") || "all"
  };

  function language() {
    return document.documentElement.lang === "en" ? "en" : "es";
  }

  function copy() {
    return ui[language()];
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function normalized(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  function postContent(post) {
    return post.content[language()] || post.content.es;
  }

  function tagLabel(tag) {
    return tagLabels[language()][tag] || tag;
  }

  function formatDate(date) {
    return new Intl.DateTimeFormat(language() === "en" ? "en-GB" : "es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(new Date(`${date}T12:00:00`));
  }

  function searchablePostText(post) {
    const content = postContent(post);
    const sections = content.sections.flatMap((section) => [
      section.heading,
      ...(section.paragraphs || []),
      ...(section.bullets || [])
    ]);
    return normalized([
      content.title,
      content.excerpt,
      ...post.tags.map(tagLabel),
      ...sections
    ].join(" "));
  }

  function sortedPosts() {
    return [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  }

  function tagsMarkup(tags, interactive = false) {
    return tags.map((tag) => {
      const label = escapeHtml(tagLabel(tag));
      if (interactive) return `<a class="blog-tag" href="index.html?tag=${encodeURIComponent(tag)}">${label}</a>`;
      return `<span class="blog-tag">${label}</span>`;
    }).join("");
  }

  function cardMarkup(post) {
    const content = postContent(post);
    const labels = copy();
    return `
      <article class="blog-card${post.featured ? " is-featured" : ""}">
        <div class="blog-card-topline">
          <span class="blog-category">${escapeHtml(tagLabel(post.category))}</span>
          ${post.comingSoon
            ? `<span class="blog-featured-label">${escapeHtml(labels.comingSoon)}</span>`
            : post.featured ? `<span class="blog-featured-label">${escapeHtml(labels.featured)}</span>` : ""}
        </div>
        <div class="blog-card-meta">
          ${post.comingSoon
            ? `<span>${escapeHtml(labels.comingSoon)}</span>`
            : `<time datetime="${escapeHtml(post.publishedAt)}">${escapeHtml(formatDate(post.publishedAt))}</time>
               <span aria-hidden="true">·</span>
               <span>${escapeHtml(content.readingTime)}</span>`}
        </div>
        <h2>${escapeHtml(content.title)}</h2>
        <p>${escapeHtml(content.excerpt)}</p>
        <div class="blog-card-tags" aria-label="${escapeHtml(labels.filterLabel)}">${tagsMarkup(post.tags)}</div>
        <a class="blog-card-link" href="articulo.html?slug=${encodeURIComponent(post.slug)}">
          ${escapeHtml(labels.readArticle)} <span aria-hidden="true">→</span>
        </a>
      </article>
    `;
  }

  function availableTags() {
    return tagOrder;
  }

  function filterButtonsMarkup() {
    const labels = copy();
    const tags = [{ id: "all", label: labels.allTags }, ...availableTags().map((tag) => ({ id: tag, label: tagLabel(tag) }))];
    return tags.map(({ id, label }) => `
      <button class="blog-filter${state.tag === id ? " is-active" : ""}" type="button" data-blog-tag="${escapeHtml(id)}" aria-pressed="${state.tag === id}">
        ${escapeHtml(label)}
      </button>
    `).join("");
  }

  function updateUrl() {
    const params = new URLSearchParams();
    if (state.query) params.set("q", state.query);
    if (state.tag !== "all") params.set("tag", state.tag);
    const query = params.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${query ? `?${query}` : ""}`);
  }

  function matchingPosts() {
    const searchTerm = normalized(state.query);
    return sortedPosts().filter((post) => {
      const matchesTag = state.tag === "all" || post.tags.includes(state.tag);
      const matchesSearch = !searchTerm || searchablePostText(post).includes(searchTerm);
      return matchesTag && matchesSearch;
    });
  }

  function updateIndexResults() {
    const root = document.querySelector("[data-blog-index]");
    if (!root) return;
    const labels = copy();
    const results = matchingPosts();
    const grid = root.querySelector("[data-blog-grid]");
    const count = root.querySelector("[data-blog-count]");
    const clear = root.querySelector("[data-blog-clear]");
    const filters = root.querySelectorAll("[data-blog-tag]");

    filters.forEach((button) => {
      const active = button.dataset.blogTag === state.tag;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    count.textContent = posts.length === 0
      ? labels.emptyBlogCount
      : results.length === 1 ? labels.resultOne : labels.resultMany.replace("{count}", results.length);
    clear.hidden = !state.query && state.tag === "all";
    grid.innerHTML = posts.length === 0
      ? `<div class="blog-empty"><h2>${escapeHtml(labels.emptyBlogTitle)}</h2><p>${escapeHtml(labels.emptyBlogText)}</p></div>`
      : results.length
        ? results.map(cardMarkup).join("")
        : `<div class="blog-empty"><h2>${escapeHtml(labels.noResultsTitle)}</h2><p>${escapeHtml(labels.noResultsText)}</p></div>`;
  }

  function bindIndexControls() {
    const root = document.querySelector("[data-blog-index]");
    if (!root) return;
    const search = root.querySelector("[data-blog-search]");
    const clear = root.querySelector("[data-blog-clear]");

    search.addEventListener("input", (event) => {
      state.query = event.target.value.trimStart();
      updateUrl();
      updateIndexResults();
    });

    root.querySelectorAll("[data-blog-tag]").forEach((button) => {
      button.addEventListener("click", () => {
        state.tag = button.dataset.blogTag;
        updateUrl();
        updateIndexResults();
      });
    });

    clear.addEventListener("click", () => {
      state.query = "";
      state.tag = "all";
      search.value = "";
      updateUrl();
      updateIndexResults();
      search.focus();
    });
  }

  function renderIndex() {
    const root = document.querySelector("[data-blog-index]");
    if (!root) return;
    const labels = copy();
    const validTags = new Set(["all", ...availableTags()]);
    if (!validTags.has(state.tag)) state.tag = "all";

    document.title = labels.metaTitle;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = labels.metaDescription;

    root.innerHTML = `
      <section class="blog-hero">
        <div class="container blog-hero-grid">
          <div>
            <span class="eyebrow">${escapeHtml(labels.eyebrow)}</span>
            <h1>${escapeHtml(labels.heroTitle)}</h1>
            <p class="lead">${escapeHtml(labels.heroLead)}</p>
          </div>
          <aside class="blog-editorial" aria-label="${escapeHtml(labels.editorialLabel)}">
            <span>${escapeHtml(labels.editorialLabel)}</span>
            <ol>${labels.editorialTopics.map((topic, index) => `<li><b>0${index + 1}</b>${escapeHtml(topic)}</li>`).join("")}</ol>
          </aside>
        </div>
      </section>

      <section class="blog-browser section-tight">
        <div class="container">
          <div class="blog-section-head">
            <div>
              <span class="eyebrow">${escapeHtml(labels.articlesEyebrow)}</span>
              <h2>${escapeHtml(labels.articlesTitle)}</h2>
            </div>
            <div class="blog-search-field">
              <label for="blog-search">${escapeHtml(labels.searchLabel)}</label>
              <input id="blog-search" type="search" value="${escapeHtml(state.query)}" placeholder="${escapeHtml(labels.searchPlaceholder)}" autocomplete="off" data-blog-search>
            </div>
          </div>
          <div class="blog-filter-row">
            <div class="blog-filters" role="group" aria-label="${escapeHtml(labels.filterLabel)}">${filterButtonsMarkup()}</div>
            <button class="blog-clear" type="button" data-blog-clear>${escapeHtml(labels.clear)}</button>
          </div>
          <div class="blog-results-bar">
            <p aria-live="polite" data-blog-count></p>
          </div>
          <div class="blog-grid" data-blog-grid></div>
        </div>
      </section>

      <section class="blog-contact">
        <div class="container blog-contact-inner">
          <div>
            <span class="eyebrow">${escapeHtml(labels.contactEyebrow)}</span>
            <h2>${escapeHtml(labels.contactTitle)}</h2>
            <p>${escapeHtml(labels.contactText)}</p>
          </div>
          <a class="btn" href="../contacto.html">${escapeHtml(labels.contactButton)}</a>
        </div>
      </section>
    `;

    bindIndexControls();
    updateIndexResults();
  }

  function articleSectionsMarkup(sections) {
    return sections.map((section) => `
      <section class="blog-article-section">
        <h2>${escapeHtml(section.heading)}</h2>
        ${(section.paragraphs || []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
        ${section.bullets ? `<ul>${section.bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : ""}
      </section>
    `).join("");
  }

  function renderArticle() {
    const root = document.querySelector("[data-blog-article]");
    if (!root) return;
    const labels = copy();
    const slug = new URLSearchParams(window.location.search).get("slug") || "";
    const post = posts.find((entry) => entry.slug === slug);

    if (!post) {
      document.title = `${labels.notFoundTitle} | Kairós IA`;
      root.innerHTML = `
        <section class="blog-not-found">
          <div class="container">
            <span class="eyebrow">404</span>
            <h1>${escapeHtml(labels.notFoundTitle)}</h1>
            <p class="lead">${escapeHtml(labels.notFoundText)}</p>
            <a class="btn" href="index.html">${escapeHtml(labels.back)}</a>
          </div>
        </section>
      `;
      return;
    }

    const content = postContent(post);
    document.title = `${content.title} | Kairós IA`;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = content.excerpt;
    const related = sortedPosts().filter((entry) => entry.slug !== post.slug).slice(0, 2);

    root.innerHTML = `
      <article class="blog-article">
        <header class="blog-article-hero">
          <div class="container blog-article-hero-inner">
            <a class="blog-back" href="index.html"><span aria-hidden="true">←</span> ${escapeHtml(labels.back)}</a>
            <div class="blog-card-meta">
              <span class="blog-category">${escapeHtml(tagLabel(post.category))}</span>
              ${post.comingSoon
                ? `<span class="blog-featured-label">${escapeHtml(labels.comingSoon)}</span>`
                : `<time datetime="${escapeHtml(post.publishedAt)}">${escapeHtml(formatDate(post.publishedAt))}</time>
                   <span aria-hidden="true">·</span>
                   <span>${escapeHtml(content.readingTime)}</span>`}
            </div>
            <h1>${escapeHtml(content.title)}</h1>
            <p class="lead">${escapeHtml(content.excerpt)}</p>
            <div class="blog-card-tags">${tagsMarkup(post.tags, true)}</div>
          </div>
        </header>
        <div class="container blog-article-layout">
          <div class="blog-article-body">${articleSectionsMarkup(content.sections)}</div>
          <aside class="blog-article-aside">
            <span>${escapeHtml(labels.filterLabel)}</span>
            <div class="blog-card-tags">${tagsMarkup(post.tags, true)}</div>
          </aside>
        </div>
      </article>
      <section class="blog-related">
        <div class="container">
          <div class="blog-section-head"><h2>${escapeHtml(labels.related)}</h2></div>
          <div class="blog-grid">${related.map(cardMarkup).join("")}</div>
        </div>
      </section>
    `;
  }

  function renderCurrentPage() {
    renderIndex();
    renderArticle();
  }

  let renderedLanguage = language();
  const languageObserver = new MutationObserver(() => {
    const nextLanguage = language();
    if (nextLanguage === renderedLanguage) return;
    renderedLanguage = nextLanguage;
    renderCurrentPage();
  });

  languageObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  renderCurrentPage();
})();
