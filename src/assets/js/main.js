import "../scss/index.scss";
$(document).ready(function () {
  $(".select2").select2({
    placeholder: "",
    allowClear: true,
    width: "resolve",
    language: {
      noResults: function () {
        return "Ничего не найдено";
      },
    },
  });
});

//Date range picker
$("#reservation").daterangepicker({
  singleDatePicker: true,
  autoApply: true,

  minYear: 1901,
  maxYear: parseInt(moment().format("YYYY"), 10),
  locale: {
    format: "DD.MM.YYYY",
    separator: " - ",
    daysOfWeek: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
    monthNames: [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ],
    firstDay: 1,
  },
});
