# 배포 가이드 (무료)

이 사이트는 순수 정적 파일이라 **무료 호스팅**만으로 배포됩니다.
⚠️ HTML이 절대경로(`/assets`, `/ko`)를 쓰므로 **도메인 루트에서 서비스하는 호스트**를 써야 합니다.
→ Cloudflare Pages / Vercel / Netlify ✅ · GitHub Pages 프로젝트 사이트 ❌(하위경로라 경로 깨짐)

- 배포 브랜치: `claude/multi-app-landing-page-vsr0o9` (또는 main에 병합 후 main)
- 빌드 과정 없음 · 출력 폴더 = 저장소 루트

---

## 방법 A. Cloudflare Pages (추천 — 대역폭 무제한)

1. https://dash.cloudflare.com 가입(무료) → 로그인
2. 좌측 **Workers & Pages** → **Create application** → **Pages** 탭 → **Connect to Git**
3. GitHub 계정 연결 → 저장소 **techa-automation** 선택
4. 설정 입력:
   - **Production branch**: `claude/multi-app-landing-page-vsr0o9`
   - **Framework preset**: `None`
   - **Build command**: (비움)
   - **Build output directory**: `/`  (루트)
5. **Save and Deploy** → 1~2분 뒤 `https://<프로젝트명>.pages.dev` 주소 생성
6. 이후 이 브랜치에 push할 때마다 자동 재배포

## 방법 B. Vercel

1. https://vercel.com 가입(GitHub 계정으로) → **Add New → Project**
2. **techa-automation** 저장소 Import
3. Framework Preset: **Other** / Build & Output: 비움(정적)
4. Branch를 `claude/multi-app-landing-page-vsr0o9`로 지정 → **Deploy**
5. `https://<프로젝트명>.vercel.app` 생성

## 방법 C. Netlify

1. https://app.netlify.com 가입 → **Add new site → Import an existing project** → GitHub
2. **techa-automation** 선택 → Branch: `claude/multi-app-landing-page-vsr0o9`
3. Build command: 비움 / **Publish directory**: `.`
4. **Deploy** → `https://<프로젝트명>.netlify.app` 생성

---

## 배포 후 할 일 (순서대로)

1. **접속 확인**: 생성된 `.pages.dev` 주소로 홈 + 10개 앱 정상 동작 확인
2. **Google Search Console** 등록
   - https://search.google.com/search-console → URL 접두어에 배포 주소 입력 → 소유권 확인
   - **Sitemaps**에 `sitemap.xml` 제출 → 색인 시작
3. **콘텐츠 더 쌓기**: 애드센스 승인률을 위해 앱 15~20개까지 확충 권장 (Wave 2)
4. **Google AdSense 신청**
   - https://adsense.google.com → 사이트 추가(배포 주소) → 심사
   - 승인 후 `assets/js/site.js`의 `renderAdSlots()` 자리에 광고 코드 삽입 + `<head>`에 스니펫
5. **(선택) 도메인 연결**: 도메인 구입(연 1~2만원) 후 호스트 대시보드에서 Custom domain 연결
   - 연결 후 `sitemap.xml`·canonical의 경로를 실제 도메인 절대주소로 갱신 권장

---

## 참고: main 브랜치로 배포하고 싶다면
장기적으로는 기능 브랜치보다 `main` 배포가 깔끔합니다. 원하면 이 브랜치를 main에 병합(PR 머지)한 뒤,
위 호스트의 Production branch를 `main`으로 바꾸면 됩니다. (병합은 사용자 승인 후 진행)
