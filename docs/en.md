### Basic

You can select or input a date, month, year, time or datetime

```demo
'./demo/Basic.vue'
```

### ValueType

You can set the type of the v-model value by `valueType`.

- "format": return a string same as the input value.
- "date"(default): return a Date Object.
- "timestamp": return a Number.
- token: a accepted format string pattern.

```demo
'./demo/ValueType.vue'
```

### Range

Support to select a date range.

```demo
'./demo/Range.vue'
```

### DisabledDate & DisabledTime

Disabled part of dates and time by `disabledDate` and `disabledTime` respectively.

**You should let the `defaultValue` not be disabled, when you use `disabledDate` or `disabledTime`.**

```demo
'./demo/DisabledDateTime.vue'
```

### Disabled & editable

- disabled: A disabled state of the DatePicker
- editable: Whether to allow manual input

```demo
'./demo/Disabled.vue'
```

### Shortcut

You can set `shortcuts` to improve user experience.

Use the header slot or the footer slot to render extra element in panel for customized requirements.

```demo
'./demo/Shortcut.vue'
```

### Control TimePanel visible(datetime mode)

The display or hiding of the time panel can be controlled by `showTimePanel`.

The time panel is displayed after the date is selected by default.

```demo
'./demo/ControlTimePanel.vue'
```

### Control Open

You can use the prop `open` to control the visible of popup.

This example shows how to close the popup when the seconds is selected.

```demo
'./demo/ControlOpen.vue'
```

### Hide seconds selection & display AMPM selection

The columns of the time Picker is displayed according to the value of format(HH:mm:ss) by default.

You can also set `showHour` `showMinute` `showSecond` to override the default value

```demo
'./demo/HideSeconds.vue'
```

### Interval and custom time options

Set stepped time options by `hourStep` `minuteStep` `secondStep`

Set custom time options by `hourOptions` `minuteOptions` `secondOptions`.

```demo
'./demo/MinuteStep.vue'
```

### Select fixed time list

You can provide a list of fixed time for users to choose by `timePickerOptions`

```demo
'./demo/FixedTimeList.vue'
```