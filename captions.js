/* ─────────────────────────────────────────────────────────────
   ALTYAZILAR / CAPTIONS — düzenlenebilir.
   Kısa, tek fikir, 5. sınıf dili. start/end saniye cinsinden.
   note: öğretmen için önerilen seslendirme cümlesi.
   ───────────────────────────────────────────────────────────── */
(function (root) {
  const CAPTIONS = [
    { scene: 1, start: 4.4, end: 10.2, tr: 'Terazi dengede: 7 + 5 = 12', en: 'The balance is level: 7 + 5 = 12',
      note: 'Terazinin sol kefesinde 7 ve 5, sağ kefesinde 12 var. Terazi dengede: 7 artı 5, 12’ye eşit.' },
    { scene: 2, start: 10.8, end: 19.2, tr: 'Bir tarafa 3 eklersek?', en: 'Add 3 to one side?',
      note: 'Bir varsayım: iki tarafa aynı sayıyı eklersek denge korunur. Sol kefeye 3 ekleyelim: terazi sola eğildi. Sağ kefeye de 3 ekleyelim: yine dengede.' },
    { scene: 2, start: 19.6, end: 27.8, tr: 'İki tarafa aynı işlem: eşitlik korunur', en: 'Same on both sides: the equality holds',
      note: '7 artı 5 artı 3, 12 artı 3’e eşit. Eşitliğin iki tarafına aynı işlemi yaparsak eşitlik korunur.' },
    { scene: 3, start: 28.6, end: 36.0, tr: '3 + 5 = 5 + 3', en: '3 + 5 = 5 + 3',
      note: 'Sol kefedeki 3 ve 5’in yerini değiştirelim: terazi yine dengede. 3 artı 5, 5 artı 3’e eşit. Buna toplamanın değişme özelliği denir.' },
    { scene: 3, start: 36.4, end: 45.8, tr: '4 × 6 = 6 × 4 · birleşme özelliği', en: '4 × 6 = 6 × 4 · associative property',
      note: '4 sıra 6 noktayı döndürelim: 6 sıra 4 nokta oldu; yine 24. Çarpmada da değişme var. Toplamada gruplamayı değiştirmek de sonucu değiştirmez: 2 artı 8, sonra artı 5; ya da 8 artı 5, sonra 2: hep 15.' },
    { scene: 4, start: 46.6, end: 55.2, tr: '6 × 13 = 6 × 10 + 6 × 3', en: '6 × 13 = 6 × 10 + 6 × 3',
      note: '6’ya 13’lük dikdörtgeni 10 ve 3 olarak ikiye ayıralım: 6 çarpı 10, 60; 6 çarpı 3, 18; toplam 78. Çarpma, toplama üzerine dağılır.' },
    { scene: 4, start: 55.6, end: 63.8, tr: '6 × 9 = 6 × 10 − 6 × 1', en: '6 × 9 = 6 × 10 − 6 × 1',
      note: '6 çarpı 9 için 6 çarpı 10’dan bir sütun çıkaralım: 60 eksi 6, 54. Çarpma, çıkarma üzerine de dağılır.' },
    { scene: 5, start: 64.6, end: 72.0, tr: 'Çıkarmada ve bölmede değişme yok', en: 'No swapping for subtraction or division',
      note: 'Varsayımımızı başka işlemlerde sınayalım. 8 eksi 3, 5; ama 3’ten 8 çıkarılamaz. 12 bölü 4, 3; 4 bölü 12 ise aynı değil. Değişme özelliği yalnız toplama ve çarpmada geçerli.' },
    { scene: 5, start: 72.4, end: 79.8, tr: 'a + b = b + a · a × (b + c) = a × b + a × c', en: 'a + b = b + a · a × (b + c) = a × b + a × c',
      note: 'Önermelerimizi sembollerle yazalım: a artı b, b artı a’ya eşittir; a çarpı b artı c, a çarpı b artı a çarpı c’ye eşittir. Bu özellikler zihinden işlem yapmayı kolaylaştırır.' },
    { scene: 6, start: 80.6, end: 86.4, tr: 'Eşitliği koru, özellikleri kullan', en: 'Keep the balance, use the properties',
      note: 'Aklında kalsın: iki tarafa aynı işlem eşitliği korur; değişme ve birleşme toplama ve çarpmada geçerli; çarpma toplama ve çıkarma üzerine dağılır.' },
    { scene: 6, start: 86.8, end: 91.0, tr: 'Zihinden işlem kolaylaşır!', en: 'Mental maths gets easier!',
      note: 'Bu özelliklerle zihinden işlem kolaylaşır!' },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = CAPTIONS;
  else { root.LI = root.LI || {}; root.LI.CAPTIONS = CAPTIONS; }
})(typeof window !== 'undefined' ? window : globalThis);
