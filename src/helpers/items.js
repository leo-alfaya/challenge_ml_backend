const prepareItem = ({
  id,
  title,
  price,
  currency_id,
  thumbnail,
  condition,
  shipping,
  address,
  sold_quantity,
  pictures,
}) => ({
  id,
  title,
  city_name: address ? address.city_name : undefined,
  price: {
    currency: currency_id,
    amount: price,
  },
  picture: pictures ? pictures[0].secure_url : thumbnail,
  condition: condition,
  shipping: shipping ? shipping.free_shipping : undefined,
  sold_quantity,
});

const prepareItems = (itemList) => {
  const preparedItems = itemList.results.slice(0, 4);
  const categories = itemList.filters[0]
    ? itemList.filters[0].values.map((category) => category.name)
    : [];

  const items = preparedItems.map((item) => prepareItem(item));

  return { categories: categories, items };
};

const prepareItemDetail = (itemDetails, itemDescription) => {
  const details = prepareItem(itemDetails);
  const description = itemDescription.plain_text;

  return { ...details, description };
};

module.exports = () => ({
  prepareItems,
  prepareItemDetail,
});
