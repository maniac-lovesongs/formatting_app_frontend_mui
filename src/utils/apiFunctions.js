import {utils} from "./utils.js";

const apiCall = async (uri, args, callback) => {
    const link = utils.make_backend(uri);
    fetch(link).then((res) =>
    res.json().then((data) => {
        callback(args,data);
    }));

}

const apiCallPost = async (uri, args, postData,callback) => {
    const link = utils.make_backend(uri);
    fetch(link, {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      
        //make sure to serialize your JSON body
        body: JSON.stringify(postData)
      })
      .then((res) => res.json().then((data) => {
        callback(args,data);
      }));
}

const getCharacterSetHelper = async (s,f, callback) => {
  const uri = "/api/fonts/character_sets/font/" + f + "/style/" + s;
  apiCall(uri, {}, (args, d) => {
      if (d.characters) {
          const chs = [];
          Object.keys(d.characters).forEach((v) => {
              chs.push(d.characters[v]); 
          });
      
      const extra = {"chs": chs};
      callback(d,extra);
  } 
});}

export { apiCall, apiCallPost, getCharacterSetHelper };