export const formatPrice = (value) => {
    const formattedValue = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumSignificantDigits: 1,
    }).format(value);

    return formattedValue;
};
