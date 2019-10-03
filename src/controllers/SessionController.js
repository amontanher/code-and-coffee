const User = require('../models/User');

module.exports = {
    async store(req, res){
        const email = req.body.email;

        //desestruturação buscar informações de dentro de uma variavel
        //const {email} = req.body;

        //aqui coincidiu ser igual - let user = await User.findOne({email : email});
        //se ja existir joga na user
        let user = await User.findOne({email});

        if(!user){
            //vai pra proxima linha quando acabar registro do banco
            const user = await User.create({email});
        }

        //return res.json({"message":"ok"});
        return res.json(user);
    }
};

// index = retorna listagem de sessoes
// show = listar unica sessão
// store = criar sessão
// update = alterar sessão
// destroy = destruir sessão