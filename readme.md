# Simple Phone Mask

A simple input mask library for phone numbers

## Features

- 📱 Smart phone number formatting
- ✨ Support for international phone number formats
- 🎯 Simple integration
- ⚡ Lightweight and performant

## Installation

```bash
npm install simple-phone-mask
```

## Usage

### HTML

```html
<input type="text" id="phone" placeholder="+38 (___) ___ __ __" />
```

### NPM

```javascript
import SimplePhoneMask from "simple-phone-mask";

// Default Ukrainian phone mask
const phoneMask = new SimplePhoneMask("#phone");

// Custom US phone mask
const customMask = new SimplePhoneMask("#custom-phone", {
  countryCode: "+1",
  maskPattern: "(___) ___-____",
});
```

### CDN

```html
<script src="https://unpkg.com/simple-phone-mask@1.0.0/dist/simple-phone-mask.min.js"></script>
<script>
  // SimplePhoneMask is available as a global object
  new SimplePhoneMask("#phone");
</script>
```

## Documentation

For detailed documentation, please visit our [GitHub Wiki](https://github.com/mykulyncom/simple-phone-mask/wiki).

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
