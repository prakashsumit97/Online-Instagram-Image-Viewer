let request = require('request')


exports.getImage = function(req, res) { 
    let findParam = ''
    if(req.query.find) findParam = req.query.find
    request(`https://pixabay.com/api/?key=15036400-96262194f431b803234259e7e&q=${findParam}&image_type=photo`, function (error, response, body) {
        res.send(body)
    });
   
};
