import React from "react";
import { useSelector, useDispatch } from "react-redux";
import currencyFormatter from "currency-formatter";
import { BsDash, BsPlus } from "react-icons/bs";
import { BsReverseBackspaceReverse } from "react-icons/bs";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button, Divider } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const Cart = () => {
  const { products, totalQuantities, totalPrice } = useSelector(
    (state) => state.CartReducer
  );
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleClickSnackbar = () => {
    setOpenSnackbar(true);
    setOpen(false);
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  return (
    <div className="cart">
      <div className="container">
        <h3>Your cart</h3>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal : 'right' }}
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="success">
            Thank you for shopping with us! Keep Ordering
          </Alert>
        </Snackbar>
        {products.length > 0 ? (
          <>
            <div className="row">
              <div className="col-9">
                <div className="cart__heading">
                  <div className="row">
                    <div className="col-2">Picture</div>
                    <div className="col-2">Name</div>
                    <div className="col-2">Price</div>
                    <div className="col-2">Inc/Dec</div>
                    <div className="col-2">Total Price</div>
                    <div className="col-2">Remove</div>
                  </div>
                </div>
                {products.map((product) => (
                  <div className="row verticalAlign" key={product.id}>
                    <div className="col-2">
                      <div className="cart__image">
                        <img src={`/images/${product.image}`} alt="" />
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="cart__name">{product.name}</div>
                    </div>
                    <div className="col-2">
                      <div className="cart__price">
                        {currencyFormatter.format(product.discountPrice, {
                          code: "USD",
                        })}
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="details__info cart__incDec">
                        <div className="details__incDec">
                          <span
                            className="dec"
                            onClick={() =>
                              dispatch({ type: "DEC", payload: product.id })
                            }
                          >
                            <BsDash />
                          </span>
                          <span className="quantity">{product.quantity}</span>
                          <span
                            className="inc"
                            onClick={() =>
                              dispatch({ type: "INC", payload: product.id })
                            }
                          >
                            <BsPlus />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="cart__total text-center">
                        {currencyFormatter.format(
                          product.discountPrice * product.quantity,
                          { code: "USD" }
                        )}
                      </div>
                    </div>
                    <div className="col-2">
                      <div
                        className="cart__remove"
                        onClick={() =>
                          dispatch({ type: "REMOVE", payload: product.id })
                        }
                      >
                        <BsReverseBackspaceReverse />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-3 summary-col">
                <div className="summary">
                  <div className="summary__heading">Summary</div>
                  <div className="summary__details">
                    <div className="row mb-10">
                      <div className="col-6">Total Items:</div>
                      <div className="col-6">{totalQuantities}</div>
                    </div>
                    <div className="row mb-10">
                      <div className="col-6">Total Price</div>
                      <div className="col-6">
                        {currencyFormatter.format(totalPrice, { code: "USD" })}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="checkout"
                      onClick={handleClickOpen}
                    >
                      Checkout
                    </button>
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="form-dialog-title"
                      style={{ maxWidth: "400px", marginLeft: "550px" }}
                    >
                      <DialogContent>
                        <DialogTitle>
                          Place Your Order{" "}
                          <CloseIcon
                            style={{
                              float: "right",
                              marginTop: "5px",
                              cursor: "pointer",
                            }}
                            onClick={handleClose}
                          />
                        </DialogTitle>
                        {/* <CloseIcon style={{float:"right", marginTop:"2px"}} /> */}

                        <Divider
                          variant="fullWidth"
                          style={{ marginBottom: "15px" }}
                        />

                        <TextField
                          variant="outlined"
                          autoFocus
                          margin="dense"
                          label="Phone"
                          style={{ width: "300px" }}
                        />
                        <TextField
                          variant="outlined"
                          autoFocus
                          margin="dense"
                          label="First Name"
                          style={{ width: "300px" }}
                        />
                        <TextField
                          variant="outlined"
                          autoFocus
                          margin="dense"
                          label="Last Name"
                          style={{ width: "300px" }}
                        />
                        <TextField
                          variant="outlined"
                          autoFocus
                          margin="dense"
                          label="Address"
                          style={{ width: "300px" }}
                        />
                        <TextField
                          variant="outlined"
                          autoFocus
                          margin="dense"
                          label="Email"
                          style={{ width: "300px" }}
                        />
                        <Divider
                          variant="fullWidth"
                          style={{ marginTop: "20px" }}
                        />
                        <Button
                          onClick={handleClickSnackbar}
                          variant="contained"
                          color="primary"
                          style={{ marginLeft: "90px", marginTop: "10px" }}
                        >
                          Buy Now
                        </Button>
                      </DialogContent>

                      {/* <Button onClick={handleClose} color="primary">
                          Buy Now
                        </Button> */}
                    </Dialog>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          "Your cart is empty!"
        )}
      </div>
    </div>
  );
};

export default Cart;
