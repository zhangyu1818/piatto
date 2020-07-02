const sleep = (time: number): [number, Promise<void>] => {
  let timer = 0;
  const promise = new Promise<void>((resolve) => {
    timer = window.setTimeout(resolve, time);
  });
  return [timer, promise];
};

export { sleep };
