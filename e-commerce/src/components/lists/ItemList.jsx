import Item from '../singleItem/Item'

const ItemList = ({
  array,
  itemContainerOpt,
  gridOpt,
  itemImg,
  redirectToDetail,
}) => {
  return (
    <ul className={`grid ${gridOpt}`}>
      {array
        ? array.map((item) => {
            return (
              <Item
                key={item.id || item._id}
                item={item}
                itemImg={itemImg}
                itemContainerOpt={itemContainerOpt}
                redirectToDetail={redirectToDetail}
              />
            )
          })
        : ''}
    </ul>
  )
}

export default ItemList
