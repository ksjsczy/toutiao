export default {
  mobile: [
    {
      required: true,
      message: '手机号不能为空',
    },
    {
      pattern: /^1\d{10}$/,
      message: '手机号格式错误',
    },
  ],
  code: [
    {
      required: true,
      message: '验证码不能为空',
    },
    {
      pattern: /^\d{6}$/,
      message: '验证码格式错误',
    },
  ],
}
