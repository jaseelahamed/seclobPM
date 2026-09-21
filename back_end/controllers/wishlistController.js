const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");


exports.addToWishlist = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;

  try {
    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, products: [productId] });
    } else {
      if (wishlist.products.includes(productId)) {
        return res.status(400).json({ msg: "Product already in wishlist" });
      }
      wishlist.products.push(productId);
    }

    await wishlist.save();
    res.json(wishlist);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};


exports.getWishlist = async (req, res) => {
  const userId = req.user._id;

  try {
    const wishlist = await Wishlist.findOne({ user: userId }).populate("products", "title price images");
    res.json(wishlist || { products: [] });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};


exports.removeFromWishlist = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;

  try {
    const wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      return res.status(404).json({ msg: "Wishlist not found" });
    }

    wishlist.products = wishlist.products.filter(
      (id) => id.toString() !== productId
    );

    await wishlist.save();
    res.json(wishlist);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};