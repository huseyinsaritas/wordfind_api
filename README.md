# WordFind API

WordFind API, kelime bulma oyunu için geliştirilmiş bir REST API servisidir. NestJS framework'ü kullanılarak TypeScript ile geliştirilmiştir.

## Özellikler

- RESTful API endpoints
- Swagger API dokümantasyonu
- TypeScript desteği
- Modüler NestJS mimarisi
- Validation pipe ile veri doğrulama
- CORS desteği

## Gereksinimler

- Node.js (v18 veya üzeri)
- npm (v9 veya üzeri)

## Kurulum

1. Projeyi klonlayın
```bash
git clone [repository-url]
cd wordfind-api
```

2. Bağımlılıkları yükleyin
```bash
npm install
```

3. Ortam değişkenlerini ayarlayın
```bash
cp .env.example .env
```

4. .env dosyasını düzenleyin
```env
PORT=8000
# Diğer gerekli environment değişkenlerini ekleyin
```

## Geliştirme

Geliştirme modunda çalıştırmak için:
```bash
npm run start:dev
```

Uygulama varsayılan olarak http://localhost:8000 adresinde çalışacaktır.

## Production

Production build almak için:
```bash
npm run build
```

Production modunda çalıştırmak için:
```bash
npm run start:prod
```

## API Dokümantasyonu

API dokümantasyonuna Swagger UI üzerinden erişebilirsiniz:

1. Uygulamayı çalıştırın
2. Tarayıcınızda http://localhost:8000/api adresine gidin

Swagger UI özellikleri:
- Tüm API endpoint'lerini kategorilere göre görüntüleme
- Her endpoint için detaylı request/response şemaları
- API endpoint'lerini doğrudan test etme imkanı
- Endpoint filtreleme ve arama
- Request süre gösterimi

## Test

Unit testleri çalıştırmak için:
```bash
npm run test
```

E2E testleri çalıştırmak için:
```bash
npm run test:e2e
```

Test coverage raporu için:
```bash
npm run test:cov
```

## API Endpoint Kategorileri


- **/game** - Oyun yönetimi
- **/game-config** - Oyun konfigürasyonu
- **/user** - Kullanıcı yönetimi


## Lisans

[MIT lisansı](LICENSE) altında dağıtılmaktadır.

## İletişim

ayiyazilim Team - hsynsrtss@gmail.com

Proje Linki: [https://github.com/huseyinsaritas/wordfind_api](https://github.com/huseyinsaritas/wordfind_api)