import React from 'react'
import { connect } from 'react-redux'
import './CartTable.css'
import { addBookToCart, removeAllBooksFromCart, removeBookFromCart } from '../../actions'

const CartTable = ({ items, total, onIncrease, onDecrease, onDelete }) => {

    const renderTableRow = (item, idx) => {
        return (
            <tr key={item.id}>
                <td>{idx + 1}</td>
                <td>{item.title}</td>
                <td>{item.count}</td>
                <td>${item.itemTotalPrice}</td>
                <td>
                    <button
                        onClick={() => onDelete(item.id)}
                        className="btn btn-outline-danger btn-sm float-left">
                        <i className="fa fa-trash-o"/>
                    </button>
                    <button
                        onClick={() => onIncrease(item.id)}
                        className="btn btn-outline-success btn-sm float-left">
                        <i className="fa fa-plus-circle"/>
                    </button>
                    <button
                        onClick={() => onDecrease(item.id)}
                        className="btn btn-outline-warning btn-sm float-left">
                        <i className="fa fa-minus-circle"/>
                    </button>
                </td>
            </tr>
        )
    }

    return (
        <div className="shopping-cart-table">
            <h2>Your Order</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Item</th>
                    <th>Count</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
                </thead>

                <tbody>
                {
                    items.map(renderTableRow)
                }
                </tbody>
            </table>

            <div className="total">
                Total: ${total}
            </div>
        </div>
    )
}

const mapStateToProps = ({ cartItems, orderTotalPrice }) => ({
    items: cartItems,
    total: orderTotalPrice
})

const mapDispatchToProps = {
    onIncrease: addBookToCart,
    onDecrease: removeBookFromCart,
    onDelete: removeAllBooksFromCart
}

export default connect(mapStateToProps, mapDispatchToProps)(CartTable)
