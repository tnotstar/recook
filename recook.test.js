// Copyright (c) 2020 Antonio Alvarado Hernández

const { Recooker } = require('./recook')

const theNull = null
const theNumber = Math.random()
const theString = 'Recooker is funny!'

describe('A preheated oven', () => {
  test('cooks to `null` if its food is undefined', () => {
    const cooker = new Recooker()
    expect(cooker.cook()).toBeNull()
  })

  test('cooks to `null` if its food is `null`', () => {
    const cooker = new Recooker()
    expect(cooker.cook(theNull)).toBeNull()
  })

  test('cooks close to that Number if its food is a Number', () => {
    const cooker = new Recooker()
    expect(cooker.cook(theNumber)).toBeCloseTo(theNumber)
  })

  test('cooks to that String if its food is a String', () => {
    const cooker = new Recooker()
    expect(cooker.cook(theString)).toBe(theString)
  })
})

describe('A single `set` cooker', () => {
  test('creates an object with given property if its food is undefined', () => {
    const cooker = new Recooker()
      .set('message', 'Hola, mundo!')
    expect(cooker.cook()).toMatchObject({ message: 'Hola, mundo!' })
  })

  test('adds given property to the object if its food is an empty object', () => {
    const cooker = new Recooker()
      .set('message', 'Hola, mundo!')
    expect(cooker.cook({})).toMatchObject({ message: 'Hola, mundo!' })
  })
})
