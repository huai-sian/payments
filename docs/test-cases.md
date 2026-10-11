# Payment 測試案例

日期：2026-10-11。來源：`legacy-site-analysis.md`、`site-rebuild-spec.md`、`code-review.md`。此清單區分已執行與待執行項；清單本身不是通過證據。已有的邏輯及瀏覽器檢查來自重建實作驗證階段，本規劃階段未另擴增測試框架。

## 環境與測試資料

正式建置預覽：`http://127.0.0.1:4173/`。Chrome 155.0.8059.39（headless），viewport 1440×1000、768×1000、390×1000、320×1000。Edge、Safari、實機 iOS/Android 與螢幕閱讀器列為額外人工案例，尚未執行。

初始兩項商品各一件、單價 $1000、總價 $2000；數量範圍 1–10。表單使用測試卡號 `4111-1111-1111-1111`、`TEST USER`、次年 `12/YY`、`123`、`0912345678`。僅驗證格式，不使用真實付款資料。

`V` = `evidence/verification.json`；`S` = `evidence/subpath-verification.json`。圖片為 `evidence/rebuilt-{route}-{width}.png`，原版對照為 `evidence/live-{route}-{width}.png`。

## 案例

| ID | Area | Page / source IDs | Preconditions / viewport | Steps | Expected result | Priority | Execution status | Evidence / actual result |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SMK-001 | 建置 | 全站、D1 | 支援的 Node/Yarn | frozen install → test → build | 鎖檔一致、建置成功 | High | PASS | install/build 成功，4 組 unit tests 通過 |
| SMK-002 | 載入/刷新 | P1–P5 | 四種 viewport | 各 route 直接載入，再重新整理 | 頁面/圖片載入，沒有 runtime error | High | PASS | V，20 個 route/viewport 狀態 |
| SMK-003 | 子目錄 | P1–P5 | `/Payment/` 靜態伺服器 | 各 hash route 進入並刷新 | CSS/JS/圖片由同子目錄載入 | High | PASS | S，五頁通過 |
| NAV-001 | 付款導覽 | L1–L3、C05 | 全五頁 | 點 ATM、信用卡、超商 | 各到對應原 hash route；選中態正確 | High | PASS | V，href 與實際點擊 |
| NAV-002 | 返回/結果 | L4–L6、C14–C16 | 三種付款頁 | 返回訂單；再次進入→下一步→回首頁 | 頁面正確；信用卡無效時留原頁 | High | PASS | V，完整三種流程 |
| NAV-003 | query/fragment | 全站 | `#/missing?source=qa#keep`、`#/order?source=qa` | 載入未知頁並切換付款方式 | redirect 保留 query/fragment；付款導覽保留 query | High | PASS | V |
| NAV-004 | 外部與下載 | 無對應來源項 | 舊站 inventory | 核對 mailto/tel/download/外部業務連結 | 範圍無這些連結 | Low | NOT APPLICABLE | 原站無業務外連；CDN 非內容連結 |
| CNT-001 | 共用文案 | C01、C05、C17，G2/G3/G5 | P1–P5、四寬度 | 核對進度、付款標籤、頁尾 | 精確文字保留，頁尾為線上 2020 | High | PASS | V；source-recheck.json |
| CNT-002 | 訂單 | C02–C04、S1/S2 | P1 初始值 | 核對編號、兩項商品、描述、單價/總價 | 原文與數量初始值相同 | High | PASS | V |
| CNT-003 | 注意/ATM/超商 | C06–C09、C13，S3/S4/S7/G4 | P1–P4 | 核對 3 次注意事項、說明、四銀行、四超商 | 沒有新增業務文案；ATM 原超商說明仍保留 | High | PASS | V，加原始碼 inventory 對照 |
| CNT-004 | 信用卡/結果 | C10–C12、C14–C16 | P3/P5 | 檢查欄位與 placeholder；空白提交；展開舊提示 | 五欄順序與舊錯誤文字保留；結果及英文提示存在 | High | PASS | V，單元測試；舊英文提示位於 details |
| AST-001 | 保留資產 | A2–A5 | 五頁、四寬度 | 檢查商品、支付、卡別、商家圖 | 無破圖、不拉伸；圖像意義保留 | High | PASS | V，所有 img naturalWidth > 0；截圖 |
| AST-002 | 提示圖 | A6/A7、C11 | P3，1440/390 | 點開有效年月與 CVV 提示 | 各用正確桌機/手機圖片 | Medium | PASS | V、rebuilt-card-hint-* |
| AST-003 | 品牌替換 | logo/背景、D8 | 尚未提供素材 | 收到檔案後依規格放置並檢視裁切 | 使用指定素材，不誤用 Vue logo/商品圖 | High | BLOCKED | 輸入未提供；中性樣式不能視為通過 |
| LAY-001 | 區域順序 | P1–P5 全 G/S IDs | 五頁、四寬度 | 依 DOM 與畫面順序核對來源表 | 所有主要區域順序與群組相同 | High | PASS | V，每頁 data-region 陣列相同 |
| LAY-002 | 超商分欄 | P4、S7、CR-001 | 1440/768、390/320 | 比較金額與超商欄位座標 | 桌機左右並排；手機金額先、商家後 | High | PASS | V，新增座標斷言與重拍截圖 |
| VIS-001 | 視覺一致 | D2，各頁 | 桌機/手機 | 觀察字級、留白、按鈕/卡片、選中態 | 綠白 tokens 一致、標題與金額層級清楚 | Medium | PASS | 人工檢視五頁桌機/手機截圖 |
| RWD-001 | 窄螢幕 | D7，各頁 | 四寬度 | 檢查橫向溢出、步驟、欄位、付款標籤 | 無水平捲動；保留完整文字 | High | PASS | V；人工補查 320/768 訂單頁 |
| INT-001 | 數量 | P1、C04、D3 | 初始商品 | 加一；輸入 10/11/-1/3.9/空值/4 | 依序限制數量；金額即時計算 | High | PASS | V；邊界單元測試 |
| INT-002 | 跨頁金額 | P1→P2/P3/P4、C08 | 第一項 4 件 | 依序切換三種支付；刷新 | 切換皆 $5000；刷新重設 $2000 | High | PASS | V |
| INT-003 | 選項 | P2/P4、C09/C13 | 付款頁 | 選華南銀行/全家，進入下一步 | 選中資料與狀態正確，導向示範結果 | High | PASS | V |
| INT-004 | 信用卡驗證 | P3、C11/C12、D5 | 測試資料 | 空白/錯誤日期/非數字 CVV/錯手機→有效值 | 錯誤留頁；當月及未來年月可通過 | High | PASS | V + 4 組邏輯測試 |
| INT-005 | 靜態示範 | P2–P5、D6 | 開啟瀏覽器 network/storage | 執行全部付款流程，再回表單 | 無交易請求/儲存卡號；結果不聲稱真實交易 | High | PASS | V：externalRequests=[]；storage 空；卡號清空 |
| INT-006 | 不可刪除 | P1、D4 | 訂單列 | 檢查垃圾桶與 disabled | 顯示範例不可刪除，無假操作 | Medium | PASS | 原始碼與畫面核對 |
| A11Y-001 | 鍵盤/焦點 | 全站、D5/D7 | 鍵盤 | Tab 導覽；Enter 展開提示；空白提交 | focus 可見，提示展開，錯誤聚焦第一欄 | Medium | PASS | V |
| A11Y-002 | 語意/名稱 | C01/C11/C13 | 元件原始碼與 DOM | 檢查 label、aria-current、radio 名稱、alt | 輸入有名稱，進度與選中態可辨識 | Medium | PASS | 原始碼檢查；不代表螢幕閱讀器實測 |
| A11Y-003 | 減少動畫 | 全站 | prefers-reduced-motion: reduce | 查詢控制項 transitionDuration | 動畫關閉 | Medium | PASS | V，0s |
| A11Y-004 | 讀屏/縮放 | 全站 | VoiceOver/NVDA、200% zoom | 完整流程與錯誤朗讀/縮放核對 | 無資訊遺失、語音順序清楚 | Medium | NOT RUN | 尚未執行讀屏及瀏覽器縮放測試 |
| BRW-001 | Chrome | P1–P5 | 已列出的 Chrome 四寬度 | 核心路由、數量、付款流程 | 與規格一致 | High | PASS | V |
| BRW-002 | Edge/Safari | P1–P5 | 原生 Edge、Safari | 重複 NAV/INT/RWD 案例 | 與 Chrome 行為相同 | Medium | NOT RUN | 未開啟上述瀏覽器 |
| BRW-003 | 行動實機 | P1–P5 | iOS/Android 實機 | 觸控、軟鍵盤、表單與提示 | 不遮擋操作、欄位可用 | Medium | NOT RUN | 窄 viewport 不能取代實機測試 |
| SMK-004 | 遠端部署 | CI、D1 | GitHub Actions | 授權發佈後檢查 master 流程與線上網址 | 正確使用 Yarn、網站資產正常 | Medium | NOT RUN | 僅修改設定，未 push/部署 |

## 覆蓋追蹤與差異

- P1–P5：SMK-002、NAV-001/002、LAY-001、RWD-001。
- C01–C17：CNT-001–004；L1–L6：NAV-001/002。原樣假文及 ATM 的超商說明不擅自改寫。
- A2–A7：AST-001/002；A1/A8 原本未使用，保留檔案但不加入新區塊。正式替換品牌資產：AST-003。
- D1：SMK-001/003/004；D2：VIS-001；D3：INT-001/002；D4：INT-006；D5：INT-004、AST-002、A11Y-001；D6：INT-005；D7：RWD-001；D8：AST-003。
- 原成功彈窗改為有示範標示的可展開文字、觸控提示、disabled 刪除、統一數量狀態都屬事前規格列明差異，不以像素相同為要求。
- 素材、跨瀏覽器、實機、讀屏與遠端執行缺口仍如上表；未執行項沒有標記 PASS。
