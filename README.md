# SreX3K AI Article Generator

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![AI Article](https://img.shields.io/badge/AI-Article%20Generator-blue)](https://tavily.com)

**AI Article Generator** yang menggabungkan **Tavily Search API** untuk research realtime dan **Google Gemini AI** untuk generate artikel komprehensif.

## 🚀 Fitur Utama

- **Real-time Web Research** - Menggunakan Tavily API untuk data terkini
- **AI-Powered Article Generation** - Google Gemini membuat artikel komprehensif
- **Structured Output** - Artikel dengan intro, body, kesimpulan, dan sumber
- **Progress Tracking** - Progress bar 1/3, 2/3, 3/3
- **Markdown Export** - Hasil otomatis disimpan dalam format markdown
- **Source Citation** - Referensi dengan link sumber [1], [2], [3]

## 📋 Prerequisites

- Node.js (versi 14 atau lebih baru)
- API Key Tavily (gratis)
- API Key Google AI Studio (gratis)

## 🛠️ Instalasi

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd srex3k-ai-article-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   Buat file `.env` di root project:
   ```env
   # Tavily API Key (wajib)
   TAVILY_API_KEY=your_tavily_api_key_here
   
   # Google AI Studio API Key (wajib)
   GOOGLE_AI_API_KEY=your_google_ai_api_key_here
   ```

## 🎯 Cara Penggunaan

### Generate Artikel
```bash
# Generate artikel dengan topik apapun
npm start "Tren AI di Indonesia 2025"

# Atau langsung
node index.js "Perkembangan Teknologi Blockchain"
```

### Contoh Penggunaan
```bash
# Berita terkini
node index.js "Pilpres 2024 Indonesia"

# Teknologi
node index.js "ChatGPT dan Masa Depan AI"

# Bisnis & Ekonomi
node index.js "Strategi Marketing Digital 2025"

# Kesehatan
node index.js "Manfaat Meditasi untuk Kesehatan Mental"
```

## 📁 Struktur Project

```
srex3k-ai-article-generator/
├── index.js              # Main entry point
├── .env                 # Environment variables
├── .gitignore           # Git ignore file
├── package.json         # Project dependencies
├── README.md            # Dokumentasi utama
├── DOCUMENTATION.md     # Dokumentasi lengkap
├── articles/            # Folder hasil artikel
└── src/
    ├── agents/          # AI agents
    │   └── tavilyAgent.js
    ├── config/          # Konfigurasi
    │   └── tavilyConfig.js
    └── utils/           # Utility functions
        └── researchUtils.js
```

## 📊 Contoh Output

```
# Indonesia's AI Revolution: Potential, Challenges, and the Path Forward

## The Rise of AI in Indonesia: A Promising Economic Engine
Indonesia's journey towards becoming an AI-powered nation is a complex but achievable goal...

## Real-World Applications and Industry Transformations
AI is already impacting numerous industries across Indonesia...

## Navigating the Challenges: Infrastructure, Ethics, and Regulation
Despite the immense potential, several challenges hinder the seamless integration...

## Sources
[1] [10 Tren AI di Berbagai Industri](https://idstar.co.id/trend-artificial-intelligence-bisnis/)
[2] [Membangun Ekosistem AI di Indonesia](https://www.komdigi.go.id/berita/infrastruktur-digital/detail/membangun-ekosistem-ai-di-indonesia-untuk-2030-potensi-dan-tantangan)
```

## 🤝 Kontribusi

Kontribusi sangat diterima! Untuk kontribusi:

1. Fork repository ini
2. Buat branch baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request

## 📄 Lisensi

Project ini dilisensikan di bawah MIT License - lihat file [LICENSE](LICENSE) untuk detail lebih lanjut.

## 🙏 Acknowledgments

- [Tavily](https://tavily.com) - Search API untuk AI agents
- [Google AI](https://aistudio.google.com) - AI models
- [Node.js](https://nodejs.org) - Runtime environment