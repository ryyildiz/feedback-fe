## API Endpoints

### Feedback İşlemleri — `/api/v1/feedbacks`

| Method | Endpoint | Açıklama |
|--------|----------|----------|
| `POST` | `/api/v1/feedbacks` | Yeni feedback oluştur |
| `GET` | `/api/v1/feedbacks` | Tüm feedbackleri listele |
| `GET` | `/api/v1/feedbacks/{id}` | ID ile feedback getir |
| `PUT` | `/api/v1/feedbacks/{id}` | Feedback güncelle |
| `DELETE` | `/api/v1/feedbacks/{id}` | Feedback sil |

### Analiz İşlemleri — `/api/v1/analyses`

| Method | Endpoint | Açıklama |
|--------|----------|----------|
| `POST` | `/api/v1/analyses/trigger` | Gemini analizi tetikle |
| `GET` | `/api/v1/analyses` | Tüm analiz sonuçlarını listele |
| `GET` | `/api/v1/analyses/{id}` | ID ile analiz getir |
| `GET` | `/api/v1/analyses/tag/{tag}` | Etikete göre filtrele (FRONTEND, BACKEND, vb.) |
| `GET` | `/api/v1/analyses/severity/{severity}` | Önem derecesine göre filtrele (CRITICAL, HIGH, vb.) |
| `GET` | `/api/v1/analyses/unanalyzed-count` | Analiz edilmemiş feedback sayısı |
