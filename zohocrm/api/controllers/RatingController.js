// /**
//  * RatingController
//  *
//  * @description :: Server-side actions for handling incoming requests.
//  * @help        :: See https://sailsjs.com/docs/concepts/actions
//  */

// const axios = require('axios');
// const xml2js = require('xml2js');

// module.exports = {
//   getQuote: async function(req, res) {
//     const xmlData = req.body;

//     if (!xmlData) {
//       return res.badRequest('XML data is required');
//     }

//     try {
//       const response = await axios.post('https://devws.uai-sys.com/pennamerica/WebServices/RatingService.svc?wsdl', xmlData, {
//         headers: {
//           'Content-Type': 'text/xml',
//           'SOAPAction': 'http://tempuri.org/IRatingService/GetRating'  // Actualiza este valor si es diferente
//         }
//       });

//       // Procesa la respuesta XML
//       xml2js.parseString(response.data, (err, result) => {
//         if (err) {
//           return res.serverError(err);
//         }
//         return res.json(result);
//       });
//     } catch (error) {
//       return res.serverError(error);
//     }
//   }
// };


