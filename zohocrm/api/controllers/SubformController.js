/**
 * SubformController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


const axios = require('axios');

module.exports = {
  getSubformData: async function (req, res) {
    const moduleApiName = req.param('moduleApiName');
    const recordId = req.param('recordId');
    const subformApiName = req.param('subformApiName');
    const zohoAuthToken = 'Zoho-oauthtoken 1000.8d280065e49884cffad984e401885469.9276d09907258512f70e640620cc33af';

    const apiDomain = 'https://www.zohoapis.com';
    const apiUrl = `${apiDomain}/crm/v6/${moduleApiName}/${recordId}`;

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          'Authorization': zohoAuthToken
        }
      });

      // Filtrar los datos del subformulario si existe
      const subformData = response.data.data[0][subformApiName] || [];

      console.log(subformData);

      return res.json(subformData);
    } catch (error) {
      let errorMessage = 'An error occurred';
      if (error.response) {
        // La solicitud se realizó y el servidor respondió con un código de estado que
        // no está en el rango de 2xx
        errorMessage = error.response.data;
      } else if (error.request) {
        // La solicitud se realizó pero no se recibió respuesta
        errorMessage = error.request;
      } else {
        // Algo pasó al configurar la solicitud que desencadenó un error
        errorMessage = error.message;
      }
      return res.status(500).json({ error: errorMessage });
    }
  }
};