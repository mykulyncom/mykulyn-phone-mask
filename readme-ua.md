# Simple Phone Mask

Легка та налаштовувана маска вводу номера телефону з прапорами країн та можливістю вибору.

_Read this in other languages: [English](readme.md)_

[![NPM Version](https://img.shields.io/npm/v/simple-phone-mask.svg)](https://www.npmjs.com/package/simple-phone-mask)
[![GitHub License](https://img.shields.io/github/license/mykulyncom/simple-phone-mask)](https://github.com/mykulyncom/simple-phone-mask/blob/main/LICENSE)

## Можливості

- Відображення прапора країни з опціональним вибором
- Автоматичне форматування номера телефону відповідно до країни
- Підтримка користувацьких масок
- Налаштовувані параметри відображення
- Без залежностей
- Легкий (~5KB gzipped)

## Демо

Перегляньте [онлайн демо](https://mykulyn.com/simple-phone-mask/) в дії!

## Встановлення

### NPM

```bash
npm install simple-phone-mask
```

### CDN

```html
<script src="https://unpkg.com/simple-phone-mask@1.0.2/dist/simple-phone-mask.min.js"></script>
```

## Використання

### HTML

```html
<input type="tel" id="phone" />
```

### JavaScript

```javascript
// Базове використання з налаштуваннями за замовчуванням (Україна)
new SimplePhoneMask("#phone");

// З прапором та вибором країни
new SimplePhoneMask("#phone", {
  countryCode: "UA",
  showFlag: true,
  allowCountrySelect: true,
});

// З прапором але без вибору країни
new SimplePhoneMask("#phone", {
  countryCode: "US",
  showFlag: true,
  allowCountrySelect: false,
});

// Без прапора
new SimplePhoneMask("#phone", {
  countryCode: "PL",
  showFlag: false,
});

// З користувацькою маскою
new SimplePhoneMask("#phone", {
  countryCode: "+48",
  maskPattern: "___ ___ ___",
  showFlag: true,
  allowCountrySelect: false,
});
```

## Параметри

| Параметр           | Тип     | За замовчуванням | Опис                                                                    |
| ------------------ | ------- | ---------------- | ----------------------------------------------------------------------- |
| countryCode        | string  | "UA"             | Код країни (напр., 'UA', 'US') або телефонний код (напр., '+380', '+1') |
| maskPattern        | string  | null             | Користувацька маска (перевизначає маску країни за замовчуванням)        |
| showFlag           | boolean | true             | Показувати прапор країни                                                |
| allowCountrySelect | boolean | true             | Дозволити вибір країни з випадаючого списку                             |

## Підтримувані країни

Бібліотека підтримує форматування номерів телефонів для багатьох країн, включаючи:

- Україна (+380)
- США (+1)
- Велика Британія (+44)
- Німеччина (+49)
- Франція (+33)
- Польща (+48)
- Та багато інших...

## Підтримка браузерів

- Chrome (остання версія)
- Firefox (остання версія)
- Safari (остання версія)
- Edge (остання версія)
- Opera (остання версія)

## Як зробити внесок

1. Зробіть форк!
2. Створіть гілку для нової функції: `git checkout -b feature/my-new-feature`
3. Зробіть коміт змін: `git commit -am 'Додано нову функцію'`
4. Відправте зміни: `git push origin feature/my-new-feature`
5. Створіть Pull Request

## Ліцензія

Цей проект ліцензований під MIT License - дивіться файл [LICENSE](LICENSE) для деталей.

## Автор

Створено [Сергієм Микулином](https://github.com/mykulyncom)

## Підтримка

Якщо вам сподобався цей проект, будь ласка, поставте ⭐️ на [GitHub](https://github.com/mykulyncom/simple-phone-mask)!
