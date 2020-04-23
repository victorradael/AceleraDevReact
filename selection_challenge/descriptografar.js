module.exports = {

    descriptografar(textoCriptografado, numeroDeCasas) {
        const alfabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

        var textoDescriptografado = []

        textoCriptografado = textoCriptografado.split('')

        for (i = 0; i < textoCriptografado.length; i++) {
            for (j = 0; j < alfabet.length; j++) {

                if (textoCriptografado[i] === alfabet[j]) {

                    if (j < numeroDeCasas) {
                        textoDescriptografado[i] = alfabet[(alfabet.length) - (numeroDeCasas - j)]
                    } else if (j >= numeroDeCasas) {
                        textoDescriptografado[i] = alfabet[(j - numeroDeCasas)]
                    }
                }

                const found = alfabet.find(element => element == textoCriptografado[i])

                if (found == undefined) {
                    textoDescriptografado[i] = textoCriptografado[i]
                }
            }
        }

        textoDescriptografado = textoDescriptografado.join('')

        return textoDescriptografado
    }
}