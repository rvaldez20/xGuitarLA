import { useState, useEffect }from 'react'
import Guitar from './components/Guitar'
import Header from './components/Header'
import { db } from './data/db'


function App() {
  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cartGuitar')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [data, setData] = useState(db)
  const [cart, setCart] = useState(initialCart)
  
  const MIN_ITEMS = 1
  const MAX_ITEMS = 5 

  useEffect(() => {
    localStorage.setItem('cartGuitar', JSON.stringify(cart))
  }, [cart])
  
  function addToCart(item) {
    // verificamo si el item no se ha agregado al carrito
    const itemExists = cart.findIndex(guitar => guitar.id === item.id)
    
    if(itemExists >= 0) {
      // ya xiste se incrementa la cantidad
      if(cart[itemExists].quantity >= MAX_ITEMS) return
      const updateCart = [...cart]
      updateCart[itemExists].quantity++
      setCart(updateCart)
    } else{
      // no existe y se agrega
      item.quantity = 1
      setCart([...cart, item])
    }

    //!se actualiza el cart en el localstorage
    saveLocalStorage()
  }

  function removeFromCart(id) {
    console.log('eliminando item', id)
    setCart( prevCart => prevCart.filter(guitar => guitar.id !== id))

    //! Otra forma de hacerlo
    // const updateCart = cart.filter( guitar => id !== guitar.id )
    // setCart(updateCart)
  }

  function decreaseQuantity(id) {
    const updateCart = cart.map( item => {
      if(item.id === id && item.quantity > MIN_ITEMS ) {
        return {
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })
    setCart(updateCart)
  }

  function increaseQuantity(id) {
    const updateCart = cart.map( item => {
      if(item.id === id && item.quantity < MAX_ITEMS ) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    setCart(updateCart)

    //! Otra forma de hacerlo
    // const idItem = cart.findIndex(guitar => guitar.id === id)
    // const updateCart = [...cart]
    // updateCart[idItem].quantity++
    // setCart(updateCart)
  }

  function clearCart() {
    setCart([])
  }

  return (
    <>
      <Header 
        cart={cart}
        removeFromCart={removeFromCart}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
        clearCart={clearCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">        
          {data.map((guitar) => (
            <Guitar
              key={guitar.image}
              guitar={guitar}
              // cart={cart}
              setCart={setCart}
              addToCart={addToCart}
            />
          ))}
          
        </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>

    </>
  )
}

export default App
