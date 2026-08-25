PAJOMAR — Image Folders
========================

Each folder = a collection of photos. Drop .jpg / .png / .webp files inside.

Structure:
  assets/images/
    hero/          → homepage slideshow (all photos used)
    صور تسويق/     → homepage first section (exactly 4 photos)
    sheer/         → sheer curtain photos
    blackout/
    decorative/
    classic/
    modern/
    custom/
    white/
    bedroom/
    living/
    dining/
    office/
    products/      → optional per-product galleries
      aurora-sheer/
      nocturne-blackout/
      ...

Add a NEW collection:
  1. Create a folder with any name, e.g. assets/images/my-style/
  2. Put your photos inside
  3. Run:  node scripts/sync-images.js
  4. Use in code:  curtainImg('my-style')  or  curtainImg('my-style', 1)

Copy scripts/sync-images.js + js/image-lib.js to any project — same workflow.

---
بالعربي
-------
كل فولدر = مجموعة صور. حطي الصور جوه الفولدر (.jpg / .png / .webp).

إضافة مجموعة جديدة:
  1. اعملي فولدر بأي اسم، مثلاً: assets/images/my-style/
  2. حطي الصور جواه
  3. شغّلي:  node scripts/sync-images.js
  4. الموقع يقرأها تلقائي

فولدر hero/ = صور السلايدر في الصفحة الرئيسية.
فولدر صور تسويق/ = أول جزء في الرئيسية (4 صور فقط — حطي 4 صور جواه).
فولدر products/<اسم-المنتج>/ = صور خاصة لمنتج معين (اختياري).
