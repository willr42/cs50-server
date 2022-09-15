function timeStringToMinutes(input: string | number | undefined): number {
  if (!input) {
    throw new TypeError('Something went wrong: minutes invalid');
  }

  if (typeof input === 'number') {
    return input;
  }

  const inputString = input; // '01:23'
  const inputArray = inputString.split(':'); // ['01','23']
  const hourString = inputArray[0]; // '01'
  const minuteString = inputArray[1]; // '23'

  let initialHours = parseInt(hourString); // 01
  let minuteCount = parseInt(minuteString); // 23

  while (initialHours > 0) {
    minuteCount = minuteCount + 60;
    initialHours--;
  }
  // minuteCount = 73
  console.log(minuteCount);
  return minuteCount;
}

export default timeStringToMinutes;
