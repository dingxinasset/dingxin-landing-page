# 鼎欣 FB 廣告 Landing Page V2

本版已依鼎欣官方網站內容重製，補入：
- 鼎欣品牌理念
- 張奕晟 James 執行長介紹
- 洪晨瑋 Miki 首席顧問資格
- 洪瑄憶律師基本專業背景
- 五大服務領域
- 三項品牌價值
- 公司登記地與官方 Email
- AI 健檢 CTA、UTM 與 Meta Pixel 預留事件

## 建議網址
start.dingxinasset.com.tw

## 部署
將 index.html 部署至 Render Static Site、Cloudflare Pages、Netlify 或現有官網主機。

## Meta Pixel
在 index.html 搜尋 YOUR_PIXEL_ID，換成實際 Pixel ID 並解除註解。

## 下一個追蹤事件
V9.1 完成報告頁建議新增：
fbq('track', 'Lead');
或自訂事件 CompleteLegacyScan。


## V3 顧問照片版面
- 顧問照片縮小放在姓名與職稱左側。
- 桌機顯示 92 × 112 px；手機顯示 78 × 96 px。
- 請將正式照片放入 assets 資料夾，並依 assets/README.txt 命名。
- 尚未放照片時會顯示姓氏佔位，不會出現破圖。


## V4 更新
- 已嵌入三位顧問正式照片
- 照片已裁切及壓縮為 600×750 JPG，兼顧清晰度與頁面速度
- 桌機照片尺寸 104×126px
- 手機照片尺寸 82×100px
- 配置：James／Miki／洪瑄憶律師


## V5 修正
- 三張顧問照片已轉為 Base64 直接嵌入 index.html。
- 單獨開啟 HTML、手機預覽及部署後皆不再依賴 assets 相對路徑。


## V6 更新
- 已換上使用者最終確認的三張正式照片
- 張奕晟 James：正式深藍背景形象照
- 洪晨瑋 Miki：Family Office 辦公室形象照
- 洪瑄憶律師：正式灰底形象照
- 三張照片皆已裁切為 4:5 並直接嵌入 HTML
- 單獨開啟 index.html 也能正常顯示，不依賴 assets 路徑
- 手機照片尺寸調整為 88×110px
