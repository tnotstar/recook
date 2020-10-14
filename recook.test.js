// Copyright (c) 2020 Antonio Alvarado Hernández

const { Recooker } = require('./recook')

test('Set a property with a single String value', () => {
  const cooker = new Recooker()
    .set('message', 'Hola, mundo!')
  expect(cooker.cook({})).toMatchObject({ message: 'Hola, mundo!' })
})
