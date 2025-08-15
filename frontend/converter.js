// КОНВЕРТИРУЕТ ТХТ ФАЙЛЫ В JSON. ЭТОТ ВАРИАНТ ПРИМЕНИМ ТОЛЬКО К МОДУЛЯМ, МНЕ ЛЕНЬ ЕГО ПЕРЕПИСЫВАТЬ ПОД ДРУГИЕ
import fs from 'fs'
import path from 'path'

const __dirname = path.resolve()

const txtPath = path.join(
  __dirname,
  'node_modules',
  'leo-profanity',
  'dictionary',
  'ru.txt',
)

const jsonFile = path.join(__dirname, '/node_modules/leo-profanity/dictionary/ru.json')

const text = fs.readFileSync(txtPath, 'utf-8')

const wordsArray = text.split('\n').map(word => word.trim()).filter(word => word.length > 0)

fs.writeFileSync(jsonFile, JSON.stringify(wordsArray, null, 2))
