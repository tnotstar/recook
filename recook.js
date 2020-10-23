// Copyright (c) 2020 Antonio Alvarado Hernández

class Recooker {
  constructor(name, functor) {
    this.name = name || 'Recooker()'
    this.functor = functor || ((_) => JSON.parse(JSON.stringify(_) || null))
  }

  cook($) {
    let cooker = this
    while (cooker) {
      $ = cooker.functor($)
      cooker = cooker.next
    }
    return $
  }

  recook(name, functor) {
    let last = this
    for (let next = last.next; next; next = last.next)
      last = next
    last.next = new Recooker(name, functor)
    return this
  }

  set(name, value) {
    return this.recook(`set(${name}, ${value})`, ($) => {
      return Object.assign($ || {},
        { [name]: typeof value === 'function'? value($): value })
    })
  }

  rename(newname, oldname) {
    return this.recook(`rename(${newname}, ${oldname})`, ($) => {
      if ('undefined' !== typeof $[oldname]) {
        $[newname] = $[oldname]
        delete $[oldname]
      }
      return $
    })
  }
}

const preheat = () => new Recooker()

module.exports = { Recooker, preheat }