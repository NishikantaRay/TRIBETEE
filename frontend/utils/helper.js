export const getDiscountedPricePercentage = (original_price, discount_price) => {

    const discount = ((original_price - discount_price) / original_price) * 100;
    return Math.round(discount);
}

export const getAllProductsName = (products) => {
    const name = products.map((product) => {
        return product.attributes.name;
    });

    return name;
}