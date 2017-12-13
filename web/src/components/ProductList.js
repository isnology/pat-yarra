import React, { Fragment } from 'react'
import Product from './Product'
import _ from 'lodash'


function statusForWishlist(product, productsInWishlist) {
  const hasWishlist = !!productsInWishlist

  if (!hasWishlist) {
    return { showAdd: false, showRemove: false }
  }

  const inWishlist = !!_.find(productsInWishlist, function(prod) {
    return prod._id === product._id
  })
  return { showAdd: !inWishlist, showRemove: inWishlist }
}

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
          const { showAdd, showRemove } = statusForWishlist(product, productsInWishlist)
          return (
          <Fragment key={ product._id }>
            <Product
              {...product}
              onEdit={ () => {
                onEditProduct(product._id)
              } }
              onAddToWishlist={ showAdd ? () => {
                onAddProductToWishlist(product._id)
              } : null }
              onRemoveFromWishlist={ showRemove ? () => {
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