import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export function Home() {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        title: "",
        description: "",
        price: "",
    });
    const [editProduct, setEditProduct] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:3000/products").then(res => {
            setProducts(res.data);
        });
    }, []);

    const handleAddProduct = () => {
        axios.post("http://localhost:3000/products", newProduct)
            .then(res => {
                setProducts([...products, res.data]);
                setNewProduct({ title: "", description: "", price: "" });
                setIsAddModalOpen(false); // Close the modal
            });
    };

    const handleDeleteProduct = () => {
        axios.delete(`http://localhost:3000/products/${productToDelete.id}`)
            .then(() => {
                setProducts(products.filter(product => product.id !== productToDelete.id));
                setProductToDelete(null);
                setIsConfirmDeleteOpen(false); // Close the confirmation modal
            });
    };

    const handleEditProduct = (product) => {
        setEditProduct(product);
        setIsEditModalOpen(true);
    };

    const handleUpdateProduct = () => {
        axios.put(`http://localhost:3000/products/${editProduct.id}`, editProduct)
            .then(res => {
                setProducts(products.map(product => product.id === editProduct.id ? res.data : product));
                setEditProduct(null);
                setIsEditModalOpen(false); // Close the modal
            });
    };

    return (
        <>
            <div style={{ margin: '20px 0' }}>
                <p style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    width: '100%',
                    backgroundColor: '#f0f0f0', // Light gray background
                    padding: '10px'
                }}>
                    Danh sách sản phẩm
                </p>

                <button
                    onClick={() => setIsAddModalOpen(true)}
                    style={{
                        marginBottom: '10px',
                        backgroundColor: 'green',
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '5px'
                    }}
                >
                    Thêm mới
                </button>

                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                    <tr style={{ backgroundColor: '#f0f0f0' }}>
                        <th style={{ padding: '10px' }}>#</th>
                        <th style={{ padding: '10px' }}>Tên sản phẩm</th>
                        <th style={{ padding: '10px' }}>Mô tả</th>
                        <th style={{ padding: '10px' }}>Giá</th>
                        <th style={{ padding: '10px' }}></th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map(item => (
                        <tr key={item.id}>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{item.id}</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                <Link to={`/product/${item.id}`}>{item.title}</Link>
                            </td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{item.description}</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{item.price}</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                <button
                                    onClick={() => handleEditProduct(item)}
                                    style={{
                                        backgroundColor: 'blue',
                                        color: 'white',
                                        marginRight: '5px',
                                        padding: '5px 10px',
                                        border: 'none',
                                        borderRadius: '5px'
                                    }}
                                >
                                    Sửa
                                </button>
                                <button
                                    onClick={() => {
                                        setProductToDelete(item);
                                        setIsConfirmDeleteOpen(true);
                                    }}
                                    style={{
                                        backgroundColor: 'red',
                                        color: 'white',
                                        padding: '5px 10px',
                                        border: 'none',
                                        borderRadius: '5px'
                                    }}
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {isAddModalOpen && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    padding: '20px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    zIndex: 1000
                }}>
                    <h5>Thêm sản phẩm</h5>
                    <p>Tên sản phẩm</p>
                    <input
                        type="text"
                        value={newProduct.title}
                        onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                        style={{ display: 'block', margin: '10px 0', width: '400px' }}
                    />
                    <p>Giá</p>
                    <input
                        type="text"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        style={{ display: 'block', margin: '10px 0', width: '400px' }}
                    />
                    <p>Mô tả</p>
                    <input
                        type="number"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        style={{ display: 'block', margin: '10px 0', width: '400px', height: '60px' }}
                    />
                    <button
                        onClick={handleAddProduct}
                        style={{
                            marginRight: '10px',
                            padding: '10px 20px',
                            backgroundColor: 'green',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px'
                        }}
                    >
                        Thêm
                    </button>
                    <button
                        onClick={() => setIsAddModalOpen(false)}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: 'lightblue',
                            color: 'black',
                            border: 'none',
                            borderRadius: '5px'
                        }}
                    >
                        Trở lại
                    </button>
                </div>
            )}

            {isEditModalOpen && editProduct && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    padding: '20px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    zIndex: 1000
                }}>
                    <h2>Sửa sản phẩm</h2>
                    <p>Tên sản phẩm</p>
                    <input
                        type="text"
                        value={editProduct.title}
                        onChange={(e) => setEditProduct({ ...editProduct, title: e.target.value })}
                        style={{ display: 'block', margin: '10px 0', width: '400px' }}
                    />
                    <p>Giá</p>
                    <input
                        type="text"
                        value={editProduct.description}
                        onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                        style={{ display: 'block', margin: '10px 0', width: '400px' }}
                    />
                    <p>Mô tả</p>
                    <input
                        type="number"
                        value={editProduct.price}
                        onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
                        style={{ display: 'block', margin: '10px 0', width: '400px', height: '70px' }}
                    />
                    <button onClick={handleUpdateProduct} style={{
                        backgroundColor: 'blue',
                        color: 'white',
                        marginRight: '10px',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '5px'
                    }}>
                        Sửa
                    </button>
                    <button onClick={() => setIsEditModalOpen(false)}
                            style={{ backgroundColor: 'lightblue', padding: '10px 20px', border: 'none', borderRadius: '5px' }}>
                        Trở lại
                    </button>
                </div>
            )}

            {isConfirmDeleteOpen && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    border: '1px solid gray',
                    padding: '20px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    zIndex: 1000,
                    textAlign: 'center'
                }}>
                    <p>Bạn chắc chắn muốn xóa sản phẩm này?</p>
                    <button onClick={() => setIsConfirmDeleteOpen(false)} style={{
                        backgroundColor: 'gray',
                        color: 'black',
                        padding: '10px 20px',
                        marginRight: '10px',
                        border: 'none',
                        borderRadius: '5px'
                    }}>
                        Cancel
                    </button>
                    <button onClick={handleDeleteProduct} style={{
                        backgroundColor: 'gray',
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '5px'
                    }}>
                        OK
                    </button>
                </div>
            )}
        </>
    );
}
