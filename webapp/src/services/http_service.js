// SERVER MANAGMENT METHODS  
function http(Dom7) { 
  // Server Parsing Method  
  function httpRequest(method, url, data, opts) { 

    if(!opts){ opts = {headers:{}}; }

    function parseResponse(contentType, data) { // server response  
      if (contentType && contentType.match(/application\/json/gi)) {
        return JSON.parse(data); // parse query 
      }
        return data;
    }

    var contentType = opts.headers['content-type'];
    delete opts.headers['content-type'];

    if (!contentType && (typeof data) === 'object') {
      contentType = 'application/json';
      data = JSON.stringify(data);
    }

    return new Promise(function(resolve, reject) {
      Dom7.ajax({
        url: url, method: method, data: data, contentType: contentType, headers: opts.headers,
        error: function(xhr) {
          reject({
            data: parseResponse(xhr.getResponseHeader('content-type'), xhr.responseText),
            status: xhr.status,
            getHeader: function(h){ return xhr.getResponseHeader(h); }
          });
        },
        success: function(data, status, xhr) {
          resolve({
            data: parseResponse(xhr.getResponseHeader('content-type'), data),
            status: status,
            getHeader: function(h){ return xhr.getResponseHeader(h); }
          });
        }
      });

    });
  }
  // End Server Parsing Method 

  // Server Request Managment Methods 
  function get(url, query, opts) { // get server data
    return httpRequest('GET', url, query, opts);
  }

  function post(url, data, opts) { // post server data 
    return httpRequest('POST', url, data, opts);
  }

  function put(url, data, opts) { // put server data
    return httpRequest('PUT', url, data, opts);
  }

  function del(url, data, opts) { // delete server data 
    return httpRequest('DELETE', url, data, opts);
  }
  // End Server Request Managment Methods  

  return { 
    get: get, 
    post: post, 
    put: put,
     del: del };
}
// END SERVER MANAGMENT METHODS 
module.exports = http;

