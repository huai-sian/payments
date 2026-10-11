# Payment 新舊站比較

比較日期：2026-10-11。原站：[Payment](https://huai-sian.github.io/Payment/#/)，基準為 2026-10-07 的線上截圖/文字與本機原始碼快照；2026-10-11 重新核對五頁文字皆相同（`source-recheck.json`）。新版為此工作區 `3b25c37` 之後未提交的 Vue 3/Vite 重建，正式建置預覽 `http://127.0.0.1:4173/`。

瀏覽器 Chrome 155.0.8059.39。新舊配對以同 route、1440×1000 / 390×1000、初始商品數量、未展開提示為主；新版另檢查 768×1000、320×1000。舊版完成頁有自動彈窗，新版改為明確示範與可展開原提示文字，按 D6 評估，不以彈窗像素相似度驗收。

## 頁面及證據

| 頁面 | 相同舊/新 hash route | 桌機證據 | 手機證據 | 新版額外尺寸 |
| --- | --- | --- | --- | --- |
| P1 | `#/order/check` | [舊](evidence/live-check-1440.png) / [新](evidence/rebuilt-check-1440.png) | [舊](evidence/live-check-390.png) / [新](evidence/rebuilt-check-390.png) | 768、320 |
| P2 | `#/order/orderatm` | [舊](evidence/live-orderatm-1440.png) / [新](evidence/rebuilt-orderatm-1440.png) | [舊](evidence/live-orderatm-390.png) / [新](evidence/rebuilt-orderatm-390.png) | 768、320 |
| P3 | `#/order/ordercard` | [舊](evidence/live-ordercard-1440.png) / [新](evidence/rebuilt-ordercard-1440.png) | [舊](evidence/live-ordercard-390.png) / [新](evidence/rebuilt-ordercard-390.png) | 768、320 |
| P4 | `#/order/orderconvenient` | [舊](evidence/live-orderconvenient-1440.png) / [新](evidence/rebuilt-orderconvenient-1440.png) | [舊](evidence/live-orderconvenient-390.png) / [新](evidence/rebuilt-orderconvenient-390.png) | 768、320 |
| P5 | `#/order/paycomplete` | [舊](evidence/live-paycomplete-1440.png) / [新](evidence/rebuilt-paycomplete-1440.png) | [舊](evidence/live-paycomplete-390.png) / [新](evidence/rebuilt-paycomplete-390.png) | 768、320 |

五頁四寬度均有 DOM 區域順序、舊文字、圖片、連結、overflow 與重新整理檢查，見 [verification.json](evidence/verification.json)。人工檢視新版桌機/手機五頁，以及窄版/平板訂單頁；原站截圖配合原始碼和文字盤點核對。

## 結構與內容保留

| ID | Dimension | Page | Area / source IDs | Legacy | New Site | Status | Notes / expected-difference ID | Evidence | Recommended action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CMP-001 | 結構 | P1–P5 | 路由、L1–L6 | 五個 hash routes 與三種付款流程 | 一對一保留；返回/下一步/回首頁指向等價路由 | PASS | D1，空 href 換成可用連結 | verification.json、subpath-verification.json | 無 |
| CMP-002 | 結構 | P1 | G1/G2/S1/S2/G3/G4/G5 | 色帶→進度→確認→商品/總計→付款→注意→頁尾 | 相同順序與兩筆商品分組 | PASS | D2/D3，字體及控制項現代化 | check 配對圖、區域陣列 | 無 |
| CMP-003 | 結構 | P2 | S3/S4/G4/G6 | 說明→金額/銀行→注意→導覽 | 順序與桌機金額/銀行並排保留 | PASS | D2，手機仍先金額後銀行 | orderatm 配對圖 | 無 |
| CMP-004 | 結構 | P3 | S5/S6/G4/G6 | 金額/卡別卡片→五個欄位卡片→注意→導覽 | 兩張卡片與欄位順序保留；示範提示在表單內 | PASS | D5，提示可鍵盤/點擊展開 | ordercard 配對圖、hint 截圖 | 無 |
| CMP-005 | 結構 | P4 | S3/S7/G4/G6 | 說明→桌機金額/超商並排→注意→導覽 | 桌機並排、手機堆疊；四個商家順序不變 | PASS | CR-001 初版上下排已修正，不變更基準來接受缺陷 | orderconvenient 配對圖、座標斷言 | 無 |
| CMP-006 | 結構/靜態流程 | P5 | S8、C15/C16 | 訂單成立及付款期限；自動成功彈窗 | 保留文案、回首頁；明示未建立訂單，舊提示折疊呈現 | PASS | D6，避免示範被誤解為真實交易 | paycomplete 配對圖、展開文字檢查 | 無 |
| CMP-007 | 內容 | P1–P5 | C01–C17 | 原標籤、商品、說明、假文、銀行選項、頁尾 | 所有來源文字可在對應狀態找到；頁尾依線上 2020 | PASS | 未擅自改 ATM 超商說明或注意事項假文 | live-inventory.json 與 verification.json | 無 |
| CMP-008 | 資產 | P1–P4 | A2–A7 | 商品照、支付/卡別/超商圖片、兩套提示圖 | 同來源圖片；新 alt/可見標籤，所有圖片正常載入 | PASS | A1/A8 原未使用，保留檔案而不新增區塊 | verification.json、rebuilt-card-hint-* | 無 |
| CMP-009 | 互動 | P1–P4 | C04/C08/C11–C14 | 金額跨頁可能遺失；提示僅 hover；日期檢查不完整 | 統一總價、有效日期與格式檢查、原生選項與提示按鈕 | PASS | D3/D4/D5；垃圾桶維持不可刪除範例 | 4 組 unit tests、verification.json | 無 |

## 視覺現代化

| ID | Dimension | Page | Area / source IDs | Legacy | New Site | Status | Notes / expected-difference ID | Evidence | Recommended action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CMP-010 | 視覺 | P1–P5 | G1/G2/G5、D2 | 高彩度色帶、字體/灰色區塊不一致 | 沉穩六色色帶、深綠暖白、統一字級間距/圓角 | PASS | 字體/色彩允許變更，保留原區域角色 | 五頁桌機/手機新圖 | 無 |
| CMP-011 | 視覺/操作 | P1–P4 | S2/G3/S4/S6/S7 | 較小控制項、選中樣式不一致 | 按鈕/輸入區可辨識，選中有邊框/勾選/原生 radio | PASS | D2/D5，鍵盤 focus 可見 | 圖片、verification.json focus/hint 檢查 | 無 |
| CMP-012 | 響應式 | P1–P5 | G2/G3 與頁面內容 | 手機隱藏步驟文字，部分標籤擠壓 | 320–1440 保留步驟文案，商品列換行/商家網格堆疊 | PASS | D7，沒有用隱藏原內容換取整潔 | 20 狀態 overflow/文字檢查 | 無 |
| CMP-013 | 視覺/動態 | P1–P5 | 共用 CSS | 舊 route 淡入淡出、hover 提示 | 只有輕量背景/邊框變化；reduced-motion 關閉 | PASS | D2/D5，沒有新增裝飾性動畫 | CSS 檢查、0s transition 斷言 | 無 |

## 驗證差異與覆蓋缺口

D1–D7 已在實作/對照中核對；D8 正式 logo 與背景圖尚未提供，因此沒有拿預設 Vue logo 或商品照片代替。因缺少輸入而無法比較的品牌項列為「未驗證」，不是 PASS，也不當作已確定缺少來源圖像的 MISSING。

原站 768/320 未擷取，這兩尺寸僅核對新版的內容/讀序/可用性，不宣稱像素配對。Edge/Safari、行動實機、螢幕閱讀器與遠端部署尚未執行，列在 `test-cases.md`。子目錄部署只在本機模擬靜態伺服器驗證。

## 結論

按目前可驗證範圍，結構/內容保留通過，已知結構缺陷 CR-001 已修正；中性配色的視覺現代化通過，沒有未修正的阻斷視覺問題。

共 13 筆比較列：PASS 13、STRUCTURAL ISSUE 0、CONTENT ISSUE 0、VISUAL ISSUE 0、MISSING 0。這是報告列數，不是網站元素的覆蓋率。

整體建議：**INCOMPLETE**。可交付現有五頁與本機預覽，但技能合約要求的正式 logo/背景圖仍缺輸入，不能宣稱完整品牌驗收通過。取得素材後完成映射與對照；跨瀏覽器/實機待測項請依 `test-cases.md` 執行。建置與程式檢查結果另見 `code-review.md`，本報告不取代該檢查。
