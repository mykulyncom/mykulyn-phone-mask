import './simple-phone-mask.css';
import { countryData } from './country-data';

/**
 * Class representing a phone number mask
 */
class SimplePhoneMask {
	/**
	 * Create a phone mask
	 * @param {string} selector - CSS selector for input elements
	 * @param {Object} options - Configuration options
	 * @param {string} [options.countryCode="UA"] - Country code (e.g., 'UA', 'US', 'GB') or phone code (e.g., '+380', '+1', '+44')
	 * @param {string} [options.maskPattern=null] - Custom mask pattern (overrides default country mask)
	 * @param {boolean} [options.showFlag=true] - Show country flag
	 * @param {boolean} [options.allowCountrySelect=true] - Allow country selection from dropdown
	 * @param {boolean} [options.detectIP=false] - Detect country by IP
	 */
	constructor(selector, options = {}) {
		this.selector = selector;

		// Normalize options with defaults
		const defaultOptions = {
			countryCode: 'UA',
			maskPattern: null,
			showFlag: true,
			allowCountrySelect: true,
			detectIP: false,
		};

		this.options = { ...defaultOptions, ...options };

		// Get country data
		let country;
		if (this.options.countryCode.startsWith('+')) {
			// Find country by phone code
			const phoneCode = this.options.countryCode;
			country = Object.values(countryData).find((c) => c.phoneCode === phoneCode);
		} else {
			// Find country by country code
			country = countryData[this.options.countryCode.toUpperCase()];
		}

		if (!country) {
			// console.error(`Invalid country code: ${this.options.countryCode}`);
			country = countryData.UA; // Default to Ukraine
		}

		this.countryCode = country.phoneCode.replace('+', '');
		this.maskPattern = this.options.maskPattern || country.mask;
		this.prefixLength = this.countryCode.length + 1; // +1 for + symbol
		this.currentCountry = country;

		// Bind methods to preserve context
		this.createMask = this.createMask.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.handleCountrySelect = this.handleCountrySelect.bind(this);
		this.createDropdown = this.createDropdown.bind(this);

		this.initialize();
	}

	/**
	 * Set cursor position in input element
	 * @param {number} pos - Cursor position
	 * @param {HTMLElement} elem - Input element
	 * @param {boolean} [setFocus=false] - Whether to set focus on element
	 */
	setCursorPosition(pos, elem, setFocus = false) {
		if (setFocus) {
			elem.focus();
		}

		if (elem.setSelectionRange) {
			elem.setSelectionRange(pos, pos);
		} else if (elem.createTextRange) {
			let range = elem.createTextRange();
			range.collapse(true);
			range.moveEnd('character', pos);
			range.moveStart('character', pos);
			range.select();
		}
	}

	/**
	 * Handle cursor position on click
	 * @param {Event} e - Click event
	 */
	handleClick(e) {
		const input = e.target;
		if (input.selectionStart < this.prefixLength + 1) {
			// Set focus to true only for click events
			this.setCursorPosition(this.prefixLength + 1, input, true);
		}
	}

	/**
	 * Handle keyboard navigation
	 * @param {KeyboardEvent} event - Keyboard event
	 */
	handleKeyDown(event) {
		const input = event.target;
		const cursorPosition = input.selectionStart;

		if (
			(event.key === 'Backspace' || event.key === 'ArrowLeft' || event.key === 'ArrowUp') &&
			cursorPosition <= this.prefixLength
		) {
			event.preventDefault();
			// Set focus to true for keyboard navigation
			this.setCursorPosition(this.prefixLength + 1, input, true);
		}

		// Prevent cursor from moving up when more than one digit is entered
		const digitsEntered = input.value.replace(/\D/g, '').length - this.countryCode.length;
		if (event.key === 'ArrowUp' && digitsEntered > 1) {
			event.preventDefault();
		}

		// Ensure the mask is applied correctly and the cursor stays within the allowed range
		// This is crucial for maintaining the correct mask format and preventing the cursor from moving outside the allowed range
	}

	/**
	 * Handle text selection
	 * @param {Event} e - Select event
	 */
	handleSelect(e) {
		const input = e.target;
		if (input.selectionStart < this.prefixLength + 1) {
			// Set focus to true only for select events
			this.setCursorPosition(this.prefixLength + 1, input, true);
		}
	}

	/**
	 * Create mask for input value
	 * @param {Event} event - Input event
	 */
	createMask(event) {
		const input = event.target;
		const matrix = '+' + this.countryCode + ' ' + this.maskPattern;
		let i = 0;
		const def = matrix.replace(/\D/g, '');
		let val = input.value.replace(/\D/g, '');

		// Remove temporary protection of country code for debugging
		// if (!input.value.startsWith("+" + this.countryCode)) {
		//   val = def;
		// }

		input.value = matrix.replace(/./g, function (a) {
			if (/[_\d]/.test(a) && i < val.length) {
				return val.charAt(i++);
			} else if (i >= val.length) {
				return '';
			} else {
				return a;
			}
		});

		if (event.type === 'blur') {
			if (input.value.length <= this.prefixLength + 1) {
				input.value = '+' + this.countryCode;
			}
		} else {
			this.setCursorPosition(input.value.length, input);
		}
	}

	/**
	 * Create country selector dropdown
	 * @param {HTMLElement} input - Input element
	 */
	createDropdown(input) {
		if (!this.options.showFlag) return;

		const wrapper = document.createElement('div');
		wrapper.className = 'spm-wrapper';
		input.parentNode.insertBefore(wrapper, input);
		wrapper.appendChild(input);
		input.className += ' spm-input';

		const flagButton = document.createElement('div');
		flagButton.className = `spm-flag-button ${
			this.options.allowCountrySelect ? 'spm-flag-button--selectable' : 'spm-flag-button--non-selectable'
		}`;

		flagButton.innerHTML = `<img class="spm-flag-image" src="${this.currentCountry.flag}" alt="${this.currentCountry.name}">`;
		wrapper.appendChild(flagButton);

		if (this.options.allowCountrySelect) {
			const dropdown = document.createElement('div');
			dropdown.className = 'spm-dropdown';

			Object.entries(countryData).forEach(([code, country]) => {
				const option = document.createElement('div');
				option.className = 'spm-dropdown-option';

				option.innerHTML = `
          <img class="spm-flag-image" src="${country.flag}" alt="${country.name}">
          <span class="spm-country-name">${country.name}</span>
          <span class="spm-country-code">${country.phoneCode}</span>
        `;

				option.addEventListener('click', () => this.handleCountrySelect(country, code, input));

				dropdown.appendChild(option);
			});

			wrapper.appendChild(dropdown);

			flagButton.addEventListener('click', () => {
				dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
			});

			document.addEventListener('click', (e) => {
				if (!wrapper.contains(e.target)) {
					dropdown.style.display = 'none';
				}
			});
		}
	}

	/**
	 * Handle country selection from dropdown
	 * @param {Object} country - Country data object
	 * @param {string} code - Country code
	 * @param {HTMLElement} input - Input element
	 */
	handleCountrySelect(country, code, input) {
		this.countryCode = country.phoneCode.replace('+', '');
		this.maskPattern = this.options.maskPattern || country.mask;
		this.prefixLength = this.countryCode.length + 1;
		this.currentCountry = country;

		const flagButton = input.parentNode.querySelector('.spm-flag-button');
		flagButton.innerHTML = `<img class="spm-flag-image" src="${country.flag}" alt="${country.name}">`;

		const dropdown = input.parentNode.querySelector('.spm-dropdown');
		dropdown.style.display = 'none';

		input.value = '+' + this.countryCode;

		this.createMask({
			type: 'input',
			target: input,
		});
	}

	/**
	 * Initialize mask for all matching inputs
	 */
	async initialize() {
		if (this.options.detectIP) {
			try {
				const countryCode = await this.detectCountryByIP();
				this.options.countryCode = countryCode;

				// Update country data after IP detection
				const country = countryData[countryCode];
				if (country) {
					this.countryCode = country.phoneCode.replace('+', '');
					this.maskPattern = this.options.maskPattern || country.mask;
					this.prefixLength = this.countryCode.length + 1;
					this.currentCountry = country;
				}
			} catch (error) {
				console.error('Failed to detect country by IP:', error);
			}
		}

		// Initialize inputs
		let inputs = document.querySelectorAll(this.selector);

		inputs.forEach((input) => {
			if (this.options.showFlag) {
				this.createDropdown(input);
			}

			input.addEventListener('input', this.createMask);
			input.addEventListener('focus', this.createMask);
			input.addEventListener('blur', this.createMask);
			input.addEventListener('click', this.handleClick);
			input.addEventListener('keydown', this.handleKeyDown);
			input.addEventListener('select', this.handleSelect);

			input.value = '+' + this.countryCode;
			// Remove focus trigger
			this.createMask({ type: 'input', target: input });
		});
	}

	/**
	 * Detect country by IP
	 * @returns {Promise<string>} - Country code
	 */
	async detectCountryByIP() {
		try {
			const response = await fetch('https://ipapi.co/json/', {
				cache: 'no-store', // Disable caching
			});
			const data = await response.json();
			return data.country_code;
		} catch (error) {
			console.error('Error detecting country by IP:', error);
			return this.options.countryCode;
		}
	}

	/**
	 * Destroy mask and remove all event listeners
	 */
	destroy() {
		let inputs = document.querySelectorAll(this.selector);

		inputs.forEach((input) => {
			input.removeEventListener('input', this.createMask);
			input.removeEventListener('focus', this.createMask);
			input.removeEventListener('blur', this.createMask);
			input.removeEventListener('click', this.handleClick);
			input.removeEventListener('keydown', this.handleKeyDown);
			input.removeEventListener('select', this.handleSelect);
		});
	}
}

// Export for use in modules
export default SimplePhoneMask;
