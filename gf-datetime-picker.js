/**
 * GF DateTimePicker - A professional date and time picker library
 * Version 1.0.0
 * Lovingly crafted in Peru with great care
 *
 * @author Gianfranco Díaz Badoino
 * @license MIT
 * @copyright Copyright (c) 2025 Gianfranco Díaz Badoino
 *
 * MIT License - see https://opensource.org/licenses/MIT
 * Permission is hereby granted, free of charge, to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of this software.
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global = global || self, global.GFDateTimePicker = factory());
}(this, (function () {
    'use strict';

    // CSS Styles
    const styles = `
        :root {
            --gf-main-color: #4a6cf7;
            --gf-icon-color: #4a6cf7;
            --gf-border-color: #c5c7ca;
            --gf-text-color: #333;
            --gf-background-color: #fff;
            --gf-button-background-color: #e5dddd;
            --gf-hover-button-background-color: #efeded;
            --gf-hover-color: #efeded;
            --gf-active-color: #e8f0fe;
            --gf-gray-text: #757575;
            --gf-disabled-text: #bbbbbb;
            --gf-disabled-bg: #f9f9f9;
        }

        .gf-date-picker-container {
            position: relative;
            width: 100%;
            max-width: 300px;
        }

        .gf-date-picker-input {
            width: 100%;
            padding: 4px 5px;
            border: 1px solid var(--gf-border-color);
            border-radius: 4px;
            font-size: 14px;
            color: var(--gf-text-color);
            cursor: pointer;
            background-color: var(--gf-background-color);
            transition: border-color 0.2s;
        }

        .gf-date-picker-input:focus {
            outline: none;
            border-color: var(--gf-main-color);
        }

        .gf-date-picker-input::placeholder {
            color: var(--gf-gray-text);
        }

        /* Disabled state styles */
        .gf-date-picker-input.disabled {
            background-color: var(--gf-disabled-bg);
            color: var(--gf-disabled-text);
            cursor: not-allowed;
            border-color: var(--gf-border-color);
            pointer-events: none;
        }

        .gf-date-picker-container.disabled .gf-date-picker-icon {
            fill: var(--gf-disabled-text);
        }

        .gf-date-picker-icon {
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            width: 20px;
            height: 20px;
            fill: var(--gf-icon-color);
            pointer-events: none;
        }

        .gf-date-picker-calendar {
            position: absolute;
            top: calc(100% + 5px);
            left: 0;
            width: 300px;
            background-color: var(--gf-background-color);
            border: 1px solid var(--gf-border-color);
            border-radius: 4px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            display: none;
            flex-direction: column;
        }

        .gf-date-picker-calendar.active {
            display: flex;
        }

        /* VERTICAL LAYOUT - Default Styles */
        .gf-calendar-main {
            display: flex;
            flex-direction: column;
        }

        .gf-calendar-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 15px;
            border-bottom: 1px solid var(--gf-border-color);
        }

        .gf-calendar-title {
            font-weight: 600;
            color: var(--gf-text-color);
        }

        .gf-calendar-nav {
            display: flex;
            gap: 10px;
        }

        .gf-calendar-nav-btn {
            background: none;
            border: none;
            cursor: pointer;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background-color 0.2s;
        }

        .gf-calendar-nav-btn:hover {
            background-color: var(--gf-hover-color);
        }

        .gf-calendar-nav-btn svg {
            width: 16px;
            height: 16px;
            fill: var(--gf-text-color);
        }

        .gf-calendar-grid {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
        }

        .gf-calendar-weekday {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 30px;
            font-size: 12px;
            font-weight: 600;
            color: var(--gf-gray-text);
            text-transform: uppercase;
        }

        .gf-calendar-day {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            margin: 1px;
            font-size: 14px;
            cursor: pointer;
            border-radius: 50%;
            transition: background-color 0.2s;
            color: var(--gf-text-color);
        }

        .gf-current-calendar-day {
            border: 1px solid var(--gf-main-color);
        }

        .gf-calendar-day:hover {
            background-color: var(--gf-hover-color);
        }

        .gf-calendar-day.active {
            background-color: var(--gf-main-color);
            color: white;
        }

        .gf-calendar-day.prev-month,
        .gf-calendar-day.next-month {
            color: var(--gf-disabled-text);
        }

        .gf-calendar-day.disabled {
            color: var(--gf-disabled-text);
            cursor: not-allowed;
            text-decoration: line-through;
            opacity: 0.6;
        }

        .gf-calendar-day.disabled:hover {
            background-color: transparent;
        }

        /* Vertical time picker */
        .gf-time-picker {
            display: flex;
            flex-direction: column;
            padding: 15px;
            border-top: 1px solid var(--gf-border-color);
        }

        .gf-time-picker-header {
            font-weight: 600;
            margin-bottom: 10px;
            color: var(--gf-text-color);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }

        .gf-clock-icon {
            width: 16px;
            height: 16px;
            fill: var(--gf-text-color);
        }

        .gf-time-picker-inputs {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding-left: 12px;
            padding-right: 12px;
        }

        .gf-time-input {
            width: 45px;
            padding: 5px;
            text-align: center;
            border: 1px solid var(--gf-border-color);
            border-radius: 4px;
            font-size: 14px;
            color: var(--gf-text-color);
        }

        .gf-time-input:focus {
            outline: none;
            border-color: var(--gf-main-color);
        }

        .gf-time-separator {
            font-weight: 600;
            color: var(--gf-text-color);
        }

        .gf-am-pm-toggle {
            margin-left: 10px;
            padding: 5px;
            border: 1px solid var(--gf-border-color);
            border-radius: 4px;
            font-size: 14px;
            color: var(--gf-text-color);
            background-color: var(--gf-background-color);
            width: auto;
        }

        .gf-am-pm-toggle:focus {
            outline: none;
            border-color: var(--gf-main-color);
        }

        .gf-calendar-actions {
            display: flex;
            justify-content: space-between;
            padding: 10px 15px;
            border-top: 1px solid var(--gf-border-color);
        }

        .gf-calendar-button {
            padding: 8px 16px;
            border: none;
            border-radius: 4px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.2s;
        }

        .gf-now-button {
            background-color: var(--gf-button-background-color);
            color: var(--gf-text-color);
        }

        .gf-now-button:hover {
            background-color: var(--gf-hover-button-background-color);
        }

        .gf-cancel-button {
            background-color: var(--gf-button-background-color);
            color: var(--gf-text-color);
        }

        .gf-cancel-button:hover {
            background-color: var(--gf-hover-button-background-color);
        }

        .gf-calendar-button.gf-cancel-button {
            margin-right: 4px;
        }

        .gf-calendar-button.gf-apply-button {
            margin-left: 4px;
        }

        .gf-apply-button {
            background-color: var(--gf-main-color);
            color: white;
        }

        .gf-apply-button:hover {
            opacity: 0.9;
        }

        /* HORIZONTAL LAYOUT - Completely redesigned */
        .gf-date-picker-calendar.horizontal {
            width: 580px;
            flex-direction: column;
            overflow: hidden;
        }

        .gf-date-picker-calendar.horizontal .gf-content-container {
            display: flex;
            flex-direction: row;
        }

        .gf-date-picker-calendar.horizontal .gf-calendar-main {
            width: 320px;
            border-right: 1px solid var(--gf-border-color);
        }

        .gf-date-picker-calendar.horizontal .gf-calendar-header {
            justify-content: space-between;
        }

        .gf-date-picker-calendar.horizontal .gf-calendar-grid {
            padding: 7px 15px;
        }

        .gf-date-picker-calendar.horizontal .gf-calendar-header,
        .gf-date-picker-calendar.horizontal .gf-horizontal-time-header {
            height: 55px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            padding: 0 15px;
            border-bottom: 1px solid var(--gf-border-color);
            font-weight: 600;
            gap: 8px;
        }

        .gf-date-picker-calendar.horizontal .gf-horizontal-time-header {
            justify-content: center;
        }

        /* Horizontal time section */
        .gf-horizontal-time-section {
            display: flex;
            flex-direction: column;
            width: 260px;
            background-color: var(--gf-background-color);
        }

        .gf-horizontal-time-body {
            display: flex;
            flex-direction: column;
            padding: 15px;
            flex: 1;
        }

        .gf-horizontal-time-inputs {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 10px;
        }

        .gf-horizontal-time-input-group {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .gf-horizontal-time-label {
            font-size: 12px;
            color: var(--gf-gray-text);
            margin-bottom: 5px;
        }

        .gf-horizontal-colon {
            font-weight: 600;
            font-size: 22px;
            margin: 0 10px;
            color: var(--gf-text-color);
            margin-top: 20px;
        }

        /* Time presets styles */
        .gf-time-presets {

        }

        .gf-time-presets-title {
            font-weight: 600;
            margin-bottom: 10px;
            color: var(--gf-text-color);
            font-size: 14px;
            text-align: center;
        }

        .gf-time-preset-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
        }

        .gf-time-preset-btn {
            padding: 2px;
            border: 1px solid var(--gf-border-color);
            border-radius: 4px;
            background-color: var(--gf-background-color);
            color: var(--gf-text-color);
            cursor: pointer;
            font-size: 12px;
            text-align: center;
            transition: all 0.2s;
        }

        .gf-time-preset-btn:hover {
            background-color: var(--gf-hover-color);
            border-color: var(--gf-main-color);
        }

        .gf-time-preset-btn span {
            display: block;
            color: var(--gf-gray-text);
            font-size: 9px;
            margin-top: 3px;
        }

        .gf-current-time-btn {
            width: 50%;
            margin: 0 auto 10px auto;
            padding: 8px;
            border: 1px solid var(--gf-border-color);
            border-radius: 4px;
            background-color: var(--gf-background-color);
            color: var(--gf-text-color);
            cursor: pointer;
            font-size: 14px;
            text-align: center;
            transition: all 0.2s;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-weight: 500;
        }

        .gf-current-time-btn:hover {
            background-color: var(--gf-hover-color);
            border-color: var(--gf-main-color);
        }

        .gf-current-time-btn span {
            display: block;
            color: var(--gf-gray-text);
            font-size: 12px;
            margin-top: 4px;
        }

        /* Horizontal footer */
        .gf-horizontal-footer {
            border-top: 1px solid var(--gf-border-color);
            display: flex;
            justify-content: space-between;
            padding: 10px 15px;
            background-color: var(--gf-background-color);
        }

        /* Responsive styles */
        @media (max-width: 600px) {
            .gf-date-picker-calendar {
                width: 290px;
            }

            .gf-date-picker-calendar.horizontal {
                width: 290px;
            }

            .gf-date-picker-calendar.horizontal .gf-content-container {
                flex-direction: column;
            }

            .gf-date-picker-calendar.horizontal .gf-calendar-main,
            .gf-date-picker-calendar.horizontal .gf-horizontal-time-section {
                width: 100%;
                border-right: none;
            }

            .gf-date-picker-calendar.horizontal .gf-calendar-main {
                border-bottom: 1px solid var(--gf-border-color);
            }

            .gf-horizontal-time-section {
                margin-top: 0;
            }

            .gf-horizontal-footer {
                border-top: 1px solid var(--gf-border-color);
            }

            .gf-time-preset-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }
    `;

    // Inject CSS
    function injectStyles() {
        if (!document.getElementById('gf-datetime-picker-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'gf-datetime-picker-styles';
            styleSheet.textContent = styles;
            document.head.appendChild(styleSheet);
        }
    }

    /**
     * DateTimePicker Class
     */
    class DateTimePicker {
        /**
         * Creates a new DateTimePicker instance
         * @param {HTMLElement|string} element - The container element or its selector
         * @param {Object} options - Configuration options
         */
        constructor(element, options = {}) {
            injectStyles();

            // Get the container element
            this.container = typeof element === 'string' ? document.querySelector(element) : element;
            if (!this.container) {
                throw new Error('Container element not found');
            }

            // Default options
            this.options = {
                mainColor: options.mainColor || '#4a6cf7',
                iconColor: options.iconColor || '#4a6cf7',
                allowPastDates: options.allowPastDates !== undefined ? options.allowPastDates : true,
                placeholder: options.placeholder || 'Select date and time',
                format: options.format || 'datetime12h', // Supported formats: date, time12h, time24h, datetime12h, datetime24h
                onChange: options.onChange || null,
                zIndex: options.zIndex || 1000,
                layout: options.layout || 'vertical', // 'vertical' (default) or 'horizontal'
                disabled: options.disabled !== undefined ? options.disabled : false,
                defaultDate: options.defaultDate || null,
                triggerChangeOnInit: options.triggerChangeOnInit !== undefined ? options.triggerChangeOnInit : false
            };

            // Initialize state
            this.selectedDate = null;
            this.tempSelectedDate = null;
            this.currentMonth = new Date().getMonth();
            this.currentYear = new Date().getFullYear();
            this.isOpen = false;
            this.weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            this.today = new Date();
            this.today.setHours(0, 0, 0, 0);

            // Handle default date if provided
            if (this.options.defaultDate) {
                if (this.options.defaultDate instanceof Date) {
                    // Create a copy of the date with time set to 00:00:00 for comparison
                    const defaultDateCopy = new Date(this.options.defaultDate);
                    defaultDateCopy.setHours(0, 0, 0, 0);

                    // Check if past dates are allowed
                    if (!this.options.allowPastDates && defaultDateCopy < this.today) {
                        console.error('DateTimePicker: defaultDate is in the past and allowPastDates is false. The default date will not be set.');
                    } else {
                        // Set as selected date
                        this.selectedDate = new Date(this.options.defaultDate);
                        this.tempSelectedDate = new Date(this.options.defaultDate);
                        this.currentMonth = this.selectedDate.getMonth();
                        this.currentYear = this.selectedDate.getFullYear();
                    }
                } else {
                    console.error('DateTimePicker: defaultDate must be a valid Date object.');
                }
            }

            // Create DOM structure
            this.createDatePickerDOM();

            // Apply custom colors
            this.applyColors();

            // Apply disabled state if needed
            if (this.options.disabled) {
                this.disable();
            }

            // Render calendar
            this.renderCalendar();

            // Setup event listeners
            this.setupEventListeners();

            // Update input value if a defaultDate was set
            if (this.selectedDate) {
                this.updateInputValue();
            }

            // Trigger onChange callback if requested and if defaultDate is set
            if (this.options.triggerChangeOnInit && this.selectedDate && typeof this.options.onChange === 'function') {
                requestAnimationFrame(() => {
                    try {
                        this.options.onChange.call(this, this.selectedDate);
                    } catch (error) {
                        console.error('DateTimePicker: Error in onChange callback:', error);
                    }
                });
            }
        }

        /**
         * Creates the DOM structure for the date picker
         */
        createDatePickerDOM() {
            // Create container
            this.container.classList.add('gf-date-picker-container');

            // Input element
            this.input = document.createElement('input');
            this.input.type = 'text';
            this.input.className = 'gf-date-picker-input';
            this.input.placeholder = this.options.placeholder;
            this.input.readOnly = true;

            // Calendar icon - Using public domain SVG
            this.iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            this.iconSvg.classList.add('gf-date-picker-icon');
            this.iconSvg.setAttribute('viewBox', '244 2639 20 20');

            const iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            iconPath.setAttribute('d', 'M262,2656 C262,2656.552 261.552,2657 261,2657 L247,2657 C246.448,2657 246,2656.552 246,2656 L246,2646 C246,2645.448 246.448,2645 247,2645 L261,2645 C261.552,2645 262,2645.448 262,2646 L262,2656 Z M262,2641 L262,2640 C262,2639.448 261.552,2639 261,2639 C260.448,2639 260,2639.448 260,2640 L260,2641 L255,2641 L255,2640 C255,2639.448 254.552,2639 254,2639 C253.448,2639 253,2639.448 253,2640 L253,2641 L248,2641 L248,2640 C248,2639.448 247.552,2639 247,2639 C246.448,2639 246,2639.448 246,2640 L246,2641 C244.895,2641 244,2641.895 244,2643 L244,2657 C244,2658.104 244.895,2659 246,2659 L262,2659 C263.105,2659 264,2658.104 264,2657 L264,2643 C264,2641.895 263.105,2641 262,2641 L262,2641 Z');
            this.iconSvg.appendChild(iconPath);

            // Calendar container
            this.calendar = document.createElement('div');
            this.calendar.className = 'gf-date-picker-calendar';
            if (this.options.layout === 'horizontal') {
                this.calendar.classList.add('horizontal');
            }
            this.calendar.style.zIndex = this.options.zIndex;

            // Choose layouts according to chosen option
            if (this.options.layout === 'horizontal') {
                this.createHorizontalLayout();
            } else {
                this.createVerticalLayout();
            }

            // Append elements to container
            this.container.appendChild(this.input);
            this.container.appendChild(this.iconSvg);
            this.container.appendChild(this.calendar);
        }

        /**
         * Creates the vertical layout DOM structure
         */
        createVerticalLayout() {
            // Calendar main section
            this.calendarMain = document.createElement('div');
            this.calendarMain.className = 'gf-calendar-main';

            // Calendar header
            const calendarHeader = document.createElement('div');
            calendarHeader.className = 'gf-calendar-header';

            this.prevYearBtn = this.createNavButton('prevYear', 'M18.41,7.41L17,6L11,12L17,18L18.41,16.59L13.83,12L18.41,7.41M12.41,7.41L11,6L5,12L11,18L12.41,16.59L7.83,12L12.41,7.41Z');
            this.prevMonthBtn = this.createNavButton('prevMonth', 'M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z');

            this.calendarTitle = document.createElement('div');
            this.calendarTitle.className = 'gf-calendar-title';

            this.nextMonthBtn = this.createNavButton('nextMonth', 'M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z');
            this.nextYearBtn = this.createNavButton('nextYear', 'M5.59,7.41L7,6L13,12L7,18L5.59,16.59L10.17,12L5.59,7.41M11.59,7.41L13,6L19,12L13,18L11.59,16.59L16.17,12L11.59,7.41Z');

            calendarHeader.appendChild(this.prevYearBtn);
            calendarHeader.appendChild(this.prevMonthBtn);
            calendarHeader.appendChild(this.calendarTitle);
            calendarHeader.appendChild(this.nextMonthBtn);
            calendarHeader.appendChild(this.nextYearBtn);

            // Calendar grid
            this.calendarGrid = document.createElement('div');
            this.calendarGrid.className = 'gf-calendar-grid';

            // Time picker (vertical layout)
            const timePicker = document.createElement('div');
            timePicker.className = 'gf-time-picker';

            const timePickerHeader = document.createElement('div');
            timePickerHeader.className = 'gf-time-picker-header';

            const timeHeaderText = document.createElement('span');
            timeHeaderText.textContent = 'Select Time';

            // Create clock icon
            const clockSvg = this.createClockIcon();

            timePickerHeader.appendChild(timeHeaderText);
            timePickerHeader.appendChild(clockSvg);

            const timePickerInputs = document.createElement('div');
            timePickerInputs.className = 'gf-time-picker-inputs';

            this.hourInput = document.createElement('input');
            this.hourInput.type = 'text';
            this.hourInput.className = 'gf-time-input';
            this.hourInput.placeholder = 'HH';
            this.hourInput.maxLength = 2;

            const timeSeparator = document.createElement('div');
            timeSeparator.className = 'gf-time-separator';
            timeSeparator.textContent = ':';

            this.minuteInput = document.createElement('input');
            this.minuteInput.type = 'text';
            this.minuteInput.className = 'gf-time-input';
            this.minuteInput.placeholder = 'MM';
            this.minuteInput.maxLength = 2;

            this.amPmToggle = document.createElement('select');
            this.amPmToggle.className = 'gf-am-pm-toggle';

            const amOption = document.createElement('option');
            amOption.value = 'AM';
            amOption.textContent = 'AM';

            const pmOption = document.createElement('option');
            pmOption.value = 'PM';
            pmOption.textContent = 'PM';

            this.amPmToggle.appendChild(amOption);
            this.amPmToggle.appendChild(pmOption);

            timePickerInputs.appendChild(this.hourInput);
            timePickerInputs.appendChild(timeSeparator);
            timePickerInputs.appendChild(this.minuteInput);
            timePickerInputs.appendChild(this.amPmToggle);

            timePicker.appendChild(timePickerHeader);
            timePicker.appendChild(timePickerInputs);

            // Calendar action buttons
            const calendarActions = document.createElement('div');
            calendarActions.className = 'gf-calendar-actions';

            this.nowButton = document.createElement('button');
            this.nowButton.className = 'gf-calendar-button gf-now-button';
            this.nowButton.textContent = 'Now';
            this.nowButton.type = 'button';

            const buttonsContainer = document.createElement('div');

            this.cancelButton = document.createElement('button');
            this.cancelButton.className = 'gf-calendar-button gf-cancel-button';
            this.cancelButton.textContent = 'Cancel';
            this.cancelButton.type = 'button';

            this.applyButton = document.createElement('button');
            this.applyButton.className = 'gf-calendar-button gf-apply-button';
            this.applyButton.textContent = 'Apply';
            this.applyButton.type = 'button';

            buttonsContainer.appendChild(this.cancelButton);
            buttonsContainer.appendChild(this.applyButton);

            calendarActions.appendChild(this.nowButton);
            calendarActions.appendChild(buttonsContainer);

            // Assemble vertical calendar
            this.calendarMain.appendChild(calendarHeader);
            this.calendarMain.appendChild(this.calendarGrid);
            this.calendarMain.appendChild(timePicker);
            this.calendarMain.appendChild(calendarActions);
            this.calendar.appendChild(this.calendarMain);
        }

        /**
         * Creates the horizontal layout DOM structure
         */
        createHorizontalLayout() {
            // Create a container for the calendar and time section
            const contentContainer = document.createElement('div');
            contentContainer.className = 'gf-content-container';

            // Calendar main section (left side)
            this.calendarMain = document.createElement('div');
            this.calendarMain.className = 'gf-calendar-main';

            // Calendar header
            const calendarHeader = document.createElement('div');
            calendarHeader.className = 'gf-calendar-header';

            this.prevYearBtn = this.createNavButton('prevYear', 'M18.41,7.41L17,6L11,12L17,18L18.41,16.59L13.83,12L18.41,7.41M12.41,7.41L11,6L5,12L11,18L12.41,16.59L7.83,12L12.41,7.41Z');
            this.prevMonthBtn = this.createNavButton('prevMonth', 'M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z');

            this.calendarTitle = document.createElement('div');
            this.calendarTitle.className = 'gf-calendar-title';

            this.nextMonthBtn = this.createNavButton('nextMonth', 'M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z');
            this.nextYearBtn = this.createNavButton('nextYear', 'M5.59,7.41L7,6L13,12L7,18L5.59,16.59L10.17,12L5.59,7.41M11.59,7.41L13,6L19,12L13,18L11.59,16.59L16.17,12L11.59,7.41Z');

            calendarHeader.appendChild(this.prevYearBtn);
            calendarHeader.appendChild(this.prevMonthBtn);
            calendarHeader.appendChild(this.calendarTitle);
            calendarHeader.appendChild(this.nextMonthBtn);
            calendarHeader.appendChild(this.nextYearBtn);

            // Calendar grid
            this.calendarGrid = document.createElement('div');
            this.calendarGrid.className = 'gf-calendar-grid';

            // Time section (right side)
            const timeSection = document.createElement('div');
            timeSection.className = 'gf-horizontal-time-section';

            // Time section header
            const timeHeader = document.createElement('div');
            timeHeader.className = 'gf-horizontal-time-header';
            timeHeader.textContent = 'Select Time';

            // Add clock icon
            const clockIcon = this.createClockIcon();
            timeHeader.appendChild(clockIcon);

            // Time section body
            const timeBody = document.createElement('div');
            timeBody.className = 'gf-horizontal-time-body';

            // Time input section - horizontal layout specific
            const timeInputs = document.createElement('div');
            timeInputs.className = 'gf-horizontal-time-inputs';

            // Hours input group
            const hoursGroup = document.createElement('div');
            hoursGroup.className = 'gf-horizontal-time-input-group';

            const hoursLabel = document.createElement('div');
            hoursLabel.className = 'gf-horizontal-time-label';
            hoursLabel.textContent = 'Hour';

            this.hourInput = document.createElement('input');
            this.hourInput.type = 'text';
            this.hourInput.className = 'gf-time-input';
            this.hourInput.placeholder = 'HH';
            this.hourInput.maxLength = 2;

            hoursGroup.appendChild(hoursLabel);
            hoursGroup.appendChild(this.hourInput);

            // Colon separator
            const colon = document.createElement('div');
            colon.className = 'gf-horizontal-colon';
            colon.textContent = ':';

            // Minutes input group
            const minutesGroup = document.createElement('div');
            minutesGroup.className = 'gf-horizontal-time-input-group';

            const minutesLabel = document.createElement('div');
            minutesLabel.className = 'gf-horizontal-time-label';
            minutesLabel.textContent = 'Minute';

            this.minuteInput = document.createElement('input');
            this.minuteInput.type = 'text';
            this.minuteInput.className = 'gf-time-input';
            this.minuteInput.placeholder = 'MM';
            this.minuteInput.maxLength = 2;

            minutesGroup.appendChild(minutesLabel);
            minutesGroup.appendChild(this.minuteInput);

            // AM/PM toggle group
            const ampmGroup = document.createElement('div');
            ampmGroup.className = 'gf-horizontal-time-input-group';

            const ampmLabel = document.createElement('div');
            ampmLabel.className = 'gf-horizontal-time-label';
            ampmLabel.textContent = 'AM/PM';

            this.amPmToggle = document.createElement('select');
            this.amPmToggle.className = 'gf-am-pm-toggle';

            const amOption = document.createElement('option');
            amOption.value = 'AM';
            amOption.textContent = 'AM';

            const pmOption = document.createElement('option');
            pmOption.value = 'PM';
            pmOption.textContent = 'PM';

            this.amPmToggle.appendChild(amOption);
            this.amPmToggle.appendChild(pmOption);

            ampmGroup.appendChild(ampmLabel);
            ampmGroup.appendChild(this.amPmToggle);

            // Assemble time inputs
            timeInputs.appendChild(hoursGroup);
            timeInputs.appendChild(colon);
            timeInputs.appendChild(minutesGroup);
            timeInputs.appendChild(ampmGroup);

            // Time presets
            const timePresets = document.createElement('div');
            timePresets.className = 'gf-time-presets';

            //const timePresetsTitle = document.createElement('div');
            //timePresetsTitle.className = 'gf-time-presets-title';
            //timePresetsTitle.textContent = 'Quick Select';
            //timePresets.appendChild(timePresetsTitle);

            // Create standalone Current Time button
            const currentTimeBtn = document.createElement('div');
            currentTimeBtn.className = 'gf-current-time-btn';
            currentTimeBtn.innerHTML = 'Current Time';
            currentTimeBtn.addEventListener('click', () => {
                if (!this.tempSelectedDate) {
                    this.tempSelectedDate = new Date();
                }

                // Set to current time but keep the date
                const now = new Date();
                this.tempSelectedDate.setHours(now.getHours(), now.getMinutes(), 0, 0);
                this.updateTimeInputs();
                this.formatTimeInputs();
            });
            timePresets.appendChild(currentTimeBtn);

            // Create grid for other time presets
            const timePresetGrid = document.createElement('div');
            timePresetGrid.className = 'gf-time-preset-grid';
            timePresets.appendChild(timePresetGrid);

            // List of time presets (excluding Current Time)
            const presets = [
                { label: 'Morning', time: '09:00 AM', hours: 9, minutes: 0 },
                { label: 'Noon', time: '12:00 PM', hours: 12, minutes: 0 },
                { label: 'Afternoon', time: '03:00 PM', hours: 15, minutes: 0 },
                { label: 'Evening', time: '06:00 PM', hours: 18, minutes: 0 },
                { label: 'Night', time: '09:00 PM', hours: 21, minutes: 0 },
                { label: 'Midnight', time: '12:00 AM', hours: 0, minutes: 0 }
            ];

            presets.forEach(preset => {
                const presetBtn = document.createElement('div');
                presetBtn.className = 'gf-time-preset-btn';
                presetBtn.innerHTML = `${preset.label}<span>${preset.time}</span>`;

                presetBtn.addEventListener('click', () => {
                    if (!this.tempSelectedDate) {
                        this.tempSelectedDate = new Date();
                    }

                    // Set to preset time
                    this.tempSelectedDate.setHours(preset.hours, preset.minutes, 0, 0);
                    this.updateTimeInputs();
                    this.formatTimeInputs();
                });

                timePresetGrid.appendChild(presetBtn);
            });

            // Add timePresets
            timeBody.appendChild(timeInputs);
            timeBody.appendChild(timePresets);

            // Footer with action buttons
            const footer = document.createElement('div');
            footer.className = 'gf-horizontal-footer';

            this.nowButton = document.createElement('button');
            this.nowButton.className = 'gf-calendar-button gf-now-button';
            this.nowButton.textContent = 'Now';
            this.nowButton.type = 'button';

            const buttonsContainer = document.createElement('div');

            this.cancelButton = document.createElement('button');
            this.cancelButton.className = 'gf-calendar-button gf-cancel-button';
            this.cancelButton.textContent = 'Cancel';
            this.cancelButton.type = 'button';

            this.applyButton = document.createElement('button');
            this.applyButton.className = 'gf-calendar-button gf-apply-button';
            this.applyButton.textContent = 'Apply';
            this.applyButton.type = 'button';

            buttonsContainer.appendChild(this.cancelButton);
            buttonsContainer.appendChild(this.applyButton);

            footer.appendChild(this.nowButton);
            footer.appendChild(buttonsContainer);

            // Assemble time section
            timeSection.appendChild(timeHeader);
            timeSection.appendChild(timeBody);

            // Assemble calendar main
            this.calendarMain.appendChild(calendarHeader);
            this.calendarMain.appendChild(this.calendarGrid);

            // Add calendar and time section to content container
            contentContainer.appendChild(this.calendarMain);
            contentContainer.appendChild(timeSection);

            // Add content container and footer to the calendar
            this.calendar.appendChild(contentContainer);
            this.calendar.appendChild(footer);
        }

        /**
         * Create a clock icon
         * @returns {SVGElement} The created icon
         */
        createClockIcon() {
            const clockSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            clockSvg.classList.add('gf-clock-icon');
            clockSvg.setAttribute('viewBox', '0 0 24 24');

            const clockPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            clockPath.setAttribute('d', 'M12,2C6.5,2 2,6.5 2,12C2,17.5 6.5,22 12,22C17.5,22 22,17.5 22,12C22,6.5 17.5,2 12,2M12,4C16.4,4 20,7.6 20,12C20,16.4 16.4,20 12,20C7.6,20 4,16.4 4,12C4,7.6 7.6,4 12,4M13,12H16V14H11V7H13V12Z');

            clockSvg.appendChild(clockPath);
            return clockSvg;
        }

        /**
         * Creates a navigation button for the calendar
         * @param {string} id - Button ID
         * @param {string} svgPath - SVG path data for the icon
         * @returns {HTMLButtonElement} The created button
         */
        createNavButton(id, svgPath) {
            const button = document.createElement('button');
            button.className = 'gf-calendar-nav-btn';
            button.type = 'button';

            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('viewBox', '0 0 24 24');

            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', svgPath);

            svg.appendChild(path);
            button.appendChild(svg);

            return button;
        }

        /**
         * Apply custom colors to the calendar
         */
        applyColors() {
            this.container.style.setProperty('--gf-main-color', this.options.mainColor);
            this.container.style.setProperty('--gf-icon-color', this.options.iconColor);
        }

        /**
         * Update the colors of the date picker
         * @param {string} mainColor - Main color
         * @param {string} iconColor - Icon color
         */
        updateColors(mainColor, iconColor) {
            this.options.mainColor = mainColor;
            this.options.iconColor = iconColor;
            this.applyColors();
        }

        /**
         * Render the calendar grid
         */
        renderCalendar() {
            this.calendarTitle.textContent = new Date(this.currentYear, this.currentMonth, 1)
                .toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
            this.calendarGrid.innerHTML = '';

            // Add weekday headers
            this.weekdays.forEach(weekday => {
                const weekdayElement = document.createElement('div');
                weekdayElement.classList.add('gf-calendar-weekday');
                weekdayElement.textContent = weekday;
                this.calendarGrid.appendChild(weekdayElement);
            });

            // Calculate days for previous, current, and next month
            const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay();
            const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
            const daysInPrevMonth = new Date(this.currentYear, this.currentMonth, 0).getDate();

            // Add days from previous month
            for (let i = firstDayOfMonth - 1; i >= 0; i--) {
                const day = daysInPrevMonth - i;
                const dayElement = this.createDayElement(day, 'prev-month');
                dayElement.dataset.date = `${this.currentYear}-${this.currentMonth === 0 ? 12 : this.currentMonth}-${day}`;
                dayElement.dataset.prevMonth = 'true';
                this.calendarGrid.appendChild(dayElement);
            }

            // Add days from current month
            for (let day = 1; day <= daysInMonth; day++) {
                const dayElement = this.createDayElement(day);
                dayElement.dataset.date = `${this.currentYear}-${this.currentMonth + 1}-${day}`;

                if (this.tempSelectedDate &&
                    day === this.tempSelectedDate.getDate() &&
                    this.currentMonth === this.tempSelectedDate.getMonth() &&
                    this.currentYear === this.tempSelectedDate.getFullYear()) {
                    dayElement.classList.add('active');
                }

                this.calendarGrid.appendChild(dayElement);
            }

            // Calculate how many days from next month to add
            const totalDaysAdded = firstDayOfMonth + daysInMonth;
            const remainingCells = 42 - totalDaysAdded; // 6 rows × 7 columns

            // Add days from next month
            for (let day = 1; day <= remainingCells; day++) {
                const dayElement = this.createDayElement(day, 'next-month');
                dayElement.dataset.date = `${this.currentYear}-${this.currentMonth === 11 ? 1 : this.currentMonth + 2}-${day}`;
                dayElement.dataset.nextMonth = 'true';
                this.calendarGrid.appendChild(dayElement);
            }
        }

        /**
         * Create a day element for the calendar
         * @param {number} day - Day number
         * @param {string} className - Additional class name
         * @returns {HTMLDivElement} The created day element
         */
        createDayElement(day, className = '') {
            const dayElement = document.createElement('div');
            dayElement.classList.add('gf-calendar-day');
            if (className) {
                dayElement.classList.add(className);
            }
            dayElement.textContent = day;

            // Determine which date this element represents
            let dateToCheck;
            if (className === 'prev-month') {
                // Previous month date
                let prevMonth = this.currentMonth - 1;
                let prevYear = this.currentYear;
                if (prevMonth < 0) {
                    prevMonth = 11;
                    prevYear--;
                }
                dateToCheck = new Date(prevYear, prevMonth, day);
            } else if (className === 'next-month') {
                // Next month date
                let nextMonth = this.currentMonth + 1;
                let nextYear = this.currentYear;
                if (nextMonth > 11) {
                    nextMonth = 0;
                    nextYear++;
                }
                dateToCheck = new Date(nextYear, nextMonth, day);
            } else {
                // Current month date
                dateToCheck = new Date(this.currentYear, this.currentMonth, day);
            }

            // Set time to beginning of day for proper comparison
            dateToCheck.setHours(0, 0, 0, 0);

            // Check if this date is today and apply special class
            if (dateToCheck.getTime() === this.today.getTime()) {
                dayElement.classList.add('gf-current-calendar-day');
            }

            // Check if this date should be disabled
            if (!this.options.allowPastDates) {
                if (dateToCheck < this.today) {
                    dayElement.classList.add('disabled');
                }
            }

            dayElement.addEventListener('click', () => {
                if (dayElement.classList.contains('disabled') || this.options.disabled)
                    return;
                this.selectDay(dayElement);
            });

            return dayElement;
        }

        /**
         * Handle day selection
         * @param {HTMLElement} dayElement - The selected day element
         */
        selectDay(dayElement) {
            // Remove active class from all days
            this.calendarGrid.querySelectorAll('.gf-calendar-day').forEach(day => {
                day.classList.remove('active');
            });

            // Add active class to selected day
            dayElement.classList.add('active');

            // Update selected date
            const dateData = dayElement.dataset.date.split('-');
            let year = parseInt(dateData[0]);
            let month = parseInt(dateData[1]) - 1;
            const day = parseInt(dateData[2]);

            // Handle previous/next month selection
            if (dayElement.dataset.prevMonth) {
                if (month === 11) {
                    year--;
                }
            } else if (dayElement.dataset.nextMonth) {
                if (month === 0) {
                    year++;
                }
            }

            // Set date but keep current time or set default (12:00 PM)
            if (!this.tempSelectedDate) {
                this.tempSelectedDate = new Date();
                this.tempSelectedDate.setHours(12, 0, 0, 0);
            }

            this.tempSelectedDate = new Date(
                year,
                month,
                day,
                this.tempSelectedDate.getHours(),
                this.tempSelectedDate.getMinutes()
            );
            // If user selected a day from prev/next month, update calendar view
            if (dayElement.dataset.prevMonth || dayElement.dataset.nextMonth) {
                this.currentMonth = month;
                this.currentYear = year;

                this.renderCalendar();
            }

            // Update time inputs to reflect current selection
            this.updateTimeInputs();
            this.formatTimeInputs();
        }

        /**
         * Update time inputs based on selected date
         */
        updateTimeInputs() {
            if (!this.tempSelectedDate) return;

            let hours = this.tempSelectedDate.getHours();
            const minutes = this.tempSelectedDate.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';

            // Convert to 12-hour format
            hours = hours % 12;
            hours = hours ? hours : 12; // Convert 0 to 12

            // Don't pad with zeros while user is typing
            this.hourInput.value = hours.toString();
            this.minuteInput.value = minutes.toString();
            this.amPmToggle.value = ampm;
        }

        /**
         * Update the selected date from input values
         */
        updateDateFromInputs() {
            if (!this.tempSelectedDate) return;

            let hours = parseInt(this.hourInput.value || '12');
            const minutes = parseInt(this.minuteInput.value || '0');
            const ampm = this.amPmToggle.value;

            // Validate hours (1-12)
            hours = Math.max(1, Math.min(12, hours));

            // Convert to 24-hour format
            if (ampm === 'PM' && hours < 12) {
                hours += 12;
            } else if (ampm === 'AM' && hours === 12) {
                hours = 0;
            }

            // Update temporary selected date
            this.tempSelectedDate.setHours(hours, minutes);

            // Update time inputs with validated values
            this.updateTimeInputs();
        }

        /**
         * Open the date picker
         */
        open() {
            if (this.options.disabled) return;

            this.tempSelectedDate = this.selectedDate ? new Date(this.selectedDate) : new Date();

            if (this.selectedDate) {
                this.currentMonth = this.selectedDate.getMonth();
                this.currentYear = this.selectedDate.getFullYear();
            } else {
                this.currentMonth = this.tempSelectedDate.getMonth();
                this.currentYear = this.tempSelectedDate.getFullYear();
            }

            this.renderCalendar();
            this.updateTimeInputs();
            this.formatTimeInputs();
            this.calendar.classList.add('active');
            this.isOpen = true;
        }

        /**
         * Close the date picker
         */
        close() {
            this.calendar.classList.remove('active');
            this.isOpen = false;
        }

        /**
         * Navigate to previous month
         */
        prevMonth() {
            if (this.currentMonth === 0) {
                this.currentMonth = 11;
                this.currentYear--;
            } else {
                this.currentMonth--;
            }
            this.renderCalendar();
        }

        /**
         * Navigate to next month
         */
        nextMonth() {
            if (this.currentMonth === 11) {
                this.currentMonth = 0;
                this.currentYear++;
            } else {
                this.currentMonth++;
            }
            this.renderCalendar();
        }

        /**
         * Navigate to previous year
         */
        prevYear() {
            this.currentYear--;
            this.renderCalendar();
        }

        /**
         * Navigate to next year
         */
        nextYear() {
            this.currentYear++;
            this.renderCalendar();
        }

        /**
         * Set the date picker to current date and time
         */
        setToNow() {
            this.tempSelectedDate = new Date();
            this.currentMonth = this.tempSelectedDate.getMonth();
            this.currentYear = this.tempSelectedDate.getFullYear();
            this.renderCalendar();
            this.updateTimeInputs();
        }

        /**
         * Apply the selected date and time
         */
        apply() {
            this.updateDateFromInputs();
            this.selectedDate = new Date(this.tempSelectedDate);

            // Update input value according to format
            this.updateInputValue();

            this.close();

            // Trigger onChange callback if provided
            if (typeof this.options.onChange === 'function') {
                this.options.onChange.call(this, this.selectedDate);
            }
        }

        /**
         * Update the input value based on selected format
         */
        updateInputValue() {
            if (!this.selectedDate)
                return;

            switch (this.options.format) {
                case 'date':
                    this.input.value = this.getDate();
                    break;
                case 'time12h':
                    this.input.value = this.getTime12h();
                    break;
                case 'time24h':
                    this.input.value = this.getTime24h();
                    break;
                case 'datetime24h':
                    this.input.value = this.getDateTime24h();
                    break;
                case 'datetime12h':
                default:
                    this.input.value = this.getDateTime12h();
                    break;
            }
        }

        /**
         * Cancel the selection
         */
        cancel() {
            this.tempSelectedDate = this.selectedDate ? new Date(this.selectedDate) : null;
            this.close();
        }

        /**
         * Format a number with leading zero if needed
         * @param {number} num - Number to format
         * @returns {string} Formatted number string
         */
        formatTimeZero(num) {
            return num.toString().padStart(2, '0');
        }

        /**
         * Format time inputs with leading zeros
         */
        formatTimeInputs() {
            if (this.hourInput.value) {
                this.hourInput.value = this.formatTimeZero(parseInt(this.hourInput.value));
            }
            if (this.minuteInput.value) {
                this.minuteInput.value = this.formatTimeZero(parseInt(this.minuteInput.value));
            }
        }

        /**
         * Get the selected date in MM/DD/YYYY format
         * @returns {string} Formatted date
         */
        getDate() {
            if (!this.selectedDate)
                return '';

            return `${this.formatTimeZero(this.selectedDate.getMonth() + 1)}/${this.formatTimeZero(this.selectedDate.getDate())}/${this.selectedDate.getFullYear()}`;
        }

        /**
         * Get the selected time in 12-hour format
         * @returns {string} Formatted time
         */
        getTime12h() {
            if (!this.selectedDate)
                return '';

            let hours = this.selectedDate.getHours();
            const minutes = this.selectedDate.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // Convert 0 to 12

            return `${this.formatTimeZero(hours)}:${this.formatTimeZero(minutes)} ${ampm}`;
        }

        /**
         * Get the selected time in 24-hour format
         * @returns {string} Formatted time
         */
        getTime24h() {
            if (!this.selectedDate)
                return '';

            return `${this.formatTimeZero(this.selectedDate.getHours())}:${this.formatTimeZero(this.selectedDate.getMinutes())}`;
        }

        /**
         * Get the selected date and time in MM/DD/YYYY HH:MM AM/PM format
         * @returns {string} Formatted date and time
         */
        getDateTime12h() {
            if (!this.selectedDate)
                return '';

            return `${this.getDate()} ${this.getTime12h()}`;
        }

        /**
         * Get the selected date and time in MM/DD/YYYY HH:MM format
         * @returns {string} Formatted date and time
         */
        getDateTime24h() {
            if (!this.selectedDate)
                return '';

            return `${this.getDate()} ${this.getTime24h()}`;
        }

        /**
         * Get the selected date in MM/DD/YYYY format (UTC)
         * @returns {string} Formatted date
         */
        getDateUTC() {
            if (!this.selectedDate)
                return '';

            return `${this.formatTimeZero(this.selectedDate.getUTCMonth() + 1)}/${this.formatTimeZero(this.selectedDate.getUTCDate())}/${this.selectedDate.getUTCFullYear()}`;
        }

        /**
         * Get the selected time in 12-hour format (UTC)
         * @returns {string} Formatted time
         */
        getTime12hUTC() {
            if (!this.selectedDate)
                return '';

            let hours = this.selectedDate.getUTCHours();
            const minutes = this.selectedDate.getUTCMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // Convert 0 to 12

            return `${this.formatTimeZero(hours)}:${this.formatTimeZero(minutes)} ${ampm}`;
        }

        /**
         * Get the selected time in 24-hour format (UTC)
         * @returns {string} Formatted time
         */
        getTime24hUTC() {
            if (!this.selectedDate)
                return '';

            return `${this.formatTimeZero(this.selectedDate.getUTCHours())}:${this.formatTimeZero(this.selectedDate.getUTCMinutes())}`;
        }

        /**
         * Get the selected date and time in MM/DD/YYYY HH:MM AM/PM format (UTC)
         * @returns {string} Formatted date and time
         */
        getDateTime12hUTC() {
            if (!this.selectedDate)
                return '';

            return `${this.getDateUTC()} ${this.getTime12hUTC()}`;
        }

        /**
         * Get the selected date and time in MM/DD/YYYY HH:MM format (UTC)
         * @returns {string} Formatted date and time
         */
        getDateTime24hUTC() {
            if (!this.selectedDate)
                return '';

            return `${this.getDateUTC()} ${this.getTime24hUTC()}`;
        }

        /**
         * Set the date picker to current date and time and update the input
         * @returns {Date} The selected date
         */
        setToCurrentDateTime() {
            this.selectedDate = new Date();
            this.updateInputValue();

            return this.selectedDate;
        }

        /**
         * Enable the date picker
         */
        enable() {
            this.options.disabled = false;
            this.input.classList.remove('disabled');
            this.container.classList.remove('disabled');
        }

        /**
         * Disable the date picker
         */
        disable() {
            this.options.disabled = true;
            this.input.classList.add('disabled');
            this.container.classList.add('disabled');
            if (this.isOpen) {
                this.close();
            }
        }

        /**
         * Check if the date picker is disabled
         * @returns {boolean} True if disabled, false otherwise
         */
        isDisabled() {
            return this.options.disabled;
        }

        /**
         * Setup event listeners
         */
        setupEventListeners() {
            // Open calendar on input click
            this.input.addEventListener('click', () => {
                if (!this.isOpen && !this.options.disabled) {
                    this.open();
                }
            });

            // Navigation buttons
            this.prevMonthBtn.addEventListener('click', () => this.prevMonth());
            this.nextMonthBtn.addEventListener('click', () => this.nextMonth());
            this.prevYearBtn.addEventListener('click', () => this.prevYear());
            this.nextYearBtn.addEventListener('click', () => this.nextYear());

            // Time inputs
            this.hourInput.addEventListener('input', (e) => {
                // Allow only numbers
                e.target.value = e.target.value.replace(/[^0-9]/g, '');

                // Ensure value is between 1-12
                let value = parseInt(e.target.value || '0');
                if (value > 12) e.target.value = '12';

                this.updateDateFromInputs();

                if (this.minuteInput.value) {
                    this.minuteInput.value = this.formatTimeZero(parseInt(this.minuteInput.value));
                }
            });

            this.minuteInput.addEventListener('input', (e) => {
                // Allow only numbers
                e.target.value = e.target.value.replace(/[^0-9]/g, '');

                // Ensure value is between 0-59
                let value = parseInt(e.target.value || '0');
                if (value > 59) e.target.value = '59';

                this.updateDateFromInputs();

                if (this.hourInput.value) {
                    this.hourInput.value = this.formatTimeZero(parseInt(this.hourInput.value));
                }
            });

            this.amPmToggle.addEventListener('change', () => {
                this.updateDateFromInputs();
                this.formatTimeInputs();
            });

            // Action buttons
            this.applyButton.addEventListener('click', () => this.apply());
            this.cancelButton.addEventListener('click', () => this.cancel());
            this.nowButton.addEventListener('click', () => {
                this.setToNow();
                this.formatTimeInputs();
            });

            // Close calendar when clicking outside
            document.addEventListener('click', (e) => {
                if (this.isOpen && !this.container.contains(e.target)) {
                    // Check if the clicked element has any of the excluded classes
                    const excludedClasses = [
                        'gf-date-picker-calendar',
                        'gf-date-picker-container',
                        'gf-calendar-day',
                        'next-month',
                        'prev-month',
                        'gf-btn-open'
                    ];

                    // Check if the target or any parent has excluded classes
                    let element = e.target;
                    let shouldExclude = false;

                    while (element && element !== document) {
                        if (excludedClasses.some(className => element.classList.contains(className))) {
                            shouldExclude = true;
                            break;
                        }
                        element = element.parentElement;
                    }

                    // Only close if the element should not be excluded
                    if (!shouldExclude) {
                        this.close();
                    }
                }
            });

            // Add blur event for hourInput to add leading zero
            this.hourInput.addEventListener('blur', (e) => {
                // If there's a value and it's a single digit, add leading zero
                if (e.target.value && e.target.value.length === 1) {
                    e.target.value = this.formatTimeZero(parseInt(e.target.value));
                }
            });

            // Add blur event for minuteInput to add leading zero
            this.minuteInput.addEventListener('blur', (e) => {
                // If there's a value and it's a single digit, add leading zero
                if (e.target.value && e.target.value.length === 1) {
                    e.target.value = this.formatTimeZero(parseInt(e.target.value));
                }
            });

            // Auto-select text on focus for hour input
            this.hourInput.addEventListener('focus', (e) => {
                e.target.select();
            });

            // Auto-select text on focus for minute input
            this.minuteInput.addEventListener('focus', (e) => {
                e.target.select();
            });
        }

        /**
         * Get the selected date object
         * @returns {Date|null} The selected date or null if none selected
         */
        getSelectedDate() {
            return this.selectedDate ? new Date(this.selectedDate) : null;
        }

        /**
         * Get the selected date converted to a Date object in UTC
         * @returns {Date|null} A new Date object representing the same moment in time, but with time values in UTC
         */
        getSelectedDateUTC() {
            if (!this.selectedDate)
                return null;

            const localDate = new Date(this.selectedDate);

            // Create a new Date object with UTC values that represent the same moment in time
            const utcDate = new Date(
                localDate.getUTCFullYear(),
                localDate.getUTCMonth(),
                localDate.getUTCDate(),
                localDate.getUTCHours(),
                localDate.getUTCMinutes(),
                localDate.getUTCSeconds(),
                localDate.getUTCMilliseconds()
            );

            return utcDate;
        }

        /**
         * Set a date programmatically
         * @param {Date} date - The date to set
         */
        setDate(date) {
            if (!(date instanceof Date)) {
                throw new Error('Invalid date object');
            }

            this.selectedDate = new Date(date);
            this.updateInputValue();

            // Trigger onChange callback if provided
            if (typeof this.options.onChange === 'function') {
                this.options.onChange.call(this, this.selectedDate);
            }
        }

        /**
         * Clear the selected date
         */
        clear() {
            this.selectedDate = null;
            this.tempSelectedDate = null;
            this.input.value = '';

            // Trigger onChange callback if provided
            if (typeof this.options.onChange === 'function') {
                this.options.onChange.call(this, null);
            }
        }

        /**
         * Destroy the date picker and remove event listeners
         */
        destroy() {
            // Remove DOM elements
            while (this.container.firstChild) {
                this.container.removeChild(this.container.firstChild);
            }

            // Remove container class
            this.container.classList.remove('gf-date-picker-container');

            // Clear references
            this.container = null;
            this.input = null;
            this.calendar = null;
            this.selectedDate = null;
            this.tempSelectedDate = null;
        }
    }

    // Static method for quick initialization
    DateTimePicker.init = function (selector, options) {
        const elements = document.querySelectorAll(selector);

        return Array.from(elements).map(element => new DateTimePicker(element, options));
    };

    return DateTimePicker;
})));
