export const validatePhoneNumber = phoneNumber => {
    const phoneNumberFormat = /^\d{10}$/;
    if (phoneNumber.length === 0 || !phoneNumberFormat.test(phoneNumber)) {
        return false;
    }
    return true;
};

export const validateEmail = email => {
    // eslint-disable-next-line unicorn/no-unsafe-regex
    const emailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailFormat.test(email)) {
        return false;
    }
    return true;

};

export const validateDigit = word => {
    const digit = /^(?=.*\d).{8,30}$/;
    if (!digit.test(word)) {
        return false;
    }
    return true;
};
export const validateUppercase = word => {
    const uppercase = /^(?=.*[A-Z]).{8,30}$/;
    if (!uppercase.test(word)) {
        return false;
    }
    return true;
};
export const validateLowercase = word => {
    const lowercase = /^(?=.*[a-z]).{8,30}$/;
    if (!lowercase.test(word)) {
        return false;
    }
    return true;
};
export const validateSpecialChar = word => {
    const special = /^(?=.*[!@#$%^&*]).{8,30}$/;
    if (!special.test(word)) {
        return false;
    }
    return true;
};

export const validateEqual = (str1, str2) => {
    if (str1 !== str2) {
        return false;
    }
    return true;
};
