# Payment 重建規格

## 範圍與來源

以 `legacy-site-analysis.md` C01–C17、L1–L6、A1–A8 為基準，五頁全數重建。使用者要求重建現有專案，未指定不同頁面；保留工作區原有改動快照。使用者已補充線上來源 https://huai-sian.github.io/Payment/#/ ，C17 依線上版本保留 2020。沒有另行提供 logo/背景，相關驗收待素材提供。先完成不依賴素材的實作；不把 Vue logo 當成商家品牌、不把商品照擴大成背景。

## 路由與結構

Vue Router hash 模式，既有五個 `/order/*` 路徑一對一保留。`/order` 與未知路徑導向確認頁並保留 query/hash。Vite base `./`，可部署在 `/Payment/` 或根目錄，使用 `index.html#/order/...` 直接進入/刷新。主區順序完整沿用分析 P1–P5 的區域表。header 維持色帶角色，footer 維持 C17；不加側欄、不重組訂單摘要。

## 組件與資料

`Orders.vue` 包含頂部、進度區、route-view、頁尾；五個 route views 保留既有組件名稱。共享 PaymentTop、ProgressStep、Paymethods、PaymentFooter、OrderNotice、PaymentActions。`src/data/payment.js` 管理可重用靜態文案、銀行/商家/付款方式；`src/composables/useOrder.js` 使用模組內 reactive 狀態及 computed 金額，沒有額外 store。信用卡資料只存在頁面生命週期，不存入 localStorage/sessionStorage、不送往網路。

C01–C17 使用原文，唯一系統性補充為示範提示、操作輔助文字、無障礙標籤。C16 原彈窗文字放在完成展示區的折疊「舊版提示文字」內，保留內容但不再彈出誤導交易成功的視窗。C15 前方與緊鄰段落清楚標示純示範；保留兩天付款文案並註明是原頁展示。

## 資產映射

A2 原位用在兩項商品，80×88，object-fit cover，alt 精美商品。A3 原圖用於三個付款卡片，32–38px、contain。A4 三種卡標及 A5 四種商家原圖保持比例，卡別 alt 標示品牌；超商選項以可見文字及 radio 的 accessible name 標示品牌，重複的商標圖片使用空 alt。A6/A7 用 picture 於 576px 切換，提示以可鍵盤/觸控開關的 button 控制。A1/A8 保留檔案但不加入原本不存在的品牌區域。未提供的 logo/背景列為待補，不自創品牌圖。

## 視覺與響應式

暖白頁面 #f6f7f3、白卡片、主文字 #243b35、次文字 #65726d、深綠 #24594a、淺綠 #edf3ee，邊框 #dce3dc；accent 使用原六段色帶的沉穩版本。字體系統 sans-serif + 繁中 fallback；文字 14/16/20/32px、數字 tabular。主容器 960px、表單 620px；間距 8/12/16/24/32/48、圓角 10/16px，極輕陰影。按鈕至少 44px。選項 hover/focus/selected 有文字與邊框區別。頁首進度 01/02/03 與三步清楚標示（第三步補充示範結果），手機保留進度文字與讀序。320–576 手機商品列堆疊、付款方式仍三欄但縮短裝飾間距、表單單欄；768 平板容器自適應；1440 桌面。尊重 prefers-reduced-motion。

## 靜態互動與預期差異

| ID | 範圍 | 舊版 | 計畫變更 | 原因 / 保留不變量 | 驗證 |
|---|---|---|---|---|---|
| D1 | 全站 | Vue 2 CLI、Bootstrap、jQuery | Vue 3 script setup、Vite、Yarn 1.22.19、集中式共用 CSS | 指定技術棧；五頁及區域不變 | build / routes |
| D2 | 全站視覺 | 六個高彩度區塊、灰卡片 | 沉穩六色色帶、綠白配色、統一間距 | 現代化；主區域及排列不變 | 三種 viewport |
| D3 | S2 / 金額 | 超界回 1、手動輸入金額不變、跨頁金額遺失 | 整數 1–10 夾限，computed 金額跨 route 保留；刷新重設樣本 | 修正本地操作；商品及價格不變 | 1/10/負數/空值/小數/付款頁 |
| D4 | S2 垃圾桶 | 無動作 icon | 保留視覺，disabled 並提示範例商品不可刪除 | 不憑空新增刪單功能 | 鍵盤及標籤 |
| D5 | S6 | hover 提示、驗證不完整 | 可觸控/鍵盤開關；有效月份含當月、數字三碼 CVV、09 手機、英文姓名 | 操作改善；五欄順序與原圖不變 | invalid/valid 表單 |
| D6 | S8 | 自動成功彈窗 | 清楚標示未送出交易，原提示文案可展開查看 | 靜態合約；原結果區與回首頁不變 | 無外送網路請求 |
| D7 | G2 / 手機 | 隱藏步驟標籤 | 保留簡潔可讀標籤、aria-current | 同一三步流程 | 320/390/768 |
| D8 | 品牌素材 | 未提供替換 logo/背景 | 保留中性樣式，待資產提供再映射 | 不捏造品牌 | 未滿足，交付註明 |

## 驗收

- `yarn install --frozen-lockfile`、`yarn build` 成功；只有 Yarn 為活躍鎖檔。
- 五路由皆能直接載入與刷新，L1–L6 導覽有效，query 保留；沒有 runtime error/破圖。
- C01–C17、A2–A7 皆可於相應狀態找到，P1–P5 區域順序相同。
- 1440、768、390、320 寬度沒有非預期水平捲動/遮擋，鍵盤焦點可見；付款方式/數量/提示/表單有效。
- 數量修改在三種付款頁呈現同一金額，無真實 API，結果明確為示範。
- 五份文件及舊新對照證據完整；品牌素材未提供不列為已通過。

## 技術參考

查核官方 [Vue 快速開始](https://vuejs.org/guide/quick-start.html) 與 [Vite 入門](https://vite.dev/guide/)；目前環境 Node 24.21.0、Yarn 1.22.19，使用安裝時解析且 lockfile 固定的相容版本。

## 實作及實測記錄

實作日期：2026-10-11。所有五頁完成；依既有線上路徑對應：

| 舊頁 / 新頁（不變） | 實作 | 結構來源 |
| --- | --- | --- |
| `/order/check` | `Orderlist.vue` | P1，G1→G2→S1→S2→G3→G4→G5 |
| `/order/orderatm` | `atm.vue` | P2，G1→G2→G3→S3→S4→G4→G6→G5 |
| `/order/ordercard` | `orderCard.vue` | P3，G1→G2→G3→S5→S6→G4→G6→G5 |
| `/order/orderconvenient` | `orderConvenient.vue` | P4，G1→G2→G3→S3→S7→G4→G6→G5 |
| `/order/paycomplete` | `PayComplete.vue` | P5，G1→G2→G3→S8→G5 |

- 使用 Vue 3.5.43、Vite 8.3.3、Vue Router 4，以 `yarn.lock` 固定版本。舊程式、既有未提交改動、npm lock、測試與設定移至 `docs/evidence/legacy-source/`，不參與新版建置。
- 舊 SCSS/Bootstrap/jQuery/事件匯流排由 CSS tokens、Vue Router 與模組本機狀態取代。商品數量限制 1–10，總價跨頁一致；表單驗證接受當月有效期。驗證只檢查示範格式，不聲稱驗證真實卡片。
- 保留原六色色帶、卡片分組、頁序與所有舊站文字。超商 S7 桌機保持金額/選項左右並排，手機以相同讀序堆疊。超商選項改用原生 radio，可使用方向鍵。
- `yarn install --frozen-lockfile`、`yarn build` 成功；`yarn test` 四組邊界/驗證測試通過。
- 正式預覽 `http://127.0.0.1:4173/`，Chrome 155.0.8059.39。五頁 × 1440/768/390/320 寬度，直接進入、刷新、資產、區塊順序、舊文案與完整本機流程均已檢查，證據見 `evidence/verification.json`。檢查過程無 runtime error、無外部請求、無表單交易請求。
- 模擬靜態伺服器的 `/Payment/` 子目錄五頁直接進入、刷新及圖片通過，見 `evidence/subpath-verification.json`。
- `.github/workflows/node.js.yml` 改用 Yarn 固定鎖檔、Node 24、測試及建置；既有 master 部署流程保留，PR 僅建置不發佈。未觸發遠端 workflow 或發佈網站。
- 人工視覺核對桌機與手機五頁，補查平板/320 訂單頁；其餘尺寸有 DOM、文字、資產與 overflow 檢查及截圖。未以截圖像素相似度判定成敗。
- 正式 logo/背景圖仍待提供；Edge、Safari、真實行動裝置與螢幕閱讀器未執行，不宣稱全瀏覽器或全無障礙驗收通過。


最終複驗：超商 S7 分欄修正後，`yarn test:browser` 130 項檢查通過、20 個畫面狀態全部通過，最終證據已覆蓋初版截圖。
