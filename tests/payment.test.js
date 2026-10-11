import test from 'node:test'
import assert from 'node:assert/strict'
import { normalizeQuantity, validateCard } from '../src/utils/payment.js'

const today = new Date(2026, 9, 11)
const valid = {
  card: '4111-1111-1111-1111',
  name: 'TEST USER',
  expiry: '10/26',
  cvv: '123',
  phone: '0912345678',
}

test('quantities stay integral and within the order limits', () => {
  for (const [value, expected] of [
    [0, 1],
    [-2, 1],
    [11, 10],
    ['10', 10],
    ['3.9', 3],
    ['', 1],
    ['bad', 1],
    [Infinity, 1],
  ]) {
    assert.equal(normalizeQuantity(value), expected)
  }
})
test('current month and future expiry are accepted; last month and invalid months rejected', () => {
  assert.deepEqual(validateCard(valid, today), {})
  assert.deepEqual(validateCard({ ...valid, expiry: '01/27' }, today), {})
  for (const expiry of ['09/26', '12/25', '00/27', '13/27', '1/27', '12/2x']) {
    assert.equal(
      validateCard({ ...valid, expiry }, today).expiry,
      '請輸入正確日期',
    )
  }
})
test('empty and malformed fields cannot advance to the demonstration result', () => {
  const empty = Object.fromEntries(Object.keys(valid).map((key) => [key, '']))
  assert.equal(Object.keys(validateCard(empty, today)).length, 5)
  for (const [key, value] of Object.entries({
    card: '4111-abcd-1111-1111',
    name: '123',
    cvv: 'abc',
    phone: '0212345678',
  })) {
    assert.ok(validateCard({ ...valid, [key]: value }, today)[key])
  }
})
test('unseparated card number and normal English name punctuation are accepted', () => {
  assert.deepEqual(
    validateCard(
      { ...valid, card: '4111111111111111', name: "ANNE O'NEIL" },
      today,
    ),
    {},
  )
})
