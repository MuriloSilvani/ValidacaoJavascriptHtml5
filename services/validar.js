import { validarRG } from "./validarRG.js";
import { validarCPF } from "./validarCPF.js";
import { validarDataNascimento } from "./validarDataNascimento.js";
import { recuperarEndereco } from "./recuperarEndereco.js";
import { validarPreco } from "./validarPreco.js";
import { mensagensDeErro } from "./constants/mensagensDeErro.js";
import { tiposDeErro } from "./constants/tiposDeErros.js";

const retornarMensagemErro = (tipo, validity) => {
    let mensagemDeErro = "";

    tiposDeErro.forEach(erro => {
        if (validity[erro]) {
            mensagemDeErro = mensagensDeErro[tipo][erro];
        }
    });

    return mensagemDeErro;
};

export const validarInput = (input, adicionarErro = true) => {
    const classeElementoErro = "erro-validacao";
    const elementoPai = input.parentNode;
    const elementoErroExiste = elementoPai.querySelector(
        `.${classeElementoErro}`
    );
    const elementoErro = elementoErroExiste || document.createElement("div");
    const classeInputErro = "possui-erro-validacao";
    const tipo = input.dataset.tipo;
    const elementoEhValido = input.validity.valid;
    const validadoresEspecificos = {
        cep: input => recuperarEndereco(input),
        rg: input => validarRG(input),
        cpf: input => validarCPF(input),
        dataNascimento: input => validarDataNascimento(input),
        preco: input => validarPreco(input)
    };

    if (validadoresEspecificos[tipo]) {
        validadoresEspecificos[tipo](input);
    }

    // elemento não é valido
    if (!elementoEhValido) {
        elementoErro.className = classeElementoErro;
        elementoErro.textContent = retornarMensagemErro(
            input.dataset.tipo,
            input.validity
        );

        if (adicionarErro) {
            input.after(elementoErro);
            input.classList.add(classeInputErro);
        }
    } else {
        // elemento é valido
        input.classList.remove(classeInputErro);
        elementoErro.remove();
    }
};





// import { validarDataNascimento } from './validarDataNascimento.js'
// import { validarCPF } from './validarCPF.js'
// import { recuperarEndereco } from './recuperarEndereco.js'

// const retornarMensagemDeErro = (tipo, validity) => {

//     let mensagemDeErro = '';
//     const tiposDeErro = [
//         'valueMissing',
//         'typeMismatch',
//         'tooShort',
//         'rangeUnderflow',
//         'customError',
//         'patternMismatch'
//     ];

//     const mensagensDeErro = {
//         email: {
//             valueMissing: 'O e-mail é necessário',
//             typeMismatch: 'Este não pe um e-mail válido'
//         },
//         password: {
//             valueMissing: 'A senha é necessário',
//             tooShort: 'A senha deve ter no mínimo 4 caracteres'
//         },
//         dataNascimento: {
//             valueMissing: 'A data de nascimento é necessário',
//             rangeUnderflow: 'A data minima é 01/01/1901',
//             customError: 'A idade minima é de 18 anos'
//         },
//         cpf: {
//             valueMissing: 'A cpf é necessário',
//             customError: 'Este não é um CPF válido!'
//         },
//         rg: {
//             valueMissing: 'A rg é necessário'
//         },
//         cep: {
//             valueMissing: 'A cep é necessário',
//             patternMismatch: 'Este não é um CEP válido!'
//         },
//         logradouro: {
//             valueMissing: 'A logradouro é necessário'
//         },
//         cidade: {
//             valueMissing: 'A cidade é necessário'
//         },
//         estado: {
//             valueMissing: 'A estado é necessário'
//         }
//     }

//     tiposDeErro.forEach(erro => {
//         if (validity[erro]) {
//             mensagemDeErro = mensagensDeErro[tipo][erro];
//         }
//     });

//     return mensagemDeErro;
// }

// export const validarInput = (input, adicionarErro) => {
//     const classeElementoErro = 'erro-validacao';
//     const classeInputErro = 'possui-erro-validacao';
//     const elementoPai = input.parentNode;
//     const elementoErroExiste = elementoPai.querySelector(
//         `.${classeElementoErro}`
//     );
//     const elementoErro = elementoErroExiste || document.createElement('div');
//     const elementoEhValido = input.validity.valid;

//     const tipo = input.dataset.tipo;
//     const validadoresEspecificos = {
//         dataNascimento: input => validarDataNascimento(input),
//         cpf: input => validarCPF(input),
//         cep: input => recuperarEndereco(input)
//     };

//     if (validadoresEspecificos[tipo]) {
//         validadoresEspecificos[tipo](input);
//     }

//     if (!elementoEhValido) {
//         // nao valido
//         elementoErro.className = classeElementoErro;
//         elementoErro.textContent = retornarMensagemDeErro(tipo, input.validity);
//         if (adicionarErro === true) {
//             input.after(elementoErro);
//             input.classList.add(classeInputErro);
//         }
//     } else {
//         // é valido
//         elementoErro.remove();
//         input.classList.remove(classeInputErro);
//     }
// };