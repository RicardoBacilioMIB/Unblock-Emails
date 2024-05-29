/**
 * UnblockEmailController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const ZohoAPIService = require("../services/ZohoAPIService");
const axios = require('axios');

module.exports = {
  
  async getPolicyById(req, res) {

    try {
        // Get the needed parameters to construct the request URL
        const policyId = req.params.policyId;
        const moduleApiName = req.params.module;
        const authToken = req.headers.authorization;
    
        // Construct the request URL
        const baseURL = 'https://www.zohoapis.com/crm/v6';
        let requestUrl;
    
        // Prepare the URL
        requestUrl = `${baseURL}/${moduleApiName}/${policyId}`;
    
        // Execute the function to get the records from the custom view
        const policyData = await ZohoAPIService.getPolicy(requestUrl, {
            headers: {
              'Authorization': `Zoho-oauthtoken ${authToken}`
            }
        });

        // console.log(requestUrl);
        // console.log(policyData.data.data);
        console.log(policyData.data.data[0]["Contact_Name"].id);

        let contactId = policyData.data.data[0]["Contact_Name"].id;

        return contactId;

    } catch (error) {
        console.error('Error fetching policy by ID: ', error.response);
        return res.serverError({ error: 'An unexpected error occurred.' });
    }
  },
  
  // A continuación, voy a crear una nueva funcion donde la primera cosa que haré será pasar la función getCustomViewById(req, res) y guardar el resultado en una variable, esperando que aquella función getCustomById me devuelva la lista de IDs ... y luego construir la logica para desbloquear aquellos emails
  async getEmailAndUnblockIt(req, res) {
    
    let id = await module.exports.getPolicyById(req,res);

    try {
        const zohoResponse = await axios.post(`https://www.zohoapis.com/crm/v6/Contacts/${id}/actions/unblock_email`, {
            "unblock_fields": [
                "Email",
            ]
        },
        {
            "headers": {
                Authorization: `Zoho-oauthtoken ${req.headers.authorization}`
            }
        }
        )
        console.log(zohoResponse.data);
    } catch (error) {
        console.error('Error: ', error.response.data);
        return res.serverError({ error: 'An unexpected error occurred.' });
    }
    
  }
};

