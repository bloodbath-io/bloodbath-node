const camelToSnakeCase = (key: string) => {
  return key.replace(/[A-Z]/g, (letter: string) => `_${letter.toLowerCase()}`)
}

export const serializeParams = (params: any) => {
  let newObject: any = {}
  for (var camel in params) {
    const newIndex: string = camelToSnakeCase(camel)
    const currentParam: string = params[camel]
    newObject[newIndex] = currentParam
  }
  return newObject
}