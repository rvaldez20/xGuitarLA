import { useState, useEffect }from 'react'
import Guitar from './components/Guitar'
import Header from './components/Header'
import { db } from './data/db'





function App() {

  const [data, setData] = useState(db)
  const [cart, setCart] = useState([])

  function addToCart(item) {
    // verificamo si el item no se ha agregado al carrito
    const itemExists = cart.findIndex(guitar => guitar.id === item.id)
    
    if(itemExists >= 0) {
      // item ya existe en el carrito
      console.log('Ya existe')
    } else{
      console.log('No existe')
      item.quantity = 1
      setCart([cart, item])
    }

    
  }


  // useEffect(() => {
  //   setData(db)
  // }, [])

  return (
    <>

      <Header />

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
