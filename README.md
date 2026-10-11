# Payment

以 [原始網站](https://huai-sian.github.io/Payment/#/) 為基準的付款流程重建。使用 Vue 3 Composition API、Vite、Yarn，保留訂單明細、ATM、信用卡、超商代碼與結果頁的內容及順序，更新桌機與手機介面。

本專案為純前端示範，不建立訂單、不扣款、不取得繳費代碼。信用卡表單請使用測試資料；資料僅存在目前頁面記憶體。數量與選項在切換頁面時保留，重新整理後回到範例初始值。

## 開發與建置

Node.js `^22.18.0 || >=24.12.0`，Yarn `1.22.19`。

```sh
yarn install --frozen-lockfile
yarn dev
```

開發網址以終端顯示為準，預設為 `http://127.0.0.1:5173/`。

```sh
yarn build
yarn preview --port 4173
```

正式建置輸出至 `dist/`；預覽網址為 `http://127.0.0.1:4173/`。

## 路由

- `#/order/check`：確認訂單
- `#/order/orderatm`：ATM付款
- `#/order/ordercard`：信用卡付款
- `#/order/orderconvenient`：超商代碼付款
- `#/order/paycomplete`：示範結果

Hash 路由配合相對資產路徑，可放在根目錄或 `/Payment/` 子目錄。直接開啟與重新整理不需要伺服器路由轉送。未知路由導向確認頁，保留查詢參數與頁內 fragment。

## 驗證

```sh
yarn test
# 另開終端執行 yarn preview --port 4173，再執行：
yarn test:browser
```

瀏覽器驗證使用已安裝的 Google Chrome；可透過 `BROWSER_CHANNEL` 指定其他 Playwright Chromium channel，透過 `PREVIEW_URL` 指定預覽來源。檢查五頁 × 四種寬度（1440、768、390、320）、文字與區塊順序、圖片、連結、數量、表單及示範結果，截圖與報告存於 `docs/evidence/`。跨瀏覽器與實機結果以測試文件列出的執行狀態為準。

## 專案結構

- `src/components/`：付款頁面與共享區塊
- `src/data/payment.js`：原始商品、銀行、超商與支付方式
- `src/composables/useOrder.js`：本機訂單狀態
- `src/utils/payment.js`：數量與表單驗證
- `src/assets/main.css`：視覺變數與響應式樣式
- `docs/legacy-site-analysis.md`：來源盤點
- `docs/site-rebuild-spec.md`：實作規格
- `docs/code-review.md`：程式檢查
- `docs/test-cases.md`：測試案例及實際執行狀態
- `docs/legacy-comparison.md`：新舊站對照

原 Vue 2 程式、既有未提交改動、測試及舊設定保留於 `docs/evidence/legacy-source/`，僅作來源證據，不參與新版建置。根目錄以 `yarn.lock` 為唯一使用中的鎖檔。

尚未提供替換用的正式 logo 與背景圖；目前採中性樣式，保留原站商品、支付、卡別及超商圖片。原站注意事項仍是原有假文，ATM 頁原有的超商說明也依來源保留。
