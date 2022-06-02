<script lang="ts">
import { defineComponent } from 'vue';
import DatePicker from 'vue-datepicker-next';
import { format, parse } from 'date-format-parse';

export default defineComponent({
  components: {
    DatePicker,
  },
  data() {
    return {
      inputProps: {
        clearable: false,
        editable: false,
        placeholder: 'test placeholder',
        inputAttr: {
          name: 'test',
          id: 'test',
        },
      },
      shortcuts: [
        {
          text: 'range',
          onClick() {
            return [new Date(), new Date()];
          },
        },
      ],
      value: new Date(),
      append: false,
      rangeValue: [new Date(), new Date(2022, 6, 4, 18, 30, 0)],
      formatter: {
        stringify(date: Date) {
          return format(date, 'DD/MMM/YYYY');
        },
        parse(value: string) {
          return parse(value, 'DD/MMM/YYYY');
        },
        getWeek(date: Date) {
          return date.getDate();
        },
      },
    };
  },
  methods: {
    handleChange() {
      console.log('change');
    },
    handleUpdate(val: Date) {
      this.value = val;
    },
    onDatePick(date: any) {
      console.log('onDatePick', date);
    },
  },
});
</script>

<template>
  <div>
    <button @click="append = !append">ass</button>
    <DatePicker
      v-model:value="rangeValue"
      :append-to-body="false"
      :open="true"
      range
      @change="onDatePick"
    ></DatePicker>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* color: #2c3e50; */
  margin-top: 60px;
  margin-left: 60px;
}
</style>

<style lang="scss">
.colab_calendar-datepicker {
  position: relative;

  user-select: none;

  .colab_calendar-input-wrapper {
    display: none;
  }
  .colab_calendar-datepicker-main {
    border: none;
  }
  .colab_calendar-datepicker-popup {
    position: relative !important;
    left: 0 !important;
    top: 0 !important;
    width: 100% !important;
    box-shadow: none !important;
    z-index: 9 !important;

    .colab_calendar-datepicker-content {
      width: auto;
      // calendar
      .colab_calendar-calendar {
        width: 260px;

        .colab_calendar-calendar-content {
          background: #fafafc;
          border-radius: 4px;
        }
        .colab_calendar-calendar-content .cell.active {
          // border-radius: 4px;
          background: #ace8db;
          color: #19181a;
        }
        .colab_calendar-table-date .today {
          background: rgba(56, 205, 169, 0.1);
          color: #19b893;
        }
        .colab_calendar-calendar-content .cell.in-range {
          background: #d3f1ec;
          color: #19181a;
        }
      }
    }
  }
  // range
  &.colab_calendar-datepicker-range {
    width: 520px;
  }
  .colab_calendar-calendar + .colab_calendar-calendar {
    border-left: 1px solid #ffffff;
  }
}
</style>
