import React, { Component } from "react";
import { FlatList, View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Screen from "../components/Screen";
import CartItem from "../components/CartItem";
import Text from "../components/Text";
import Button from "../components/Button";
import LoadingModal from "../components/LoadingModal";

import {
  incrementCartItem,
  decrementCartItem,
  deleteItemFromCart,
  payment as checkoutAction,
  resetCheckoutError,
} from "../redux/cart/actions";
import variables from "../styles/variables";

class Cart extends Component {
  keyExtractor = item => item.uuid;

  onCheckout = total => {
    const {
      currentUserState,
      navigation,
      callCheckout,
      cartState: {
        items: { items },
      },
    } = this.props;

    if (currentUserState.success) {
      callCheckout(total, items);
    } else {
      navigation.navigate("SingleChargeLogin");
    }
  };

  cartTotal = items =>
    items.reduce((total, item) => total + item.count * item.productType.price, 0);

  render() {
    const {
      navigation,
      cartState: {
        items: { items },
        checkout,
        payment,
      },
      callIncrementCartItem,
      callDecrementCartItem,
      callDeleteCartItem,
    } = this.props;

    const cartTotal = this.cartTotal(items);

    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <Screen>
          <FlatList
            data={items}
            keyExtractor={this.keyExtractor}
            renderItem={({ item }) => (
              <CartItem
                item={item}
                incrementCartItem={uuid => callIncrementCartItem(uuid)}
                decrementCartItem={uuid => callDecrementCartItem(uuid)}
                deleteCartItem={uuid => callDeleteCartItem(uuid)}
              />
            )}
            ListEmptyComponent={
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    marginVertical: 30,
                  }}
                >
                  No items in cart
                </Text>
              </View>
            }
          />
        </Screen>
        <View
          style={{
            padding: 16,
            backgroundColor: variables.mainBgColor,
            borderTopColor: variables.dividerColor,
            borderTopWidth: 1,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 15,
            }}
          >
            <Text>TOTAL</Text>
            <Text>{`${cartTotal / 100} kr`}</Text>
          </View>
          <Button
            title="+ ADD MORE ITEMS"
            outline
            containerStyle={{
              marginBottom: 10,
            }}
            onPress={() => navigation.navigate("CategoryList")}
          />
          <Button
            title="CHECK OUT"
            onPress={() => this.onCheckout(cartTotal)}
            disabled={cartTotal === 0}
          />
        </View>

        <LoadingModal
          visible={payment.loading || checkout.loading}
          text={payment.loading ? "Payment loading.." : "Uploading photos.."}
        />
      </View>
    );
  }
}

Cart.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
  cartState: PropTypes.shape({}).isRequired,
  callIncrementCartItem: PropTypes.func.isRequired,
  callDecrementCartItem: PropTypes.func.isRequired,
  callDeleteCartItem: PropTypes.func.isRequired,
  callCheckout: PropTypes.func.isRequired,
  currentUserState: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  cartState: state.cart,
  currentUserState: state.auth.currentUser,
});

export default connect(
  mapStateToProps,
  {
    callIncrementCartItem: incrementCartItem,
    callDecrementCartItem: decrementCartItem,
    callDeleteCartItem: deleteItemFromCart,
    callCheckout: checkoutAction,
    callResetCheckoutError: resetCheckoutError,
  }
)(Cart);
