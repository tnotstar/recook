// Copyright (c) 2020 Antonio Alvarado Hernández

const { preheat } = require('./recook')

const theNull = null
const theNumber = Math.random()
const theString = 'Recooker is funny!'

describe('A preheated oven', () => {
  test('cooks to `null` if its food is undefined', () => {
    const cooker = preheat()
    expect(cooker.recook()).toBeNull()
  })

  test('cooks to `null` if its food is `null`', () => {
    const cooker = preheat()
    expect(cooker.recook(theNull)).toBeNull()
  })

  test('cooks close to that Number if its food is a Number', () => {
    const cooker = preheat()
    expect(cooker.recook(theNumber)).toBeCloseTo(theNumber)
  })

  test('cooks to that String if its food is a String', () => {
    const cooker = preheat()
    expect(cooker.recook(theString)).toBe(theString)
  })
})

describe('A single `set` cooker', () => {
  test('creates an object with given property if its food is undefined', () => {
    const cooker = preheat()
      .set('message', 'Hola, mundo!')
    expect(cooker.recook()).toMatchObject({ message: 'Hola, mundo!' })
  })

  test('adds given property to the object if its food is an empty object', () => {
    const cooker = preheat()
      .set('message', 'Hola, mundo!')
    expect(cooker.recook({})).toMatchObject({ message: 'Hola, mundo!' })
  })

  test('sets a value without collateral effects over other properties', () => {
    const cooker = preheat()
      .set('b', 456)
    expect(cooker.recook({ a: 123 })).toMatchObject({ a: 123, b: 456 })
  })

  test('with a function value, sets its value from its return value', () => {
    const cooker = preheat()
      .set('k', $ => Object.keys($))
    expect(cooker.recook({ a: 123 })).toMatchObject({ a: 123, k: [ 'a' ] })
  })
})
