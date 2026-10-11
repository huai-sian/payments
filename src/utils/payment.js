export function normalizeQuantity(value) {
  const number = Number(value)
  return Number.isFinite(number)
    ? Math.min(10, Math.max(1, Math.trunc(number)))
    : 1
}

export function validateCard(form, now = new Date()) {
  const errors = {}
  for (const [key, value] of Object.entries(form)) {
    if (!value.trim()) errors[key] = '此欄位不可為空'
  }
  if (!errors.card && !/^(?:\d{16}|\d{4}(?:-\d{4}){3})$/.test(form.card))
    errors.card = '請輸入正確卡號'
  if (
    !errors.name &&
    !/^[A-Za-z]+(?:[ .'-]+[A-Za-z]+)*$/.test(form.name.trim())
  )
    errors.name = '請輸入持卡人英文姓名'
  const match = /^(0[1-9]|1[0-2])\/(\d{2})$/.exec(form.expiry)
  if (
    !errors.expiry &&
    (!match ||
      (2000 + Number(match[2])) * 12 + Number(match[1]) <
        now.getFullYear() * 12 + now.getMonth() + 1)
  )
    errors.expiry = '請輸入正確日期'
  if (!errors.cvv && !/^\d{3}$/.test(form.cvv))
    errors.cvv = '請輸入三碼安全驗證碼'
  if (!errors.phone && !/^09\d{8}$/.test(form.phone))
    errors.phone = '請輸入正確號碼'
  return errors
}
