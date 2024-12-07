# Simple Phone Mask

A lightweight and customizable phone number input mask with country flags and selection.

_Read this in other languages: [Українська](readme-ua.md)_

[![NPM Version](https://img.shields.io/npm/v/simple-phone-mask.svg)](https://www.npmjs.com/package/simple-phone-mask)
[![GitHub License](https://img.shields.io/github/license/mykulyncom/simple-phone-mask)](https://github.com/mykulyncom/simple-phone-mask/blob/main/LICENSE)

## Features

- 🌍 Country flag display with optional country selection
- 📱 Automatic phone number formatting based on country
- 🎯 Custom mask patterns support
- 🎨 Customizable display options
- 🚀 No dependencies
- 📦 Lightweight (~5KB gzipped)

## Demo

Check out the [online demo](https://mykulyn.com/simple-phone-mask/) to see it in action!

## Installation

### NPM

```bash
npm install simple-phone-mask
```

### CDN

```html
<script src="https://unpkg.com/simple-phone-mask@1.0.2/dist/simple-phone-mask.min.js"></script>
```

## Usage

### HTML

```html
<input type="tel" id="phone" />
```

### JavaScript

```javascript
// Basic usage with default settings (Ukraine)
new SimplePhoneMask("#phone");

// With country flag and selection
new SimplePhoneMask("#phone", {
  countryCode: "UA",
  showFlag: true,
  allowCountrySelect: true,
});

// With flag but without country selection
new SimplePhoneMask("#phone", {
  countryCode: "US",
  showFlag: true,
  allowCountrySelect: false,
});

// Without flag
new SimplePhoneMask("#phone", {
  countryCode: "PL",
  showFlag: false,
});

// With custom mask pattern
new SimplePhoneMask("#phone", {
  countryCode: "+48",
  maskPattern: "___ ___ ___",
  showFlag: true,
  allowCountrySelect: false,
});
```

## Options

| Option             | Type    | Default | Description                                                        |
| ------------------ | ------- | ------- | ------------------------------------------------------------------ |
| countryCode        | string  | "UA"    | Country code (e.g., 'UA', 'US') or phone code (e.g., '+380', '+1') |
| maskPattern        | string  | null    | Custom mask pattern (overrides default country mask)               |
| showFlag           | boolean | true    | Show country flag                                                  |
| allowCountrySelect | boolean | true    | Allow country selection from dropdown                              |

## Supported Countries

The library supports phone number formatting for multiple countries including:

- 🇺🇦 Ukraine (+380)
- 🇺🇸 United States (+1)
- 🇬🇧 United Kingdom (+44)
- 🇩🇪 Germany (+49)
- 🇫🇷 France (+33)
- 🇵🇱 Poland (+48)
- And many more...

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Created by [Serhii Mykulyn](https://github.com/mykulyncom)

## Support

If you found this project useful, please consider giving it a ⭐️ on [GitHub](https://github.com/mykulyncom/simple-phone-mask)!
