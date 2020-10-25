// Copyright (c) 2020 Antonio Alvarado Hernández

class Recooker {

  constructor(label, taste, cook) {
    this.label = label || 'Recooker()'
    this.taste = taste || ($ => true)
    this.cook = cook || ($ => JSON.parse(JSON.stringify($) || null))
  }

  assemble(label, ...args) {
    let last = this
    for (let next = last.next; next; next = last.next)
      last = next
    let taste, cook
    if (args.length > 1)
      [ taste, cook ] = args
    else if (args.length > 0)
      [ cook ] = args
    last.next = new Recooker(label, taste, cook)
    return this
  }

  toString() {
    return JSON.stringify(this)
  }

  recook($) {
    let cooker = this
    while (cooker) {
      if (cooker.taste($)) $ = cooker.cook($)
      cooker = cooker.next
    }
    return $
  }

  set(name, _) {
    return this.assemble(`set(${name}, ${_})`, ($) => {
      return Object.assign($ || {}, { [name]: 'function' === typeof _? _($): _ })
    })
  }

  rename(newName, oldName) {
    return this.assemble(`rename(${newName}, ${oldName})`, $ => {
      if ('undefined' !== typeof $[oldName]) {
        $[newName] = $[oldName] && delete $[oldName]
      }
      return $
    })
  }
}

const preheat = () => new Recooker()

module.exports = { Recooker, preheat }