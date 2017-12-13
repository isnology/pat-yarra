import React, { Fragment } from 'react'
import Product from './Product'
import _ from 'lodash'

//function findProductInWishlist( product, products ) {
//  let value = false
//  products.forEach((prod) => {
//    if (prod._id === product._id ) {
//      value = true
//    }
//  })
//  return value
//}

function ProductList({
  products,
  productsInWishlist,
  editedProductID,
  onEditProduct,
  onAddProductToWishlist,
  onRemoveProductFromWishlist,
  renderEditForm
}) {
  return (
    <div className='mb-3'>
      <h2>Products</h2>
      {
        products.map((product) => {
          //const inWishlist = findProductInWishlist( product, productsInWishlist )
          const inWishlist = !!_.find(productsInWishlist, function(prod) { return prod._id === product._id })
          return (
          <Fragment key={ product._id }>
            <Product
              {...product}
              onEdit={ () => {
                onEditProduct(product._id)
              } }
              onAddToWishlist={ inWishlist ? null : () => {
                onAddProductToWishlist(product._id)
              }}
              onRemoveFromWishlist={ inWishlist ? () => {
                onRemoveProductFromWishlist(product._id)
              } : null }
            />
            { editedProductID === product._id &&
              renderEditForm(product)
            }
          </Fragment>
        )})
      }
    </div>
  )
}

export default ProductList