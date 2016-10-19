var info = {
  "service": {
  "name": "Notifier MicroService in Node.JS ",
  "description": "This is a sample scaffolding for creating a Node.JS microservice",
  "language": "Node.JS",
  "dependencies": [
      {"service_name": "Other service"},
      {"service_name": "Yet another service"}
  ]
  },
  "links":{
  "self":"/info"
  }
};

module.exports = {
    showInfo: function(){
      return JSON.stringify(info);
    }
};
