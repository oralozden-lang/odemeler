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
| `sw.js` | İnternetsiz çalışma. `index.html` değişince içindeki `VERSION` artırılmalı |
| `icons/` | Uygulama ikonları |
