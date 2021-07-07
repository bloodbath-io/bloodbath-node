const toSnake = (key: string) => {
  return key.replace(/[A-Z]/g, (letter: string) => `_${letter.toLowerCase()}`)
}

const toCamel = (key: string) => {
  return key.replace(/([-_][a-z])/ig, ($1) => {
    return $1.toUpperCase().replace('-', '').replace('_', '');
  })
};

const isObject = function (object: any) {
  return object === Object(object) && !Array.isArray(object) && typeof object !== 'function';
}

export const serializeParams = (params: any) => {
  let newObject: any = {}
  for (var camel in params) {
    const newIndex: string = toSnake(camel)
    const currentParam: string = params[camel]
    newObject[newIndex] = currentParam
  }
  return newObject
}

export const deserializeParams: any = (params: any) => {
  if (isObject(params)) {
    const newObject: any = {}

    Object.keys(params).forEach((key) => { newObject[toCamel(key)] = deserializeParams(params[key]) })

    return newObject
  } else if (Array.isArray(params)) {
    return params.map((index) => {
      return deserializeParams(index)
    })
  }

  return params
}