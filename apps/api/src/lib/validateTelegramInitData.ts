import crypto from "crypto";

export function validateTelegramInitData(
  botToken: string,
  telegramInitData: string,
): boolean {
  try {
    const initData = new URLSearchParams(telegramInitData);

    const receivedHash = initData.get("hash");
    console.log("@@", receivedHash);
    initData.delete("hash");

    const dataToCheckArray = [];
    for (const [key, value] of initData.entries()) {
      dataToCheckArray.push(`${key}=${value}`);
    }
    dataToCheckArray.sort();
    const dataToCheck = dataToCheckArray.join("\n");

    const secretKey = crypto
      .createHmac("sha256", "WebAppData")
      .update(botToken)
      .digest();

    const calculatedHash = crypto
      .createHmac("sha256", secretKey)
      .update(dataToCheck)
      .digest("hex");

    return receivedHash === calculatedHash;
  } catch (error) {
    console.error("Error validating Telegram InitData:", error);
    return false;
  }
}
