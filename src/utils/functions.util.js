export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export const isEmpty = (obj) => {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return false;
      }
    }
    return true;
  }

  export const emptyObject = (obj) => {
    for (const key in obj) {
        if (obj.hasOwnProperty(key))
          delete obj[key];
      }
  }
