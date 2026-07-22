# techa-cardnews

TECHA(프리저브드 플라워 브랜드, `smartstore.naver.com/itecha`)의 카드뉴스 자산 및 편집 대시보드.

## 파일 구성

- `card1.png` ~ `card5.png`, `card1_1.png`, `card4_1.png` — 원본 카드뉴스 이미지 7장 (수국/꽃말 시리즈 "Suspended Herbarium")
- `dashboard_template.html` — 편집 대시보드 소스. **이 파일을 고칠 것.**
- `build.js` — `dashboard_template.html`에 위 이미지 7장을 base64로 삽입해 `techa_dashboard.html`을 생성하는 Node 스크립트
- `techa_dashboard.html` — 빌드된 최종 대시보드 (약 3.5MB, `build.js`의 결과물). 브라우저로 바로 열어서 쓸 수 있음

## 대시보드 사용법

`techa_dashboard.html`을 브라우저에서 열면:

1. **원본 카드뉴스 갤러리** — 기존 5장 + 여름 테마 대체 버전 2장 확인 (읽기 전용)
2. **원고 편집** — 카드별 문구(소제목/헤드라인/본문/인용구)를 직접 수정. 수정하면 아래 디자인 미리보기에 실시간 반영됨. 원고 자동 생성 기능은 없음 — Claude와의 대화에서 초안을 받아 붙여넣는 방식. 카드별로 "다시 써주세요" 체크 + 메모를 남기면 하단 요약란에 모아서 표시되는데, 이 텍스트를 복사해서 Claude에게 보내면 재작성을 요청할 수 있음
3. **카드뉴스 스타일 리디자인** — 4가지 비주얼 템플릿(식물 채집 기록 / 에디토리얼 포스터 / 프레스드 페이퍼 / 가드너 에디토리얼) 중 선택. 05번 카드는 상품 사진을 드래그해서 넣을 수 있음
4. 각 카드 "PNG 저장" 버튼 또는 "전체 5장 다운로드"로 `01_<파일명>.png` ~ `05_<파일명>.png` 형식으로 내려받기

## 대시보드 소스를 고칠 때

```bash
# dashboard_template.html을 수정한 뒤
node build.js
# techa_dashboard.html이 재생성됨
```

외부 API/폰트/CDN을 전혀 쓰지 않는 순수 HTML5 Canvas 렌더링이라 인터넷 연결 없이도 동작함 (Claude Artifact로 게시할 때도 CSP가 외부 요청을 막기 때문에 이 구조를 유지해야 함).

## 다른 컴퓨터에서 이어서 작업하기

```bash
git clone https://github.com/bigcarl7171-oss/techa-cardnews.git
cd techa-cardnews
# techa_dashboard.html을 바로 열어서 쓰거나,
# dashboard_template.html을 고친 뒤 node build.js로 재생성
```
