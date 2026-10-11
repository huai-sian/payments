# Payment 程式檢查

檢查日期：2026-10-11。範圍為工作區新版 `src/`、Vite/Yarn 設定、README、測試與既有部署設定；基底提交 `3b25c37`，本次未建立提交。以 `legacy-site-analysis.md` 與 `site-rebuild-spec.md` 為需求基準，來源快照保持不變。

## 結果

應用程式沒有已知未修正的 Critical/Major/Minor 缺陷。以下兩項檢查發現已修正；正式品牌素材屬外部輸入缺口，另列待驗收。沒有真實金流或訂單 API。

| ID | Severity | File / line | Page / state | Problem / evidence | Impact | Recommended fix | Resolution |
| --- | --- | --- | --- | --- | --- | --- | --- |
| CR-001 | Major | `src/components/orderConvenient.vue` 的 S7；`src/assets/main.css` 的 `.store-payment-info` | P4，桌機 | 初版將金額與超商上下排列；線上原站兩者左右並排，見 `live-orderconvenient-1440.png` | 破壞原本內容群組的欄位關係 | 恢復桌機並排，手機才堆疊 | 已修正；瀏覽器複驗涵蓋 1440/768 並排、390/320 堆疊，報告見 `verification.json` |
| CR-002 | Major | `.github/workflows/node.js.yml` | CI 設定 | 舊流程使用 `npm install`，與新 Yarn lock 不一致；PR 也會執行部署步驟 | 無法保證 CI 使用交付的依賴版本，PR 可能觸發非預期發佈 | 使用固定 Yarn/Node、frozen lockfile，部署限定 master 非 PR | 已修正並檢查條件；相同 install/test/build 已本機通過。遠端 workflow 未執行 |

## 檢查面向

| 面向 | 判定 / 證據 |
| --- | --- |
| 建置與路由 | `yarn build` 成功；五頁直接載入/刷新，根路徑與 `/Payment/` 子目錄通過。未知頁與 `/order` 導向確認頁，保留 query/fragment |
| 文字、結構、連結 | P1–P5 的 data-region 順序符合基準；C01–C17 對照原文字；L1–L6 本機導覽完成。完成彈窗文字改為可展開的示範區，符合 D6 |
| 靜態限制 | 沒有 fetch/axios/API、資料庫、SSR 或持久化信用卡資料；付款頁與結果頁有明確示範標示。瀏覽器執行期間沒有外部請求 |
| 技術棧 | Vue 3 + `<script setup>` + Vite + Yarn；只有 Vue/Vue Router 為執行依賴。純 template 元件不需空白 script 區塊 |
| 狀態與維護 | computed 統一總額，穩定商品 id，readonly 商品與集中更新方法；共用注意事項/付款方式/導覽抽出；未添加額外 store |
| 表單 | 必填、卡號格式、英文姓名、當月有效期、三碼 CVV、台灣手機格式；無效提交聚焦第一個錯誤，有 aria-invalid/錯誤說明；離頁後卡資料清空 |
| CSS/RWD | 共用 tokens、320/390/768/1440 無水平溢出，商品/付款/表單讀序不變；圖片保持比例；超商欄位關係已修正 |
| 可操作性 | 原生 link/button/select/radio、可見 focus、商品數量標籤、提示 button 的展開狀態，遵守 reduced motion |
| 資產 | A2–A7 載入正常，卡別 alt 與超商 visible label/radio name 補齊；未把預設 Vue logo 誤當商家品牌 |
| 既有工作保留 | 舊 src、使用者原本修改、舊測試與設定保存在 `evidence/legacy-source/`；原先缺少的 basicCreditCard.svg 未復原或引用 |

## 執行證據與限制

- `yarn install --frozen-lockfile --non-interactive`、`yarn build`、`yarn test`、`yarn test:browser`、`git diff --check`。
- 四組核心邏輯測試；瀏覽器五頁 × 四種寬度，另測數量變更後三種付款頁的相同金額、表單錯誤/有效提交、返回首頁、提示展開與資料不持久化。
- [瀏覽器檢查](evidence/verification.json)、[子目錄檢查](evidence/subpath-verification.json)、[線上來源複查](evidence/source-recheck.json)。
- 尚未取得正式 logo/背景圖，未驗收品牌替換。
- 未執行 Edge、Safari、實機觸控、螢幕閱讀器、遠端 GitHub Actions。僅有鍵盤與語意檢查，並非完整 WCAG 認證。

兩項 Major 已修正；Critical 0、未解決 Major 0、未解決 Minor 0。功能實作可供本機驗收；完整品牌驗收仍等待素材。
