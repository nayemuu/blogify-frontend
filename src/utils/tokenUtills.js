export const getCaptchaToken = async () => {
  return new Promise((resolve) => {
    grecaptcha.ready(async () => {
      const siteKey = process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY;

      if (!siteKey) {
        resolve(null);
        return;
      }

      const token = await grecaptcha.execute(siteKey, {
        action: "register", //name anything you want
      });

      resolve(token);
    });
  });
};
