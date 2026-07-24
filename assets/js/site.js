/* ===========================================================
   테차 유틸리티 — 공통 스크립트
   - 앱 레지스트리(홈/관련링크 공용)
   - 헤더/푸터/브레드크럼/광고슬롯 주입
   =========================================================== */
(function () {
  "use strict";

  // 사이트 기본 정보 (배포 시 도메인만 교체)
  var SITE = {
    name: "테차 툴즈",
    tagline: "간단하고 편리한 생활 도구 모음",
    base: "" // 예: "https://tools.example.com" (배포 후 채움)
  };

  // ---------- 앱 레지스트리 ----------
  // status: "live" | "soon"  /  cat: 카테고리 키
  var APPS = [
    { slug: "age-calculator", name: "만 나이 계산기", emoji: "🎂", cat: "date",
      desc: "생년월일로 만 나이·연 나이 계산", status: "live", path: "/ko/age-calculator/" },
    { slug: "dday", name: "D-Day 계산기", emoji: "📅", cat: "date",
      desc: "목표일까지 남은 날·100일·1000일", status: "live", path: "/ko/dday/" },
    { slug: "char-counter", name: "글자수 세기", emoji: "🔤", cat: "text",
      desc: "공백 포함/제외·바이트·단어수", status: "live", path: "/ko/char-counter/" },
    { slug: "lotto", name: "로또 번호 추첨기", emoji: "🎱", cat: "fun",
      desc: "1~45 랜덤 6개+보너스, 제외수 옵션", status: "live", path: "/ko/lotto/" },
    { slug: "ladder", name: "사다리 타기", emoji: "🪜", cat: "fun",
      desc: "내기·순서 정하기 랜덤 사다리", status: "live", path: "/ko/ladder/" },
    { slug: "menu-roulette", name: "오늘 뭐 먹지? 메뉴 룰렛", emoji: "🍽️", cat: "fun",
      desc: "메뉴 고민 끝, 랜덤 추천", status: "live", path: "/ko/menu-roulette/" },
    { slug: "unit-converter", name: "단위 변환기", emoji: "📏", cat: "calc",
      desc: "길이·무게·넓이·온도 등 변환", status: "live", path: "/ko/unit-converter/" },
    { slug: "percent", name: "퍼센트 계산기", emoji: "％", cat: "calc",
      desc: "비율·증감률·할인 3종 계산", status: "live", path: "/ko/percent/" },
    { slug: "date-diff", name: "두 날짜 사이 일수", emoji: "🗓️", cat: "date",
      desc: "날짜 차이·주·개월·년 환산", status: "live", path: "/ko/date-diff/" },
    { slug: "workdays", name: "근무일수 계산기", emoji: "💼", cat: "date",
      desc: "주말·공휴일 제외 근무일 계산", status: "live", path: "/ko/workdays/" },
    { slug: "bmi", name: "BMI 계산기", emoji: "⚖️", cat: "health",
      desc: "체질량지수·비만도 확인", status: "live", path: "/ko/bmi/" },
    { slug: "loan", name: "대출 이자 계산기", emoji: "🏦", cat: "money",
      desc: "원리금균등·원금균등 상환", status: "live", path: "/ko/loan/" },
    { slug: "vat", name: "부가가치세 계산기", emoji: "🧾", cat: "money",
      desc: "공급가↔합계 부가세 계산", status: "live", path: "/ko/vat/" },
    { slug: "margin", name: "마진율 계산기", emoji: "📈", cat: "money",
      desc: "판매가·원가로 마진 계산", status: "live", path: "/ko/margin/" },
    { slug: "compound", name: "복리 계산기", emoji: "💹", cat: "money",
      desc: "복리·적립 미래가치·72법칙", status: "live", path: "/ko/compound/" }
  ];

  var CATS = {
    date:   { title: "날짜·시간", emoji: "📆" },
    calc:   { title: "계산·변환", emoji: "🧮" },
    money:  { title: "금융·재테크", emoji: "💰" },
    health: { title: "건강", emoji: "💪" },
    text:   { title: "텍스트 도구", emoji: "✍️" },
    fun:    { title: "재미·추첨", emoji: "🎲" },
    life:   { title: "생활", emoji: "🏠" }
  };

  // ---------- 헤더 주입 ----------
  function renderHeader() {
    var el = document.getElementById("site-header");
    if (!el) return;
    el.className = "site-header";
    el.innerHTML =
      '<div class="wrap">' +
      '  <a class="logo" href="/">테<b>차</b> 툴즈</a>' +
      '  <nav class="header-nav"><a href="/">전체 도구</a></nav>' +
      '</div>';
  }

  // ---------- 브레드크럼 + 페이지 헤드 ----------
  // opts: { title, desc, category }
  function renderPageHead(opts) {
    var el = document.getElementById("page-head");
    if (!el) return;
    var cat = CATS[opts.category];
    var crumb = '<a href="/">홈</a> › ' +
      (cat ? '<a href="/#' + opts.category + '">' + cat.title + '</a> › ' : '') +
      '<span>' + opts.title + '</span>';
    el.innerHTML =
      '<div class="wrap">' +
      '  <div class="breadcrumb">' + crumb + '</div>' +
      '  <div class="page-head"><h1>' + opts.title + '</h1>' +
      (opts.desc ? '<p class="lead">' + opts.desc + '</p>' : '') + '</div>' +
      '</div>';
  }

  // ---------- 광고 슬롯 ----------
  // AdSense 승인 후 아래 자리에 광고 코드 삽입
  function renderAdSlots() {
    var slots = document.querySelectorAll(".ad-slot");
    slots.forEach(function (s) {
      if (!s.innerHTML.trim()) s.innerHTML = "광고 영역 (AdSense)";
      /* AdSense 예시:
         <ins class="adsbygoogle" style="display:block"
              data-ad-client="ca-pub-XXXX" data-ad-slot="YYYY"
              data-ad-format="auto" data-full-width-responsive="true"></ins> */
    });
  }

  // ---------- 관련 앱(내부 링크) ----------
  // slugs: 표시할 앱 slug 배열 (없으면 같은 카테고리 자동)
  function renderRelated(currentSlug, category, slugs) {
    var el = document.getElementById("related");
    if (!el) return;
    var list = slugs
      ? slugs.map(function (sg) { return byslug(sg); }).filter(Boolean)
      : APPS.filter(function (a) { return a.cat === category && a.slug !== currentSlug; });
    if (!list.length) { el.innerHTML = ""; return; }
    el.className = "related";
    el.innerHTML = '<h2>관련 도구</h2><div class="related-list">' +
      list.map(function (a) {
        return '<a href="' + a.path + '">' + a.emoji + " " + a.name + "</a>";
      }).join("") + "</div>";
  }

  // ---------- 푸터 주입 ----------
  function renderFooter() {
    var el = document.getElementById("site-footer");
    if (!el) return;
    el.className = "site-footer";
    el.innerHTML =
      '<div class="wrap">' +
      '  <a href="/">홈</a><a href="/privacy/">개인정보처리방침</a>' +
      '  <div class="disclaimer">본 사이트의 계산 결과는 참고용이며, 정확한 판단이 필요한 경우 전문가·공식기관에 확인하세요. © ' +
      new Date().getFullYear() + " 테차 툴즈</div>" +
      '</div>';
  }

  function byslug(sg) {
    for (var i = 0; i < APPS.length; i++) if (APPS[i].slug === sg) return APPS[i];
    return null;
  }

  // ---------- 홈 그리드 ----------
  function renderHome() {
    var el = document.getElementById("home-grid");
    if (!el) return;
    var html = "";
    Object.keys(CATS).forEach(function (key) {
      var apps = APPS.filter(function (a) { return a.cat === key; });
      if (!apps.length) return;
      html += '<h2 class="cat-title" id="' + key + '">' + CATS[key].emoji + " " + CATS[key].title + "</h2>";
      html += '<div class="grid">';
      apps.forEach(function (a) {
        var soon = a.status !== "live";
        html += '<a class="app-card' + (soon ? " soon" : "") + '" href="' + (soon ? "#" : a.path) + '">' +
          '<div class="emoji">' + a.emoji + "</div>" +
          '<div class="name">' + a.name + "</div>" +
          '<div class="desc">' + a.desc + "</div></a>";
      });
      html += "</div>";
    });
    el.innerHTML = html;
  }

  // ---------- 공통 초기화 ----------
  function initPage(opts) {
    opts = opts || {};
    renderHeader();
    if (opts.title) renderPageHead(opts);
    renderAdSlots();
    if (opts.slug) renderRelated(opts.slug, opts.category, opts.related);
    renderFooter();
  }

  window.TECHA = {
    SITE: SITE, APPS: APPS, CATS: CATS,
    initPage: initPage, renderHome: renderHome
  };
})();
