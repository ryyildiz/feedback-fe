Birlikte Geliştirelim: Ekran Analizi ve İş Akış Raporu

Bu döküman, Turkcell ekosistemi için geliştirilen AI destekli geri bildirim sisteminin Business (İş) ve Technical (Kodsal) katmanlarını net bir dille analiz eder.

1. Businessal Perspektif: Neden ve Nasıl?

İş dünyası açısından bu ekran, sıradan bir "Bize Yazın" formu değil, bir Operasyonel Verimlilik Motorudur.

A. Sorun ve Çözüm

Gürültü Yönetimi: Geleneksel kanallardan gelen binlerce karmaşık bildirim teknik ekiplerde iş yükü yaratır.

Çözüm: Sistemin "Gatekeeper" (Kapı Tutucu) modeli, bildirimleri stratejik bir süzgeçten geçirir. Sadece onaylanmış ve anlamlandırılmış işler teknik ekiplerin önüne düşer.

B. Stratejik Kazanımlar

Hız (Time-to-Fix): URL bazlı otomatik yönlendirme sayesinde bildirimler "yanlış ekibe gitme" aşamasını atlayarak %50 daha hızlı çözülür.

NPS ve Sadakat: Kullanıcının "dinleniyorum" algısı, teknik ekipten gelen şeffaf notlarla (Team Note) pekişerek sadakat skorunu artırır.

AI Karar Desteği: Gemini LLM analizi, insan hatasını minimize ederek duygu (sentiment) ve aciliyet durumuna göre objektif önceliklendirme yapar.

2. Kodsal Perspektif: Arka Planda Ne Oluyor?

Teknik mimari, React ve Ant Design (veya Tailwind) üzerine kurulu, AI entegrasyonuyla güçlendirilmiş bir Single Page Application (SPA) yapısıdır.

A. Contextual Data Capture (Bağlamsal Veri Yakalama)

Kullanıcı formu gönderdiğinde, kod sessizce şu işlemi yapar:

const capturedUrl = window.location.href; // Kullanıcının o anki sayfası
const userId = auth.currentUser.uid;       // İşlemi yapan kullanıcı


Neden Önemli? Teknik ekibin "Hangi ekranda bu sorunu yaşadınız?" sorusunu sormasına gerek kalmaz.

B. Gemini LLM Analiz Katmanı

Gelen ham metin, bir mikro servis aracılığıyla Gemini'a gönderilir. Gemini'dan dönen JSON objesi state üzerine yazılır:

aiAnalysis.sentiment: (Duygu Analizi)

aiAnalysis.summary: (Kısa Teknik Başlık)

aiAnalysis.priority: (Önerilen Öncelik Seviyesi)

C. Dinamik State Yönetimi

Uygulama currentRole (user/team) state'i üzerinden iki farklı evren sunar:

User Side: Basit, temiz, sadece kategori ve metin girişi.

Team Side: Karmaşık veri tabloları, AI analiz kartları ve durum (status) yönetimi.

3. Uçtan Uca Ekran Akışı (Step-by-Step Flow)

1. Adım: Kullanıcı Girişi (Frontend)

Kullanıcı sağ alttaki butona basar (FAB).

Kategori seçer (Hata, Öneri, Performans vb.) ve görüşünü yazar.

Kodsal İşlem: handleSubmit fonksiyonu tetiklenir, URL ve Form verisi paketlenir.

2. Adım: Akıllı İşleme (AI & Backend)

Servis, veriyi alır ve Gemini LLM'e iletir.

Gemini metni analiz eder; "Buton çalışmıyor" -> "P1 Priority / Bug / Frustrated".

Sistem, URL'e bakarak (örn: /fatura) talebi "Fatura Ekibi"nin havuzuna atar.

3. Adım: Yönetim ve Aksiyon (Admin Panel)

Teknik ekip paneli açar.

Gemini'ın çıkardığı Teknik Özet'i okuyarak vakit kazanır.

Aksiyon: Select kutusundan durumu "Planlamaya Alındı" veya "İptal" olarak günceller.

Kodsal İşlem: handleUpdateStatus fonksiyonu backend'e PATCH isteği atar ve state güncellenir.

4. Adım: Geri Bildirim (Closing the Loop)

Durum değiştikçe kullanıcı panelindeki "Geri Bildirim Yönetimi" sekmesi (opsiyonel) veya bildirim merkezi güncellenir.

4. Özet Analiz Tablosu

Özellik

Business Değeri

Kodsal Karşılığı

URL Takibi

Hatanın yerini tespit etme hızı.

window.location.href capture.

AI Özetleme

Analiz süresini kısaltma.

Gemini LLM generateContent API.

Rol Yönetimi

Yetki ve gürültü kontrolü.

currentRole State Switcher.

Durum Badge'leri

Süreç şeffaflığı.

STATUS_CONFIG Mapping.

Sonuç: Bu sistem, kullanıcı deneyimini iyileştirirken teknik ekiplerin sadece onaylanmış ve AI tarafından ön-analizi yapılmış verilere odaklanmasını sağlayarak kurumsal çevikliği en üst seviyeye taşır.
