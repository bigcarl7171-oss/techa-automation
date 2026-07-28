# 테차 매거진 — 발행 & SEO 체크리스트

**목표 변경 (2026-07-28)**: 애드센스 신청은 보류. 테차 매거진은 광고 수익이 아니라
**테차(프리저브드 플라워) 브랜드의 보조 사이트**로 검색 노출을 키우는 게 목적. 따라서
"애드센스 승인 기준"이 아니라 순수 검색 노출/브랜드 신뢰를 기준으로 글을 쓴다.

## 구조 원칙 (왜 게시판이 아닌가)
- DB·로그인 있는 게시판 없음. 글 하나 = 정적 HTML 파일 하나 (`/blog/<slug>/index.html`).
  사이트 전체가 빌드 과정 없는 정적 HTML이라 (`build-principles.md`), 이 원칙을 그대로 따른다.
- **글 목록(`/blog/index.html`)과 홈 티저(`index.html`의 `#magazine-teaser`)에 들어가는
  글 링크는 반드시 HTML 소스에 직접 작성한다. JS로 생성하지 않는다.**
  → 네이버 크롤러(Yeti)는 구글봇보다 JS 렌더링을 신뢰할 수 없게 처리한다. JS가
  런타임에 만들어내는 `<a>` 링크는 네이버가 아예 못 볼 수 있음. (2026-07-28 이전에는
  `site.js`의 `POSTS` 배열 + JS 렌더링 방식이었으나, 이 문제 때문에 정적 HTML 방식으로
  변경함 — `renderMagazineTeaser`/`renderMagazineList`/`POSTS` 삭제됨.)

## 새 글 발행 절차
1. `docs/blog-post-template.html`을 복사해 `/blog/<slug>/index.html`로 저장하고 `{{ }}` 채우기
   - slug: 영문 소문자 + 하이픈, 제목이 유추되게 (예: `preserved-flower-care`)
   - 본문 최소 500자, 실제 정보/경험 위주로 (짧고 성의없는 글은 순위에 불리)
   - **대표 이미지**: 실제 사진을 `/blog/<slug>/cover.jpg`로 함께 넣기. `alt` 텍스트에 핵심
     키워드를 자연스럽게 포함 (이미지 검색 유입 + 체류시간에 도움, 텍스트 순위엔 간접적 영향).
     사진이 아직 없으면 이미지 태그를 비워두지 말고, 준비되는 대로 채울 것 — 대표 이미지 없이
     발행하면 SNS 공유 미리보기도 기본 `og-default.png`로만 노출됨.
2. `/blog/index.html`의 `#magazine-grid` 안에서 `<div class="magazine-empty">...` 플레이스홀더를
   지우고, 대신 `<div class="grid post-grid">`로 감싼 카드를 추가 (최신 글이 위로):
   ```html
   <div class="grid post-grid">
     <a class="app-card post-card" href="/blog/<slug>/">
       <div class="emoji">🌸</div>
       <div class="name">{{글 제목}}</div>
       <div class="desc">{{한 줄 요약}}</div>
       <div class="post-date">{{YYYY-MM-DD}}</div>
     </a>
   </div>
   ```
   (플레이스홀더를 `.grid` 안에 넣지 말 것 — 카드 1개만 있을 때 그리드 트랙 폭에 눌려 좁게 보임.)
3. `index.html`의 `#magazine-teaser` 안 `.grid.post-grid`에도 같은 카드를 추가 —
   단, 홈 티저는 **최신 2~3개만** 유지하고 오래된 카드는 제거한다.
4. `sitemap.xml`에 새 URL 한 줄 추가 (`<url><loc>https://www.techa.kr/blog/<slug>/</loc>...`)
5. **구글**: Search Console → URL 검사 → 색인 생성 요청 (자동 크롤링을 기다리지 않고 직접 요청하면 반영이 빠름)
6. **네이버**: 서치어드바이저(searchadvisor.naver.com) → 요청 → 웹 페이지 수집 요청으로
   새 URL 제출. (사이트 최초 등록이 안 되어 있으면 아래 "최초 설정"부터.)
7. 내용과 관련된 기존 도구 페이지(예: 탄생화 계산기, 사이트 소개)에서 새 글로 가는
   내부링크를 최소 1개 추가 — 내부링크가 늘수록 두 검색엔진 모두 발견·평가가 빨라짐

## 네이버 서치어드바이저 최초 설정 (한 번만)
- searchadvisor.naver.com 접속 → 사이트 등록 → 소유 확인(HTML 파일 업로드 또는 메타태그) →
  사이트맵 제출 (`https://www.techa.kr/sitemap.xml`)
- 구글은 이미 `index.html`에 `google-site-verification` 메타태그로 인증 완료된 상태.

## 글감 우선순위
1. 시들지 않는 꽃(프리저브드 플라워) 관리법·활용법·선물 이야기 — 테차 본업과 직결
2. 테차 브랜드/도구 관련 소식 (신제품, 사이트 업데이트 등)
3. 도구 활용 팁 (테차 서랍의 계산기/추첨기 등과 연결되는 생활 정보성 글)
