import { Redis } from "ioredis";

const OTP_EXPIRY = 5 * 60; // 5 минут
const MAX_ATTEMPTS = 3; // Максимальное количество попыток

const redis = new Redis(process.env.REDIS_URL!);

const getOtpKey = (email: string) => `otp:${email}`;
const getAttemptsKey = (email: string) => `otp_attempts:${email}`;

export const generateOtp = () => {
  // Генерируем 6-значный код
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const generateAndStoreOtp = async (email: string): Promise<string> => {
  const otp = generateOtp();
  const otpKey = getOtpKey(email);
  const attemptsKey = getAttemptsKey(email);

  await Promise.all([
    redis.set(otpKey, otp, "EX", OTP_EXPIRY),
    redis.set(attemptsKey, "0", "EX", OTP_EXPIRY),
  ]);

  return otp;
};

export const verifyOtp = async (email: string, code: string): Promise<boolean> => {
  const otpKey = getOtpKey(email);
  const attemptsKey = getAttemptsKey(email);

  // Проверяем количество попыток
  const attempts = await redis.incr(attemptsKey);
  if (attempts > MAX_ATTEMPTS) {
    throw new Error("Превышено максимальное количество попыток");
  }

  // Получаем сохраненный OTP
  const storedOtp = await redis.get(otpKey);
  if (!storedOtp) {
    throw new Error("OTP код истек или не существует");
  }

  // Сравниваем коды
  const isValid = storedOtp === code;

  if (isValid) {
    // Если код верный, удаляем OTP и попытки
    await Promise.all([
      redis.del(otpKey),
      redis.del(attemptsKey),
    ]);
  }

  return isValid;
};

export const isOtpValid = async (email: string): Promise<boolean> => {
  const otpKey = getOtpKey(email);
  return !!(await redis.get(otpKey));
}; 