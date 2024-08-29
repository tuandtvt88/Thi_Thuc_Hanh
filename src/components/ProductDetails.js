import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './ProductDetails.css'; //

export function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/products/${id}`).then(res => {
            setProduct(res.data);
        });
    }, [id]);

    return (
        <div className="container">
            <h3 className="header">Chi tiết sản phẩm</h3>
            {product ? (
                <table className="table">
                    <tbody>
                    <tr>
                        <th><h2>Tên sản phẩm:</h2></th>
                        <td><h2>{product.title}</h2></td>
                    </tr>
                    <tr>
                        <th>Mô tả</th>
                        <td>{product.description}</td>
                    </tr>
                    <tr>
                        <th>Giá</th>
                        <td>{product.price}</td>
                    </tr>
                    </tbody>
                </table>
            ) : (
                <p>Loading...</p>
            )}
            <button
                onClick={() => navigate('/home')}
                className="button"
            >
                Trở lại
            </button>
        </div>
    );
}
