#!/usr/bin/env node
/*
  전체 사이트(도구 페이지 + 매거진 글) 본문 텍스트를 훑어
  assets/data/search-index.json 을 생성한다.

  홈 검색창이 제목·설명뿐 아니라 각 페이지 본문 속 단어까지 찾도록
  하기 위한 정적 검색 인덱스 빌드 스크립트. 도구/글의 본문(HTML)이나
  ko/*, blog/*, assets/js/site.js의 APPS·POSTS 배열이 바뀌면
  다시 실행해야 한다: `node scripts/build-search-index.js`
*/
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function readSiteJsData() {
  const src = fs.readFileSync(path.join(ROOT, "assets/js/site.js"), "utf8");
  const appsSrc = src.match(/var APPS = (\[[\s\S]*?\]);/)[1];
  const catsSrc = src.match(/var CATS = (\{[\s\S]*?\});/)[1];
  const postsSrc = src.match(/var POSTS = (\[[\s\S]*?\]);/)[1];
  const APPS = new Function("return " + appsSrc)();
  const CATS = new Function("return " + catsSrc)();
  const POSTS = new Function("return " + postsSrc)();
  return { APPS, CATS, POSTS };
}

function extractArticleText(html) {
  const m = html.match(/<article[^>]*class="article"[^>]*>([\s\S]*?)<\/article>/);
  if (!m) return "";
  return m[1]
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function pageFilePath(urlPath) {
  // "/ko/lotto/" -> "ko/lotto/index.html"
  return path.join(ROOT, urlPath.replace(/^\//, ""), "index.html");
}

function build() {
  const { APPS, CATS, POSTS } = readSiteJsData();
  const entries = [];

  APPS.filter(function (a) { return a.status === "live"; }).forEach(function (a) {
    const file = pageFilePath(a.path);
    let body = "";
    if (fs.existsSync(file)) body = extractArticleText(fs.readFileSync(file, "utf8"));
    entries.push({
      emoji: a.emoji, title: a.name, desc: a.desc, path: a.path,
      tag: (CATS[a.cat] && CATS[a.cat].title) || "", body: body
    });
  });

  POSTS.forEach(function (p) {
    const file = pageFilePath(p.path);
    let body = "";
    if (fs.existsSync(file)) body = extractArticleText(fs.readFileSync(file, "utf8"));
    entries.push({ emoji: p.emoji, title: p.title, desc: p.desc, path: p.path, tag: "매거진", body: body });
  });

  const outDir = path.join(ROOT, "assets/data");
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, "search-index.json");
  fs.writeFileSync(outFile, JSON.stringify(entries), "utf8");
  console.log("search-index.json 생성: " + entries.length + "개 항목, " + fs.statSync(outFile).size + " bytes");
}

build();
