import orderRepository from "../repository/orderRepository.js";
const createOrder = async (req, res) => {
  try {
    const response = await orderRepository.create(req.body);
    return res.status(200).json({
      response: HttpStatusCode.Ok,
      msg: response.message,
      data: response.data,
    });
  } catch (error) {
    return res.status(404).json({
      status: "ERR",
      message: error.message,
    });
  }
};
const getOrderByUserId = async (req) => {
  try {
    const response = await orderRepository.getOrderByUserId(req.params.id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      status: "ERR",
      message: error.message,
    });
  }
};

const changeStatus = async (req, res) => {
  try {
    const status = req.body.status;
    const id = req.params.id;
    if (!ORDER_STATUS[req.body.status])
      return res.status(404).json({ message: "Status is invalid" });
    const response = await orderRepository.changeStatus(status, id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      status: "ERR",
      message: error.message,
    });
  }
};

const getAllOrder = async (req, res) => {
  try {
    const response = await orderRepository.getAllOrder();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      status: "ERR",
      message: error.message,
    });
  }
};

export default { createOrder, getAllOrder, getOrderByUserId, changeStatus };
