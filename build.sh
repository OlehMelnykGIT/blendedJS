#!/bin/sh
# Збірка всього сайту для Vercel (див. vercel.json). Результат — папка _site/.
# Новий статичний файл чи папку додай у cp, новий Vite-проєкт — окремим vite build.
set -e

rm -rf _site
mkdir _site
cp -R index.html lesson-*.html css js js-inKlass _site/

# --outDir рахується від root: 'src' у vite.config.js, тому ../../
(cd lesson-5-vite && npx vite build --base=/lesson-5-vite/ --outDir ../../_site/lesson-5-vite)
(cd blended_products && npx vite build --base=/blended_products/ --outDir ../../_site/blended_products)
