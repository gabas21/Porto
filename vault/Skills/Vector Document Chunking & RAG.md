# 🤖 Skill: Vector Document Chunking & RAG Engine

Sistem pemecahan dokumen (PDF / Slide Materi Kuliah) menjadi potongan token kecil (*chunks*) yang disimpan dalam tabel `public.document_chunks` dengan embedding vektor untuk pencarian semantik berkecepatan tinggi.

---

## 🏗️ Alur Kerja Teknis:
1. **Document Ingestion:** Pengguna mengunggah materi kuliah dalam format PDF / DOCX / TXT.
2. **Chunking Pipeline:** Dokumen dipecah per 500-1000 token dengan overlap 100 token untuk menjaga kesinambungan konteks kalimat.
3. **Embedding Generation:** Teks diubah menjadi array vektor menggunakan model embedding (misal: `text-embedding-3-small`).
4. **Vector Similarity Search (pgvector):** Saat mahasiswa bertanya via chat (`public.chat_histories`), database melakukan pencarian cosine similarity untuk menemukan 3-5 chunk paling relevan.
5. **Prompt Context Injection:** Chunk yang relevan disisipkan ke system prompt LLM untuk memberikan jawaban yang 100% akurat sesuai modul perkuliahan.

---

## 🎯 Kapan Menggunakan di Proyek Baru:
- Fitur "Chat with PDF" atau "AI Study Assistant".
- Knowledge Base / Dokumentasi internal perusahaan.
- Customer support bot cerdas.
