import { test, expect } from "@playwright/test";

test.describe("Portfolio End-to-End Suite", () => {
  test.beforeEach(async ({ page }) => {
    // Navigasi ke halaman utama di port 3005
    await page.goto("/");
    // Tunggu preloader selesai sepenuhnya
    const mainContent = page.locator("main");
    await expect(mainContent).toBeVisible({ timeout: 15000 });
  });

  test("1. Preloader berjalan dan tirai terbuka otomatis", async ({ page }) => {
    // Pastikan halaman memuat dengan status 200 dan URL benar
    await expect(page).toHaveURL(/localhost:3005/);
    const mainContent = page.locator("main");
    await expect(mainContent).toBeVisible();
  });

  test("2. Navbar dan elemen branding terpasang dengan baik", async ({ page, isMobile }) => {
    const mainContent = page.locator("main");
    await expect(mainContent).toBeVisible({ timeout: 15000 });

    // Logo brand terlihat di desktop maupun mobile
    const brandLogo = page.getByRole("link", { name: /Bagas Aditya/i }).first();
    await expect(brandLogo).toBeVisible();

    if (isMobile) {
      // Di layar mobile, tombol menu hamburger terlihat
      const menuBtn = page.getByLabel(/Toggle Fullscreen Menu/i).first();
      await expect(menuBtn).toBeVisible();
    } else {
      // Di layar desktop, pill menu navigasi terlihat
      const nav = page.locator("nav").first();
      await expect(nav).toBeVisible();
    }
  });

  test("3. Hero Section dan CTA utama muncul", async ({ page }) => {
    const mainContent = page.locator("main");
    await expect(mainContent).toBeVisible({ timeout: 15000 });

    // Hero section
    const heroSection = page.locator("section").first();
    await expect(heroSection).toBeVisible();
  });

  test("4. Semua section utama ada di dalam DOM saat scrolling", async ({ page }) => {
    const mainContent = page.locator("main");
    await expect(mainContent).toBeVisible({ timeout: 15000 });

    // Verifikasi section Services (What I Bring) terpasang di DOM
    const servicesSection = page.locator("#services");
    await expect(servicesSection).toBeAttached();

    // Scroll ke bagian bawah untuk memicu trigger animasi
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);

    // Verifikasi footer terlihat
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
  });

  test("5. Klik project memicu tirai kuning dan membuka case study modal", async ({ page }) => {
    const mainContent = page.locator("main");
    await expect(mainContent).toBeVisible({ timeout: 15000 });

    // Scroll ke section works
    const worksSection = page.locator("#works");
    await worksSection.scrollIntoViewIfNeeded();

    // Klik kartu project pertama
    const firstProjectCard = page.getByTestId("project-card").first();
    await expect(firstProjectCard).toBeVisible();
    await firstProjectCard.click();

    // Pastikan tombol kembali ke portofolio di modal muncul
    const backBtn = page.getByRole("button", { name: /Kembali ke Portofolio/i });
    await expect(backBtn).toBeVisible({ timeout: 5000 });

    // Klik kembali
    await backBtn.click({ force: true });
    await expect(backBtn).not.toBeVisible({ timeout: 8000 });
  });

  test("6. Command Palette (Ctrl+K) terbuka dan merespons pencarian", async ({ page }) => {
    const mainContent = page.locator("main");
    await expect(mainContent).toBeVisible({ timeout: 15000 });

    // Tekan Control+k global shortcut
    await page.keyboard.press("Control+k");

    // Input command menu harus terlihat
    const searchInput = page.getByPlaceholder(/Cari navigasi, proyek, aksi cepat/i);
    await expect(searchInput).toBeVisible({ timeout: 10000 });

    // Cari aksi
    await searchInput.fill("WhatsApp");
    await expect(page.getByText(/Direct WhatsApp Message/i)).toBeVisible();

    // Tutup dengan tombol ESC
    await page.keyboard.press("Escape");
    await expect(searchInput).not.toBeVisible({ timeout: 5000 });
  });

  test("7. Interactive CV modal dapat dibuka dan ditutup", async ({ page }) => {
    const mainContent = page.locator("main");
    await expect(mainContent).toBeVisible({ timeout: 15000 });

    // Buka via Command Menu shortcut
    await page.keyboard.press("Control+k");
    const cvOption = page.getByText(/Interactive CV \/ Resume/i);
    await expect(cvOption).toBeVisible({ timeout: 10000 });
    await cvOption.click();

    // Verifikasi modal CV muncul
    const cvModal = page.getByTestId("resume-preview-modal");
    await expect(cvModal).toBeVisible({ timeout: 10000 });

    // Verifikasi judul modal CV muncul
    const cvTitle = page.getByTestId("cv-modal-title");
    await expect(cvTitle).toBeVisible();

    // Verifikasi tombol download ada
    const downloadBtn = page.getByRole("button", { name: /Download CV/i });
    await expect(downloadBtn).toBeVisible();

    // Tutup modal CV
    const closeBtn = page.getByTestId("close-cv-modal");
    await closeBtn.click({ force: true });
    await expect(cvModal).not.toBeVisible({ timeout: 5000 });
  });

  test("8. Filter kategori pada Featured Projects berfungsi dengan baik", async ({ page }) => {
    const mainContent = page.locator("main");
    await expect(mainContent).toBeVisible({ timeout: 15000 });

    // Scroll ke section works
    const worksSection = page.locator("#works");
    await worksSection.scrollIntoViewIfNeeded();
    await expect(worksSection).toBeVisible({ timeout: 10000 });

    // Klik tombol filter kategori Government
    const govFilterBtn = page.getByRole("button", { name: "Government" }).first();
    await expect(govFilterBtn).toBeVisible({ timeout: 10000 });
    await govFilterBtn.click({ force: true });

    // Pastikan kartu proyek kategori Government aktif dan tampil
    const projectCard = page.getByTestId("project-card").first();
    await expect(projectCard).toBeVisible({ timeout: 10000 });
  });
});
