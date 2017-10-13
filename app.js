const dateFormat = 'YYYYMMDD';
const labelFormat = 'MMMM YYYY';

const calendars = [
  {
    label: '46 Chalet Court',
    calendarId: '6iosn95sfo22b547qoh5ful7e4@group.calendar.google.com'
  },
  {
    label: '47 Chalet Court',
    calendarId: 'k4mvb7g7vcho0obkgaf13u1p7s@group.calendar.google.com'
  },
  {
    label: '57 Burke Creek',
    calendarId: '1a86sq7rpdf0n5nj5rrlae9i64@group.calendar.google.com'
  },
  {
    label: '58 Burke Creek',
    calendarId: '3on85fh2sapefcgu4d2ccep13g@group.calendar.google.com'
  },
  {
    label: '143 Holly Lane',
    calendarId: '0jupki1jo4jg5bgbtkf56a75v0@group.calendar.google.com'
  },
]

const renderCalendars = () => {
  var currentDate = $('#date-choice').val();

  const endDate = moment(currentDate, dateFormat).endOf('month').format(dateFormat);
  const secondStartDate = moment(currentDate, dateFormat).add(1, 'months').startOf('month').format(dateFormat)
  const secondEndDate = moment(currentDate, dateFormat).add(1, 'months').endOf('month').format(dateFormat)
  const data = calendars.map(calendar => {
    return `<div style='padding-bottom: 30px'>
      <div>${calendar.label}</div>
      <iframe src="https://calendar.google.com/calendar/embed?showTitle=0&amp;showNav=0&amp;showDate=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;height=400&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=${calendar.calendarId}&amp;color=%236B3304&amp;ctz=America%2FLos_Angeles&dates=${currentDate}%2F${endDate}" style="border-width:0" width="400" height="400" frameborder="0" scrolling="no"></iframe>
      <iframe src="https://calendar.google.com/calendar/embed?showTitle=0&amp;showNav=0&amp;showDate=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;height=400&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=${calendar.calendarId}&amp;color=%236B3304&amp;ctz=America%2FLos_Angeles&dates=${secondStartDate}%2F${secondEndDate}" style="border-width:0" width="400" height="400" frameborder="0" scrolling="no"></iframe>
    </div>`;
  });

  $('#calendars').html(data.join(''))
}

const setCurrentDate = (e,date) => {
  let value;
  if (e) {
    value = e.target.value
  }

  $('#date-choice').val(value || date);
  renderCalendars();
}

window.onload = () => {
  const currentDate = moment();

  const dateOptions = [];
  const baseDate = currentDate.format(dateFormat);
  dateOptions.push({
    label: currentDate.format(labelFormat),
    value: currentDate.format(dateFormat)
  });

  for(let i = 0; i < 19; i++) {
    let newDate = currentDate.add(1, 'months').startOf('month');
    dateOptions.push({
      label: newDate.format(labelFormat),
      value: newDate.format(dateFormat)
    })
  }

  $('#date-choice').html(dateOptions.map(option => (`<option value='${option.value}'>${option.label}</option>`)));

  setCurrentDate(null, baseDate);

  $('#date-choice').on('change', setCurrentDate);
}

