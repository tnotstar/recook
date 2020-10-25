// Copyright (c) 2020 Antonio Alvarado Hernández

class Recooker {
  constructor({ label, taste, cook, ...options } = {}) {
    this.label = label || 'Recooker()'
    this.taste = taste || ($ => true)
    this.cook = cook || ($ => JSON.parse(JSON.stringify($) || null))
    this.options = { ...options }
  }

  assemble(options) {
    let last = this
    for (let next = last.next; next; next = last.next)
      last = next
    last.next = new Recooker(options)
    return this
  }

  log(...args) {
    const options = this.options
    if (options.logger)
      options.logger(...args)
  }

  toString() {
    return JSON.stringify(this)
  }

  recook($) {
    let cooker = this, i = 1
    this.log('Recooking "%o" with cooker "%o"...', $, cooker)
    while (cooker) {
      const taste = cooker.taste($)
      this.log('%i> After tasting "%o", he found it "%o"', i, $, taste)
      if (taste) {
        $ = cooker.cook($)
        this.log('%i> After cooking it, now he has "%o"', i, $)
      }
      this.log('%i> Next step appears to be "%o"', i, cooker.next)
      cooker = cooker.next
      i++
    }
    this.log('Recooks has been finished with "%o"!', $)
    return $
  }

  set(name, _) {
    return this.assemble({label:`set(${name}, ${_})`, cook:$ => {
      return Object.assign($ || {}, { [name]: 'function' === typeof _? _($): _ })
    }})
  }

  rename(newName, oldName) {
    return this.assemble({label:`rename(${newName}, ${oldName})`, cook:$ => {
      if ('undefined' !== typeof $[oldName]) {
        $[newName] = $[oldName] && delete $[oldName]
      }
      return $
    }})
  }
}

const preheat = options => new Recooker(options)

module.exports = { Recooker, preheat }