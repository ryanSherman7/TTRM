const Logger = {
  log: (message: string, tags: Array<string> = []) => {
    console.log(message);
  },
  info: (message: string, tags: Array<string> = []) => {
    console.info(message);
  },
  warning: (message: string, tags: Array<string> = []) => {
    console.log(message);
  },
  error: (message: string, tags: Array<string> = []) => {
    console.error(message);
  }
}
export = Logger;