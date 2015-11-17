import sloc from "sloc";

const PROCESS_KEY = "SLOC";

const defaultOptions = {};


module.exports = function(options={}){

  Object.assign(options,defaultOptions);

  return {
    key : PROCESS_KEY,
    run : (data) => run(data,options)
  };
};


function run(files, options) {

  var processedFiles = [] ;

  try {
    processedFiles = files.map(file => ({
      name : file.name,
      data : sloc(file.data,"js",options)
    }));
  } catch(e){
    console.error(e);
  }



  return {
    files : processedFiles,
    total : processedFiles.reduce(function(total,file){

      Object.keys(file.data).forEach(function(key) {
        if(!total[key]){
          total[key] = 0;
        }
        total[key] += file.data[key];
      });
      return total;
    },{})
  };

}
