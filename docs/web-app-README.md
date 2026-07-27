# 테차 툴즈 — 웹사이트 구현 노트

간단·편리 생활 도구 모음 사이트. 순수 정적(HTML/CSS/JS), 서버·빌드 불필요, client-side 처리.

## 폴더 구조
```
/index.html                 홈 허브(카테고리별 앱 그리드)
/assets/css/style.css       테차 브랜드 공통 스타일
/assets/js/site.js          공통 헤더/푸터/브레드크럼/광고슬롯 주입 + 앱 레지스트리
/ko/<slug>/index.html       각 앱 (1앱 = 1URL)
/privacy/index.html         개인정보처리방침(애드센스 필수, noindex)
/robots.txt · /sitemap.xml  SEO
```

## 현재 앱 (Wave 1 — 5/10)
| slug | 이름 | 카테고리 |
|---|---|---|
| age-calculator | 만 나이 계산기 | 날짜 |
| dday | D-Day 계산기 | 날짜 |
| char-counter | 글자수 세기 | 텍스트 |
| lotto | 로또 번호 추첨기 | 재미 |
| ladder | 사다리 타기 | 재미 |

남은 Wave 1: 메뉴룰렛, 단위변환, 날짜일수, 퍼센트, 근무일수 (roadmap 참고)

## 새 앱 추가 방법
1. `/ko/<slug>/index.html` 생성 (기존 앱 파일을 템플릿으로 복사)
2. `<head>` 메타(title/description/canonical/hreflang/JSON-LD) 수정
3. 도구 UI + 인라인 JS 구현 (AI 호출 없음, 순수 JS)
4. **설명 콘텐츠 300자+**(사용법·원리·예시·주의) 필수 — 애드센스 저품질 회피
5. `TECHA.initPage({title, desc, category, slug, related})` 호출
6. `assets/js/site.js`의 `APPS` 배열에 등록 (홈·관련링크 자동 반영)
7. `sitemap.xml`에 URL 추가

## 로컬 미리보기
```
python3 -m http.server 8000
# http://localhost:8000
```

## 배포 (권장: 무료 정적 호스팅)
- Cloudflare Pages / Vercel / Netlify / GitHub Pages 중 택1
- 루트를 그대로 배포. 빌드 명령 없음.
- 배포 후 `assets/js/site.js`의 `SITE.base`와 canonical/sitemap의 절대경로를 실제 도메인으로 갱신 권장.

## 애드센스 연동 (승인 후)
- `assets/js/site.js`의 `renderAdSlots()` 주석 위치에 광고 코드 삽입
- `<head>`에 AdSense 스니펫 추가
- 승인 전 준비: 앱 15~20개 + 각 설명 콘텐츠 + 개인정보처리방침(완료) + 문의 수단

## i18n 확장 (Phase 2)
- 영어판은 `/en/<slug>/`로 추가, `hreflang` 값 채움
- 글로벌 공용 앱(단위변환·글자수 등)부터. 한국 전용(만나이 등)은 제외
- 자세한 판단: `docs/i18n-decision.md`

## 브랜드 표준
- 색: 수국블루 #6E82A6 / 앰버 #EFB054(CTA) / 크림 #FAF7F1(배경) / 브라운 #3A322B(텍스트) / 그린 #7C8B6F
- 폰트: Pretendard(본문), Gowun Batang(헤드라인)
