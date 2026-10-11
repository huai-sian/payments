import '@testing-library/jest-dom'
import { render, getByText, fireEvent } from '@testing-library/vue'
import HelloWorld from '@/components/HelloWorld.vue'
import Ordercard from '@/components/orderCard.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const { getByText } = render(HelloWorld, {
      props: { msg },
    })
    expect(getByText(msg)).toBeInTheDocument();
  })

});

describe('orderCard.vue' ,() => {
  // it('Card form submits', async () => {
  //   const fakeUser = {
  //     cardnum: 1234-1234-1234-1234,
  //     cardname: 'Luis Chang',
  //     cardexpire: '12/23',
  //     cardcode: '022',
  //     userphone: '0912300500'
  //   };
  //   const {
  //     getByLabelText,
  //     getByRole,
  //     emitted
  //   } = render(Ordercard)

  //   const submitButton = getByRole('submit');

  //   const cardnumInput = getByLabelText('信用卡卡號');
  //   await fireEvent.update(cardnumInput, fakeUser.cardnum);

  //   const cardnameInput = getByLabelText('持卡人英文姓名');
  //   await fireEvent.update(cardnameInput, fakeUser.cardname);

  //   const cardexpireInput = getByLabelText('有效年月');
  //   await fireEvent.update(cardexpireInput, fakeUser.cardexpire);

  //   const cardcodeInput = getByLabelText('安全驗證碼');
  //   await fireEvent.update(cardcodeInput, fakeUser.cardcode);

  //   const userphoneInput = getByLabelText('手機號碼');
  //   await fireEvent.update(userphoneInput, fakeUser.userphone);

  //   expect(submitButton).toBeEnabled();

  //   await fireEvent.click(submitButton)
  //   expect(emitted()).toHaveProperty('submit');

  // })
})
