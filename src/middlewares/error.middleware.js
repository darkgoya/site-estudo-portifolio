const AppError = require('../errors/AppError');

function errorMiddleware(err, req, res, next) 
{
    if (err instanceof AppError) 
    {
        return res.status(err.statusCode).json({ erro: err.message });
    }

    console.error(err);
    return res.status(500).json({ erro: 'Erro interno, tentar novamente' });
}

function notFoundMiddleware(req, res, next) 
{
    const erro = new AppError('Rota não encontrada', 404);
    next(erro);
}

module.exports = {
    errorMiddleware,
    notFoundMiddleware
};