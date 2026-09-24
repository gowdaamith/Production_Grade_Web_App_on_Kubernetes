import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [backendStatus, setBackendStatus] = useState("Checking...");

  useEffect(() => {
    fetch("/api/health")
      .then((response) => response.json())
      .then(() => setBackendStatus("Backend is healthy"))
      .catch(() => setBackendStatus("Backend unavailable"));

    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Production Kubernetes App</h1>

      <h2>Backend Status</h2>
      <p>{backendStatus}</p>

      <h2>Products</h2>

      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>₹{product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
