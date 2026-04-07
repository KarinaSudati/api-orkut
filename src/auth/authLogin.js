const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(req.headers.authorization);

  if (!token) {
    return res.status(401).json({
      mensagem: "Token de autenticação não fornecido",
    });
  }
  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);

    req.usuarioId = decoded;
    console.log(req.usuario);
    next();
    console.log("AUTH SECRET:", process.env.JWT_SECRET);
    console.log("TOKEN:", token);
  } catch (error) {
    console.log("Erro JWT:", error.messege);
    return res.status(401).json({
      mensagem: "Token de autenticação inválido",
    });
  }
};

module.exports = auth;
