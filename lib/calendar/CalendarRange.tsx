import Calendar, { CalendarProps, calendarProps } from './Calendar';
import { computed, ref, watchEffect } from 'vue';
import { defineVueComponent, withDefault } from '../vueUtil';
import {
  diffCalendarMonths,
  isValidDate,
  isValidRangeDate,
  setMonth,
  startOfDay,
} from '../util/date';

import { PickerType } from '../type';

export type DateRange = [Date, Date];

export interface CalendarRangeProps
  extends Omit<
    CalendarProps,
    'value' | 'defaultValue' | 'onUpdate:value' | 'calendar' | 'onCalendarChange'
  > {
  value?: Date[];
  defaultValue?: Date | Date[];
  calendar?: Date[];
  onCalendarChange?: (value: DateRange, index?: number) => void;
  ['onUpdate:value']?: (v: Date[], type: string) => void;
}

const inRange = (date: Date, range: DateRange) => {
  const value = date.getTime();
  let [min, max] = range.map((v) => v.getTime());
  if (min > max) {
    [min, max] = [max, min];
  }
  return value > min && value < max;
};

function CalendarRange(originalProps: CalendarRangeProps) {
  const props = withDefault(originalProps, {
    defaultValue: new Date(),
    type: 'date' as PickerType,
  });

  const defaultValues = computed(() => {
    let values = Array.isArray(props.defaultValue)
      ? props.defaultValue
      : [props.defaultValue, props.defaultValue];
    values = values.map((v) => startOfDay(v));
    if (isValidRangeDate(values)) {
      return values;
    }
    return [new Date(), new Date()].map((v) => startOfDay(v)) as DateRange;
  });

  const innerValue = ref<DateRange>([new Date(NaN), new Date(NaN)]);
  watchEffect(() => {
    if (isValidRangeDate(props.value)) {
      innerValue.value = props.value;
    }
  });

  const handlePick = (date: Date, type: string) => {
    const [startValue, endValue] = innerValue.value;
    if (isValidDate(startValue) && !isValidDate(endValue)) {
      if (startValue.getTime() > date.getTime()) {
        innerValue.value = [date, startValue];
      } else {
        innerValue.value = [startValue, date];
      }
      props['onUpdate:value']?.(innerValue.value, type);
    } else {
      innerValue.value = [date, new Date(NaN)];
    }
  };

  const defaultCalendars = ref<DateRange>([new Date(), new Date()]);
  const calendars = computed(() => {
    return isValidRangeDate(props.calendar) ? props.calendar : defaultCalendars.value;
  });

  const calendarMinDiff = computed(() => {
    if (props.type === 'year') return 10 * 12; // type:year  min 10 year
    if (props.type === 'month') return 1 * 12; //type:month min 1 year
    return 1; // type:date  min 1 month
  });

  const updateCalendars = (dates: DateRange, index?: 0 | 1) => {
    const diff = diffCalendarMonths(dates[0], dates[1]);
    const gap = calendarMinDiff.value - diff;
    if (gap > 0) {
      const anotherIndex = index === 1 ? 0 : 1;
      dates[anotherIndex] = setMonth(
        dates[anotherIndex],
        (v) => v + (anotherIndex === 0 ? -gap : gap)
      );
    }
    defaultCalendars.value = dates;
    props.onCalendarChange?.(dates, index);
  };

  const updateCalendarStart = (date: Date) => {
    updateCalendars([date, calendars.value[1]], 0);
  };

  watchEffect(() => {
    const dates = isValidRangeDate(props.value) ? props.value : defaultValues.value;
    updateCalendars(dates.slice(0, 2) as DateRange);
  });

  const hoveredValue = ref<Date | null>(null);
  const handleMouseEnter = (v: Date) => (hoveredValue.value = v);
  const handleMouseLeave = () => (hoveredValue.value = null);

  const getRangeClasses = (cellDate: Date, currentDates: Date[], classnames: string) => {
    const outerClasses = props.getClasses
      ? props.getClasses(cellDate, currentDates, classnames)
      : [];
    const classes: string[] = Array.isArray(outerClasses) ? outerClasses : [outerClasses];
    if (/disabled|active/.test(classnames)) return classes;
    if (currentDates.length === 2 && inRange(cellDate, currentDates as DateRange)) {
      classes.push('in-range');
    }
    if (
      currentDates.length === 1 &&
      hoveredValue.value &&
      inRange(cellDate, [currentDates[0], hoveredValue.value])
    ) {
      return classes.concat('hover-in-range');
    }
    return classes;
  };

  return () => {
    const calendarProps = {
      ...props,
      calendar: calendars.value[0],
      value: innerValue.value,
      defaultValue: defaultValues.value[0],
      getClasses: getRangeClasses,
      // don't update when range is true
      partialUpdate: false,
      multiple: false,
      ['onUpdate:value']: handlePick,
      onCalendarChange: updateCalendarStart,
      onDateMouseLeave: handleMouseLeave,
      onDateMouseEnter: handleMouseEnter,
    };
    return <Calendar {...calendarProps}></Calendar>;
  };
}

export const calendarRangeProps = calendarProps;

export default defineVueComponent(CalendarRange, calendarRangeProps);
