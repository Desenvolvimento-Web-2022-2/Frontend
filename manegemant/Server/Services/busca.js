const blocos = require('../../public/Objects/Blocos.json')

class BuscaService{
    retornaParametros(parametro){
        let props
        switch(parametro){
            case 'blocos':
                props = ['name', 'subname', 'numberOrRole']
                break
            case 'salas':
                props = ['name', 'subname', 'numberOrRole']
                break
            case 'computadores':
                props = ["status", "model", "patrimonyTag", "CPU", "GPU", "memory", "SO"]
                break
            case 'usuarios':
                props = ["usersInfosName", "usersInfosEmail", "role"]
                break
        }
        return props
    }
}
module.exports = new BuscaService()