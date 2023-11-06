import cartRepository from "../repository/cartRepository.js";

const addToCart = async (req, res) => {
  try {
    const { userId, productId, updateType } = req.body;
    const data = await cartRepository.addToCart({
      userId,
      productId,
      updateType,
    });
    return res.json(data);
  } catch (error) {
    res.json(error.message);
  }
};

export default { addToCart };
