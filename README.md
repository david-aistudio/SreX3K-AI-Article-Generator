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

## 📁 Struktur File & Folder

```
srex3k-ai-article-generator/
├── index.js              # Entry point utama
├── .env                 # API keys
├── .gitignore           # File yang diabaikan git
├── package.json         # Dependencies & scripts
├── README.md            # Dokumentasi ini
├── LICENSE              # Lisensi MIT
├── articles/            # Hasil artikel disimpan di sini
│   └── research_*.md    # File artikel
└── src/                 # Source code
    ├── agents/          # AI agents
    │   └── tavilyAgent.js # Tavily + Gemini integration
    ├── config/          # Konfigurasi
    │   └── tavilyConfig.js # Tavily settings
    └── utils/           # Utility functions
        └── researchUtils.js # File handling
```

## 🔧 Cara Kerja Sistem

```
USER INPUT → TAVILY SEARCH → GEMINI AI → ARTIKEL KOMPREHENSIF → MARKDOWN FILE
```

### Proses Detail:
1. **User Input**: Pengguna memasukkan topik artikel
2. **Tavily Research**: Sistem mencari data real-time dari web
3. **Gemini Processing**: AI menganalisis data dan membuat artikel
4. **Output Generation**: Artikel disimpan dalam format markdown
5. **Source Citation**: Referensi dengan link sumber ditambahkan

## 🔑 API Keys Setup

### Tavily API Key
Tavily adalah search API khusus untuk AI agents.

**Cara Mendapatkan:**
1. Daftar di [Tavily Dashboard](https://app.tavily.com/)
2. Dapatkan API key gratis
3. Tambahkan ke `.env` file

**Kuota Gratis:**
- 1000 search requests/bulan
- Perfect untuk penggunaan personal

### Google AI Studio API Key
Google Gemini untuk generate artikel komprehensif.

**Cara Mendapatkan:**
1. Daftar di [Google AI Studio](https://aistudio.google.com/)
2. Buat API key gratis
3. Tambahkan ke `.env` file

**Kuota Gratis:**
- 60 requests/menit
- 1000 requests/hari

## 🎯 Fitur-Fitur Utama

### 1. Real-time Web Research
- Pencarian data terkini menggunakan Tavily
- Hasil relevan dari sumber terpercaya
- Kecepatan tinggi tanpa rate limiting

### 2. AI Article Generation
- Artikel komprehensif 1000+ kata
- Struktur profesional (intro, body, kesimpulan)
- Bahasa formal tapi mudah dipahami
- Source citation dengan format [1], [2], [3]

### 3. Progress Tracking
```
Step 1/3: Researching topic with Tavily...
Progress: [███████░░░░░░░░░░░░░] 33% (1/3)

Step 2/3: Generating comprehensive article with Gemini...
Progress: [█████████████░░░░░░░] 67% (2/3)

Step 3/3: Finalizing and saving article...
Progress: [████████████████████] 100% (3/3)
✓ Article generation completed!
```

### 4. Export & Storage
- Otomatis simpan ke `articles/` folder
- Format markdown (.md)
- Nama file: `research_topik_timestamp.md`

## 🚀 Command Line Usage

### Basic Usage
```bash
node index.js "topik artikel kamu"
```

### NPM Scripts
```bash
npm start "topik artikel kamu"
```

### Contoh Topik yang Bisa Digunakan
```bash
# Teknologi
node index.js "Perkembangan AI di Indonesia 2025"

# Bisnis
node index.js "Strategi Marketing Digital Tahun Ini"

# Kesehatan
node index.js "Manfaat Olahraga untuk Kesehatan Mental"

# Politik
node index.js "Tren Pilpres 2024 Indonesia"

# Entertainment
node index.js "Tren Musik Indonesia Tahun Ini"
```

## 🎨 User Interface

### Welcome Screen
```
=====================================
  ██████  ██████       ██   ██ 
  ██   ██ ██   ██      ██  ██  
  ██████  ██████       █████   
  ██      ██   ██      ██  ██  
  ██      ██   ██      ██   ██ 
=====================================
  SreX3K AI Article Generator
=====================================
```

### Progress Indicator
```
Step 1/3: Researching topic with Tavily...
Progress: [███████░░░░░░░░░░░░░] 33% (1/3)

Step 2/3: Generating comprehensive article with Gemini...
Progress: [█████████████░░░░░░░] 67% (2/3)

Step 3/3: Finalizing and saving article...
Progress: [████████████████████] 100% (3/3)
✓ Article generation completed!
```

### Article Preview
```
=====================================
GENERATED ARTICLE
=====================================

# Judul Artikel

## Introduction
...

[Article truncated. Full article saved to file]

📁 Article saved to: articles/research_*.md
```

## ⚙️ Konfigurasi Lanjutan

### Tavily Configuration
File: `src/config/tavilyConfig.js`
```javascript
const TAVILY_CONFIG = {
  API_URL: 'https://api.tavily.com/search',
  DEFAULT_PARAMS: {
    search_depth: "advanced",
    include_answer: true,
    include_images: false,
    include_raw_content: false,
    max_results: 5
  }
};
```

### Environment Variables
File: `.env`
```env
TAVILY_API_KEY=your_tavily_api_key_here
GOOGLE_AI_API_KEY=your_google_ai_api_key_here
```

## 📊 Contoh Hasil Artikel

### Struktur Artikel
1. **Judul** - Berdasarkan topik input
2. **Introduction** - Pengantar menarik
3. **Main Sections** - 3-4 bagian utama
4. **Analysis** - Data dan contoh spesifik
5. **Conclusion** - Kesimpulan dan rekomendasi
6. **Sources** - Referensi dengan link

### Contoh Output Panjang
```
# Indonesia's AI Revolution: Potential, Challenges, and the Path Forward

## The Rise of AI in Indonesia: A Promising Economic Engine
Indonesia's journey towards becoming an AI-powered nation is a complex but achievable goal. 
Studies predict AI will contribute 12% to GDP by 2030 (USD 366 billion) [1].

## Real-World Applications and Industry Transformations
AI impacts various sectors:
- Agriculture: Precision farming with drones
- Finance: Fraud detection and credit scoring
- Healthcare: Medical image analysis
- Transportation: Traffic management systems

## Navigating the Challenges: Infrastructure, Ethics, and Regulation
Key challenges include:
- Infrastructure gaps in rural areas
- Talent shortage in AI expertise
- Data privacy and ethical concerns
- Need for comprehensive regulations

## Actionable Insights and the Future
Recommendations for success:
1. Invest in digital infrastructure
2. Strengthen education programs
3. Develop ethical AI guidelines
4. Foster public-private partnerships

Sources:
[1] [IDStar AI Trends 2025](https://idstar.co.id)
```

## 🔧 Troubleshooting

### Common Issues

1. **API Key Not Found**
   ```
   Error: TAVILY_API_KEY is not set
   ```
   **Solusi:** Periksa file `.env` dan pastikan API key sudah diisi

2. **Rate Limit Exceeded**
   ```
   Error: 429 Too Many Requests
   ```
   **Solusi:** Tunggu beberapa menit atau upgrade ke plan berbayar

3. **Invalid API Key**
   ```
   Error: 401 Unauthorized
   ```
   **Solusi:** Periksa kembali API key dan pastikan tidak ada typo

4. **Network Error**
   ```
   Error: Network Error
   ```
   **Solusi:** Periksa koneksi internet dan firewall

### Debug Mode
```bash
# Jalankan dengan debug mode
DEBUG=* node index.js "topik"
```

## 📈 Monitoring & Limits

### Tavily API Limits
- 1000 requests/bulan (gratis)
- 5 results per request
- Advanced search depth

### Google AI Studio Limits
- 60 RPM (requests per minute)
- 1000 requests/hari
- 2 million tokens/hari

## 🔒 Security Best Practices

### API Key Management
1. Jangan commit `.env` ke repository
2. Gunakan `.gitignore` untuk exclude `.env`
3. Rotasi API key secara berkala
4. Monitor usage di dashboard

### File Permissions
```bash
# Set permissions untuk file sensitif
chmod 600 .env
```

## 🔄 Updates & Maintenance

### Update Dependencies
```bash
npm update
```

### Check Security Issues
```bash
npm audit
```

### Backup API Keys
- Simpan API key di password manager
- Jangan hardcode di source code
- Gunakan environment variables

## 🤝 Kontribusi

Kontribusi sangat diterima! Untuk kontribusi:

1. Fork repository ini
2. Buat branch baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request

## 📞 Support & Resources

### Tavily Support
- Documentation: https://docs.tavily.com
- Discord: https://tavily.com/discord
- Email: support@tavily.com

### Google AI Support
- Documentation: https://ai.google.dev
- Community: https://discuss.ai.google.dev
- Issues: https://github.com/google-gemini

### GitHub Repository
- Issues: https://github.com/username/srex3k/issues
- Pull Requests: https://github.com/username/srex3k/pulls
- Wiki: https://github.com/username/srex3k/wiki

## 📄 Lisensi

Project ini dilisensikan di bawah MIT License - lihat file [LICENSE](LICENSE) untuk detail lebih lanjut.

## 🙏 Acknowledgments

Proyek ini menggunakan teknologi dari:
- [Tavily](https://tavily.com) - Search API untuk AI
- [Google AI](https://aistudio.google.com) - AI models
- [Node.js](https://nodejs.org) - Runtime environment
- [Chalk](https://npmjs.com/package/chalk) - Terminal styling
- [Axios](https://npmjs.com/package/axios) - HTTP client
- [Dotenv](https://npmjs.com/package/dotenv) - Environment variables