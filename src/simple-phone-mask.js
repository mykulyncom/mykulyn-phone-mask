/**
 * Class representing a phone number mask
 */
class SimplePhoneMask {
    /**
     * Create a phone mask
     * @param {string} selector - CSS selector for input elements
     * @param {Object} options - Configuration options
     * @param {string} [options.countryCode="+38"] - Country code with or without plus sign
     * @param {string} [options.maskPattern="(___) ___ __ __"] - Pattern for phone number mask
     */
    constructor(selector, options = {}) {
        this.selector = selector;
        this.countryCode = (options.countryCode || "+38").replace("+", "");
        this.maskPattern = options.maskPattern || "(___) ___ __ __";
        this.prefixLength = this.countryCode.length + 1; // +1 for + symbol

        // Bind methods to preserve context
        this.createMask = this.createMask.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleSelect = this.handleSelect.bind(this);

        this.init();
    }

    /**
     * Set cursor position in input element
     * @param {number} pos - Cursor position
     * @param {HTMLElement} elem - Input element
     */
    setCursorPosition(pos, elem) {
        elem.focus();

        if (elem.setSelectionRange) {
            elem.setSelectionRange(pos, pos);
        } else if (elem.createTextRange) {
            let range = elem.createTextRange();
            range.collapse(true);
            range.moveEnd("character", pos);
            range.moveStart("character", pos);
            range.select();
        }
    }

    /**
     * Create mask for input value
     * @param {Event} event - Input event
     */
    createMask(event) {
        const input = event.target;
        let matrix = "+" + this.countryCode + " " + this.maskPattern,
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = input.value.replace(/\D/g, "");

        if (val.length < this.countryCode.length && event.type !== "input") {
            val = this.countryCode + val;
        }

        if (def.length >= val.length) {
            val = def;
        }

        input.value = matrix.replace(/./g, function (a) {
            return /[_\d]/.test(a) && i < val.length
                ? val.charAt(i++)
                : i >= val.length
                    ? ""
                    : a;
        });

        if (event.type === "blur") {
            if (input.value.length <= this.prefixLength + 1) {
                input.value = "+" + this.countryCode;
            }
        } else {
            const cursorPos = input.value.length;
            this.setCursorPosition(Math.max(this.prefixLength + 1, cursorPos), input);
        }
    }

    /**
     * Handle cursor position on click
     * @param {Event} e - Click event
     */
    handleClick(e) {
        const input = e.target;
        if (input.selectionStart < this.prefixLength + 1) {
            this.setCursorPosition(this.prefixLength + 1, input);
        }
    }

    /**
     * Handle keyboard navigation
     * @param {KeyboardEvent} e - Keyboard event
     */
    handleKeyDown(e) {
        const input = e.target;
        if (e.key === "ArrowLeft" || e.key === "Home" || e.key === "ArrowUp") {
            if (input.selectionStart <= this.prefixLength + 1) {
                e.preventDefault();
                this.setCursorPosition(this.prefixLength + 1, input);
            }
        }
    }

    /**
     * Handle text selection
     * @param {Event} e - Select event
     */
    handleSelect(e) {
        const input = e.target;
        if (input.selectionStart < this.prefixLength + 1) {
            this.setCursorPosition(this.prefixLength + 1, input);
        }
    }

    /**
     * Initialize mask for all matching inputs
     */
    init() {
        let inputs = document.querySelectorAll(this.selector);
        
        inputs.forEach((input) => {
            input.addEventListener("input", this.createMask);
            input.addEventListener("focus", this.createMask);
            input.addEventListener("blur", this.createMask);
            input.addEventListener("click", this.handleClick);
            input.addEventListener("keydown", this.handleKeyDown);
            input.addEventListener("select", this.handleSelect);
        });
    }

    /**
     * Destroy mask and remove all event listeners
     */
    destroy() {
        let inputs = document.querySelectorAll(this.selector);
        
        inputs.forEach((input) => {
            input.removeEventListener("input", this.createMask);
            input.removeEventListener("focus", this.createMask);
            input.removeEventListener("blur", this.createMask);
            input.removeEventListener("click", this.handleClick);
            input.removeEventListener("keydown", this.handleKeyDown);
            input.removeEventListener("select", this.handleSelect);
        });
    }
}

// Export for use in modules
export default SimplePhoneMask;