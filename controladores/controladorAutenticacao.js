exports.registrar = (req, res) => {
    console.log("Dados do registro:", req.body);

    res.send("Registro recebido!");
}