# 📅 GF DateTimePicker

> A professional, lightweight, and customizable date and time picker library lovingly crafted in Peru 🇵🇪

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/Version-1.0.0-brightgreen.svg)](https://github.com/gianfrancodiaz/gf-datetimepicker)
[![Made with ❤️](https://img.shields.io/badge/Made%20with-❤️-red.svg)](https://github.com/gianfrancodiaz)

## ✨ Features

- 🎨 **Multiple Layouts**: Vertical (compact) and horizontal (with time presets)
- 📱 **Fully Responsive**: Automatically adapts to mobile devices
- 🌈 **Customizable Colors**: Easily theme to match your design
- ⚡ **Lightweight**: No dependencies, pure vanilla JavaScript
- 📅 **Flexible Formats**: Date-only, time-only, or full datetime
- 🕐 **12h/24h Support**: Both time formats supported
- 🚫 **Past Date Restrictions**: Optional blocking of past dates
- 🌍 **UTC Support**: Get values in local time or UTC
- ♿ **Accessible**: Keyboard navigation and screen reader friendly
- 📦 **Easy Integration**: Works with any framework or vanilla JS

## 🚀 Quick Start

### Installation

#### Via CDN

```html
<script src="https://cdn.jsdelivr.net/gh/yourusername/gf-datetimepicker@1.0.0/gf-datetimepicker.js"></script>
```

#### Via npm

```bash
npm install gf-datetimepicker
```

#### Direct Download

Download `gf-datetimepicker.js` and include it in your project:

```html
<script src="path/to/gf-datetimepicker.js"></script>
```

### Basic Usage

```html
<!-- Create a container -->
<div id="my-date-picker"></div>

<script>
// Initialize the picker
const picker = new GFDateTimePicker('#my-date-picker', {
    format: 'datetime12h',
    onChange: (date) => {
        console.log('Selected date:', date);
    }
});
</script>
```

## 📖 Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `format` | `string` | `'datetime12h'` | Output format: `'date'`, `'time12h'`, `'time24h'`, `'datetime12h'`, `'datetime24h'` |
| `layout` | `string` | `'vertical'` | Layout style: `'vertical'` or `'horizontal'` |
| `mainColor` | `string` | `'#4a6cf7'` | Primary color for UI elements |
| `iconColor` | `string` | `'#4a6cf7'` | Color for icons |
| `placeholder` | `string` | `'Select date and time'` | Input placeholder text |
| `allowPastDates` | `boolean` | `true` | Whether to allow selection of past dates |
| `disabled` | `boolean` | `false` | Initial disabled state |
| `defaultDate` | `Date` | `null` | Pre-selected date on initialization |
| `triggerChangeOnInit` | `boolean` | `false` | Fire onChange callback when initialized with defaultDate |
| `zIndex` | `number` | `1000` | CSS z-index for the picker popup |
| `onChange` | `function` | `null` | Callback function called when date changes |

## 🛠️ API Methods

### Getters

```javascript
// Get values in different formats
picker.getSelectedDate()      // Returns Date object
picker.getDate()              // Returns "MM/DD/YYYY"
picker.getTime12h()           // Returns "HH:MM AM/PM"
picker.getTime24h()           // Returns "HH:MM"
picker.getDateTime12h()       // Returns "MM/DD/YYYY HH:MM AM/PM"
picker.getDateTime24h()       // Returns "MM/DD/YYYY HH:MM"

// UTC versions
picker.getSelectedDateUTC()   // Returns Date object in UTC
picker.getDateUTC()           // Returns UTC date string
picker.getTime12hUTC()        // Returns UTC time in 12h format
picker.getTime24hUTC()        // Returns UTC time in 24h format
picker.getDateTime12hUTC()    // Returns UTC datetime in 12h format
picker.getDateTime24hUTC()    // Returns UTC datetime in 24h format
```

### Setters & Control

```javascript
// Set values
picker.setDate(new Date())           // Set specific date
picker.setToCurrentDateTime()        // Set to current date/time
picker.clear()                       // Clear selection

// Control picker
picker.open()                        // Open picker programmatically
picker.close()                       // Close picker programmatically
picker.enable()                      // Enable picker
picker.disable()                     // Disable picker
picker.isDisabled()                  // Check if disabled

// Styling
picker.updateColors('#FF6B6B', '#4ECDC4')  // Update colors

// Cleanup
picker.destroy()                     // Remove picker and cleanup
```

### Static Methods

```javascript
// Initialize multiple pickers at once
const pickers = GFDateTimePicker.init('.date-picker', {
    mainColor: '#FF6B6B',
    allowPastDates: false
});
```

## 💡 Examples

### Different Formats

```javascript
// Date only
const datePicker = new GFDateTimePicker('#date-only', {
    format: 'date'
});

// Time only (12h)
const timePicker = new GFDateTimePicker('#time-12h', {
    format: 'time12h'
});

// DateTime (24h)
const dateTimePicker = new GFDateTimePicker('#datetime-24h', {
    format: 'datetime24h'
});
```

### Custom Styling

```javascript
const customPicker = new GFDateTimePicker('#custom-picker', {
    mainColor: '#FF6B6B',
    iconColor: '#4ECDC4',
    placeholder: 'Pick a date...'
});

// Update colors after initialization
customPicker.updateColors('#9C88FF', '#FF6B6B');
```

### Horizontal Layout with Presets

```javascript
const horizontalPicker = new GFDateTimePicker('#horizontal-picker', {
    layout: 'horizontal',
    format: 'datetime12h',
    onChange: (date) => {
        if (date) {
            console.log('Selected:', date.toLocaleString());
        }
    }
});
```

### Restrict Past Dates

```javascript
const futurePicker = new GFDateTimePicker('#future-only', {
    allowPastDates: false,
    defaultDate: new Date(),
    triggerChangeOnInit: true
});
```

### External Button Integration

```javascript
// When using open() with external buttons, add 'gf-btn-open' class
const picker = new GFDateTimePicker('#my-picker');

document.getElementById('external-btn').addEventListener('click', (e) => {
    e.target.classList.add('gf-btn-open');
    picker.open();
});
```

```html
<!-- Or add the class directly -->
<button class="gf-btn-open" onclick="picker.open()">Open Picker</button>
```

## 🌐 Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ IE 11 (with polyfills)

## 📱 Mobile Support

The picker automatically adapts to mobile devices:
- Touch-friendly interface
- Responsive layouts
- Horizontal layout becomes vertical on small screens
- Native-like experience

## 🎨 Theming & Customization

### CSS Custom Properties

You can also customize the picker using CSS custom properties:

```css
:root {
    --gf-main-color: #your-color;
    --gf-icon-color: #your-icon-color;
    --gf-border-color: #your-border-color;
    --gf-background-color: #your-background;
    /* ... and more */
}
```

### Custom Styles

All elements have CSS classes for easy customization:

```css
.gf-date-picker-container { /* Container styles */ }
.gf-date-picker-input { /* Input styles */ }
.gf-date-picker-calendar { /* Calendar popup styles */ }
/* ... and more classes available */
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup

1. Clone the repository
2. Make your changes
3. Test your changes
4. Submit a pull request

### Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Keep the library lightweight and dependency-free

## 📄 License

This project is licensed under the MIT License - see the full license text below:

```
MIT License

Copyright (c) 2025 Gianfranco Díaz Badoino

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 👨‍💻 Author

**Gianfranco Díaz Badoino**
- Made with ❤️ in Peru 🇵🇪

## 🆘 Support

If you find this project helpful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 🤝 Contributing code

---

<div align="center">
Made with ❤️ in Peru 🇵🇪 | MIT License | GF DateTimePicker v1.0.0
</div>