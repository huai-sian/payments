# 舊站分析

分析日期：2026-10-07。來源為使用者提供的 payment 專案工作目錄（包含尚未提交的改動），不是推測的線上站台。原始碼完整快照見 `evidence/legacy-source/src/`；套件與既有測試亦保留。舊版以 Vue CLI 在 http://127.0.0.1:4174/ 啟動，截圖記錄 1440×1000、390×1000。使用者本回合補充公開來源 https://huai-sian.github.io/Payment/#/ 。新品牌 logo 或背景圖尚未提供。

## 範圍與區域順序

五個 hash routes 全部納入；`/order`、未知路徑導向 `/order/check`。無巢狀內容頁以外的站內頁，沒有實際外部業務連結。未使用的 HelloWorld 範例頁與其文件連結不在範圍。

| 頁面 ID | 路徑 | 有序區域 |
|---|---|---|
| P1 | /order/check | G1 頂部六色色帶 → G2 訂單資訊及進度 → S1 確認訂單金額 → S2 訂單明細及總計 → G3 付款方式 → G4 注意事項 → G5 頁尾 |
| P2 | /order/orderatm | G1 → G2 → G3 → S3 繳款說明 → S4 應付金額、選擇銀行 → G4 → G6 返回/下一步 → G5 |
| P3 | /order/ordercard | G1 → G2 → G3 → S5 應付金額、支援使用卡種類 → S6 五個信用卡欄位及提示 → G4 → G6 → G5 |
| P4 | /order/orderconvenient | G1 → G2 → G3 → S3 → S7 應付金額、選擇超商 → G4 → G6 → G5 |
| P5 | /order/paycomplete | G1 → G2 → G3 → S8 完成文字及回首頁 → G5；進入時彈出 SweetAlert |

## 文字盤點

每一列包含的並列字串各自是必須保留的內容；重複內容以出現次數標示。證據皆位於快照對應 Vue 檔。

| 內容 ID | 區域 | 精確內容 | 證據 |
|---|---|---|---|
| C01 | G2 | 訂單資訊；Step1 選定支付方式；Step2 輸入信用卡資訊或取得支付代碼 | ProgressStep.vue |
| C02 | S1/S2 | 確認訂單金額；訂單編號：20200520 | Orderlist.vue |
| C03 | S2 | 精美商品；商品說明商品說明商品說明（各 2 次） | Orderlist.vue |
| C04 | S2 | 每項 $1000，初始數量 1；共2項；總計；$2000 | Orderlist.vue |
| C05 | G3 | 付款方式；ATM付款；信用卡付款；超商代碼付款 | Paymethods.vue |
| C06 | G4 | 注意事項；假文字假文字假文字假文字假文字，假文字假文字假文字假文字。（每個有注意事項頁面各 3 次） | Orderlist.vue、atm.vue、orderCard.vue、orderConvenient.vue |
| C07 | S3 | 需自行至超商機台輸入代碼，產生繳費單據後至櫃檯繳費。 | atm.vue、orderConvenient.vue；ATM 頁原文即如此，不擅改 |
| C08 | S4/S5/S7 | 應付金額；$2000（舊版硬編碼或預設） | 三個付款頁 |
| C09 | S4 | 選擇銀行；台灣銀行；第一銀行；華南銀行；土地銀行 | atm.vue |
| C10 | S5 | 支援使用卡種類；Visa、Mastercard、JCB 圖像 | orderCard.vue |
| C11 | S6 | 信用卡卡號；持卡人英文姓名；有效年月；安全驗證碼；手機號碼；xxxx-xxxx-xxxx-xxxx；MM/YY | orderCard.vue |
| C12 | S6 | 此欄位不可為空；請輸入正確號碼；請輸入正確卡號；請輸入正確日期 | main.js 自訂驗證 |
| C13 | S7 | 選擇超商；7-ELEVEN、全家、OK mart、萊爾富圖像 | orderConvenient.vue |
| C14 | G6 | 返回訂單；下一步 | 三個付款頁 |
| C15 | S8 | 訂單成立！；訂單請於兩天內完成匯款，逾期店家將有權取消訂單。；回首頁 | PayComplete.vue |
| C16 | S8 彈窗 | Complete!；We are working for your order!；OK | PayComplete.vue / SweetAlert |
| C17 | G5 | Copy right Company 2020 | 使用者提供的線上站台；本機快照為 2022，採線上版本 |

## 連結與操作盤點

| ID | 區域 / 標籤 | 原始目標 | 解析目的地與行為 |
|---|---|---|---|
| L1 | G3 / ATM付款 | href="" + router.push('/order/orderatm') | #/order/orderatm，同分頁 |
| L2 | G3 / 信用卡付款 | to='/order/ordercard' | #/order/ordercard，同分頁 |
| L3 | G3 / 超商代碼付款 | to='/order/orderconvenient' | #/order/orderconvenient，同分頁 |
| L4 | G6 / 返回訂單 | router.push('/order/check') | #/order/check，同分頁 |
| L5 | G6 / 下一步 | router.push('/order/paycomplete') | #/order/paycomplete；信用卡先驗證 |
| L6 | S8 / 回首頁 | router.push('/order/check') | #/order/check，同分頁 |

無 mailto、tel、下載、錨點及業務外連，無需重建外部網站。舊版載入 CDN 字型圖示、jQuery/Popper，屬實作相依，不是內容連結。

## 排版、互動與響應式

頂部滿版六色色帶；主區 Bootstrap container，進度水平分布。訂單列為圖片→名稱描述→數量→金額→裝飾垃圾桶；下方總計，再三個並排付款選項與注意事項。付款頁下半部灰底及置中白卡，信用卡金額/卡別與表單為上下兩張卡。完成頁仍有付款方式。

桌面付款表單寬 550px；576px 以下改成 96%，進度文字隱藏；768px 左右商品欄位堆疊。提示圖桌機 hover 出現，手機替換為 Mobile 圖，原本沒有鍵盤/觸控按鈕。超商圖片點擊切換框線，預設 711。銀行原生 select，預設 BKTW。数量加減限制 1–10，但超過上限會回到 1；直接輸入不更新 sum。跨頁總額事件可能遺失；ATM/信用卡金額固定 2000。垃圾桶沒有事件。信用卡年月僅比較年份，不完整驗證當月。完成頁無後端操作卻聲稱成功。

## 資產

| ID | 檔案（src/assets/ 下） | 用途 / 尺寸 / 替換狀態 |
|---|---|---|
| A1 | logo.png | 200×200 Vue 預設標誌，舊版未展示；不是已確認品牌 logo |
| A2 | images/hans-vivek-57eUYHIIIH0-unsplash.jpg | 商品照 1920×1277，兩列相同，原 alt 空白 |
| A3 | images/atm-machine.svg、credit-card.svg、store.svg | 三個支付方式圖像 |
| A4 | images/visa.svg、mastercard.svg、jcb.svg | 信用卡品牌標誌 |
| A5 | images/1055px-7-eleven_logo.svg.png (1055×1024)、ein_vi.jpg (200×200)、okmart_app_icon.jpg (3683×3683)、hilife.png (224×224) | 超商標誌 |
| A6 | images/Web_order_hit01.png、Web_order_hit02.png | 有效期/CVV 提示，150×60 |
| A7 | images/Mobile_order_hit01.png、Mobile_order_hit02.png | 手機提示，143×67 |
| A8 | images/atm.svg、1509483582.svg | 無被範圍內元件使用的資產 |

不存在已提供的背景圖；商品照不可誤認成品牌背景。basicCreditCard.svg 在工作區已刪除，留有 iCloud 佔位檔；目前程式沒有引用。保留使用者刪除狀態。

## 靜態限制與未知項

純前端沒有訂單建立、金流、簡訊、支付代碼取得；新版本需保留表單與流程並明確註明示範。完成文案保留為舊版展示內容，必須緊鄰「示範／未建立實際訂單」說明，不能表示實際交易成功。C16 商業成功彈窗需改為非交易示範呈現。正式品牌資產尚未取得；未證實實際收單銀行、支付時間或業務規則。注意事項為原有假文，沒有編造替代。

## 線上來源補充（實作前核對）

使用者指定 https://huai-sian.github.io/Payment/#/ 作為舊站。以 Chrome 檢查五個 route，1440×1000、390×1000，證據 `evidence/live-*.png` 與 `evidence/live-inventory.json`。線上版 L1–L3 的原始 href 皆為空字串，點擊由路由處理；新版提供等價 hash 連結。其餘內容以線上實測與本機原始碼互證；C17 以線上 2020 為準。初次擷取因 Vue 換頁動畫讀到過渡中的畫面，已改成每頁全新載入、等待各頁專屬元素與圖片完成，再重新擷取，不採用過渡結果作為基準。

## 2026-10-11 續作核對

重新載入線上五頁，等待各頁專屬元素（完成頁含 OK 彈窗）出現後取文字；五頁皆與 2026-10-07 保存的線上基準相同，見 `evidence/source-recheck.json`。來源盤點 C01–C17、L1–L6、A1–A8 保持不變。超商頁 S7 桌機的應付金額與超商選項為左右並排；手機上下堆疊，證據為 `live-orderconvenient-1440.png` 及舊版 `orderConvenient.scss`。
