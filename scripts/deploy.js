#!/usr/bin/env node
/*
  배포 래퍼: 검색 인덱스를 최신 상태로 재생성한 뒤 wrangler로 배포한다.
  앞으로는 `npx wrangler deploy`를 직접 치지 말고 이 스크립트를 실행할 것:
    node scripts/deploy.js
*/
const { execSync } = require("child_process");

function run(cmd) {
  console.log("$ " + cmd);
  execSync(cmd, { stdio: "inherit" });
}

run("node scripts/build-search-index.js");
run("npx wrangler deploy");
