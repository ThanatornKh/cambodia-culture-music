/* =====================================================================
   KAMPUCHEA — interactions
   ===================================================================== */
(function () {
  'use strict';

  var RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------------- DATA: instruments ---------------- */
  var CAT = {
    pluck: { th: 'ประเภทดีด', en: 'Plucked' },
    bow:   { th: 'ประเภทสี',  en: 'Bowed' },
    perc:  { th: 'ประเภทตี',  en: 'Percussion' },
    wind:  { th: 'ประเภทเป่า', en: 'Wind' }
  };

  var DATA = [
    /* ---- ดีด ---- */
    { n:'จะเปยดองแวง', alias:'จาปีดองแวง · กระจับปี่', rom:'Chapei Dang Veng', c:'pluck', img:'30710_0.jpg',
      unesco:true,
      d:'พิณคอยาว 2 สาย ดีดคลอการขับร้องเล่าเรื่องแบบด้นสด ผู้บรรเลงเป็นทั้งนักดนตรีและนักเล่าเรื่องในคนเดียวกัน '+
        'ใช้เล่านิทานชาดก สอนศีลธรรม และเสียดสีสังคม ได้รับการขึ้นทะเบียนเป็นมรดกวัฒนธรรมที่จับต้องไม่ได้ของยูเนสโก',
      meta:{'จำนวนสาย':'2 สาย','วิธีบรรเลง':'ดีด','วงที่ใช้':'วงอาไย · วงเพลงกา','จุดเด่น':'ขับร้องด้นสดเล่าเรื่อง'} },

    { n:'เขมรพิณ', alias:'พิณ', rom:'Pin', c:'pluck', img:'30711_0.jpg',
      d:'พิณโบราณรูปโค้งแบบอินเดีย (arched harp) ปรากฏอยู่บนภาพสลักที่ปราสาทนครวัด '+
        'ถือเป็นหลักฐานว่าดนตรีเขมรมีรากเชื่อมโยงกับอารยธรรมอินเดียมาตั้งแต่สมัยพระนคร',
      meta:{'รูปทรง':'พิณโค้ง','วิธีบรรเลง':'ดีด','หลักฐาน':'ภาพสลักนครวัด','ยุคสมัย':'สมัยพระนคร'} },


    /* ---- สี ---- */
    { n:'ตรัวเขมร', alias:'ตรอเขมร · ซอสามสาย', rom:'Tro Khmer', c:'bow', img:'30712_0.jpg',
      d:'ซอ 3 สาย กะโหลกทำจากกะลามะพร้าว ตั้งคันซอกับพื้นขณะสี ให้เสียงโหยหวนลึก '+
        'เป็นเครื่องดนตรีหลักของวงเพลงอารักษ์ที่ใช้ในพิธีเข้าทรงและพิธีรักษาโรค',
      meta:{'จำนวนสาย':'3 สาย','กะโหลก':'กะลามะพร้าว','วิธีบรรเลง':'สี (ตั้งกับพื้น)','วงที่ใช้':'วงเพลงอารักษ์'} },

    { n:'ตรอแซมวย', alias:'ซอสายเดียวเขมร', rom:'Tro Sao Muoy', c:'bow', img:'30709_0.jpg',
      d:'ซอสายเดียว กะโหลกขนาดเล็ก ให้เสียงเรียวบางและแหลมสูง ใช้บรรเลงคลอเสียงร้อง '+
        'และเดินทำนองประดับในวงดนตรีพื้นบ้าน',
      meta:{'จำนวนสาย':'1 สาย','ระดับเสียง':'สูง เรียวบาง','วิธีบรรเลง':'สี','หน้าที่':'คลอเสียงร้อง'} },

    { n:'ตรัวซอ', alias:'ตรอซอ · ซอสองสาย', rom:'Tro So', c:'bow', img:'30713_0.jpg',
      d:'ซอ 2 สาย เสียงกลางถึงแหลม เป็นแนวทำนองหลักของวงมโหรีและวงเครื่องสาย '+
        'ทำหน้าที่เดินทำนองคู่ไปกับเสียงร้องและขลุ่ย',
      meta:{'จำนวนสาย':'2 สาย','ระดับเสียง':'กลาง–แหลม','วิธีบรรเลง':'สี','วงที่ใช้':'วงมโหรี'} },

    { n:'ตรัวอู้', alias:'ตรออู้ · ตรัวโอ', rom:'Tro U / Tro Ou', c:'bow', img:'30714_0.jpg',
      d:'ซอ 2 สาย กะโหลกขนาดใหญ่ ให้เสียงทุ้มนุ่มลึก ทำหน้าที่เป็นเสียงต่ำรองรับแนวทำนอง '+
        'ช่วยให้เนื้อเสียงโดยรวมของวงอิ่มและกลมกล่อมขึ้น',
      meta:{'จำนวนสาย':'2 สาย','ระดับเสียง':'ทุ้ม','วิธีบรรเลง':'สี','หน้าที่':'แนวเสียงต่ำของวง'} },

    /* ---- ตี ---- */
    { n:'โรเนียดเอก', alias:'โรเนียตเอก · ระนาดเอกเขมร', rom:'Roneat Ek', c:'perc', img:'30715_0.jpg',
      d:'ระนาดไม้เสียงสูง รางโค้งรูปเรือ เป็นผู้นำทำนองของวงปินเปียต '+
        'ตีด้วยไม้ 2 อัน ใช้เทคนิคตีเก็บและตีกรอเพื่อประดับทำนองอย่างวิจิตร',
      meta:{'วัสดุลูกระนาด':'ไม้','ระดับเสียง':'สูง','บทบาท':'ผู้นำทำนองของวง','วงที่ใช้':'วงปินเปียต'} },

    { n:'โรเนียดธุง', alias:'โรเนียตทุง · ระนาดทุ้ม', rom:'Roneat Thung', c:'perc', img:'30716_0.jpg',
      d:'ระนาดไม้เสียงทุ้ม รางกว้างและลูกระนาดหนากว่าโรเนียดเอก '+
        'ทำหน้าที่สอดแทรกจังหวะและหยอกล้อกับทำนองหลัก ทำให้วงมีมิติ',
      meta:{'วัสดุลูกระนาด':'ไม้','ระดับเสียง':'ทุ้ม','บทบาท':'สอดแทรก หยอกล้อทำนอง','วงที่ใช้':'วงปินเปียต'} },

    { n:'โรเนียดแดก', alias:'โรเนียตเด็ก · ระนาดเหล็ก', rom:'Roneat Dek', c:'perc', img:'30717_0.jpg',
      d:'ระนาดที่ใช้ลูกระนาดโลหะ ให้เสียงใสกังวานและยาวนาน '+
        'ใช้เสริมความคมชัดของทำนองในวงปินเปียตขนาดใหญ่',
      meta:{'วัสดุลูกระนาด':'โลหะ','เสียง':'ใส กังวาน','บทบาท':'เสริมความคมของทำนอง','วงที่ใช้':'วงปินเปียต'} },

    { n:'กงวงธม', alias:'ฆ้องวงใหญ่', rom:'Kong Vong Thom', c:'perc', img:'30718_0.jpg',
      d:'ฆ้องวงใหญ่ ลูกฆ้องเรียงบนรางโค้งเป็นวงกลม ผู้บรรเลงนั่งอยู่กลางวง '+
        'ทำหน้าที่บรรเลง “ทำนองหลัก” ที่เครื่องดนตรีอื่นใช้เป็นแกนในการแปรทำนอง',
      meta:{'ลักษณะ':'ฆ้องเรียงเป็นวงกลม','ขนาด':'ใหญ่','บทบาท':'ทำนองหลัก (แกนของวง)','วงที่ใช้':'วงปินเปียต'} },

    { n:'กงวงตูจ', alias:'กงวงโตจ · ฆ้องวงเล็ก', rom:'Kong Vong Toch', c:'perc', img:'30719_0.jpg',
      d:'ฆ้องวงเล็ก เสียงสูงกว่าฆ้องวงใหญ่ ใช้แปรทำนองด้วยการตีถี่และประดับประดา '+
        'สอดรับกับฆ้องวงใหญ่และระนาดเอก',
      meta:{'ลักษณะ':'ฆ้องเรียงเป็นวงกลม','ขนาด':'เล็ก','บทบาท':'แปรทำนอง ประดับ','วงที่ใช้':'วงปินเปียต'} },

    { n:'สำโพ', alias:'สัมโพ · ตะโพน', rom:'Sampho', c:'perc', img:'30720_0.jpg',
      d:'กลองสองหน้าวางบนขาตั้ง ตีด้วยฝ่ามือทั้งสองข้าง เป็นผู้คุมจังหวะและกำหนดหน้าทับของวง '+
        'ถือเป็นเครื่องดนตรี “ครู” ที่ได้รับความเคารพสูงสุดในวงปินเปียต',
      meta:{'ลักษณะ':'กลองสองหน้า','วิธีบรรเลง':'ตีด้วยฝ่ามือ','บทบาท':'คุมจังหวะ กำหนดหน้าทับ','สถานะ':'เครื่องดนตรีครูของวง'} },

    { n:'สกอร์ธม', alias:'สกอร์ทม · กลองทัด', rom:'Skor Thom', c:'perc', img:'30721_0.jpg',
      d:'กลองใหญ่คู่ ตีด้วยไม้ ให้เสียงหนักแน่นกึกก้อง ใช้ตอกย้ำจังหวะสำคัญ '+
        'และสร้างความยิ่งใหญ่ให้บทเพลงพิธีการ',
      meta:{'ลักษณะ':'กลองใหญ่ 2 ใบ','วิธีบรรเลง':'ตีด้วยไม้','บทบาท':'ตอกย้ำจังหวะหนัก','วงที่ใช้':'วงปินเปียต'} },

    { n:'สกอร์ได', alias:'โทน · กลองมือ', rom:'Skor Daey', c:'perc', img:'30722_0.jpg',
      d:'กลองหน้าเดียวรูปทรงคล้ายแจกัน ตีด้วยมือ น้ำหนักเบา พกพาสะดวก '+
        'ใช้ในวงเพลงกา วงเพลงอารักษ์ และการละเล่นพื้นบ้าน',
      meta:{'ลักษณะ':'กลองหน้าเดียว ทรงแจกัน','วิธีบรรเลง':'ตีด้วยมือ','วงที่ใช้':'วงเพลงกา · เพลงอารักษ์','จุดเด่น':'พกพาง่าย'} },

    { n:'ชิ่ง', alias:'ฉิง · ฉิ่ง', rom:'Ching', c:'perc', img:'30723_0.jpg',
      d:'ฉาบขนาดเล็กรูปถ้วยคู่ ตีกระทบกันเพื่อกำกับจังหวะย่อย '+
        'เป็นตัวกำหนด “ชีพจร” ของบทเพลง ทุกเครื่องดนตรีในวงยึดจังหวะจากเสียงนี้',
      meta:{'ลักษณะ':'ถ้วยโลหะคู่','วิธีบรรเลง':'ตีกระทบ','บทบาท':'กำกับจังหวะย่อย','ความสำคัญ':'ชีพจรของวง'} },

    { n:'ฉาบ', alias:'ฉาบเขมร', rom:'Chhap', c:'perc', img:'30724_0.jpg',
      d:'ฉาบแผ่นแบนขนาดใหญ่กว่าฉิ่ง ให้เสียงกระจายและยาว ใช้เสริมสีสันจังหวะ '+
        'มักใช้ในขบวนแห่และวงดนตรีพื้นบ้านที่ต้องการความคึกคัก',
      meta:{'ลักษณะ':'แผ่นโลหะแบนคู่','วิธีบรรเลง':'ตีกระทบ','บทบาท':'เสริมสีสันจังหวะ','วงที่ใช้':'วงฉายาม · พื้นบ้าน'} },


    /* ---- เป่า ---- */
    { n:'สรอไล', alias:'สราไล · ปี่ไสล', rom:'Sralai', c:'wind', img:'30725_0.jpg',
      d:'ปี่ลิ้นคู่ที่เป็นเสียงหลักของวงปี่พาทย์ (ปินเปียต) เสียงดังกังวานและมีเอกลักษณ์ '+
        'ผู้เป่าต้องใช้เทคนิคระบายลมเพื่อให้เสียงต่อเนื่องไม่ขาดตอน',
      meta:{'ลักษณะลิ้น':'ลิ้นคู่','บทบาท':'เสียงหลักของวงปี่พาทย์','เทคนิค':'ระบายลมต่อเนื่อง','วงที่ใช้':'วงปินเปียต'} },

    { n:'ขลอย', alias:'คลุย · ขลุ่ย', rom:'Khloy', c:'wind', img:'30726_0.jpg',
      d:'ขลุ่ยไม้ไผ่ เสียงนุ่มโปร่ง เป็นเครื่องเป่าที่หาได้ง่ายและใกล้ชิดกับชาวบ้านที่สุด '+
        'ใช้ทั้งบรรเลงเดี่ยว คลอเสียงร้อง และร่วมวงมโหรี',
      meta:{'วัสดุ':'ไม้ไผ่','เสียง':'นุ่ม โปร่ง','วงที่ใช้':'วงมโหรี · เพลงกา · อาไย','จุดเด่น':'เครื่องเป่าพื้นบ้าน'} },

    { n:'สรอไลกลางแขก', alias:'ปี่ออ · ปี่ชวา', rom:'Sralai Klang Khaek', c:'wind', img:'30728_0.jpg',
      d:'ปี่ลำตัวเรียวยาว ปลายบานเป็นลำโพงโลหะ ให้เสียงแหลมดังไกล '+
        'ใช้ในวงกลองยาว ขบวนแห่ และการบรรเลงกลางแจ้ง',
      meta:{'ลักษณะ':'ลำตัวเรียว ปลายบาน','เสียง':'แหลม ดังไกล','ใช้ที่':'กลางแจ้ง · ขบวนแห่','ลิ้น':'ลิ้นคู่'} },

    { n:'สแน็ง', alias:'สแนง · แตรเขาควาย', rom:'Sneng', c:'wind', img:'30727_0.jpg',
      d:'แตรที่ทำจากเขาควายหรือเขาสัตว์ ให้เสียงต่ำก้องคล้ายเสียงสัตว์ร้อง '+
        'ใช้ในพิธีกรรม การส่งสัญญาณ และประเพณีการล่าสัตว์แบบดั้งเดิม',
      meta:{'วัสดุ':'เขาควาย / เขาสัตว์','เสียง':'ต่ำ ก้อง','ใช้ใน':'พิธีกรรม · ล่าสัตว์','หน้าที่':'ส่งสัญญาณ'} }
  ];

  /* ---------------- LOADER ---------------- */
  window.addEventListener('load', function () {
    var l = $('#loader');
    setTimeout(function () {
      if (l) l.classList.add('done');
      var h = $('.hero'); if (h) h.classList.add('in');
      startCounters();
      setTimeout(function () { if (l) l.remove(); }, 900);
    }, RM ? 200 : 1900);
  });

  /* ---------------- CURSOR ---------------- */
  (function () {
    if (RM || window.matchMedia('(hover:none)').matches) return;
    var dot = $('.cur'), ring = $('.cur-ring');
    if (!dot || !ring) return;
    var mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = 'translate(' + mx + 'px,' + my + 'px) translate(-50%,-50%)';
    });
    (function loop() {
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
      ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px) translate(-50%,-50%)';
      requestAnimationFrame(loop);
    })();
    document.addEventListener('mouseover', function (e) {
      var t = e.target.closest('a,button,[data-cursor],.inst,.card,.tile,.row');
      ring.classList.toggle('grow', !!t);
    });
  })();

  /* ---------------- PROGRESS / HEADER / TOP ---------------- */
  (function () {
    var hdr = $('#hdr'), prog = $('#prog'), top = $('#top'), last = 0, ticking = false;
    function upd() {
      var y = window.scrollY || 0;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      prog.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
      hdr.classList.toggle('solid', y > 40);
      if (!document.body.classList.contains('menu-open')) {
        hdr.classList.toggle('hide', y > last && y > 340);
      }
      top.classList.toggle('on', y > 900);
      last = y; ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(upd); }
    }, { passive: true });
    top.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: RM ? 'auto' : 'smooth' }); });
  })();

  /* ---------------- MOBILE MENU ---------------- */
  (function () {
    var b = $('#burger'), m = $('#menu');
    if (!b) return;
    function close() {
      document.body.classList.remove('menu-open', 'is-locked');
      b.setAttribute('aria-expanded', 'false');
    }
    b.addEventListener('click', function () {
      var open = document.body.classList.toggle('menu-open');
      document.body.classList.toggle('is-locked', open);
      b.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    $$('#menu a').forEach(function (a) { a.addEventListener('click', close); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  })();

  /* ---------------- HEADING MASK REVEAL ----------------
     Thai has no word spaces, so masking per word would create
     unbreakable boxes. Mask the whole heading block instead.     */
  $$('[data-split]').forEach(function (el) {
    el.innerHTML = '<span class="w"><i>' + el.innerHTML + '</i></span>';
  });

  /* ---------------- REVEAL ----------------
     Position sweep rather than IntersectionObserver: a fast or
     programmatic jump can skip an IO notification entirely and
     leave a block hidden for good. This can't miss - anything at
     or above the trigger line is revealed, including whatever the
     jump scrolled straight past. */
  var addReveal;
  (function () {
    var pending = [], ticking = false;
    var off = RM || !('requestAnimationFrame' in window);

    function sweep() {
      var line = window.innerHeight * 0.92;
      for (var i = pending.length - 1; i >= 0; i--) {
        var r = pending[i].getBoundingClientRect();
        if (r.top < line) { pending[i].classList.add('in'); pending.splice(i, 1); }
      }
      ticking = false;
    }
    function onScroll() {
      if (!ticking && pending.length) { ticking = true; requestAnimationFrame(sweep); }
    }

    addReveal = function (els) {
      els.forEach(function (t) {
        if (!t.hasAttribute('data-reveal') && !t.classList.contains('sp')) {
          t.setAttribute('data-reveal', '');
        }
        if (off) { t.classList.add('in'); } else { pending.push(t); }
      });
      onScroll();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    window.addEventListener('load', onScroll);
    addReveal($$('[data-reveal],.sp,.tile,.role,.ens,.card'));
  })();

  /* ---------------- PARALLAX ---------------- */
  (function () {
    var els = $$('[data-parallax]');
    if (!els.length || RM) return;
    var tick = false;
    function run() {
      var y = window.scrollY;
      els.forEach(function (el) {
        var k = parseFloat(el.getAttribute('data-parallax')) || 0.1;
        el.style.transform = 'translateX(-50%) translateY(' + (y * k) + 'px)';
      });
      tick = false;
    }
    window.addEventListener('scroll', function () {
      if (!tick) { tick = true; requestAnimationFrame(run); }
    }, { passive: true });
  })();

  /* ---------------- CARD SPOTLIGHT ---------------- */
  document.addEventListener('mousemove', function (e) {
    var c = e.target.closest('.card');
    if (!c) return;
    var r = c.getBoundingClientRect();
    c.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
    c.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
  });

  /* ---------------- COUNTERS ---------------- */
  function startCounters() {
    $$('[data-count]').forEach(function (el) {
      var to = parseInt(el.getAttribute('data-count'), 10) || 0;
      if (RM) { el.textContent = to; return; }
      var t0 = null, dur = 1400;
      function step(ts) {
        if (!t0) t0 = ts;
        var p = Math.min((ts - t0) / dur, 1);
        var e = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(to * e);
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  /* ---------------- WIKIMEDIA COMMONS PHOTOS ----------------
     Special:FilePath resolves a Commons file name to the real
     image and resizes it server-side, so no API key is needed. */
  var WM_FILE = 'https://commons.wikimedia.org/wiki/Special:FilePath/';
  var WM_PAGE = 'https://commons.wikimedia.org/wiki/File:';
  var PHOTOS = {
    angkor:   'Sunrise at Angkor Wat Cambodia.jpg',
    pagoda:   'Silver Pagoda (side view), Phnom Penh (2009).jpg',
    mekong:   '20171124 Mekong River Phnom Penh 4205 DxO.jpg',
    tonlesap: 'The floating village-Tonle Sap lake.jpg',
    dangrek:  'Preah-vihear.jpg',
    cardamom: 'Cardamom Mountains Cambodia.jpg',
    palm:     "Cambodian Sugar Palm (Borassus flabellifer) at Angkor Wat 2.JPG",
    coconut:  'Coconut palms. Cambodia.jpg',
    banana:   "Banana Plant - Musa 'Mon Mari' (49376248196).jpg",
    forest:   'Flooded trees in Kampong Phlouk (7).jpg',
    wood:     '03-Kampong Phluk-nX-14.jpg',
    rice:     'Cambodia - Working in the rice paddies (10678730813).jpg',
    sampot:   'Traditional Khmer attire.jpg',
    menswear: 'Man with Krama.jpg',
    krama:    'Market Woman in Camodia with Krama.jpg',
    costume:  'Featured Apsara Dancers Siem Reap 20091118 01.jpg',
    newyear:  'Khmer New Year GA2010-146.jpg',
    boat:     'Water festival in Phnom Penh 14.jpg',
    wedding:  'Traditional Khmer wedding dress.jpg',
    apsara:   'Apsara dance Khmer Cambodian.jpg',
    amok:     'Amok Cambodian curry.jpg',
    kuyteav:  'Phnom Penh noodle soup (5058468996).jpg',
    loklak:   'Beef Lok Lak.jpg',
    ricefish: 'Harvesting the Rice...Cambodia (6042339077).jpg',
    chapey:   'Keo Samnang playing the chapey.jpg',
    monks:    'Pindacara.jpg',
    spirit:   'Autel (Phnom Kulen) (6825011127).jpg',
    pinpeat:  'Phoenix-Musical Instrument Museum-Cambodia exhibit.jpg',
    apsara2:  'Apsara dancers Siem Reap 20091118 03.jpg'
  };
  function wmName(f) { return encodeURIComponent(f.replace(/ /g, '_')); }

  $$('[data-photo]').forEach(function (box) {
    var file = PHOTOS[box.getAttribute('data-photo')];
    if (!file) return;
    var w = box.getAttribute('data-w') || 900;
    var img = new Image();
    img.alt = box.getAttribute('data-alt') || '';
    img.loading = 'lazy';
    img.decoding = 'async';
    box.classList.add('loading');
    img.onload = function () {
      box.classList.remove('loading');
      box.classList.add('has-photo');
      var a = document.createElement('a');
      a.className = 'credit';
      a.href = WM_PAGE + wmName(file);
      a.target = '_blank';
      a.rel = 'noopener';
      a.textContent = 'Wikimedia';
      a.title = file;
      box.appendChild(a);
    };
    img.onerror = function () {
      /* keep the drawn icon that is already in the box */
      box.classList.remove('loading');
      img.remove();
    };
    img.src = WM_FILE + wmName(file) + '?width=' + w;
    box.insertBefore(img, box.firstChild);
  });


  /* ---------------- HERO SLIDESHOW ----------------
     Landmark photographs, cross-faded with a slow push-in. */
  (function () {
    var box = document.getElementById('heroShow');
    if (!box) return;
    var SLIDES = [
      { f: 'Sunrise at Angkor Wat Cambodia.jpg',
        k: 'Angkor Wat \u00b7 Siem Reap', t: '\u0e1b\u0e23\u0e32\u0e2a\u0e32\u0e17\u0e19\u0e04\u0e23\u0e27\u0e31\u0e14\u0e22\u0e32\u0e21\u0e2d\u0e23\u0e38\u0e13\u0e23\u0e38\u0e48\u0e07' },
      { f: '2016 Angkor, Angkor Thom, Bajon (47).jpg',
        k: 'Bayon \u00b7 Angkor Thom', t: '\u0e43\u0e1a\u0e2b\u0e19\u0e49\u0e32\u0e2b\u0e34\u0e19\u0e41\u0e2b\u0e48\u0e07\u0e1b\u0e23\u0e32\u0e2a\u0e32\u0e17\u0e1a\u0e32\u0e22\u0e19' },
      { f: 'Angkor Wat Ta Prohm Temple doorway overgrown with tree roots.jpg',
        k: 'Ta Prohm \u00b7 Angkor', t: '\u0e1b\u0e23\u0e32\u0e2a\u0e32\u0e17\u0e15\u0e32\u0e1e\u0e23\u0e2b\u0e21\u0e01\u0e31\u0e1a\u0e23\u0e32\u0e01\u0e44\u0e21\u0e49\u0e1e\u0e31\u0e19\u0e1b\u0e35' },
      { f: 'Banteay Srei 32a.jpg',
        k: 'Banteay Srei \u00b7 Siem Reap', t: '\u0e1a\u0e31\u0e19\u0e17\u0e32\u0e22\u0e28\u0e23\u0e35 \u0e1b\u0e23\u0e32\u0e2a\u0e32\u0e17\u0e2b\u0e34\u0e19\u0e17\u0e23\u0e32\u0e22\u0e2a\u0e35\u0e0a\u0e21\u0e1e\u0e39' },
      { f: 'The floating village-Tonle Sap lake.jpg',
        k: 'Tonle Sap \u00b7 Floating Village', t: '\u0e15\u0e25\u0e32\u0e14\u0e19\u0e49\u0e33\u0e01\u0e25\u0e32\u0e07\u0e17\u0e30\u0e40\u0e25\u0e2a\u0e32\u0e1a\u0e42\u0e15\u0e19\u0e40\u0e25\u0e2a\u0e32\u0e1a' },
      { f: 'Cambodia island paradise koh rong sanloem.jpg',
        k: 'Koh Rong Sanloem \u00b7 Sihanoukville', t: '\u0e2b\u0e32\u0e14\u0e17\u0e23\u0e32\u0e22\u0e02\u0e32\u0e27\u0e41\u0e2b\u0e48\u0e07\u0e40\u0e01\u0e32\u0e30\u0e23\u0e07\u0e2a\u0e31\u0e19\u0e40\u0e25\u0e34\u0e21' }
    ];
    var MS = 5600, at = 0, timer = null, imgs = [], dots = [];
    var cap = { k: document.getElementById('hpKicker'), t: document.getElementById('hpTitle') };
    var dotBox = document.getElementById('hpDots');
    box.style.setProperty('--slide-ms', MS + 'ms');

    SLIDES.forEach(function (sl, i) {
      var im = new Image();
      im.alt = sl.t;
      im.decoding = 'async';
      im.src = WM_FILE + wmName(sl.f) + '?width=' + (i ? 1200 : 1600);
      im.addEventListener('load', function () { sl.ok = true; });
      if (i === 0) {
        im.onload = function () {
          box.classList.remove('loading');
          box.classList.add('has-photo');
          show(0);
          if (!RM) { timer = setInterval(next, MS); }
        };
        im.onerror = function () { box.classList.remove('loading'); };
      }
      imgs.push(im);
      box.insertBefore(im, box.firstChild);

      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-label', sl.t);
      b.innerHTML = '<i></i>';
      b.addEventListener('click', function () { if (ready(i)) { go(i); } });
      dotBox.appendChild(b);
      dots.push(b);
    });
    box.classList.add('loading');

    function show(i) {
      at = i;
      imgs.forEach(function (im, n) { im.classList.toggle('on', n === i); });
      dots.forEach(function (d, n) {
        d.classList.remove('on');
        if (n === i) { void d.offsetWidth; d.classList.add('on'); }
      });
      box.classList.add('swapping');
      setTimeout(function () {
        cap.k.textContent = SLIDES[i].k;
        cap.t.textContent = SLIDES[i].t;
        var cr = box.querySelector('.credit');
        if (cr) { cr.href = WM_PAGE + wmName(SLIDES[i].f); cr.title = SLIDES[i].f; }
        box.classList.remove('swapping');
      }, 420);
    }
    function ready(i) { return imgs[i] && imgs[i].naturalWidth > 0; }
    function next() {
      for (var n = 1; n <= SLIDES.length; n++) {
        var i = (at + n) % SLIDES.length;
        if (ready(i)) { show(i); return; }
      }
    }
    function go(i) {
      if (timer) { clearInterval(timer); }
      show(i);
      if (!RM) { timer = setInterval(next, MS); }
    }
    box.addEventListener('mouseenter', function () {
      if (timer) { clearInterval(timer); timer = null; }
    });
    box.addEventListener('mouseleave', function () {
      if (!timer && !RM) { timer = setInterval(next, MS); }
    });
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { if (timer) { clearInterval(timer); timer = null; } }
      else if (!timer && !RM) { timer = setInterval(next, MS); }
    });

    var a = document.createElement('a');
    a.className = 'credit';
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = 'Wikimedia';
    a.href = WM_PAGE + wmName(SLIDES[0].f);
    box.appendChild(a);
  })();

  /* ---------------- CLIMATE CHART ---------------- */
  (function () {
    var MONTHS = ['ม.ค','ก.พ','มี.ค','เม.ย','พ.ค','มิ.ย','ก.ค','ส.ค','ก.ย','ต.ค','พ.ย','ธ.ค'];
    var RAIN = [12, 10, 38, 78, 120, 148, 155, 165, 245, 250, 130, 42];
    var WET = [4, 5, 6, 7, 8, 9]; // พ.ค.–ต.ค.
    var max = Math.max.apply(null, RAIN);
    var ul = document.getElementById('bars');
    if (!ul) return;

    RAIN.forEach(function (v, i) {
      var li = document.createElement('li');
      li.className = WET.indexOf(i) > -1 ? 'wet' : 'dry';
      li.innerHTML = '<span class="bar" data-v="' + v + ' มม."></span><small>' + MONTHS[i] + '</small>';
      ul.appendChild(li);
    });

    var drawn = false;
    function draw() {
      $$('.bar', ul).forEach(function (b, i) {
        b.style.height = Math.max(4, (RAIN[i] / max) * 100) + '%';
      });
    }
    if ('IntersectionObserver' in window && !RM) {
      new IntersectionObserver(function (en, o) {
        if (en[0].isIntersecting && !drawn) { drawn = true; draw(); o.disconnect(); }
      }, { threshold: 0.3 }).observe(ul);
    } else { draw(); }

    $$('[data-season]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        $$('[data-season]').forEach(function (b) { b.classList.remove('on'); });
        btn.classList.add('on');
        var s = btn.getAttribute('data-season');
        $$('li', ul).forEach(function (li) {
          li.classList.toggle('dim', s !== 'all' && !li.classList.contains(s));
        });
      });
    });
  })();

  /* ---------------- INSTRUMENTS GRID ---------------- */
  var visible = [];
  (function () {
    var grid = document.getElementById('instGrid');
    if (!grid) return;

    var PH = { pluck: '#i-string', bow: '#i-string', perc: '#i-drum', wind: '#i-flute' };

    DATA.forEach(function (d, i) {
      var b = document.createElement('button');
      b.className = 'inst';
      b.setAttribute('data-c', d.c);
      b.setAttribute('data-i', i);
      b.setAttribute('data-reveal', 'scale');
      b.style.setProperty('--i', (i % 6));
      var media = d.img
        ? '<img src="' + d.img + '" alt="' + d.n + '" loading="lazy" decoding="async">'
        : '<svg class="ph" viewBox="0 0 64 64"><use href="' + PH[d.c] + '"/></svg>';
      b.innerHTML =
        (d.unesco ? '<span class="tag-unesco">UNESCO</span>' : '') +
        '<span class="inst-img"><span class="idx">' + String(i + 1).padStart(2, '0') + '</span>' +
        media +
        '<span class="zoom"><svg width="16" height="16"><use href="#i-zoom"/></svg></span></span>' +
        '<span class="inst-b"><h4>' + d.n + '</h4><span>' + d.alias + '</span>' +
        '<em>' + d.rom + '</em></span>';
      grid.appendChild(b);
      b.addEventListener('click', function () { openModal(i); });
    });
    if (addReveal) addReveal($$('.inst', grid));

    function apply(f) {
      visible = [];
      $$('.inst', grid).forEach(function (el) {
        var ok = f === 'all' || el.getAttribute('data-c') === f;
        el.classList.toggle('hidden', !ok);
        if (ok) visible.push(parseInt(el.getAttribute('data-i'), 10));
      });
      var label = f === 'all' ? 'ทั้งหมด' : CAT[f].th;
      document.getElementById('icount').textContent = visible.length + ' ชิ้น · ' + label;
    }
    apply('all');

    $$('[data-filter]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        $$('[data-filter]').forEach(function (x) { x.classList.remove('on'); });
        btn.classList.add('on');
        apply(btn.getAttribute('data-filter'));
      });
    });
  })();

  /* ---------------- MODAL ---------------- */
  var cur = 0;
  function openModal(i) {
    var d = DATA[i]; if (!d) return;
    cur = i;
    var PH = { pluck: '#i-string', bow: '#i-string', perc: '#i-drum', wind: '#i-flute' };
    document.getElementById('mImg').innerHTML = d.img
      ? '<img src="' + d.img + '" alt="' + d.n + '">'
      : '<svg viewBox="0 0 64 64"><use href="' + PH[d.c] + '"/></svg>';
    document.getElementById('mRom').textContent = d.rom + ' · ' + CAT[d.c].th;
    document.getElementById('mTitle').textContent = d.n;
    document.getElementById('mAlias').textContent = d.alias;
    document.getElementById('mDesc').textContent = d.d;
    var meta = '';
    Object.keys(d.meta).forEach(function (k) {
      meta += '<div><span>' + k + '</span><b>' + d.meta[k] + '</b></div>';
    });
    document.getElementById('mMeta').innerHTML = meta;
    var m = document.getElementById('modal');
    m.classList.add('on');
    document.body.classList.add('is-locked');
  }
  function closeModal() {
    document.getElementById('modal').classList.remove('on');
    document.body.classList.remove('is-locked');
  }
  function step(dir) {
    var list = visible.length ? visible : DATA.map(function (_, i) { return i; });
    var at = list.indexOf(cur);
    openModal(list[(at + dir + list.length) % list.length]);
  }
  $$('[data-close]').forEach(function (el) { el.addEventListener('click', closeModal); });
  document.getElementById('mPrev').addEventListener('click', function () { step(-1); });
  document.getElementById('mNext').addEventListener('click', function () { step(1); });
  document.addEventListener('keydown', function (e) {
    if (!document.getElementById('modal').classList.contains('on')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });

  /* ---------------- ENSEMBLE RAIL ---------------- */
  (function () {
    var rail = document.getElementById('rail');
    if (!rail) return;
    var prev = document.getElementById('railPrev'), next = document.getElementById('railNext');
    function amount() { var c = rail.querySelector('.ens'); return c ? c.offsetWidth + 20 : 340; }
    function sync() {
      prev.disabled = rail.scrollLeft < 8;
      next.disabled = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 8;
    }
    prev.addEventListener('click', function () { rail.scrollBy({ left: -amount(), behavior: 'smooth' }); });
    next.addEventListener('click', function () { rail.scrollBy({ left: amount(), behavior: 'smooth' }); });
    rail.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    sync();

    // drag to scroll
    var down = false, sx = 0, sl = 0, moved = 0;
    rail.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'touch') return;
      down = true; moved = 0; sx = e.clientX; sl = rail.scrollLeft; rail.classList.add('drag');
    });
    window.addEventListener('pointermove', function (e) {
      if (!down) return;
      var dx = e.clientX - sx; moved = Math.abs(dx);
      rail.scrollLeft = sl - dx;
    });
    window.addEventListener('pointerup', function () {
      if (!down) return;
      down = false; rail.classList.remove('drag');
    });
  })();

  /* ---------------- SONG ACCORDION ---------------- */
  $$('#songRows .row > button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var row = btn.parentElement;
      var open = row.classList.contains('open');
      $$('#songRows .row').forEach(function (r) { r.classList.remove('open'); });
      if (!open) row.classList.add('open');
    });
  });

  /* ---------------- SCROLLSPY ---------------- */
  (function () {
    var links = $$('nav.desk a');
    var secs = links.map(function (a) { return document.querySelector(a.getAttribute('href')); });
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var i = secs.indexOf(en.target);
        links.forEach(function (l, j) { l.classList.toggle('on', i === j); });
      });
    }, { threshold: 0.2, rootMargin: '-20% 0px -60% 0px' });
    secs.forEach(function (s) { if (s) io.observe(s); });
  })();

  /* ---------------- SMOOTH ANCHORS ---------------- */
  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      var t = document.querySelector(id);
      if (!t) return;
      e.preventDefault();
      var y = t.getBoundingClientRect().top + window.scrollY - (id === '#home' ? 0 : 60);
      window.scrollTo({ top: y, behavior: RM ? 'auto' : 'smooth' });
    });
  });

})();
