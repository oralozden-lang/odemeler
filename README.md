# Ödemeler

Yaklaşan ve geciken ödemeleri takip etmek için telefonda çalışan küçük bir uygulama (PWA).

- **Adres:** https://oralozden-lang.github.io/odemeler/
- **Kurulum (Android):** Adresi Chrome'da açın, menüden **Uygulamayı yükle** / **Ana ekrana ekle**'ye dokunun.
- **Veriler:** Yalnızca telefonda saklanır; bu depoda hiçbir ödeme bilgisi yoktur. Sağ üstteki **⋯** menüsünden yedek alın.

## Dosyalar

| Dosya | Ne işe yarar |
|---|---|
| `index.html` | Uygulamanın tamamı (arayüz ve mantık) |
| `manifest.webmanifest` | Ana ekrana eklenince adı, ikonu ve rengi |
| `sw.js` | İnternetsiz çalışma. `index.html`, `sw.js` veya ikonlar değişince içindeki `VERSION` ve `index.html`deki `APP_VERSION` birlikte artırılmalı (⋯ menüsünün altında görünür); açık uygulama yeni sürümü bu sayede fark edip "Yenile" önerir |
| `icons/` | Uygulama ikonları |
| `lib/pdfjs/` | PDF okuyucu ([pdf.js](https://github.com/mozilla/pdf.js) 3.11.174, Apache-2.0). Yalnızca Bilgiler › Aggregator'da PDF seçilince yüklenir |
