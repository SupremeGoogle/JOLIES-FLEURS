#!/bin/bash
# Jolies Fleurs — автопуш в GitHub
# Использование: ./push.sh "описание изменений"

set -e

cd "$(dirname "$0")"

MSG="${1:-Обновление сайта}"

echo "📦 Добавляем изменения..."
git add .

if git diff --cached --quiet; then
  echo "✅ Нет изменений для коммита"
  exit 0
fi

echo "💾 Коммит: $MSG"
git commit -m "$MSG"

echo "🚀 Пушим в GitHub..."
git push origin main

echo "✅ Готово! Vercel запустит деплой автоматически."
