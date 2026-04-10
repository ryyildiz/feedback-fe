# Feedback Hub

> Müşteri deneyim geri bildirimlerini toplayan, AI ile analiz eden ve Jira'ya aktaran kurumsal React uygulaması.

---

## İçindekiler

- [Genel Bakış](#genel-bakış)
- [Ön Koşullar](#ön-koşullar)
- [Teknoloji Yığını](#teknoloji-yığını)
- [Proje Yapısı](#proje-yapısı)
- [Ekranlar & Roller](#ekranlar--roller)
- [API Entegrasyonu](#api-entegrasyonu)
- [State Yönetimi](#state-yönetimi)
- [Bileşen Mimarisi](#bileşen-mimarisi)
- [Ortam Kurulumu](#ortam-kurulumu)
- [Kurulum & Çalıştırma](#kurulum--çalıştırma)
- [Geliştirici Araçları](#geliştirici-araçları)
- [Testler](#testler)
- [Mimari Kararlar](#mimari-kararlar)

---

## Genel Bakış

Feedback Hub, kullanıcıların uygulama ekranlarında anlık geri bildirim bırakmalarını; deneyim ekiplerinin bu bildirimleri takip etmelerini ve Gemini AI ile analiz başlatmalarını; ürün/planlama ekiplerinin ise AI'ın grupladığı görevleri Jira'ya aktarmasını sağlayan üç katmanlı bir kurumsal araçtır.

---

## Ön Koşullar

Projeyi yerel ortamda çalıştırmadan önce aşağıdakilerin kurulu olması gerekir:

| Araç | Minimum Versiyon | Kurulum |
|---|---|---|
| **Node.js** | 24.12.0 | [nodejs.org](https://nodejs.org) |
| **npm** | 10.x | Node.js ile birlikte gelir |
| **Git** | 2.x | [git-scm.com](https://git-scm.com) |

> **Not:** Node sürümü `package.json` içindeki `engines.node` alanında kilitlidir. Farklı sürümde çalıştırmaya çalışırsanız bağımlılık hatası alabilirsiniz.

### Node Sürüm Yönetimi (önerilen)

```sh
# nvm ile doğru sürümü yükle ve aktif et
nvm install 24
nvm use 24

# ya da fnm ile
fnm install 24
fnm use 24
```

### Global Nx CLI (isteğe bağlı)

```sh
npm install -g nx@22.6.4
# kurulduktan sonra 'npx nx' yerine doğrudan 'nx' kullanılabilir
```

---

## Teknoloji Yığını

| Katman | Teknoloji | Versiyon |
|---|---|---|
| Framework | React + React Router | 19 / v7 |
| Build | Vite | 7 |
| Monorepo | Nx | 22.6.4 |
| Dil | TypeScript | 5.9 |
| UI Kütüphanesi | Ant Design | 6 |
| Stil | SCSS Modules | — |
| HTTP | axios | 1.x |
| State | Zustand | 5 |
| Test | Vitest + Testing Library | 4.x / 16.x |
| E2E | Playwright | 1.36+ |
| Node | — | ≥ 24.12.0 |

---

## Proje Yapısı

```
apps/
  feedback/
    app/
      config/              # Statik yapılandırma (team-routing vb.)
      mock/                # Geliştirme mock verileri (mock-user, mock-feedbacks)
      services/
        feedback.service.ts  # axios HTTP katmanı (CRUD + analiz)
      store/
        feedback.store.ts    # Zustand global state
      types.ts               # Tüm API & UI tip tanımları
      routes/                # Sayfa route bileşenleri
        fatura.tsx
        paketlerim.tsx
        hat-islemleri.tsx
        superonline.tsx
      layout/
        main-navbar/         # Rol seçicili üst navigasyon
        main-layout/         # Rol bazlı içerik alanı
      feedback-widget/       # Kullanıcı geri bildirim widget'i
        feedback-fab/        # Floating action button
        feedback-form/       # Geri bildirim formu
        feedback-panel/      # Kart paneli (form + başarı)
        success-view/        # Gönderim sonrası ekran
      feedback-board/        # Ekip takip tablosu + AI buton
      feedback-planning/     # Akıllı planlama ekranı
        task-sidebar/        # Görev listesi & seçici
        jira-editor/         # Görev detay & düzenleme
        action-panel/        # Ekip atama & Jira oluşturma
        feedback-planning.types.ts
    tests/
      routes/                # Route entegrasyon testleri
  feedback-e2e/              # Playwright E2E testleri
```

---

## Ekranlar & Roller

Uygulama **tek URL** üzerinde çalışır; navbar'daki segmented control ile rol geçişi yapılır.

| Segment | Role Değeri | Ekran | Açıklama |
|---|---|---|---|
| Müşteri Görünümü | `user` | Hero + FAB | Kullanıcı geri bildirim bırakır |
| Deneyim Havuzu | `action` | FeedbackBoard | Ekip bildirimleri takip eder, AI analiz başlatır |
| Akıllı Planlama | `team` | FeedbackPlanning | Planlama ekibi görevleri Jira'ya aktarır |

### Müşteri Görünümü (`user`)
- Floating Action Button (FAB) ile panel açılır
- `IssueType` seçimi: `BUG` / `PERFORMANCE` / `DESIGN` / `SUGGESTION`
- Form gönderildikten sonra `ticketId` ile başarı ekranı gösterilir
- Zustand store üzerinden `createFeedback()` çağrılır

### Deneyim Havuzu (`action`)
- Tüm geri bildirimler Ant Design tablosunda listelenir
- Her satırda durum dropdown'u (`NEW → RESOLVED`) ile `updateFeedback()` tetiklenir
- `isAnalysis` alanına göre **Analiz Edildi / Bekliyor** rozeti gösterilir
- Sağ alt köşedeki **AI Analiz FAB** ile `POST /api/v1/analyses/trigger` çağrılır
- Bekleyen kayıt sayısı badge olarak gösterilir; sıfırsa buton devre dışı kalır

### Akıllı Planlama (`team`)
- Sol panel: AI'ın önerdiği görev adayları (severity + referans sayısı ile)
- Orta panel: Seçili görevin başlık/açıklama/öncelik düzenlenmesi
- Sağ panel: Ekip atama ve Jira task oluşturma
- Görev verisi şimdilik `MOCK_PLANNING_TASKS` ile beslenir; backend hazır olduğunda servis katmanına bağlanacak

---

## API Entegrasyonu

**Base URL:** `http://localhost:8080/api/v1`

| Method | Endpoint | Fonksiyon |
|---|---|---|
| `GET` | `/feedbacks` | `getFeedbacks()` |
| `GET` | `/feedbacks/:id` | `getFeedbackById(id)` |
| `POST` | `/feedbacks` | `createFeedback(data)` |
| `PUT` | `/feedbacks/:id` | `updateFeedback(id, data)` |
| `DELETE` | `/feedbacks/:id` | `deleteFeedback(id)` |
| `POST` | `/analyses/trigger` | inline axios (FeedbackBoard) |

### Tip Sözleşmesi (`app/types.ts`)

```ts
type IssueType     = 'BUG' | 'PERFORMANCE' | 'DESIGN' | 'SUGGESTION'
type FeedbackStatus = 'NEW' | 'AWAITING' | 'IN_PROGRESS' | 'RESOLVED' | 'CANCELLED'
type Priority      = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
type Role          = 'user' | 'team' | 'action'
```

---

## State Yönetimi

`app/store/feedback.store.ts` — Zustand tabanlı global store.

```ts
// State
feedbacks: Feedback[]
formData: FeedbackDraft
lastTicketId: string | null
isLoading: boolean
isSubmitting: boolean
isSubmitted: boolean
fetchError: string | null
submitError: string | null

// Actions
fetchFeedbacks()       // GET /feedbacks → feedbacks[]
setFormData(data)      // Form alanlarını günceller
resetForm()            // Formu sıfırlar
submitFeedback()       // POST /feedbacks
updateFeedbackStatus() // PUT /feedbacks/:id
```

---

## Bileşen Mimarisi

### Stil Kuralları
- Tüm stiller **SCSS Module** dosyasında
- TSX içinde `style={{}}` kullanılmaz
- Dinamik renkler CSS custom property ile aktarılır: `style={{ '--sev-bg': color } as React.CSSProperties}`
- Tüm değerler `rem` birimi ile yazılır (`16px = 1rem`)
- Class isimleri bracket notation: `styles['class-name']`

### UI Kuralları
- Tüm butonlar Ant Design `<Button>` bileşenidir; native `<button>` kullanılmaz
- Ant Design `ConfigProvider` ile tema: `colorPrimary: #002855`, `borderRadius: 16`

---

## Ortam Kurulumu

### 1. Repoyu klonla

```sh
git clone <repo-url>
cd feedback
```

### 2. Bağımlılıkları yükle

```sh
npm install
```

Nx, workspace root'undaki `package.json`'ı esas alır. Tüm bağımlılıklar (antd, axios, zustand, vitest vb.) buradan yönetilir.

### 3. Ortam değişkenleri

Ön tanımlı API URL `http://localhost:8080/api/v1` şeklindedir ve `apps/feedback/app/services/feedback.service.ts` içinde sabit olarak tanımlıdır. Backend adresi farklıysa bu dosyayı güncelle:

```ts
// apps/feedback/app/services/feedback.service.ts
const BASE_URL = 'http://localhost:8080/api/v1'; // ← değiştir
```

### 4. Backend servisi

Uygulama, aşağıdaki backend'in `http://localhost:8080` üzerinde çalışmasını bekler:

| Gereksinim | Açıklama |
|---|---|
| REST API | `/api/v1/feedbacks` endpoint'leri |
| AI Analiz | `POST /api/v1/analyses/trigger` |
| CORS | `http://localhost:4200` origin'ine izin verilmeli |

---

## Kurulum & Çalıştırma

```sh
# Geliştirme sunucusu — http://localhost:4200
npx nx serve feedback

# Production build → apps/feedback/dist/
npx nx build feedback

# Build önizlemesi — http://localhost:4300
npx nx preview feedback

# Proje bağımlılık grafiği (tarayıcıda açılır)
npx nx graph
```

---

## Geliştirici Araçları

### Lint

```sh
# Tüm workspace
npx nx run-many -t lint

# Sadece feedback uygulaması
npx nx lint feedback
```

Projede ESLint 9 + `typescript-eslint` + `eslint-plugin-react-hooks` kullanılır. Konfigürasyon `apps/feedback/eslint.config.mjs` dosyasındadır.

### Tip Kontrolü

```sh
# TSC ile derleme hatalarını kontrol et
npx nx typecheck feedback

# Spec dosyaları için ayrı tsconfig
# apps/feedback/tsconfig.spec.json
```

### Nx Console (IDE Eklentisi)

VS Code veya IntelliJ kullanıyorsan [Nx Console](https://nx.dev/getting-started/editor-setup) eklentisi ile generator'ları, görevleri ve bağımlılık grafiğini görsel olarak yönetebilirsin.

### Yeni Bileşen Oluşturma

```sh
# SCSS module + spec + tsx dosyalarını otomatik oluşturur
npx nx g @nx/react:component apps/feedback/app/<klasör>/<bileşen-adı> \
  --nameAndDirectoryFormat=as-provided \
  --style=scss
```

---

## Testler

```sh
# Tüm unit testleri çalıştır
npx nx test feedback

# Belirli bir dosya için
npx vitest run --config apps/feedback/vite.config.mts app/feedback-planning

# E2E testleri
npx nx e2e feedback-e2e
```

### Test Kapsamı

| Bileşen | Test Sayısı |
|---|---|
| `FeedbackFab` | 2 |
| `FeedbackForm` | — |
| `FeedbackPanel` | — |
| `FeedbackPlanning` | 4 |
| `TaskSidebar` | 6 |
| `JiraEditor` | 6 |
| `ActionPanel` | 4 |
| Route: `_index` | — |

---

## Mimari Kararlar

| Karar | Gerekçe |
|---|---|
| SCSS Modules | Scoped stiller, global çakışma yok |
| Zustand (Flux yerine) | Daha az boilerplate, selector tabanlı re-render kontrolü |
| Rol bazlı tek-sayfa düzeni | Backend bağımsız, URL karmaşıklığı yok |
| CSS custom properties (dinamik renk) | TSX'i stil-free tutar, SCSS kurallar tek yerde |
| Mock verisi ayrı dosyada | `mock/` klasörü production bundle'a girmeden tree-shake edilir |
| `rem` tabanlı ölçüler | Kullanıcı font boyutu ayarına saygılı, erişilebilir |
