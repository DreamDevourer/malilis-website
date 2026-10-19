(() => {
  "use strict";

  // Source of truth: Malili’s Catálogo Bolos 2026, pages 3–12.
  const catalogue = {
    whatsapp: "5541997467645",
    timezone: "America/Sao_Paulo",
    leadDays: 5,
    categories: [
      {
        id: "classicos",
        name: "Clássicos",
        description:
          "Os clássicos da confeitaria brasileira, para não perder o que há de melhor em nossos doces.",
        prices: { PP: 8150, P: 10800, M: 20500, G: 28000 },
        sponges: ["baunilha", "chocolate", "red-velvet"],
        fillings: [
          [
            "brigadeiro-morango",
            "Brigadeiro & Morango",
            "Brigadeiro artesanal de chocolate, combinado com morangos frescos para um contraste entre intensidade e frescor.",
          ],
          [
            "tropical",
            "Tropical",
            "Creme artesanal de coco com abacaxi em pedaços, equilibrando dulçor e acidez em um recheio tropical.",
          ],
          [
            "nido",
            "Nido",
            "Brigadeiro de Leite Ninho, com textura aveludada e sabor lácteo marcante.",
          ],
          [
            "beijinho",
            "Beijinho",
            "Beijinho artesanal à base de coco, com textura macia e sabor delicadamente adocicado.",
          ],
          [
            "floresta-negra",
            "Floresta Negra",
            "Raspas de chocolate, cerejas e chantilly em uma composição clássica de contrastes entre cacau, fruta e leveza.",
          ],
          [
            "dolce-cinnamon",
            "Dolce Cinnamon",
            "Doce de leite cremoso finalizado com canela, em uma combinação aromática inspirada no clássico churros.",
          ],
          [
            "puro-brigadeiro",
            "Puro Brigadeiro",
            "Brigadeiro artesanal elaborado com chocolate de sabor intenso e acabamento aveludado.",
          ],
          [
            "prestigio",
            "Prestígio",
            "Coco com brigadeiro de chocolate, combinando notas tropicais e cacau em uma composição clássica.",
          ],
          [
            "kikiriki",
            "Kikiriki",
            "Brigadeiro de paçoca com notas tostadas de amendoim e textura cremosa.",
          ],
          [
            "entre-dois-amores",
            "Entre Dois Amores",
            "Camadas de brigadeiro ao leite e brigadeiro branco, unindo notas intensas de chocolate à delicadeza do leite.",
          ],
        ],
      },
      {
        id: "especiais",
        name: "Especiais",
        description:
          "Sabores marcantes e delicados, com recheios elaborados que exploram novas possibilidades a cada fatia.",
        prices: { PP: 11490, P: 15730, M: 30500, G: 42500 },
        sponges: ["baunilha", "chocolate", "red-velvet"],
        fillings: [
          [
            "jardim-silvestre",
            "Jardim Silvestre",
            "Ganache de limão-siciliano com geleia de mirtilos, combinando notas cítricas, acidez delicada e dulçor frutado.",
          ],
          [
            "red-velvet",
            "Red Velvet",
            "Mousse de Cream Cheese, com frutas vermelhas frescas, destacando o agridoce.",
          ],
          [
            "maracuja-noir",
            "Maracujá Noir",
            "Creme de maracujá com chocolate intenso, em um contraste entre acidez tropical e notas profundas de cacau.",
          ],
          [
            "cookies-cream",
            "Cookies n Cream",
            "Ganache de chocolate branco com pedaços crocantes de biscoito de chocolate, unindo cremosidade e textura.",
          ],
          [
            "matilda",
            "Matilda",
            "Chocolate intenso e ganache aveludada com creme de avelã, para uma experiência marcante a cada fatia.",
          ],
          [
            "rubi",
            "Rubi",
            "Brigadeiro artesanal de chocolate com geleia de frutas vermelhas, equilibrando a intensidade do cacau com a acidez das frutas.",
          ],
          [
            "vellutato-fruits",
            "Vellutato Fruits",
            "Mousse de frutas sazonais com chocolate branco, de textura leve e aveludada, equilibrando frescor frutado e dulçor delicado.",
          ],
          [
            "marta-rocha",
            "Marta Rocha",
            "Uma composição tradicional de camadas e texturas, com cremes, crocância e notas frutadas de ameixa.",
          ],
        ],
      },
      {
        id: "premium",
        name: "Premium",
        description:
          "Ingredientes selecionados, preparações refinadas e combinações autorais que revelam a confeitaria em sua expressão mais sofisticada.",
        prices: { PP: 17630, P: 24600, M: 46500, G: 67990 },
        sponges: ["chiffon"],
        fillings: [
          [
            "pistache-framboesa",
            "Pistache & Framboesa",
            "Ganache de pistache com geleia de framboesa, combinando notas delicadamente tostadas com acidez frutada.",
          ],
          [
            "caramelo-salgado",
            "Caramelo Salgado",
            "Caramelo de textura cremosa, com notas amanteigadas e um delicado contraste entre dulçor e salinidade.",
          ],
          [
            "piemonte",
            "Piemonte",
            "Chocolate e avelã em uma composição que combina cremosidade, notas tostadas e crocância, inspirado no famoso Ferrero Rocher.",
          ],
          [
            "sol-de-verao",
            "Sol de Verão",
            "Creme cítrico com ganache de chocolate branco e zest de laranja, em uma harmonia entre frescor, cremosidade e perfume.",
          ],
          [
            "praline-noir",
            "Praliné Noir",
            "Praliné com doce de leite e chocolate amargo, reunindo notas caramelizadas, crocância e intensidade de cacau.",
          ],
          [
            "hazel-brownie",
            "Hazel Brownie",
            "Nutella, crumble de brownie Malili’s e ganache de chocolate amargo unindo crocância, chocolate intenso e textura macia.",
          ],
        ],
      },
    ],
    sponges: [
      {
        id: "baunilha",
        name: "Pão de Ló Baunilha",
        image: "assets/massa-baunilha.webp",
        description:
          "Leve, macio e delicado. É a base perfeita para os mais diversos recheios.",
      },
      {
        id: "chocolate",
        name: "Pão de Ló Chocolate",
        image: "assets/massa-chocolate.webp",
        description:
          "Intenso e irresistível, feito com Cacau Black. Traz um sabor marcante e uma textura incrível.",
      },
      {
        id: "red-velvet",
        name: "Red Velvet",
        image: "assets/massa-red-velvet.webp",
        description:
          "Com sua cor vibrante e sabor levemente amanteigado, o Red Velvet é uma experiência única em cada fatia.",
      },
      {
        id: "chiffon",
        name: "Chiffon",
        image: "assets/massa-chiffon.webp",
        description:
          "Ultra leve e fofinha, com textura aerada e um sabor suave, realçando ainda mais os recheios. O sabor da massa será combinado pelo WhatsApp.",
      },
    ],
    sizes: [
      { id: "PP", diameter: "13 cm", height: "9,5 cm", weight: "650 g" },
      { id: "P", diameter: "15 cm", height: "11 cm", weight: "1 kg" },
      { id: "M", diameter: "22 cm", height: "12 cm", weight: "2,4 kg" },
      { id: "G", diameter: "26 cm", height: "12 cm", weight: "3,3 kg" },
    ],
  };
  const stepNames = [
    "Categoria",
    "Massa",
    "Recheio",
    "Tamanho",
    "Decoração",
    "Retirada",
    "Resumo",
  ];
  const storageKey = "malilis-cake-quote-v1";
  const empty = () => ({
    step: 0,
    category: "",
    sponge: "",
    filling: "",
    size: "",
    colours: "",
    theme: "",
    cakeText: "",
    fruit: false,
    topper: false,
    name: "",
    date: "",
    notes: "",
  });
  const $ = (selector) => document.querySelector(selector);
  const esc = (value) =>
    String(value).replace(
      /[&<>"']/g,
      (char) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[char],
    );
  const money = (value) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value / 100);
  const category = () =>
    catalogue.categories.find((item) => item.id === state.category);
  const sponge = () =>
    catalogue.sponges.find((item) => item.id === state.sponge);
  const filling = () =>
    category()?.fillings.find((item) => item[0] === state.filling);
  const size = () => catalogue.sizes.find((item) => item.id === state.size);
  const basePrice = () => category()?.prices[state.size];
  function minimumDate(now = new Date()) {
    const parts = Object.fromEntries(
      new Intl.DateTimeFormat("en-US", {
        timeZone: catalogue.timezone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
        .formatToParts(now)
        .map((part) => [part.type, part.value]),
    );
    const day = new Date(
      Date.UTC(
        Number(parts.year),
        Number(parts.month) - 1,
        Number(parts.day) + catalogue.leadDays,
      ),
    );
    return day.toISOString().slice(0, 10);
  }
  function validDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const parsed = new Date(`${value}T12:00:00Z`);
    return (
      !Number.isNaN(parsed.valueOf()) &&
      parsed.toISOString().slice(0, 10) === value &&
      value >= minimumDate() &&
      value <= "9999-12-31"
    );
  }
  function displayDate(value) {
    return value ? value.split("-").reverse().join("/") : "";
  }
  let state = empty();
  try {
    const saved = JSON.parse(sessionStorage.getItem(storageKey));
    if (saved && typeof saved === "object") {
      for (const key of Object.keys(state)) {
        if (typeof saved[key] === typeof state[key]) state[key] = saved[key];
      }
      state.step = Number.isInteger(state.step)
        ? Math.max(0, Math.min(6, state.step))
        : 0;
      for (const key of ["colours", "theme", "cakeText", "name", "notes"])
        state[key] = state[key].slice(0, key === "notes" ? 800 : 120);
      if (!category()) state.category = "";
      if (!category()?.sponges.includes(state.sponge)) state.sponge = "";
      if (!filling()) state.filling = "";
      if (!size()) state.size = "";
      const firstInvalid = firstInvalidStep();
      if (firstInvalid !== null && state.step > firstInvalid)
        state.step = firstInvalid;
    }
  } catch {
    /* The form works without browser storage. */
  }

  function save() {
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      /* No storage required. */
    }
  }
  function invalidStep(step) {
    if (step === 0 && !category())
      return "Escolha uma categoria para continuar.";
    if (step === 1 && !category()?.sponges.includes(state.sponge))
      return "Escolha a massa do seu bolo para continuar.";
    if (step === 2 && !filling())
      return "Escolha uma opção de recheio para continuar.";
    if (step === 3 && !size())
      return "Escolha o tamanho do seu bolo para continuar.";
    if (step === 5 && !state.name.trim())
      return "Conte seu primeiro nome para preparar o orçamento.";
    if (step === 5 && !validDate(state.date))
      return `Escolha uma data a partir de ${displayDate(minimumDate())}, com pelo menos 5 dias de antecedência.`;
    return "";
  }
  function firstInvalidStep() {
    for (const step of [0, 1, 2, 3, 5]) if (invalidStep(step)) return step;
    return null;
  }
  function showError(message) {
    $("#form-error").textContent = message;
    $("#form-error").hidden = false;
    const control =
      $("#step-content input:invalid") || $("#step-content input");
    if (control) {
      control.setAttribute("aria-invalid", "true");
      control.setAttribute(
        "aria-describedby",
        `${control.getAttribute("aria-describedby") || ""} form-error`.trim(),
      );
      control.focus();
    }
  }
  function heading(title, description) {
    return `<p class="cake-step-count">PASSO ${String(state.step + 1).padStart(2, "0")} / 07</p><h1 class="cake-step-title" id="step-heading" tabindex="-1">${title}</h1><p class="cake-step-description">${description}</p>`;
  }
  function option(group, id, name, description, extra = "") {
    const key = {
      category: "category",
      sponge: "sponge",
      filling: "filling",
      size: "size",
    }[group];
    if (group === "filling") {
      return `<label class="cake-option cake-option--filling"><input type="radio" name="filling" value="${esc(id)}" ${state.filling === id ? "checked" : ""} required><span class="cake-filling-visual"><img src="assets/recheios/${esc(id)}.webp" width="400" height="360" alt="" loading="lazy" decoding="async"></span><span class="cake-option__body"><span class="cake-option__name">${esc(name)}</span><span class="cake-option__description">${esc(description)}</span></span></label>`;
    }
    if (group === "sponge") {
      const image = catalogue.sponges.find((item) => item.id === id).image;
      return `<label class="cake-option cake-option--sponge" data-sponge="${esc(id)}"><input type="radio" name="sponge" value="${esc(id)}" ${state.sponge === id ? "checked" : ""} required><span class="cake-sponge-visual"><img src="${esc(image)}" width="300" height="250" alt="" decoding="async"></span><span class="cake-option__body"><span class="cake-option__name">${esc(name)}</span><span class="cake-option__description">${esc(description)}</span></span></label>`;
    }
    return `<label class="cake-option"><input type="radio" name="${group}" value="${esc(id)}" ${state[key] === id ? "checked" : ""} required><span class="cake-option__body"><span class="cake-option__name">${esc(name)}</span><span class="cake-option__description">${esc(description)}</span>${extra}</span>${group === "category" ? `<span class="cake-option__number" aria-hidden="true">0${catalogue.categories.findIndex((item) => item.id === id) + 1}</span>` : ""}</label>`;
  }
  function field(key, label, placeholder, options = {}) {
    const {
      required = false,
      type = "text",
      max = 120,
      hint = "",
      autocomplete = "",
    } = options;
    return `<div class="cake-field"><label for="${key}">${label}${required ? "" : " <span>(opcional)</span>"}</label><input id="${key}" name="${key}" type="${type}" value="${esc(state[key])}" ${required ? "required" : ""} ${type === "date" ? `min="${minimumDate()}" max="9999-12-31"` : `maxlength="${max}" placeholder="${esc(placeholder)}"`} ${autocomplete ? `autocomplete="${autocomplete}"` : ""} ${hint ? `aria-describedby="${key}-hint"` : ""}>${hint ? `<small id="${key}-hint">${hint}</small>` : ""}</div>`;
  }
  function extrasText() {
    return (
      [
        state.fruit ? "Frutas (sob consulta)" : "",
        state.topper ? "Topper personalizado (sob consulta)" : "",
      ]
        .filter(Boolean)
        .join(" e ") || "Nenhum extra solicitado"
    );
  }
  function reviewRows() {
    return [
      ["Categoria", category()?.name || "A escolher", 0],
      [
        "Massa",
        `${sponge()?.name || "A escolher"}${state.sponge === "chiffon" ? " (sabor a combinar)" : ""}`,
        1,
      ],
      ["Recheio", filling()?.[1] || "A escolher", 2],
      [
        "Tamanho",
        size()
          ? `${size().id} · ${size().diameter} de diâmetro × ${size().height} de altura\nPeso aproximado: ${size().weight}`
          : "A escolher",
        3,
      ],
      ["Acabamento", "Buttercream; decoração a combinar", 4],
      ["Cores", state.colours.trim() || "A combinar", 4],
      ["Tema", state.theme.trim() || "A combinar", 4],
      ["Texto no bolo", state.cakeText.trim() || "Não informado", 4],
      ["Extras", extrasText(), 4],
      ["Nome", state.name.trim(), 5],
      [
        "Retirada",
        `${displayDate(state.date)} · na Malili’s\nDisponibilidade e horário a confirmar`,
        5,
      ],
      ["Observações", state.notes.trim() || "Nenhuma observação", 5],
    ];
  }
  function message() {
    return `Olá, Malili’s! Sou ${state.name.trim()} e gostaria de solicitar um orçamento de bolo.\n\n${reviewRows()
      .map(([label, value]) => `${label}: ${value}`)
      .join(
        "\n",
      )}\n\nValor base do bolo: ${money(basePrice())}.\nPersonalizações, frutas e topper: sob consulta. Valor final e compatibilidade entre os componentes a confirmar.\n\nEstou ciente do prazo mínimo de 5 dias, da retirada na Malili’s em horário combinado e do sinal de 50% do valor total para confirmar o pedido. O saldo será pago conforme as condições combinadas.\n\nPodem confirmar a disponibilidade e o orçamento final?`;
  }
  function render() {
    const current = category();
    let html = "";
    if (state.step === 0) {
      html =
        heading(
          "Toda delícia tem<br>um <em>começo.</em>",
          "Primeiro, escolha a categoria. Cada uma tem seus próprios recheios, massas e valores.",
        ) +
        `<fieldset class="cake-choice-group"><legend class="sr-only">Escolha a categoria</legend><div class="cake-choices">${catalogue.categories.map((item) => option("category", item.id, item.name, item.description, `<span class="cake-option__meta">A partir de ${money(item.prices.PP)} <span>${item.fillings.length} opções de recheio</span></span>`)).join("")}</div></fieldset><p class="cake-notice">As combinações dependem das opções de cada categoria e da compatibilidade entre os componentes, confirmada pela Malili’s.</p>`;
    } else if (state.step === 1) {
      html =
        heading(
          "A base de tudo?<br>Uma boa <em>massa.</em>",
          `Para a categoria ${current.name}, ${current.id === "premium" ? "a massa é Chiffon. Selecione para continuar; o sabor será combinado com a gente." : "escolha a textura e o sabor que vão receber seu recheio."}`,
        ) +
        `<fieldset class="cake-choice-group"><legend class="sr-only">Escolha a massa</legend><div class="cake-choices cake-choices--sponges">${catalogue.sponges
          .filter((item) => current.sponges.includes(item.id))
          .map((item) => option("sponge", item.id, item.name, item.description))
          .join("")}</div></fieldset>`;
    } else if (state.step === 2) {
      html =
        heading(
          "O melhor fica<br><em>entre as camadas.</em>",
          `Conheça os recheios ${current.name}. Escolha uma composição do catálogo para o seu bolo.`,
        ) +
        '<p class="cake-illustration-note">Ilustrações dos recheios e seus ingredientes.</p>' +
        `<fieldset class="cake-choice-group"><legend class="sr-only">Escolha um recheio</legend><div class="cake-choices cake-choices--fillings">${current.fillings.map(([id, name, description]) => option("filling", id, name, description)).join("")}</div></fieldset><p class="cake-notice">Quer outra combinação? Conte nas observações ao final. A gente confirma as possibilidades pelo WhatsApp.</p>`;
    } else if (state.step === 3) {
      html =
        heading(
          "Um tamanho para<br>a sua <em>ocasião.</em>",
          `Estes são os valores base da categoria ${current.name}, com acabamento em buttercream. Os pesos são aproximados.`,
        ) +
        `<fieldset class="cake-choice-group"><legend class="sr-only">Escolha o tamanho</legend><div class="cake-choices cake-choices--sizes">${catalogue.sizes.map((item) => `<label class="cake-option"><input type="radio" name="size" value="${item.id}" ${state.size === item.id ? "checked" : ""} required><span class="cake-option__body"><span class="cake-size-letter">${item.id}</span><span class="cake-option__description">${item.diameter} de diâmetro × ${item.height} de altura<br>Peso: aprox. ${item.weight}</span><span class="cake-size-price">${money(current.prices[item.id])}</span></span></label>`).join("")}</div></fieldset><p class="cake-notice">Personalizações e decorações especiais podem alterar o valor final. A gente combina tudo antes de confirmar.</p>`;
    } else if (state.step === 4) {
      html =
        heading(
          "Agora, o seu<br><em>toque especial.</em>",
          "Todo bolo é finalizado em buttercream. Conte o que você imagina; os detalhes e valores da decoração serão combinados com a gente.",
        ) +
        '<figure class="cake-inspiration"><img src="assets/decoracao-buttercream.webp" width="850" height="1203" alt="Inspirações Malili’s: bolos com buttercream, flores, frutas, bicos decorativos e cores variadas" loading="eager"><figcaption>Bolos do nosso catálogo. Inspirações para conversar, sem reprodução ou preço garantidos.</figcaption></figure>' +
        `<div class="cake-field-grid">${field("colours", "Cores", "Ex.: rosa suave e creme")}${field("theme", "Tema ou ocasião", "Ex.: aniversário, flores")}</div>${field("cakeText", "Texto no bolo", "Ex.: Feliz aniversário, Maria!")}<fieldset class="cake-checks"><legend>Quer acrescentar algum extra?</legend><img class="cake-extras-photo" src="assets/extras.webp" width="600" height="664" alt="Bolos do catálogo com frutas frescas e topper de aniversário" loading="lazy"><label><input type="checkbox" name="fruit" ${state.fruit ? "checked" : ""}>Frutas <span>Sob consulta</span></label><label><input type="checkbox" name="topper" ${state.topper ? "checked" : ""}>Topper personalizado <span>Sob consulta</span></label></fieldset><p class="cake-notice">O acréscimo de frutas depende da fruta e do tamanho do bolo. Topper e outras personalizações têm orçamento próprio. Pode deixar os campos em branco se preferir decidir com a gente.</p>`;
    } else if (state.step === 5) {
      html =
        heading(
          "Para quem?<br>Para <em>quando?</em>",
          "Falta pouco. Conte seu primeiro nome e a data desejada para a retirada na Malili’s, em Curitiba.",
        ) +
        field("name", "Primeiro nome", "Como podemos chamar você?", {
          required: true,
          autocomplete: "given-name",
          max: 80,
        }) +
        field("date", "Data desejada para retirada", "", {
          required: true,
          type: "date",
          hint: `A partir de ${displayDate(minimumDate())}. Precisamos de pelo menos 5 dias de antecedência. Disponibilidade e horário serão confirmados pelo WhatsApp.`,
        }) +
        `<div class="cake-field"><label for="notes">Observações <span>(opcional)</span></label><textarea id="notes" name="notes" maxlength="800" placeholder="Outra combinação de recheio, detalhes da decoração ou algo que precisamos saber…">${esc(state.notes)}</textarea><small>Até 800 caracteres. Você poderá conferir tudo antes de abrir o WhatsApp.</small></div><p class="cake-notice"><strong>Como confirmamos a encomenda</strong><br>Após combinar o orçamento final e a disponibilidade, solicitamos um sinal de 50% do valor total. O saldo restante deve ser quitado conforme as condições combinadas no momento do pedido.</p>`;
    } else {
      html =
        heading(
          "Tem a sua cara?<br><em>Vamos conversar.</em>",
          "Confira as escolhas e envie seu pedido de orçamento. A gente confirma a disponibilidade, os detalhes e o valor final pelo WhatsApp.",
        ) +
        `<dl class="cake-review">${reviewRows()
          .map(
            ([label, value, step]) =>
              `<div class="cake-review__row"><dt>${label}</dt><dd><span>${esc(value)}</span><button type="button" data-edit="${step}" aria-label="Editar ${label.toLowerCase()}">Editar</button></dd></div>`,
          )
          .join(
            "",
          )}</dl><div class="cake-review-price"><span>Valor base do bolo</span><strong>${money(basePrice())}</strong></div><p class="cake-notice">Este é o valor base da categoria e do tamanho escolhidos. <strong>Personalizações e extras são sob consulta.</strong> A compatibilidade entre massa e recheio também será confirmada.</p><ul class="cake-terms"><li>Encomendas com pelo menos 5 dias de antecedência e sujeitas à disponibilidade.</li><li>Retirada na Malili’s em horário combinado.</li><li>Sinal de 50% do valor total para confirmar. Saldo conforme as condições combinadas.</li><li>Enviar esta mensagem é solicitar um orçamento. Seu pedido ainda precisa ser confirmado pela Malili’s.</li></ul><div class="cake-review-actions"><a id="whatsapp-link" class="cake-button cake-button--pink" href="https://wa.me/${catalogue.whatsapp}?text=${encodeURIComponent(message())}" target="_blank" rel="noopener noreferrer">Solicitar orçamento pelo WhatsApp <span aria-hidden="true">↗</span></a><button type="button" class="cake-copy" id="copy-summary">Copiar resumo do orçamento</button><p class="cake-success-message" id="copy-status" role="status"></p></div><div class="cake-copy-fallback cake-field" id="copy-fallback" hidden><label for="quote-text">Selecione e copie seu resumo</label><textarea id="quote-text" readonly>${esc(message())}</textarea><small>Envie para o WhatsApp (41) 99746-7645.</small></div>`;
    }
    $("#step-content").innerHTML = html;
    $("#form-error").hidden = true;
    $("#back").disabled = state.step === 0;
    $("#next").hidden = state.step === 6;
    $("#next").innerHTML =
      `${state.step === 5 ? "Conferir resumo" : "Continuar"} <span aria-hidden="true">→</span>`;
    $("#progress-bar").style.width =
      `${((state.step + 1) / stepNames.length) * 100}%`;
    $("#progress-label").textContent =
      `Passo ${state.step + 1} de 7 · ${stepNames[state.step]}`;
    $("#step-list").innerHTML = stepNames
      .map(
        (name, i) =>
          `<li ${i === state.step ? 'aria-current="step"' : ""}><span>${i < state.step ? "✓" : String(i + 1).padStart(2, "0")}</span>${name}</li>`,
      )
      .join("");
    renderSummary();
    save();
  }
  function renderSummary() {
    const rows = [
      ["Categoria", category()?.name],
      ["Massa", sponge()?.name],
      ["Recheio", filling()?.[1]],
      ["Tamanho", state.size],
      [
        "Extras",
        [state.fruit ? "Frutas" : "", state.topper ? "Topper" : ""]
          .filter(Boolean)
          .join(" + ") || (state.step >= 5 ? "Nenhum solicitado" : "Opcional"),
      ],
      ["Retirada", displayDate(state.date)],
    ];
    $("#summary-content").innerHTML =
      `<dl>${rows.map(([label, value]) => `<div><dt>${label}</dt><dd ${value ? "" : "data-empty"}>${esc(value || "A escolher")}</dd></div>`).join("")}</dl>`;
    $("#summary-price").textContent =
      basePrice() !== undefined ? money(basePrice()) : "A definir";
    $("#mobile-price").innerHTML =
      basePrice() !== undefined
        ? `Valor base<strong>${money(basePrice())}</strong>`
        : "";
  }
  function move(step) {
    state.step = step;
    render();
    $("#step-heading").focus({ preventScroll: true });
    $("#quiz").scrollIntoView({ behavior: "instant", block: "start" });
  }
  $("#cake-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const issue = invalidStep(state.step);
    if (issue) {
      showError(issue);
      return;
    }
    if (state.step === 6) return;
    if (state.step === 5) {
      const invalid = firstInvalidStep();
      if (invalid !== null) {
        move(invalid);
        showError(invalidStep(invalid));
        return;
      }
      state.name = state.name.trim();
    }
    move(state.step + 1);
  });
  $("#back").addEventListener("click", () => {
    if (state.step > 0) move(state.step - 1);
  });
  $("#cake-form").addEventListener("input", (event) => {
    const input = event.target;
    if (!(input.name in state)) return;
    const previous = state.category;
    state[input.name] = input.type === "checkbox" ? input.checked : input.value;
    if (input.name === "category" && previous !== state.category) {
      if (!category()?.sponges.includes(state.sponge)) state.sponge = "";
      state.filling = "";
      $("#cake-status").textContent =
        "Categoria alterada. Escolha novamente o recheio e confira a massa e o valor do bolo.";
    }
    $("#form-error").hidden = true;
    for (const invalid of document.querySelectorAll("[aria-invalid]"))
      invalid.removeAttribute("aria-invalid");
    renderSummary();
    save();
  });
  $("#step-content").addEventListener("click", async (event) => {
    const edit = event.target.closest("[data-edit]");
    if (edit) {
      move(Number(edit.dataset.edit));
      return;
    }
    if (event.target.closest("#whatsapp-link")) {
      const invalid = firstInvalidStep();
      if (invalid !== null) {
        event.preventDefault();
        move(invalid);
        showError(invalidStep(invalid));
        return;
      }
      // Refresh the message and validate dates again if the tab stayed open overnight.
      $("#whatsapp-link").href =
        `https://wa.me/${catalogue.whatsapp}?text=${encodeURIComponent(message())}`;
    }
    if (event.target.closest("#copy-summary")) {
      const invalid = firstInvalidStep();
      if (invalid !== null) {
        move(invalid);
        showError(invalidStep(invalid));
        return;
      }
      try {
        await navigator.clipboard.writeText(message());
        $("#copy-status").textContent =
          "Resumo copiado. É só colar na conversa com a gente.";
      } catch {
        $("#copy-fallback").hidden = false;
        $("#quote-text").value = message();
        $("#quote-text").focus();
        $("#quote-text").select();
        $("#copy-status").textContent = "Selecione e copie o texto abaixo.";
      }
    }
  });
  $("#restart").addEventListener("click", () =>
    $("#restart-dialog").showModal(),
  );
  $("#cancel-restart").addEventListener("click", () =>
    $("#restart-dialog").close(),
  );
  $("#confirm-restart").addEventListener("click", () => {
    state = empty();
    $("#restart-dialog").close();
    move(0);
    $("#cake-status").textContent =
      "Escolhas apagadas. Vamos montar um novo bolo.";
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) return;
    const dateInput = $("#date");
    if (dateInput) dateInput.min = minimumDate();
    if (state.step === 6 && firstInvalidStep() !== null) {
      move(firstInvalidStep());
      showError(invalidStep(state.step));
    }
  });
  render();
})();
