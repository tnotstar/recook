// Copyright (c) 2020 Antonio Alvarado Hernández

class Recooker {
  constructor(name, functor) {
    this.name = name || 'Recooker()'
    this.functor = functor || ((_) => JSON.parse(JSON.stringify(_)))
  }

  cook(object) {
    let cooker = this
    while (cooker) {
      object = cooker.functor(object)
      cooker = cooker.next
    }
    return object
  }

  recook(name, functor) {
    let last = this
    for (let next = last.next; next; next = last.next)
      last = next
    last.next = new Recooker(name, functor)
    return this
  }

  set(name, value) {
    return this.recook(`set(${name}, ${value})`, (object) => {
      object[name] = value
      return object
    })
  }

  rename(newname, oldname) {
    return this.recook(`rename(${newname}, ${oldname})`, (object) => {
      if ('undefined' !== typeof object[oldname]) {
        object[newname] = object[oldname]
        delete object[oldname]
      }
      return object
    })
  }
}

const preheat = () => new Recooker()

module.exports = { Recooker, preheat }