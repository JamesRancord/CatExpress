(() => {
    "use strict";

    /* ============================================================
       Имитация базы данных.
       В реальном проекте это был бы fetch() к серверу.
       ============================================================ */
    const DATABASE = {
        "2595-1685": { delivered: true },
    };

    const CODE_PATTERN = /^\d{4}-\d{4}$/;
    const FAKE_DELAY = 900; // мс — имитация запроса к серверу

    /* ============================================================
       SVG-коты — серебристый табби (как на фото):
       светло-серая шерсть, тёмные полоски, белая мордочка,
       розовый нос, зажмуренные глаза.
       ============================================================ */

    const CAT_HAPPY = `
        <svg viewBox="0 0 220 220" class="cat-hearts" role="img" aria-label="Радостный кот">
            <!-- сердечки -->
            <g class="heart h1">
                <path d="M40,60 C36,52 26,52 26,62 C26,72 40,80 40,80 C40,80 54,72 54,62 C54,52 44,52 40,60 Z"
                      fill="#ff8fa3" opacity="0.9"/>
            </g>
            <g class="heart h2">
                <path d="M180,52 C177,46 170,46 170,53 C170,60 180,66 180,66 C180,66 190,60 190,53 C190,46 183,46 180,52 Z"
                      fill="#ffb3c1" opacity="0.9"/>
            </g>
            <g class="heart h3">
                <path d="M186,110 C183,105 178,105 178,111 C178,117 186,122 186,122 C186,122 194,117 194,111 C194,105 189,105 186,110 Z"
                      fill="#ff8fa3" opacity="0.85"/>
            </g>

            <!-- хвост полосатый -->
            <path d="M158,168 Q194,160 184,116" stroke="#9c9891" stroke-width="11"
                  fill="none" stroke-linecap="round"/>
            <path d="M162,160 Q188,154 182,128" stroke="#7d7a76" stroke-width="4"
                  fill="none" stroke-linecap="round" opacity="0.6"/>

            <!-- тело -->
            <ellipse cx="110" cy="164" rx="52" ry="44" fill="#cfcac2"/>
            <!-- белая грудка -->
            <ellipse cx="110" cy="174" rx="34" ry="30" fill="#f7f3ec"/>

            <!-- уши с серой шерстью и розовой внутренностью -->
            <path d="M68,82 L60,36 L100,68 Z" fill="#cfcac2"/>
            <path d="M152,82 L160,36 L120,68 Z" fill="#cfcac2"/>
            <path d="M73,78 L69,50 L94,70 Z" fill="#d9b3ba"/>
            <path d="M147,78 L151,50 L126,70 Z" fill="#d9b3ba"/>
            <!-- тёмные кончики ушей -->
            <path d="M64,55 L60,36 L75,50 Z" fill="#9c9891" opacity="0.7"/>
            <path d="M156,55 L160,36 L145,50 Z" fill="#9c9891" opacity="0.7"/>

            <!-- голова -->
            <circle cx="110" cy="108" r="50" fill="#cfcac2"/>

            <!-- полоски на лбу — "М", как у табби -->
            <path d="M92,68 L96,84 L100,70 L104,86 L108,70 L112,86 L116,70 L120,84 L124,68"
                  stroke="#9c9891" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M78,78 L84,92" stroke="#9c9891" stroke-width="3" fill="none" stroke-linecap="round"/>
            <path d="M142,78 L136,92" stroke="#9c9891" stroke-width="3" fill="none" stroke-linecap="round"/>

            <!-- белая мордочка (нижняя половина лица) -->
            <path d="M78,112 Q110,96 142,112 Q148,132 130,148 Q110,158 90,148 Q72,132 78,112 Z"
                  fill="#f7f3ec"/>

            <!-- зажмуренные от счастья глаза — как на фото -->
            <path d="M82,102 Q92,94 102,102" stroke="#3a2a1e" stroke-width="3.5"
                  fill="none" stroke-linecap="round"/>
            <path d="M118,102 Q128,94 138,102" stroke="#3a2a1e" stroke-width="3.5"
                  fill="none" stroke-linecap="round"/>

            <!-- румяна под глазами -->
            <ellipse cx="80" cy="118" rx="8" ry="5" fill="#e5a0ac" opacity="0.4"/>
            <ellipse cx="140" cy="118" rx="8" ry="5" fill="#e5a0ac" opacity="0.4"/>

            <!-- розовый нос -->
            <path d="M104,120 L116,120 L110,128 Z" fill="#e6a3af"/>
            <path d="M104,120 L116,120" stroke="#c98895" stroke-width="1" stroke-linecap="round"/>

            <!-- улыбка -->
            <path d="M100,133 Q110,140 120,133" stroke="#3a2a1e" stroke-width="2.6"
                  fill="none" stroke-linecap="round"/>

            <!-- длинные белые усы, как на фото -->
            <line x1="58" y1="116" x2="96" y2="120" stroke="#f7f3ec" stroke-width="2" stroke-linecap="round"/>
            <line x1="56" y1="126" x2="96" y2="126" stroke="#f7f3ec" stroke-width="2" stroke-linecap="round"/>
            <line x1="60" y1="136" x2="96" y2="132" stroke="#f7f3ec" stroke-width="2" stroke-linecap="round"/>
            <line x1="162" y1="116" x2="124" y2="120" stroke="#f7f3ec" stroke-width="2" stroke-linecap="round"/>
            <line x1="164" y1="126" x2="124" y2="126" stroke="#f7f3ec" stroke-width="2" stroke-linecap="round"/>
            <line x1="160" y1="136" x2="124" y2="132" stroke="#f7f3ec" stroke-width="2" stroke-linecap="round"/>

            <!-- лапки -->
            <ellipse cx="92" cy="200" rx="16" ry="11" fill="#cfcac2"/>
            <ellipse cx="128" cy="200" rx="16" ry="11" fill="#cfcac2"/>
            <ellipse cx="92" cy="202" rx="8" ry="5" fill="#f7f3ec"/>
            <ellipse cx="128" cy="202" rx="8" ry="5" fill="#f7f3ec"/>
        </svg>
    `;

    const CAT_RUNNING = `
        <svg viewBox="0 0 260 180" class="cat-running" role="img" aria-label="Бегущий кот">
            <!-- линии скорости -->
            <line class="speed-line s1" x1="10" y1="60" x2="60" y2="60" stroke="#3d7fd6" stroke-width="3" stroke-linecap="round" opacity="0.5"/>
            <line class="speed-line s2" x1="4"  y1="90" x2="48" y2="90" stroke="#3d7fd6" stroke-width="3" stroke-linecap="round" opacity="0.5"/>
            <line class="speed-line s3" x1="16" y1="122" x2="56" y2="122" stroke="#3d7fd6" stroke-width="3" stroke-linecap="round" opacity="0.5"/>

            <!-- хвост с полосками -->
            <path d="M52,80 Q18,72 22,44" stroke="#9c9891" stroke-width="10"
                  fill="none" stroke-linecap="round"/>
            <path d="M48,74 Q24,68 26,52" stroke="#7d7a76" stroke-width="3"
                  fill="none" stroke-linecap="round" opacity="0.6"/>

            <!-- задние лапы -->
            <ellipse cx="72" cy="140" rx="18" ry="9" fill="#cfcac2" transform="rotate(-20 72 140)"/>
            <ellipse cx="82" cy="152" rx="16" ry="8" fill="#9c9891" transform="rotate(15 82 152)"/>

            <!-- тело — вытянутое -->
            <ellipse cx="120" cy="102" rx="58" ry="32" fill="#cfcac2"/>
            <ellipse cx="120" cy="110" rx="44" ry="20" fill="#f7f3ec"/>

            <!-- полоски на спине -->
            <path d="M96,78 Q100,86 96,94" stroke="#9c9891" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.8"/>
            <path d="M116,74 Q120,82 116,90" stroke="#9c9891" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.8"/>
            <path d="M136,78 Q140,86 136,94" stroke="#9c9891" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.8"/>

            <!-- передние лапы в прыжке -->
            <ellipse cx="176" cy="128" rx="17" ry="8" fill="#cfcac2" transform="rotate(30 176 128)"/>
            <ellipse cx="184" cy="140" rx="15" ry="7" fill="#9c9891" transform="rotate(50 184 140)"/>

            <!-- уши -->
            <path d="M158,68 L152,32 L184,58 Z" fill="#cfcac2"/>
            <path d="M200,66 L216,34 L216,64 Z" fill="#cfcac2"/>
            <path d="M162,64 L160,46 L180,60 Z" fill="#d9b3ba"/>
            <path d="M202,62 L210,46 L210,60 Z" fill="#d9b3ba"/>
            <path d="M156,50 L152,32 L168,46 Z" fill="#9c9891" opacity="0.7"/>
            <path d="M212,50 L216,34 L204,46 Z" fill="#9c9891" opacity="0.7"/>

            <!-- голова -->
            <circle cx="188" cy="90" r="38" fill="#cfcac2"/>

            <!-- полоски на лбу -->
            <path d="M176,60 L180,72 L184,62 L188,74 L192,62 L196,72 L200,60"
                  stroke="#9c9891" stroke-width="2.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>

            <!-- белая морда -->
            <path d="M162,96 Q188,86 214,96 Q218,112 204,124 Q188,130 172,124 Q158,112 162,96 Z"
                  fill="#f7f3ec"/>

            <!-- глаза сосредоточенные -->
            <circle cx="178" cy="86" r="5" fill="#3a2a1e"/>
            <circle cx="204" cy="86" r="5" fill="#3a2a1e"/>
            <circle cx="180" cy="84" r="1.6" fill="#fff"/>
            <circle cx="206" cy="84" r="1.6" fill="#fff"/>

            <!-- розовый нос -->
            <path d="M186,102 L194,102 L190,107 Z" fill="#e6a3af"/>

            <!-- приоткрытый рот -->
            <path d="M182,112 Q190,118 198,112" stroke="#3a2a1e" stroke-width="2"
                  fill="none" stroke-linecap="round"/>

            <!-- усы назад от ветра -->
            <line x1="150" y1="96" x2="172" y2="100" stroke="#f7f3ec" stroke-width="1.8" stroke-linecap="round"/>
            <line x1="150" y1="106" x2="172" y2="106" stroke="#f7f3ec" stroke-width="1.8" stroke-linecap="round"/>
            <line x1="226" y1="94" x2="240" y2="88" stroke="#f7f3ec" stroke-width="1.8" stroke-linecap="round"/>
            <line x1="226" y1="104" x2="240" y2="100" stroke="#f7f3ec" stroke-width="1.8" stroke-linecap="round"/>

            <!-- пол -->
            <line x1="60" y1="160" x2="90" y2="160" stroke="#3d7fd6" stroke-width="2" stroke-linecap="round" opacity="0.35"/>
            <line x1="140" y1="160" x2="180" y2="160" stroke="#3d7fd6" stroke-width="2" stroke-linecap="round" opacity="0.35"/>
            <line x1="200" y1="160" x2="230" y2="160" stroke="#3d7fd6" stroke-width="2" stroke-linecap="round" opacity="0.35"/>
        </svg>
    `;

    const CAT_SAD = `
        <svg viewBox="0 0 220 220" class="cat-sad" role="img" aria-label="Грустный кот">
            <!-- хвост опущен -->
            <path d="M62,180 Q28,186 34,206" stroke="#9c9891" stroke-width="10"
                  fill="none" stroke-linecap="round" opacity="0.9"/>
            <path d="M56,188 Q34,192 38,204" stroke="#7d7a76" stroke-width="3"
                  fill="none" stroke-linecap="round" opacity="0.6"/>

            <!-- тело — сгорбленное -->
            <ellipse cx="110" cy="166" rx="52" ry="42" fill="#cfcac2"/>
            <!-- белая грудка -->
            <ellipse cx="110" cy="176" rx="34" ry="28" fill="#f7f3ec"/>

            <!-- уши поникшие -->
            <path d="M68,84 L44,52 L98,72 Z" fill="#cfcac2"/>
            <path d="M152,84 L176,52 L122,72 Z" fill="#cfcac2"/>
            <path d="M73,80 L58,62 L94,74 Z" fill="#d9b3ba"/>
            <path d="M147,80 L162,62 L126,74 Z" fill="#d9b3ba"/>

            <!-- голова -->
            <circle cx="110" cy="110" r="50" fill="#cfcac2"/>

            <!-- полоски на лбу — "М" -->
            <path d="M92,72 L96,88 L100,74 L104,90 L108,74 L112,90 L116,74 L120,88 L124,72"
                  stroke="#9c9891" stroke-width="3.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>

            <!-- белая мордочка -->
            <path d="M78,114 Q110,100 142,114 Q148,134 130,150 Q110,160 90,150 Q72,134 78,114 Z"
                  fill="#f7f3ec"/>

            <!-- грустные глаза -->
            <path d="M82,104 Q92,112 102,104" stroke="#3a2a1e" stroke-width="3.5"
                  fill="none" stroke-linecap="round"/>
            <path d="M118,104 Q128,112 138,104" stroke="#3a2a1e" stroke-width="3.5"
                  fill="none" stroke-linecap="round"/>

            <!-- опечаленные брови -->
            <line x1="78" y1="90" x2="96" y2="96" stroke="#3a2a1e" stroke-width="2.4" stroke-linecap="round"/>
            <line x1="142" y1="90" x2="124" y2="96" stroke="#3a2a1e" stroke-width="2.4" stroke-linecap="round"/>

            <!-- розовый нос, чуть темнее -->
            <path d="M104,122 L116,122 L110,130 Z" fill="#d594a0"/>

            <!-- грустный рот -->
            <path d="M100,138 Q110,130 120,138" stroke="#3a2a1e" stroke-width="2.6"
                  fill="none" stroke-linecap="round"/>

            <!-- белые усы -->
            <line x1="58" y1="118" x2="96" y2="122" stroke="#f7f3ec" stroke-width="2" stroke-linecap="round"/>
            <line x1="56" y1="128" x2="96" y2="128" stroke="#f7f3ec" stroke-width="2" stroke-linecap="round"/>
            <line x1="162" y1="118" x2="124" y2="122" stroke="#f7f3ec" stroke-width="2" stroke-linecap="round"/>
            <line x1="164" y1="128" x2="124" y2="128" stroke="#f7f3ec" stroke-width="2" stroke-linecap="round"/>

            <!-- капелька -->
            <path class="tear"
                  d="M92,114 C92,114 88,120 88,124 C88,128 92,130 96,130 C100,130 104,128 104,124 C104,120 100,114 100,114 Z"
                  fill="#7db8e8" opacity="0"/>

            <!-- лапки поджаты -->
            <ellipse cx="92" cy="200" rx="16" ry="10" fill="#cfcac2"/>
            <ellipse cx="128" cy="200" rx="16" ry="10" fill="#cfcac2"/>
            <ellipse cx="92" cy="202" rx="8" ry="4" fill="#f7f3ec"/>
            <ellipse cx="128" cy="202" rx="8" ry="4" fill="#f7f3ec"/>
        </svg>
    `;

    /* ============================================================
       Ссылки на элементы
       ============================================================ */
    const form = document.getElementById("trackerForm");
    const input = document.getElementById("codeInput");
    const button = document.getElementById("checkBtn");
    const result = document.getElementById("result");
    const kittenBtn = document.getElementById("kittenBtn");
    const kittenPopup = document.getElementById("kittenPopup");

    /* ============================================================
       Котик в шапке — всплывашка «Молодец» по клику
       ============================================================ */
    let kittenTimer = null;

    function showKittenPopup() {
        if (!kittenPopup) return;
        kittenPopup.classList.remove("visible");
        // Форсим reflow, чтобы анимация перезапускалась при быстрых кликах
        void kittenPopup.offsetWidth;
        kittenPopup.classList.add("visible");

        clearTimeout(kittenTimer);
        kittenTimer = setTimeout(() => {
            kittenPopup.classList.remove("visible");
        }, 8000);
    }

    if (kittenBtn) {
        kittenBtn.addEventListener("click", showKittenPopup);
        kittenBtn.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
                e.preventDefault();
                showKittenPopup();
            }
        });
    }

    /* ============================================================
       Авто-форматирование ввода: XXXX-XXXX
       ============================================================ */
    input.addEventListener("input", (e) => {
        const digits = e.target.value.replace(/\D/g, "").slice(0, 8);
        e.target.value = digits.length > 4
            ? digits.slice(0, 4) + "-" + digits.slice(4)
            : digits;
        input.classList.remove("invalid");
    });

    /* ============================================================
       Отправка формы
       ============================================================ */
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        handleCheck();
    });

    async function handleCheck() {
        const code = input.value.trim();

        // Валидация
        if (!CODE_PATTERN.test(code)) {
            input.classList.remove("invalid");
            // Форсим перезапуск анимации shake
            void input.offsetWidth;
            input.classList.add("invalid");
            input.focus();
            return;
        }

        input.classList.remove("invalid");
        setLoading(true);
        result.innerHTML = "";

        // Имитация задержки запроса к серверу
        await new Promise((resolve) => setTimeout(resolve, FAKE_DELAY));

        const record = DATABASE[code];

        let html;
        if (!record) {
            html = renderNotFound(code);
        } else if (record.delivered) {
            html = renderDelivered(code);
        } else {
            html = renderInTransit(code);
        }

        result.innerHTML = html;
        setLoading(false);
    }

    function setLoading(isLoading) {
        button.disabled = isLoading;
        button.classList.toggle("loading", isLoading);
    }

    /* ============================================================
       Шаблоны результата
       ============================================================ */
    function renderDelivered(code) {
        return `
            <div class="result-card delivered">
                <div class="result-cat">${CAT_HAPPY}</div>
                <h2 class="result-title">Ваша посылка ожидает вас в почтовом ящике!</h2>
                <p class="result-text">Курьер-кот лично проследил, чтобы всё дошло в целости и сохранности. Мяу!</p>
                <span class="result-code">${code}</span>
            </div>
        `;
    }

    function renderInTransit(code) {
        return `
            <div class="result-card transit">
                <div class="result-cat">${CAT_RUNNING}</div>
                <h2 class="result-title">Передано в доставку</h2>
                <p class="result-text">Наш кот-курьер уже мчится к вам со всех лап. Немного терпения!</p>
                <span class="result-code">${code}</span>
            </div>
        `;
    }

    function renderNotFound(code) {
        return `
            <div class="result-card not-found">
                <div class="result-cat">${CAT_SAD}</div>
                <h2 class="result-title">Отправление не найдено</h2>
                <p class="result-text">Мы обыскали все коробки, но такого номера нигде нет. Проверьте, не ошиблись ли вы при вводе.</p>
                <span class="result-code">${code}</span>
            </div>
        `;
    }
})();