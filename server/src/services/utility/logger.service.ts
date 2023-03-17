export const Logger = {
  log: (message: string | Error, tags: Array<string> = []) => {
    console.log(message);
  },
  info: (message: string| Error, tags: Array<string> = []) => {
    console.info(message);
  },
  warning: (message: string| Error, tags: Array<string> = []) => {
    console.log(message);
  },
  error: (message: string| Error, tags: Array<string> = []) => {
    console.error(message);
  }
}