import { useState, useEffect } from "react"
import { Layout } from "../../components/Layout"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { FormUpdate } from "../../components/FormUpdate"

const Home = () => {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)
  const [isEditing, setIsEditing] = useState(null)
  const [productEditing, setProductEditing] = useState(null)
  const [search, setSearch] = useState("")

  const { user, logout, token } = useAuth()

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const fetchingProducts = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/products`)

      if (!response.ok) {
        setError("Sesión terminada, vuelve a loguearte.")
        logout()
        throw new Error("Falló el fetch :(")
      }

      const dataProducts = await response.json()
      setProducts(dataProducts.data)
    } catch (error) {
      setError(error.message)
    }
  }

  const searchProducts = async (term) => {
    try {
      const response = await fetch(`${backendUrl}/api/products/search?name=${term}`)
      if (response.ok) {
        const data = await response.json()
        setProducts(data.data)
      }
    } catch (error) {
      setError(error.message)
    }
  }

  useEffect(() => {
    if (search.trim() === "") {
      fetchingProducts()
    } else {
      searchProducts(search)
    }
  }, [search])

  const handleDelete = async (product) => {
    if (confirm("Esta seguro que quieres borrar el producto?")) {
      try {
        const response = await fetch(`${backendUrl}/api/products/${product._id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
        })
        if (response.ok) {
          fetchingProducts()
        }
      } catch (error) {
        setError(error.message)
      }
    }
  }

  const handleUpdate = (product) => {
    setIsEditing(true)
    setProductEditing(product)
  }

  const handleCancelEditing = () => {
    setIsEditing(null)
    setProductEditing(null)
  }

  return (
    <Layout>
      <h1>Lista de productos</h1>
      {user && <p>Bienvenido, {user.email}</p>}

      {/* Input de búsqueda */}
      <div style={{ maxWidth: "400px", margin: "0 auto 2rem", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Buscar producto por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "100%", padding: "0.75rem", fontSize: "1rem" }}
        />
      </div>

      {error && (
        <div className="error-home">
          <h2>{error}</h2>
          <Link to={"/login"}>Ir al login</Link>
        </div>
      )}

      {isEditing && (
        <FormUpdate
          product={productEditing}
          handleCancelEditing={handleCancelEditing}
          fetchingProducts={fetchingProducts}
        />
      )}

      <section className="grid-products">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id}>
              <h2>{product.name}</h2>
              <p>${product.price}</p>
              <p className="category-product">{product.category}</p>
              {user && (
                <div className="control-product">
                  <button className="btn-update" onClick={() => handleUpdate(product)}>Actualizar</button>
                  <button className="btn-delete" onClick={() => handleDelete(product)}>Borrar</button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", gridColumn: "1 / -1" }}>No se encontraron productos.</p>
        )}
      </section>
    </Layout>
  )
}

export { Home }
