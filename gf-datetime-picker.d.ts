declare class GFDateTimePicker {
  constructor(element: HTMLElement | string, options?: GFDateTimePickerOptions);

  // Static methods
  static init(selector: string, options?: GFDateTimePickerOptions): GFDateTimePicker[];

  // Instance methods
  getSelectedDate(): Date | null;
  getDate(): string;
  getTime12h(): string;
  getTime24h(): string;
  getDateTime12h(): string;
  getDateTime24h(): string;
  getSelectedDateUTC(): Date | null;
  getDateUTC(): string;
  getTime12hUTC(): string;
  getTime24hUTC(): string;
  getDateTime12hUTC(): string;
  getDateTime24hUTC(): string;
  setDate(date: Date): void;
  setToCurrentDateTime(): Date;
  clear(): void;
  open(): void;
  close(): void;
  enable(): void;
  disable(): void;
  isDisabled(): boolean;
  updateColors(mainColor: string, iconColor: string): void;
  destroy(): void;
}

interface GFDateTimePickerOptions {
  format?: 'date' | 'time12h' | 'time24h' | 'datetime12h' | 'datetime24h';
  layout?: 'vertical' | 'horizontal';
  mainColor?: string;
  iconColor?: string;
  placeholder?: string;
  allowPastDates?: boolean;
  disabled?: boolean;
  defaultDate?: Date;
  triggerChangeOnInit?: boolean;
  zIndex?: number;
  onChange?: (date: Date | null) => void;
}

export = GFDateTimePicker;
export as namespace GFDateTimePicker;
