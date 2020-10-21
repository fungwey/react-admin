// 验证密码
export const validate_password = /^[0-9A-Za-z]*$/;

// 验证邮箱
export function validate_email(params) {
  const reg_email = /^[A-Za-z0-9]+([_\\.][A-Za-z0-9]+)*@([A-Za-z0-9\\-]+\.)+[A-Za-z]{2,6}$/;
  return reg_email.test(params);
}
