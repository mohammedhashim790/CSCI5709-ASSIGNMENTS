const express = require("express");
const {getAllProducts, addProduct, getProduct, updateProduct, deleteProduct} = require("./utils/database");


const router = express.Router();


router.get('/', (req, res) => {
    res.status(200).send(getAllProducts());
})

router.post('/', (req, res) => {
    if (req.body) {
        addProduct(req.body);
        return res.status(201).send(addProduct(req.body));
    }
    return res.status(404).send("Request body is empty");
})

router.get('/:id', (req, res) => {
    if (req.params.id) {
        return res.status(200).send(getProduct(req.params.id));
    }
    return res.status(404).send("Request ID is empty");
})

router.put('/:id', (req, res) => {
    if (req.params.id) {
        return res.status(201).send(updateProduct(id, req.body));
    }
    return res.status(404).send("Request ID is empty");
})

router.delete('/:id', (req, res) => {
    if (req.params.id) {
        return res.status(200).send(deleteProduct(req.params.id));
    }
    return res.status(404).send("Request ID is empty");
})


module.exports = router;
