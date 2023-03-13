import axios from 'axios'
import { useEffect, useState } from 'react'
import ReactDom from 'react-dom'
import getTokenFromStorage from '../../utils/getTokenFromStorage'

const Modal = ({ dataType, active, setActive, array, email, setFavorites }) => {
  useEffect(() => {
    const detectKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActive(!active)
      }
    }
    document.documentElement.addEventListener('keydown', detectKeyDown)

    console.log('array', array)
    // console.log('dataType', dataType)
  }, [])

  const removeFavorite = async (_id) => {
    try {
      const response = await axios.post(
        `http://localhost:5500/api/users/newFavoriteProduct/${_id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${getTokenFromStorage()}`,
          },
        },
      )
      const newArray = array.filter((item) => item._id !== _id)
      setFavorites(newArray)
    } catch (error) {
      console.log(error)
    }
  }

  if (!active) return ''
  else {
    return ReactDom.createPortal(
      <>
        <div
          className='absolute top-0 left-0 bottom-0 right-0 bg-gradient-to-br from-black/95 via-black/80 to-slate-900/60'
          onClick={() => setActive(!active)}
        />
        <div className='absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-screen h-full lg:h-[80vh] lg:w-[50vw]  rounded-md'>
          <div
            className={`bg-gradient-to-br from-amber-100  to-slate-900  w-full h-full rounded-md  outline outline-4 outline-pink-700/80 relative`}
          >
            <button
              className='absolute top-0 right-5'
              onClick={() => setActive(false)}
            >
              <i className='fa-solid fa-xmark text-7xl text-gray-800'></i>
            </button>
            <section
              className={`overflow-auto rounded duration-500 h-full gap-0 pt-12 p-9`}
            >
              {array.length > 0 ? (
                array.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={`mt-10 flex h-[200px] rounded-md outline outline-1 outline-stone-900 hover:shadow-2xl transition-all ease-in-out duration-300 relative w-full ${
                        index % 2 === 0
                          ? 'bg-gradient-to-tl from-slate-500/80 via-neutral-600/70 to-gray-900/80 '
                          : 'bg-gradient-to-br from-gray-800/80 to-slate-700/80'
                      }`}
                    >
                      <div className='w-1/5 flex items-center justify-center bg-gradient-to-tl from-gray-100/40 to-slate-800 p-2'>
                        {dataType === 'orders' ? (
                          <i className='fa-regular fa-folder-open text-8xl text-gray-200'></i>
                        ) : (
                          <img
                            src={item.image}
                            alt={item.name}
                            className='h-full w-full rounded-full object-scale-down'
                          />
                        )}
                      </div>

                      <div className='grid grid-cols-2 gap-x-10 p-5'>
                        <span className='text-2xl font-medium text-gray-200'>
                          {dataType === 'orders' ? email : item.name}
                        </span>
                        <span className='text-2xl font-medium text-gray-200'>
                          {dataType === 'orders'
                            ? item.createdAt
                            : `$${item.price}`}
                        </span>
                        <span className='text-2xl font-medium text-gray-200'>
                          {dataType === 'orders'
                            ? `Quantity: ${item.quantity}`
                            : `Category: ${item.categoryName}`}
                        </span>
                        <span className='text-2xl font-medium text-gray-200'>
                          {dataType === 'orders'
                            ? `Order price: $${item.price}`
                            : ''}
                        </span>
                        {dataType === 'favorites' ? (
                          <button
                            onClick={() => removeFavorite(item._id)}
                            className='p-0 absolute top-3 right-5'
                          >
                            <i
                              className={
                                'col-span-1 text-5xl cursor-pointer fa-solid fa-heart text-red-700'
                              }
                            ></i>
                          </button>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className='flex items-center justify-center'>
                  <div className='flex flex-col items-center'>
                    <p className='text-7xl text-gray-800'>
                      You dont have any{' '}
                      {dataType === 'orders' ? 'orders' : 'favorites'} yet
                    </p>
                    <i className='fa-solid fa-heart-crack text-8xl text-rose-700'></i>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </>,
      document.getElementById('portal'),
    )
  }
}

export default Modal
