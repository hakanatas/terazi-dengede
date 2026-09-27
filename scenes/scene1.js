/* SAHNE 1 — TERAZİ (0–10 s)  7 + 5 = 12, level.
   The whole film's drawing lives in LI.world(t); each scene only sets the camera. */
(function (LI) {
  'use strict';
  const { seg, lerp, inOut, clamp } = LI.E;
  const KD = LI.KD, F = () => LI.Film, A = LI.Ang, Ink = LI.Ink;
  const END = (t) => 1 - seg(t, 90.4, 91.4);

  function win(t, a, b, fi = 0.4, fo = 0.4) { return seg(t, a, a + fi) * (1 - seg(t, b - fo, b)); }
  function exprs(ctx, t, P, list, sz) {
    const f = F();
    list.forEach(([a, b, items, hot]) => {
      const al = win(t, a, b); if (al <= 0) return;
      f.expr(ctx, typeof items === 'string' ? [items] : items, P.x, P.y, sz ?? P.s, { alpha: al, w: P.w, halo: true, color: hot ? A.amber : undefined });
    });
  }
  const at = (P, k, y) => ({ x: P.x, y: y ?? P.y[k], s: P.s, w: P.w });
  const amber = (a) => `rgba(${LI.AMBER_RGB},${a})`;
  const ink = (a) => `rgba(${LI.INK_RGB},${a})`;

  /** weights on each pan: [value, t0 (appears), t1 (leaves)] */
  const LEFT = [[7, 4.8, 27.8], [5, 5.2, 27.8], [3, 11.4, 27.8], [3, 28.8, 35.8], [5, 29.0, 35.8]];
  const RIGHT = [[12, 5.6, 27.8], [3, 14.4, 27.8], [8, 29.2, 35.8]];
  const vis = (t, [, t0, t1]) => seg(t, t0, t0 + 0.4) * (1 - seg(t, t1 - 0.4, t1));

  function balance(ctx, env, t) {
    const L = KD.L(env), B = L.BAL, f = F(), a = win(t, 4.4, 35.8) * END(t); if (a <= 0) return;
    const sum = (list) => list.reduce((s, w) => s + w[0] * vis(t, w), 0);
    const th = clamp((sum(LEFT) - sum(RIGHT)) * 0.02, -0.2, 0.2);
    const C = [B.x, B.y], dx = B.R * Math.cos(th), dy = B.R * Math.sin(th);
    const Lend = [C[0] - dx, C[1] + dy], Rend = [C[0] + dx, C[1] - dy];
    // stand
    Ink.path(ctx, [[B.x, B.y], [B.x, B.base]], { w: 7, alpha: a, seed: 3800, taper: [0, 0] });
    Ink.path(ctx, [[B.x - 90, B.base], [B.x + 90, B.base]], { w: 7, alpha: a, seed: 3801, taper: [0, 0] });
    ctx.fillStyle = ink(a); ctx.beginPath(); ctx.moveTo(B.x - 18, B.y + 22); ctx.lineTo(B.x + 18, B.y + 22); ctx.lineTo(B.x, B.y - 4); ctx.closePath(); ctx.fill();
    Ink.path(ctx, [Lend, Rend], { w: 7, alpha: a, seed: 3802, taper: [0.05, 0.05] });
    // a needle showing level
    const nd = [B.x + Math.sin(th) * 60, B.y - Math.cos(th) * 60];
    Ink.path(ctx, [[B.x, B.y], nd], { w: 4, alpha: a, color: LI.AMBER_RGB, seed: 3803, taper: [0, 0] });
    [[Lend, LEFT, 3810], [Rend, RIGHT, 3830]].forEach(([E, list, seed]) => {
      const P = [E[0], E[1] + B.drop];
      Ink.path(ctx, [E, [P[0] - 85, P[1]]], { w: 2.5, alpha: a * 0.7, seed, taper: [0, 0] });
      Ink.path(ctx, [E, [P[0] + 85, P[1]]], { w: 2.5, alpha: a * 0.7, seed: seed + 1, taper: [0, 0] });
      const bowl = []; for (let i = 0; i <= 16; i++) { const u = i / 16; bowl.push([P[0] - 95 + 190 * u, P[1] + 22 * Math.sin(Math.PI * u)]); }
      Ink.path(ctx, bowl, { w: 5, alpha: a, seed: seed + 2, taper: [0, 0] });
      let y = P[1] - 2, slot = 0;
      list.forEach((w, i) => {
        const k = vis(t, w); if (k <= 0) return;
        let x = P[0];
        // the swap: 3 and 5 on the left change places
        if (list === LEFT && w[1] > 28) { const sw = inOut(seg(t, 30.6, 31.8)); x += (w[0] === 3 ? 1 : -1) * 0 ; y = P[1] - 2 - (w[0] === 3 ? lerp(0, 1, sw) : lerp(1, 0, sw)) * 48; ctx.fillStyle = amber(0.55 * a * k); ctx.fillRect(x - 45, y - 46, 90, 44); f.T(ctx, String(w[0]), x, y - 24, { size: L.G.s * 0.8, alpha: a * k }); return; }
        ctx.fillStyle = amber((i % 2 ? 0.4 : 0.6) * a * k); ctx.fillRect(x - 45, y - 46 - slot * 48, 90, 44);
        f.T(ctx, String(w[0]), x, y - 24 - slot * 48, { size: L.G.s * 0.8, alpha: a * k });
        slot += k > 0.5 ? 1 : 0;
      });
    });
  }

  /* 36–46: a 4 × 6 array turns into 6 × 4 */
  function array(ctx, env, t) {
    const L = KD.L(env), R = L.ARR, f = F(), a = win(t, 36.0, 45.8) * END(t); if (a <= 0) return;
    const phi = Math.PI / 2 * inOut(seg(t, 37.6, 39.2));
    ctx.save(); ctx.translate(R.x, R.y); ctx.rotate(phi);
    for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) { ctx.fillStyle = amber(0.9 * a); ctx.beginPath(); ctx.arc((c - 2.5) * R.u, (r - 1.5) * R.u, R.u * 0.3, 0, Math.PI * 2); ctx.fill(); }
    ctx.restore();
    f.T(ctx, phi < 0.8 ? '4 sıra × 6 = 24' : '6 sıra × 4 = 24', R.x, R.y + 3.6 * R.u, Object.assign({ size: L.G.s * 0.8, alpha: a, halo: true }, f.AMB));
  }

  /* 46–64: 6 × 13 = 6 × 10 + 6 × 3, then 6 × 9 = 6 × 10 − 6 × 1 */
  function area(ctx, env, t) {
    const L = KD.L(env), R = L.AR, f = F(), a = win(t, 46.4, 63.8) * END(t); if (a <= 0) return;
    const u = R.u, h = 6 * u, second = seg(t, 55.4, 56.2);
    const w = lerp(13, 10, second) * u, split = 10 * u;
    ctx.fillStyle = amber(0.25 * a); ctx.fillRect(R.x, R.y, Math.min(w, split), h);
    if (w > split) { ctx.fillStyle = amber(0.6 * a); ctx.fillRect(R.x + split, R.y, w - split, h); }
    ctx.strokeStyle = ink(0.15 * a); ctx.lineWidth = 1.2; ctx.beginPath();
    for (let i = 1; i < 13; i++) { const x = R.x + i * u; if (x < R.x + w) { ctx.moveTo(x, R.y); ctx.lineTo(x, R.y + h); } }
    for (let j = 1; j < 6; j++) { ctx.moveTo(R.x, R.y + j * u); ctx.lineTo(R.x + w, R.y + j * u); } ctx.stroke();
    Ink.path(ctx, [[R.x, R.y], [R.x + w, R.y], [R.x + w, R.y + h], [R.x, R.y + h], [R.x, R.y]], { w: 5, alpha: a, seed: 3850, taper: [0, 0] });
    const sp = seg(t, 48.0, 48.8) * (1 - second);
    if (sp > 0) Ink.path(ctx, [[R.x + split, R.y - 16], [R.x + split, R.y + h + 16]], { w: 5, alpha: a * sp, color: LI.AMBER_RGB, seed: 3851, taper: [0, 0] });
    f.T(ctx, '6', R.x - 30, R.y + h / 2, { size: L.G.s * 0.8, alpha: a });
    const k1 = seg(t, 48.8, 49.4) * a * (1 - second);
    if (k1 > 0) {
      f.T(ctx, '10', R.x + split / 2, R.y - 30, { size: L.G.s * 0.75, alpha: k1 }); f.T(ctx, '3', R.x + split + 1.5 * u, R.y - 30, { size: L.G.s * 0.75, alpha: k1 });
      f.T(ctx, '6 × 10 = 60', R.x + split / 2, R.y + h / 2, Object.assign({ size: L.G.s * 0.85, alpha: k1, halo: true }, f.AMB));
      f.T(ctx, '6 × 3 = 18', R.x + split + 1.5 * u, R.y + h + 36, Object.assign({ size: L.G.s * 0.7, alpha: k1, halo: true }, f.AMB));
    }
    if (second > 0) {
      const k2 = second * a, cx = R.x + 9.5 * u;
      ctx.fillStyle = `rgba(${LI.PAPER_RGB},${0.75 * k2})`; ctx.fillRect(R.x + 9 * u + 2, R.y + 2, u - 4, h - 4);
      f.crossInk(ctx, cx, R.y + h / 2, 16, seg(t, 56.2, 57.0), k2);
      f.T(ctx, '6 × 10 = 60', R.x + 4.5 * u, R.y + h / 2, Object.assign({ size: L.G.s * 0.85, alpha: k2, halo: true }, f.AMB));
      f.T(ctx, '− 6 × 1', cx, R.y + h + 36, Object.assign({ size: L.G.s * 0.7, alpha: k2, halo: true }, f.AMB));
    }
  }

  /* 64–80: which properties hold? */
  function props(ctx, env, t) {
    const L = KD.L(env), P = L.PR, f = F(), a = win(t, 64.6, 79.8) * END(t); if (a <= 0) return;
    [['a + b = b + a', true], ['a × b = b × a', true], ['a × (b + c) = a × b + a × c', true], ['8 − 3 ile 3 − 8 eşit mi?', false], ['12 ÷ 4 ile 4 ÷ 12 eşit mi?', false]].forEach(([s, ok], i) => {
      const k = seg(t, 65.0 + i * 1.4, 65.5 + i * 1.4) * a; if (k <= 0) return;
      f.T(ctx, s, P.x, P.y[i], Object.assign({ size: L.G.s * 0.9, alpha: k, align: 'left', halo: true }, ok ? {} : f.AMB));
      if (ok) f.tick(ctx, P.x - 44, P.y[i], seg(t, 65.6 + i * 1.4, 66.2 + i * 1.4), a); else f.crossInk(ctx, P.x - 44, P.y[i], 14, seg(t, 70.0 + (i - 3) * 1.4, 70.8 + (i - 3) * 1.4), a);
    });
  }

  function context(ctx, env, t) {
    exprs(ctx, t, KD.L(env).CX, [
      [4.4, 10.2, 'Terazi dengede: 7 + 5 = 12'],
      [10.6, 27.8, 'Varsayım: iki tarafa aynı sayıyı eklersek denge korunur'],
      [28.4, 45.8, 'Sıra ve gruplama değişirse sonuç değişir mi?'],
      [46.4, 63.8, 'Çarpma, toplama ve çıkarma üzerine dağılır mı?'],
      [64.4, 79.8, 'Hangi özellikler her zaman geçerli?'],
    ]);
  }

  function words(ctx, env, t) {
    const W = KD.L(env).W;
    exprs(ctx, t, at(W, 0), [[6.4, 10.2, 'İki kefede eşit miktar var'], [11.4, 27.8, 'Sol kefeye 3 ekledik: terazi sola eğildi'],
      [29.4, 35.8, '3 + 5 = 5 + 3 = 8: değişme özelliği'], [36.4, 45.8, '4 × 6 = 6 × 4 = 24: çarpmada da değişme'],
      [47.0, 55.2, '6 × 13 = 6 × 10 + 6 × 3 = 60 + 18 = 78'], [65.0, 79.8, 'Toplama ve çarpmada değişme var; çıkarma ve bölmede yok']]);
    exprs(ctx, t, at(W, 1), [[14.4, 27.8, 'Sağ kefeye de 3 ekledik: yine dengede · 7 + 5 + 3 = 12 + 3'], [40.8, 45.8, '(2 + 8) + 5 = 2 + (8 + 5) = 15: birleşme özelliği'],
      [55.6, 63.8, '6 × 9 = 6 × 10 − 6 × 1 = 60 − 6 = 54'], [72.4, 79.8, 'Önermeler: a + b = b + a · a × (b + c) = a × b + a × c']]);
    exprs(ctx, t, at(W, 2), [[19.6, 27.8, 'Eşitliğin iki tarafına aynı işlemi yaparsak eşitlik korunur', true], [32.0, 35.8, 'Sırası değişse de toplam aynı', true],
      [51.0, 55.2, 'Çarpma, toplama üzerine dağılır', true], [59.6, 63.8, 'Çarpma, çıkarma üzerine de dağılır', true],
      [76.0, 79.8, 'Zihinden işlemde işe yarar: 6 × 13 = 60 + 18', true]]);
  }

  function summary(ctx, env, t) {
    if (t < 80.4) return;
    const S = KD.L(env).SUM, f = F(), a = END(t);
    [['İki tarafa aynı işlem: eşitlik korunur', 80.6], ['Değişme ve birleşme: toplamada ve çarpmada', 81.6], ['Dağılma: 6 × 13 = 6 × 10 + 6 × 3', 82.6], ['Özellikler zihinden işlemi kolaylaştırır!', 83.6, true]].forEach(([s, t0, hot], i) => {
      const al = seg(t, t0, t0 + 0.4) * a; if (al <= 0) return;
      f.expr(ctx, [s], S.x, S.y[i], S.s * (i === 3 ? 1.1 : 1), { alpha: al, w: S.w, halo: true, color: hot ? A.amber : undefined });
    });
  }

  LI.fireworks = function (ctx, env, t) {
    const k = seg(t, 84.4, 86.4);
    if (k <= 0 || t >= 91) return;
    const n = F().nokta(t, env), C = [n.x, n.y - 170];
    [30, 60, 90, 120, 150].forEach((d, i) => {
      const r = 150 + 30 * Math.sin(t * 2 + i);
      A.arc(ctx, C, r, d - 12, d + 12, { p: seg(k, i * 0.12, i * 0.12 + 0.4), alpha: 0.8 * (1 - seg(t, 90.2, 91)), w: 6, seed: 80 + i });
    });
  };

  LI.world = function (ctx, env, t) { context(ctx, env, t); balance(ctx, env, t); array(ctx, env, t); area(ctx, env, t); props(ctx, env, t); words(ctx, env, t); summary(ctx, env, t); };

  function camera(t, env) {
    const L = KD.L(env);
    return LI.Camera.breathe(LI.Camera.track([
      [0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [3.0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [4.8, KD.cam(env, { zoom: 1 })],
    ], t), t, 0.5);
  }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 1, start: 0, end: 10, name: 'A balance', nameTr: 'Terazi', concept: '7 + 5 = 12', conceptTr: '7 + 5 = 12', render });
})(window.LI = window.LI || {});
