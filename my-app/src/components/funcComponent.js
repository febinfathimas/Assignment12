import { Form, Button, Table } from "react-bootstrap";
import { useState } from "react";
import { createRef } from 'react';

export default function AddProduct() 
{
    const initialValue = [
        {"product_name": "Clarinet", "category": "Music", "price": 320},
        {"product_name": "Cello", "category": "Music", "price": 100},
        {"product_name": "Tuba", "category": "Music", "price": 2500},
        {"product_name": "Dining Set", "category": "Furniture", "price": 2000},
        {"product_name": "Dresser", "category": "Furniture", "price": 1200},
        {"product_name": "Armoire", "category": "Furniture", "price": 900}
       
    ]
    const [products, setProduct] = useState(initialValue)
    const formData = createRef();
    const add = (event)=>{
        event.preventDefault();
        const newProduct = {
            product_name: formData.current.product_name.value,
            category: formData.current.category.value,
            price: formData.current.price.value
           
        }
        setProduct([...products,newProduct]);
        //console.log(products); 
    }

    //delete products
    const handledelete = (productId)=>{
    const copyArray=[...products];
    //console.log(productId.target.value);
    const index=productId.target.value;
    //console.log(index);
    copyArray.splice(index,1);
    //console.log(copyArray);
    setProduct(copyArray);
    };
        
     
    const handleSearch=(searchTerm)=>{
                                
                                const searchTerm_lc=searchTerm.toLowerCase(); 
                                console.log(searchTerm);
                                const searchArray = products.filter((product) => product.category.toLowerCase().includes(searchTerm_lc));
                                setProduct(searchArray);

                                    }
    return(
            <div>
                
                <input type="text" placeholder="Search by Category:"  name="filter" onChange={(event) =>handleSearch(event.target.value)} />
                <br></br><br></br>
                
                <Table striped bordered hover variant="dark" id="myTable">
                    <thead>
                        <tr>         
                        <th>Name</th>
                        <th>Category</th>
                        <th>price</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        products.map((item, index) => {
                        return (
                            <tr key={index}>                                        
                            <td>{item.product_name}</td>
                            <td>{item.category}</td>
                            <td>${item.price}</td>
                            <td><Button variant="primary" name="proDelete" onClick={(event) =>handledelete(event)} value={index}>Delete</Button></td>
                            </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>
                
                <h3>Add a New Product</h3>
                <Form onSubmit={add} ref={formData}>
                    <Form.Group controlId="formBasicProductName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Product Name" name="product_name"/>
                    </Form.Group>

                    <Form.Group controlId="formBasicCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Control type="text" placeholder="Product Category" name="category"/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" placeholder="Price in dollar" name="price"/>
                    </Form.Group><br></br>

                    <Button variant="primary" type="submit">Save</Button>

                </Form>
            </div>
        )
}