
const axios = require('axios')
const fs = require('fs')
const crypto = require('crypto')
var FormData = require('form-data')
const { descriptografar } = require('./descriptografar')

const token = 'a3ff058272b29063e48a05c459577b8b828aef8b'

const base_url = 'https://api.codenation.dev/v1/challenge/dev-ps'

const base_url_post = `/submit-solution?token=${token}`
const base_url_get = `/generate-data?token=${token}`


async function getData() {
    try {
        const response = await axios.get(`${base_url}${base_url_get}`);

        const data = response.data

        data.decifrado = descriptografar(data.cifrado, data.numero_casas)

        const encryptado = crypto
            .createHash('sha1')
            .update(data.decifrado)
            .digest('hex')

        data.resumo_criptografico = encryptado

        const answerDecryp = JSON.stringify(data)

        fs.writeFile('answer.json', answerDecryp, function (err) {
            if (err) throw err;
            console.log('Saved!');
        });

        const resp = await sendDataToAPI('./answer.json')
        console.log(resp)

        console.log(data)
    } catch (error) {
        console.error(error);
    }
}

function postJsonData() {
    const form = new FormData();
    form.append('answer', fs.createReadStream(__dirname + '/answer.json'));

    axios({
        method: 'post',
        url: `${base_url}${base_url_post}`,
        data: form,
        headers: {
            'content-type': `multipart/form-data; boundary=${form._boundary}`,
        },
    }).then(response => {
        console.log('Response POST success:', response)
    }).catch(err => {
        console.error('Response POST error:', err)
    })
}

getData()
postJsonData()