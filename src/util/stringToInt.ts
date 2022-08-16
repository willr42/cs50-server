function stringToInt(inputStr: string | undefined): number {
  if (!inputStr) {
    console.log('Missing port number from environment.');
  }
  return parseInt(inputStr as string);
}

export default stringToInt;
